import {
    Router
} from 'express'
import path from 'path'
import crypto from 'crypto'
import fs from 'fs'
import fsExtra from 'fs-extra'
import buildJs from '../core/buildJs'
import CONFIG from '../config'
import _ from 'lodash'

import {
    Stats, Configuration, Output
} from 'webpack';

const jsFileRoute = Router()

function resolveModuleName(path: string): string {
    path = path.replace(/\//g, '')
    return encodeURIComponent(path).replace('%', '')
}

function calOutputPathName(config: Configuration, moduleName: string): string {
    const publicPath = (<Output>config.output).publicPath

    return path.resolve('/', moduleName)
}

function isJsFile(filePath: string): boolean {
    return /\.(js|es6|es|jsx|ts|tsx)$/.test(filePath.toLocaleLowerCase())
}

jsFileRoute.get('*', function (req, res, next) {
    const {
        option,
        webpackConfigger,
        entryHandler
    } = req.app.locals
    const dir = option.dir

    const filePath = path.join(dir, decodeURIComponent(req.path))

    if (!isJsFile(filePath)) {
        return next()
    }

    fs.stat(filePath, (err, stat) => {
        if (err) {
            return next()
        }

        if (stat && stat.isFile()) {
            const entryFile = entryHandler.generateEntryFile(filePath)
            const moduleName = resolveModuleName(filePath)
            const entry = webpackConfigger.addEntry(moduleName, entryFile)
            buildJs(webpackConfigger.config, req.app, {[moduleName]: entry})
            res.send(
                _.template(CONFIG.INDEX_TEMPLATE)({
                    serveredFilePath: calOutputPathName(webpackConfigger.config, moduleName)
                })
            )
        }
        else {
            next()
        }
    })
})

export {
    jsFileRoute
}

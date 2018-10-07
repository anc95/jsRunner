import {
    Router
} from 'express'
import path from 'path'
import fs from 'fs'
import buildJs from '../core/buildJs'
import CONFIG from '../config'
import _ from 'lodash'

import {
    Stats, Configuration, Output
} from 'webpack';

const jsFileRoute = Router()

function resolveModuleName(path: string): string {
    path = path.replace(/\//g, '')
    console.log(path)
    return encodeURIComponent(path)
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
        webpackConfigger
    } = req.app.locals
    const dir = option.dir

    const filePath = path.join(dir, req.path)

    if (!isJsFile(filePath)) {
        return next()
    }

    fs.stat(filePath, (err, stat) => {
        if (err) {
            return next()
        }

        if (stat && stat.isFile()) {
            const moduleName = resolveModuleName(filePath)
            webpackConfigger.addEntry(moduleName, filePath)
            buildJs(webpackConfigger.config, req.app, () => {
                res.send(
                    _.template(CONFIG.INDEX_TEMPLATE)({
                        serveredFilePath: calOutputPathName(webpackConfigger.config, moduleName)
                    })
                )
            })
        }
        else {
            next()
        }
    })
})

export {
    jsFileRoute
}
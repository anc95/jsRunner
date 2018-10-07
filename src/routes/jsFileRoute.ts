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

function generateEntryFile(dir: string, filePath: string): string {
    let content = fs.readFileSync(filePath).toString()
    const hash = crypto.createHash('md5').update(content).digest('hex')
    const fileNameReult = /([a-zA-Z\.]+)\.[A-Za-z]*$/.exec(path.basename(filePath))
    const fileName = fileNameReult && fileNameReult[1] || ''
    const entryFilePath = path.join(dir, '.jsrunner-entry', `${hash}${fileName}.js`)

    fsExtra.outputFileSync(
        entryFilePath,
        _.template(CONFIG.JS_TEMPLATE)({
            content: `
                ${content}
                if (module.hot) {
                    module.hot.accept();
                }
            `
        })
    )

    return entryFilePath
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
            const entry = generateEntryFile(dir, filePath)
            const moduleName = resolveModuleName(filePath)
            webpackConfigger.addEntry(moduleName, entry)
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

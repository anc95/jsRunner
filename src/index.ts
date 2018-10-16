/**
 * @author anchao01
 * @description 入口函数
 * @date 2018年9月23日
 */

import {
    Option,
    RunJs
} from './interfaces'
import {
    Express
} from 'express'
import {
    staticRoute,
    jsFileRoute,
    bundleFileRoute
} from './routes/index'
import express from 'express'
import serverIndex from 'serve-index'
import { Server } from 'http'
import resolveOption from './core/resolveOption'
import WebpackConfiggerImpl from './core/webpackConfiggerImpl'
import EntryImpl from './core/entryImpl'
import {info} from './core/log'

export default class RunJsImp implements RunJs {
    private app: Express
    private server: Server

    constructor(private option: Option) {}

    private ensureEntry() {
        const entryHandler = new EntryImpl(this.app.locals.option.dir, '.jsrunner-entry', this.app.locals.option)
        entryHandler.ensureEntryDir()

        return entryHandler
    }

    public start() {
        this.app = express()
        this.app.locals.option = resolveOption(this.option)
        this.app.locals.webpackConfigger = new WebpackConfiggerImpl(this.option)
        this.app.locals.entryHandler = this.ensureEntry()
        this.app.use('/', jsFileRoute)
        this.app.use(express.static(this.app.locals.option.dir), serverIndex(this.app.locals.option.dir, {icons: true}))
        this.server = this.app.listen(this.option.port || 8888, () => {
            info(`server listening on http://localhost:${this.option.port || 8888}`)
        })
    }

    public stop() {
        this.server.close()
    }
}
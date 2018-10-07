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

export default class RunJsImp implements RunJs {
    private app: Express
    private server: Server

    constructor(private option: Option) {}

    private assignToLocals() {

    }

    public start() {
        this.app = express()
        this.app.locals.option = resolveOption(this.option)
        this.app.locals.webpackConfigger = new WebpackConfiggerImpl(this.option)
        this.app.use('/', jsFileRoute)
        this.app.use(express.static(this.app.locals.option.dir), serverIndex(this.app.locals.option.dir, {icons: true}))
        this.server = this.app.listen(this.option.port || 8888)
    }

    public stop() {
        this.server.close()
    }
}
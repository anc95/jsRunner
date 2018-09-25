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
import { Server } from 'http'
import resolveOption from './core/resolveOption'

export default class RunJsImp implements RunJs {
    private app: Express
    private server: Server

    constructor(private option: Option) {}

    start() {
        this.app = express()
        this.app.locals.option = resolveOption(this.option)
        this.app.use('/_bundle', bundleFileRoute)
        this.app.use('/', jsFileRoute)
        this.server = this.app.listen(this.option.port || 8888)
    }

    stop() {
        this.server.close()
    }
}
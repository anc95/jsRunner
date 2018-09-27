/**
 * @author anchao01
 * @description 使用webpack打包js
 * @date 2018年9月23日
 */
import webpack,
{
    Configuration
} from 'webpack'
import {
    Application
} from 'express'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

export default function bundleJs<Callback>(webpackOptions: Configuration, app: Application, callback: any) {
    const compile = webpack(<Configuration>webpackOptions)
    const instance = webpackDevMiddleware(compile)
    app.use(webpackDevMiddleware(compile))
    app.use(webpackHotMiddleware(compile, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000
    }))
    instance.waitUntilValid(() => {
        console.log(1)
        callback()
    });
}
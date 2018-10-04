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

<<<<<<< HEAD
function getFilePath(config: Configuration): string {
    const output = config.output || {}
    let {
        publicPath = "/",
        filename = "main.js"
    } = output

    return `${publicPath}${filename}`
}

export default function bundleJs(webpackOptions: Configuration, app: Application, callback: any) {
    const compiler = webpack(<Configuration>webpackOptions)

    app.use(webpackDevMiddleware(compiler, {
        logLevel: 'warn', publicPath: '/'
    }))

    app.use(webpackHotMiddleware(compiler, {
=======
export default function bundleJs<Callback>(webpackOptions: Configuration, app: Application, callback: any) {
    const compile = webpack(<Configuration>webpackOptions)
    const instance = webpackDevMiddleware(compile)
    app.use(webpackDevMiddleware(compile))
    app.use(webpackHotMiddleware(compile, {
>>>>>>> d5b073921ea5fd056e11875907865bab78026024
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000
    }))
<<<<<<< HEAD

    callback()
=======
    instance.waitUntilValid(() => {
        console.log(1)
        callback()
    });
>>>>>>> d5b073921ea5fd056e11875907865bab78026024
}
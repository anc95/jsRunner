/**
 * @author anchao01
 * @description 使用webpack打包js
 * @date 2018年9月23日
 */
import webpack,
{
    Compiler,
    Configuration
} from 'webpack'
import {
    Application
} from 'express'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import { Entry } from '../interfaces';

let hmrId = 0
function genHMRPath() {
    return `/__webpack_hmr_${hmrId++}`
}

export default function buildJs<T>(config: Configuration, app: Application,entry: T) {
    let currentHMRPath: string = ''

    function resolveConfig(config: Configuration, entry: any): Configuration {
        console.log(entry)
        for (let moduleName in entry) {
            console.log(moduleName)
            if (!Array.isArray(entry[moduleName])) {
                break
            }

            currentHMRPath = genHMRPath()
            // @ts-ignore
            config.entry[moduleName] = (<Array<string>>entry[moduleName]).map((item: string) => {
                // @ts-ignore
                if (item.startsWith('webpack-hot-middleware/client') && !item.includes('path=')) {
                    return `${item}?path=${currentHMRPath}`
                }

                return item
            })
        }

        return config
    }

    config = resolveConfig(config, entry)
    const compiler = webpack(config)

    app.use(webpackDevMiddleware(compiler, {
        logLevel: 'warn', publicPath: '/'
    }))

    app.use(webpackHotMiddleware(compiler, {
        log: console.log,
        path: currentHMRPath,
        heartbeat: 10 * 1000
    }))
}
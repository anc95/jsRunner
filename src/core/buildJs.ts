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
import {npmInstall} from './npmUtils'

let hmrId = 0
function genHMRPath() {
    return `/__webpack_hmr_${hmrId++}`
}

/**
 * analyse error message to install cant resolved module automatically
 * @param errorMsg {string}
 */
function analyseErrorMsg(errorMsg: string) {
    const result = /Error: Cannot find module '(.*)' from '(.*)'/.exec(errorMsg)
    if (result === null) {
        return false
    }

    const moduleName: string | null = result[1]
    const context: string | null = result[2]

    if (!moduleName || !context) {
        return false
    }

    return npmInstall({
        devDependencies: [moduleName],
        cwd: context
    })
}

export default function buildJs<T>(config: Configuration, app: Application,entry: T) {
    let currentHMRPath: string = ''

    function resolveConfig(config: Configuration, entry: any): Configuration {
        for (let moduleName in entry) {
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
        logLevel: 'warn',
        publicPath: <string>config!.output!.publicPath,
    }))

    app.use(webpackHotMiddleware(compiler, {
        log: console.log,
        path: currentHMRPath,
        heartbeat: 10 * 1000
    }))
}
/**
 * @author anchao01
 * @description 构成webpack的构建配置
 * @date 2018年9月25日
 */
import path from 'path'
import CONFIG from '../config'
import {Option, WebpackConfigger} from '../interfaces'
import webpack, {Configuration, RuleSetRule} from 'webpack'
import {npmInstall, InstallOption} from './npmUtils'
// import NpmInstallPlugin from 'npm-install-webpack-plugin'
// import InstallDepPlugin from './installDepPlugin'
import * as _ from 'lodash'

const webpackHotMiddleWarePath = path.resolve(CONFIG.PATH_NODE_MODULES, 'webpack-hot-middleware')

interface WebpackEntry {
    [property: string]: any
}

export default class WebpackConfiggerImpl implements WebpackConfigger {
    private config: Configuration

    constructor(
        private option: Option
    ) {
        this.config = this.resolveWebpackConfig(option)
    }

    private resolveModuleName(path: string): string {
        return encodeURIComponent(path)
    }

    private resolveWebpackConfig(option: Option): Configuration {
        const {
            dir,
            resolve = {},
            rules,
            plugins = [],
            loaders = []
        } = option

        _.set(resolve, 'alias', {
            'webpack-hot-middleware': webpackHotMiddleWarePath,
            'less': path.resolve(CONFIG.PATH_NODE_MODULES, 'less'),
            ..._.get(resolve, 'alias')
        })

        const config: Configuration =  {
            mode: 'development',
            entry: {},
            module: {
                rules: <Array<RuleSetRule>>rules
            },
            resolveLoader: {
                modules: [
                    CONFIG.PATH_NODE_MODULES
                ]
            },
            resolve,
            output: {
                path: path.resolve(dir as string, 'dist'),
                publicPath: '/',
                filename: '[name]'
            },
            plugins: [
                new webpack.HotModuleReplacementPlugin(),
                new webpack.NoEmitOnErrorsPlugin(),
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': '"development"',
                    '__PRODUCTION__': false,
                    '__DEVELOPMENT__': true,
                    '__DEVTOOLS__': true
                }),
            ].concat(plugins)
        }

        return config
    }

    public addEntry(moduleName: string, entryPath: string) {
        const entry = this.config.entry as WebpackEntry

        if (entry[moduleName]) {
            return entry[moduleName]
        }

        entry[moduleName] = [
            'webpack-hot-middleware/client',
            entryPath
        ]

        return entry[moduleName].slice()
    }

    public removeEntry(moduleName: string) {
        const entry = this.config.entry as WebpackEntry

        delete entry[this.resolveModuleName(moduleName)]
    }
}
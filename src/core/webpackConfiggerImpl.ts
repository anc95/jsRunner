/**
 * @author anchao01
 * @description 构成webpack的构建配置
 * @date 2018年9月25日
 */
import defaultLoaders from './rules'
import path from 'path'
import CONFIG from '../config'
import {Option, WebpackConfigger} from '../interfaces'
import webpack, {Configuration} from 'webpack'
import npmInstall, {InstallOption} from './npmInstall'

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
            loaders = []
        } = option

        const config: Configuration =  {
            mode: 'development',
            entry: {},
            module: {
                rules: defaultLoaders.concat(<[]>loaders)
            },
            resolveLoader: {
                modules: [
                    CONFIG.PATH_NODE_MODULES
                ]
            },
            resolve: {
                // modules: [
                //     path.resolve(<string>dir, '../../../', 'node_modules')
                // ],
                alias: {
                    // resolve the issue:
                    // Cannot resolve module 'ie' in node_modules/superagent-no-cache
                    // https://github.com/johntron/superagent-no-cache/issues/11
                    'ie': 'component-ie',
                    'webpack-hot-middleware': webpackHotMiddleWarePath,
                    'less': path.resolve(CONFIG.PATH_NODE_MODULES, 'less'),
                    'common': path.resolve(<string>dir, '../../src/frontend/', 'node_modules', 'common'),
                    'utils': path.resolve(<string>dir, '../../src/frontend/', 'node_modules', 'utils'),
                    '@befe': path.resolve(<string>dir, '../../src/frontend/', 'node_modules', '@befe')
                }
            },
            output: {
                path: path.resolve(dir as string, 'dist'),
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
            ]
        }

        return config
    }

    public addEntry(moduleName: string, entryPath: string) {
        const entry = this.config.entry as WebpackEntry

        if (entry[moduleName]) {
            return false
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
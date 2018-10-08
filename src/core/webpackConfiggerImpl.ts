/**
 * @author anchao01
 * @description 构成webpack的构建配置
 * @date 2018年9月25日
 */
import defaultLoaders from './loaders'
import path from 'path'
import {
    Option,
    WebpackConfigger
} from '../interfaces'
import webpack, {
    Configuration
} from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin'

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
            output: {
                path: path.resolve(dir as string, 'dist'),
                filename: '[name]'
            },
            plugins: [
                new webpack.HotModuleReplacementPlugin(),
                new webpack.NoEmitOnErrorsPlugin()
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
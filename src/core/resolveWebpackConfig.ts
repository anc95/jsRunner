/**
 * @author anchao01
 * @description 构成webpack的构建配置
 * @date 2018年9月25日
 */
import defaultLoaders from './loaders'
import path from 'path'
import {
    Option
} from '../interfaces'
import {
    Configuration
} from 'webpack';

export default function resolveWebpackConfig(option: Option, entry: string): Configuration {
    const {
        dir,
        loaders = []
    } = option

    const config: Configuration =  {
        mode: 'development',
        entry: [
            entry,
            'webpack-hot-middleware/client'
        ],
        module: {
            rules: defaultLoaders.concat(<[]>loaders)
        },
        output: {
            path: path.resolve(<string>dir, 'dist')
        }
    }

    return config
}
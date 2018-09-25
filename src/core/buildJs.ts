/**
 * @author anchao01
 * @description 使用webpack打包js
 * @date 2018年9月23日
 */
import webpack,
{
    Configuration
} from 'webpack'

export default function bundleJs<Callback>(webpackOptions: Configuration, callback: any) {
    webpack(<Configuration>webpackOptions).run(callback)
}
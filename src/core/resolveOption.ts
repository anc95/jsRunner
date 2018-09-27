/**
 * @author anchao01
 * @description resolve Option
 * @date 2018年9月24日
 */
import {
    Option
} from '../interfaces'

export default function resolveOption(option: Option): Option {
    const defaultOption = {
        dir: process.cwd(),
        plugins: [],
        loaders: [],
        port: 8888
    }

    for (let key of Object.keys(option)) {
        if (!option[key]) {
            option[key] = (<Option>defaultOption)[key]
        }
    }

    return option
}
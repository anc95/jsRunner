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
        port: []
    }

    for (let key of Object.keys(option)) {
        if (!option[key]) {
            option[key] = defaultOption[key]
        }
    }

    return option
}
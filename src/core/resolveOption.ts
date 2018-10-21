/**
 * @author anchao01
 * @description resolve Option
 * @date 2018年9月24日
 */
import {Option} from '../interfaces'
import path from 'path'
import {resolveRules} from './rules'

/**
 * resolve excutor
 * @param {string} excutor
 * @param {string} root base dir
 */
function resolveExcutor(excutor: string, root: string): string | undefined {
    // @ts-ignore
    const invalidExutorError = 'invalid excutor error'

    if (typeof excutor !== 'string') {
        console.warn(`param excutor expected to be string or function, but got ${excutor}`)
        return
    }

    // exutor a file path or a module name
    // @ts-ignore
    let excutorPath: string = excutor.startsWith('.') ? path.join(root, excutor) : excutor

    try {
        let isFunc = (typeof require(excutor) === 'function' || typeof require(excutor).default === 'function')

        if (!isFunc) {
            throw new Error(invalidExutorError)
        }
    }
    catch (e) {
        if (e === invalidExutorError) {
            console.warn(`${excutorPath} expcted to export a js function, but got error`)
        }

        console.warn(`${excutor} maybe cannot be found`)
    }

    return excutorPath
}

export default function resolveOption(option: Option): Option {
    const defaultOption: Option = {
        dir: process.cwd(),
        plugins: [],
        rules: [],
        port: 8888
    }

    for (let key of Object.keys(option)) {
        if (!option[key] && defaultOption[key]) {
            option[key] = defaultOption[key]
        }
    }

    option.dir = path.resolve(process.cwd(), <string>option.dir),
    option.rules = resolveRules(option.rules)
    option.excutor = option.excutor ? resolveExcutor(<string>option.excutor, <string>option.dir) : ''

    return option
}
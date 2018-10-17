/**
 * simple log
 */
import chalk from 'chalk'

export function info(...args: string[]) {
    console.log(
        chalk.green(
            '[info]',
            args.join(' ')
        )
    )
}

export function warn(...args: string[]) {
    console.warn(
        chalk.yellow(
            '[warning]',
            args.join(' ')
        )
    )
}
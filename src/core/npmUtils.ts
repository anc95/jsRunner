/**
 * @author anchao01
 * @description npm install
 * @date Oct 13, 2018
 */
import path from 'path'
import fs from 'fs-extra'
import {spawnSync} from 'child_process'
import {info} from './log'

export interface InstallOption {
    // the dev dependencies to download
    devDependencies?: string | string[]
    // the dev dependencies to download
    dependencies?: string | string[]
    // default to be 'npm', can choose 'cnpm' and so on
    npmScript?: string,
    // default to be process.cwd()
    cwd?: string,
    // if global install, default to be false
    globalPackages?: string | string[]
}

/**
 * if param is array, join it with space
 * @param stringOrArray
 */
function ensureString(stringOrArray: string | string[]) {
    if (Array.isArray(stringOrArray)) {
        return stringOrArray.join(' ')
    }

    return stringOrArray
}

function ensurePackageJsonFile(root: string) {
    const packageJsonFilePath = path.resolve(root, 'package.json')

    if (fs.existsSync(packageJsonFilePath)) {
        return
    }

    return spawnSync('npm init -y')
}

function execInstall(scriptString: string, cwd: string) {
    const args = scriptString.split(' ')
    return spawnSync(<string>args.shift(), args, {cwd, stdio: 'inherit'})
}

function npmInstall(installOption: InstallOption) {
    let {
        devDependencies = [],
        dependencies = [],
        globalPackages = [],
        npmScript = 'npm',
        cwd = process.cwd(),
    } = installOption

    devDependencies = ensureString(devDependencies)
    dependencies = ensureString(dependencies)
    globalPackages = ensureString(globalPackages)

    ensurePackageJsonFile(cwd)

    info('npm installing')

    if (devDependencies) {
        execInstall(`${npmScript} install ${devDependencies} -D`, cwd)
    }

    if (dependencies) {
        execInstall(`${npmScript} install ${devDependencies} --save`, cwd)
    }

    if (globalPackages) {
        try {
            execInstall(`${npmScript} install ${devDependencies} -g`, cwd)
        }
        catch {
            execInstall(`sudo ${npmScript} install ${devDependencies} -g`, cwd)
        }
    }

    info('npm end')
}

/**
 * check if the specified package is installed in current dir
 * @param packageName
 * @param cwd
 */
function hasInstalled(packageName: string, cwd: string) {
    const packagePath = path.resolve(cwd, 'node_modules', packageName)

    return fs.statSync(packagePath).isDirectory()
}

export {
    hasInstalled,
    npmInstall
}
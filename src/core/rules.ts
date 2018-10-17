/**
 * @author anchao01
 * @description loaders
 * @date Sep 26, 2018
 */
import {Rule, RuleSetUseItem, RuleSetLoader} from 'webpack'
import {hasInstalled} from './npmUtils'
import fs from 'fs-extra';

export const jsRule: Rule = {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: [
        {
            loader: "babel-loader",
            options: {
                presets: [
                    '@babel/env',
                    '@babel/react'
                ]
            }
        }
    ]
}


export function resolveRules(rules: any): Rule[] {
    if (!rules || rules.length === 0) {
        return [jsRule]
    }

    function hasMatched(pathName: string): boolean {
        return rules.some((rule:Rule) => {
            if (rule.test instanceof RegExp) {
                return rule.test.test(pathName)
            }
        })
    }

    const matchedJs = hasMatched('a.js')
    const matchedJsx = hasMatched('a.jsx')

    matchedJs || matchedJsx || rules.concat(jsRule)

    return rules
}

/**
 * get whole loader packgae name
 * @example 'less' => 'less-loader'
 * @param loader loader config
 */
function resolveLoaderPackageName(loader: any): string {
    if (typeof loader === 'function') {
        return ''
    }

    if (typeof loader === 'object' && loader.loader) {
        if (typeof loader.loader !== 'string') {
            return ''
        }

        loader = loader.loader
    }

    try {
        // loader was transformed to absolute path
        fs.accessSync(loader)
        return ''
    }
    catch {
        // has query
        if (loader.includes('?')) {
            loader = loader.substring(0, loader.indexOf('?'))
        }

        // ensure has '-loader' suffix
        if (loader.indexOf('-loader') === -1) {
            if (loader.indexOf('/') > -1) {
                loader = loader.substring(0, loader.indexOf('/')) + '-loader'
            }

            loader += '-loader'
        }
        else {
            loader = loader.substring(0, loader.indexOf('-loader') + '-.loader'.length - 1)
        }

        return loader
    }
}

function resolvePresetsAndPluginsPackageName(babelConfig: any): string[] {
    const packageSet = new Set()

    function addPresetOrPlugin(presetOrPlugin: string, key: string) {
        if (typeof presetOrPlugin !== 'string') {
            return
        }

        if (presetOrPlugin.includes(`${key}-`)) {
            return packageSet.add(presetOrPlugin)
        }

        // example: '@babel/env' => '@babel/preset-env'
        if (presetOrPlugin.includes('@babel')) {
            presetOrPlugin = `@babel/${key}-${presetOrPlugin.substring(7)}`
        }
        // example: 'env' => 'babel-preset-env'
        else {
            presetOrPlugin = `babel-${key}-${presetOrPlugin}`
        }

        packageSet.add(presetOrPlugin)
    }

    ['presets', 'plugins'].forEach(key => {
        if (babelConfig[key] && Array.isArray(babelConfig[key])) {
            babelConfig[key].forEach((presetOrPlugin: string | Array<any>) => {
                if (Array.isArray(presetOrPlugin)) {
                    presetOrPlugin = presetOrPlugin[0]
                }

                addPresetOrPlugin(<string>presetOrPlugin, key.substring(-1, key.length - 1))
            })
        }
    })

    return Array.from(packageSet)
}

/**
 * get all loaders, plugins, presets packageName from rules cofnig
 * @param rules rules config
 */
export function getNeedInstallPackages(rules: Rule[]) {
    const loaderSet = new Set()

    function addDep(loader: RuleSetUseItem) {
        const resolvedLoaderName = resolveLoaderPackageName(loader)
        resolvedLoaderName && loaderSet.add(resolvedLoaderName)

        if (
            resolvedLoaderName === 'babel-loader'
            && typeof loader === 'object'
            && (<RuleSetLoader>loader).options
        ) {
            resolvePresetsAndPluginsPackageName((<RuleSetLoader>loader).options).forEach(dep => loaderSet.add(dep))
        }
    }

    rules.forEach(rule => {
        if (rule.loader) {
            addDep(<string>rule.loader)
        }
        else if (rule.use && Array.isArray(rule.use)) {
            rule.use.forEach(loader => addDep(loader))
        }
    })

    return Array.from(loaderSet)
}
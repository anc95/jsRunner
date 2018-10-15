/**
 * @author anchao01
 * @description loaders
 * @date Sep 26, 2018
 */
import {Rule} from 'webpack'

const jsRule: Rule[] = [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
            {
                loader: "babel-loader",
                options: {
                    presets: [
                        '@babel/env'
                    ]
                }
            }
        ]
    }
]

const jsxRule: Rule[] = [
    {
        test: /\.jsx$/,
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
]

export function resolveRules(rules: any): Rule[] {
    if (!rules) {
        return (<Rule[]>[]).concat(jsxRule, jsRule)
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

    matchedJs || rules.push(jsRule)
    matchedJsx || rules.push(jsxRule)

    return rules
}

/**
 * get whole loader packgae name
 * @example 'less' => 'less-loader'
 * @param loader loader config
 */
function resolveLoaderPackageName(loader: any): string {
    if (Array.isArray(loader)) {
        if (typeof loader[0] !== 'string') {
            return ''
        }

        loader === loader[0]
    }

    // has query
    if (loader.includes('?')) {
        loader = loader.substr(0, loader.indexOf('?'))
    }

    // ensure has '-loader' suffix
    if (loader.indexOf('loader') === -1) {
        loader += '-loader'
    }

    return loader
}

function resolvePresetsAndPluginsPackageName() {

}

export function getNeedInstallPackages(rules: Rule[]) {
    // rules.map
}
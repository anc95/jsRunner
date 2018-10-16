import {
    getNeedInstallPackages,
    resolveRules,
    jsRule,
    jsxRule
} from '../core/rules'
import {Rule} from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

describe('rules config parser', () => {
    describe('resolve rules', () => {
        it('should contains default jsx and js loader', () => {
            expect(resolveRules([])).toEqual([jsRule, jsxRule])
        })

        it('should contains default jsx loader', () => {
            const rules: Rule[] = [
                {
                    test: /\.js$/
                }
            ]
            const result = rules.slice().concat(jsxRule)
            expect(resolveRules(rules)).toEqual(result)
        })
    })

    describe('parse the rules dependencies', () => {
        it.only('shoule parse correact', () => {
            const rules: Rule[] = [
                {
                    test: /\.less$/,
                    exclude: [
                        /\.mod\.less/,
                        /\.use(able)?\.less$/
                    ],
                    use: ExtractTextPlugin.extract({
                        use: [
                            { loader: 'css-loader', options: { minimize: true } },
                            { loader: 'less-loader' }
                        ],
                        fallback: 'style-loader'
                    })
                },
                {
                    test: /\.use(able)?\.less$/,
                    use: [
                        { loader: 'style-loader/useable' },
                        { loader: 'css-loader', options: { minimize: true } },
                        { loader: 'less-loader' }
                    ]
                },
                {
                    test: /\.jsx?$/,
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                'env',
                                ['babel-preset-react']
                            ],
                            plugins: [
                                'aa',
                                'babel-plugin-c',
                                require('webpack')
                            ]
                        }
                    }]
                },
            ]

            expect(getNeedInstallPackages(rules)).toEqual(
                expect.arrayContaining(
                    [
                        'css-loader', 'less-loader', 'style-loader',
                        'babel-loader',
                        'babel-preset-env', 'babel-preset-react',
                        'babel-plugin-aa', 'babel-plugin-c'
                    ]
                )
            )
        })
    })
 })
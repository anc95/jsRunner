import {
    getNeedInstallPackages,
    resolveRules,
    jsRule
} from '../core/rules'
import {Rule} from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

describe('rules config parser', () => {
    describe('resolve rules', () => {
        it('should contains default jsx and js loader', () => {
            expect(resolveRules([])).toEqual([jsRule])
        })

        it('should overwrite default jsx loader', () => {
            const rules: Rule[] = [
                {
                    test: /\.js$/
                }
            ]
            const result = rules.slice().concat(jsRule)
            // @ts-ignore
            expect(resolveRules(rules)).toEqual(expect.not.arrayContaining(result))
        })
    })

    describe('parse the rules dependencies', () => {
        it('shoule parse correact', () => {
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
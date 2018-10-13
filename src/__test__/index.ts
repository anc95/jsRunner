import { resolve } from "url";

const RunJs = require('../index').default
const path = require('path')

const option = {
    dir: '/Users/anchao01/code/baidu/erp/fe-cms/src/frontend/',
    excutor: path.join(__dirname, 'demo/excutor'),
    loaders: [
        {
            test: /\.jsx?$/,
            // exclude: /node_modules/,
            include: [
                '/Users/anchao01/code/baidu/erp/fe-cms/src'
            ],
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/env',
                        '@babel/preset-react'
                    ],
                    plugins: [
                        'transform-class-properties',
                        ['@babel/plugin-proposal-decorators', {decoratorsBeforeExport: true}],
                        // 'transform-async-to-generator',
                        [require("@babel/plugin-proposal-class-properties"), { "loose": false }],
                    ]
                }
            }
        },

        // .css, .mod.css, .useable.css
        {
            test: /\.css$/,
            exclude: [
                /\.mod\.css$/,
                /\.use(able)?\.css$/,
            ],
            use: [
                'style-loader',
                'css-loader?localIdentName=[path][name]__[local]___[hash:base64:5]',
            ],
        },

        {
            test: /\.use(able)?\.css$/,
            use: [
                'style-loader/useable',
                'css-loader?localIdentName=[path][name]__[local]___[hash:base64:5]',
            ]
        },

        // .less, .mod.less, .useable.less
        {
            test: /\.less$/,
            exclude: [
                /\.use(able)?\.less$/
            ],
            use: [
                'style-loader',
                'css-loader?localIdentName=[path][name]__[local]___[hash:base64:5]',
                'less-loader'
            ]
        },

        {
            test: /\.use(able)?\.less$/,
            use: [
                'style-loader/useable',
                'css-loader?localIdentName=[path][name]__[local]___[hash:base64:5]',
                'less-loader'
            ]
        },

        // 其他资源
        {
            test: /\.(jpeg|jpg|png|gif)$/,
            loader: 'url-loader?limit=25480'
        },
        {
            test: /\.html$/,
            loader: 'html-loader'
        },
        {
            test: /\.json$/, loader: 'json-loader'
        },
        {
            test: /\.woff(\?.+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        {
            test: /\.woff2(\?.+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        {
            test: /\.ttf(\?.+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
        },
        {
            test: /\.eot(\?.+)?$/, loader: 'file-loader'
        },
        {
            test: /\.svg(\?.+)?$/,
            loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
        },
        // {
        //     test: /\.svg(\?.+)?$/,
        //     use: [
        //         'svg-sprite-loader?' + JSON.stringify({
        //             name: '[name].[hash]',
        //             prefixize: true
        //         })
        //     ]
        // },
        {
            test: /\.tag$/,
            use: ['babel-loader']
        }
    ]
}

new RunJs(option).start()
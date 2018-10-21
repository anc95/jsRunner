import {Compiler, compilation} from 'webpack'
import webpack = require('webpack');

export default class InstallPlugin {
    apply(compiler: Compiler) {
        // console.log('xxxxxxxxxxxxxxx')
        // compiler.hooks.compilation.tap('InstallPlugin', compilation => {
        //     compilation.hooks.buildModule.tap('InstallPlugin', (module, error) => {

        //     })
        // })

        // compiler.hooks.done.tap('InstallPlugin', error => {
        //     // console.log(error)
        // })
        // console.log(compiler.resolverFactory)
        console.log()
        compiler.resolverFactory.hooks.resolver.for('loader').tap('InstallPlugin', resolver => {
            // console.log(resolver.hooks)
            resolver.hooks.module.tapAsync('InstallPlugin', (request, requestContext) => {
                console.log(request)
            })
        })

        // compiler..tap('InstallPlugin', (resolver) => {
        //     console.log(resolver.hooks)
        //     resolver.hooks.resolver.tap('resolve loader', (args) => {
        //         // console.log(params)
        //         console.log(args.toString())

        //     });
        // });
    }

}
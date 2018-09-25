import {
    Router
} from 'express'
import path from 'path'
import fs from 'fs'
import buildJs from '../core/buildJs'
import resolveWebpackConfig from '../core/resolveWebpackConfig'
import {
    Stats
} from 'webpack';

const jsFileRoute = Router()

jsFileRoute.get('*', function (req, res, next) {
    const option = req.app.locals.option
    const {
        dir
    } = req.app.locals.option

    const filePath = path.join(dir, req.path)

    fs.stat(filePath, (err, stat) => {
        if (err) {
            return next()
        }

        if (stat && stat.isFile()) {
            // const body  = fs.readFileSync(filePath)
            // buildJs(body)
            const config = resolveWebpackConfig(option, filePath)
            buildJs(config, (err:Error, stat: Stats) => {
                if (!err) {
                    res.type('html')
                    res.set('Content-Type', 'text/html');
                    console.log(fs.readFileSync(path.resolve(process.cwd(), 'dist/index.html'), 'utf-8'))
                    res.send(fs.readFileSync(path.resolve(process.cwd(), 'dist/index.html'), 'utf-8'))
                }
            })
        }
    })
})

export {
    jsFileRoute
}
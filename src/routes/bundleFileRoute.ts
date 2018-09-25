/**
 * @author anchao01
 * @description bundled js server
 * @date 2018年9月25日
 */
import {
    Router
} from 'express'
import path from 'path'

const bundleFileRoute = Router()

bundleFileRoute.get('/:file', function (req, res) {
    res.type('text/javascript')
    res.sendFile(path.resolve(process.cwd(), 'dist', req.params.file))
})

export {
    bundleFileRoute
}
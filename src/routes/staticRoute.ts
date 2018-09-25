import {
    Router
} from 'express'
import express from 'express'

const staticRoute = Router()

staticRoute.get('*', function (req, res) {
    const dir = req.app.locals.option.dir
    return express.static('dir')
})

export {
    staticRoute
}
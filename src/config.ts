/**
 * @author anchao01
 * @description config
 * @date Sep 27, 2018
 */
import path from 'path'
import fs from 'fs'

const CONFIG = {
    INDEX_TEMPLATE: fs.readFileSync(path.resolve(__dirname, '..', 'templates/index.html')).toString(),
    JS_TEMPLATE: fs.readFileSync(path.resolve(__dirname, '..', 'templates/entry.tpl')).toString(),
    PATH_NODE_MODULES: path.resolve(__dirname, '..', 'node_modules')
}

export default CONFIG
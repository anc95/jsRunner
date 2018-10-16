import JsRunner from '../../index'
import path from 'path'

const config = {
    dir: path.resolve(__dirname, '..')
}

new JsRunner(config).start()
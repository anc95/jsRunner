const RunJs = require('../index').default
const path = require('path')

const option = {
    dir: path.resolve(__dirname, 'demo')
}

new RunJs(option).start()
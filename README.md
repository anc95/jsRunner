# jsRunner
a server to excute js code

![img](https://api.travis-ci.org/anc95/jsRunner.svg?branch=master)
[![codecov](https://codecov.io/gh/anc95/jsRunner/branch/master/graph/badge.svg)](https://codecov.io/gh/anc95/jsRunner)
![gif](./static/isrunner-demo.gif)

## install
``` javascript
// global
npm i js-runner -g
// local
npm i js-runner -g
```

## feature
- use webpack@4 to bundle code
- read rules config and install dependencies automatically
- hot load

## option
``` typescript
export interface Option {
    dir?: string
    // webpack plugin
    plugins?: any[],
    // webpack module
    rules?: any[],
    // webpack resolve
    resolve?: any,
    port?: number,
    // excutor function
    excutor?: string
    [propName: string]: any
}
```
## example
### code
``` javascript
import JsRunner from 'js-runner'

new JsRunner({
    port: '6666'
}).start()
```

### cli usage
```bash
$ js-runner -h
Usage: js-runner [options]


  Options:

    -V, --version   output the version number
    -r, --root <n>  root directory, default: process.cwd()
    -p, --port <n>  listening port
    -c, --config    js.runner.config.js file
    -h, --help      output usage information
```

```bash
$ code ./folder
$ js-runner
```
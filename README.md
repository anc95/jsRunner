# jsRunner
a server to excute js code

## install
``` javascript
// global
npm i js-runner -g
// local
npm i js-runner -g
```

## usage
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

### cli usssage
```
Usage: js-runner [options]


  Options:

    -V, --version   output the version number
    -r, --root <n>  root directory, default: process.cwd()
    -p, --port <n>  listening port
    -c, --config    js.runner.config.js file
    -h, --help      output usage information
```

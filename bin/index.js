#!/usr/bin/env node
var program = require('commander');
var JsRunner = require('../build').default
var path = require('path')

program
  .version('0.1.0')
  .option('-r, --root <n>', 'root directory, default: process.cwd()')
  .option('-p, --port <n>', 'listening port')
  .option('-c, --config', 'js.runner.config.js file')
  .parse(process.argv);

var option = {
    dir: program.root,
    port: program.port,
    // config: path.resolve(process.cwd(), root)
}

new JsRunner(option).start()
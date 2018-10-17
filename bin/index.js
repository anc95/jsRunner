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
    dir: path.resolve(process.cwd(), program.root),
    port: program.port,
}

console.log(option)

new JsRunner(option).start()
#!/usr/bin/env node
const yargs = require('yargs')
const argv = yargs
    .usage('Usage: $0 <command> [options]')
    .command('config', 'set config')
    .command('dice', 'play eosbet dice in terminal')
    .example('$0 config')
    .example('$0 dice')
    .help('h')
    .alias('h', 'help')
    .argv;

const [ command ] = argv._

if (!command) {
  return yargs.showHelp()
}

switch (command) {
  case 'config':
    require('./commands/config')
    break
  case 'dice':
    require('./commands/dice')
    break
  default:
    throw new Error('unknown command')
}

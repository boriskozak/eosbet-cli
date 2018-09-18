const inquirer = require('inquirer')
const signale = require('signale')
const chalk = require('chalk')
const config = require('../store/config')
const getDatabase = require('../store/database')
const monitor = require('../services/monitor')
const Dice = require('../services/dice')
const Token = require('../services/token')

const MINIMUM_NUMBER = 2
const MAXIMUM_NUMBER = 96
const MINIMUM_AMOUNT = 0.1

const toNumber = (v) => +v
const isWin = (bet) => bet.number > bet.roll

function ensureConfig () {
  const REQUIRED_FIELDS = [
    'account.name',
    'account.authority',
    'account.private_key',
    'eos.chainId',
    'eos.httpEndpoint',
    'eosbet.contract',
    'eosbet.referrer'
  ]

  const missing = REQUIRED_FIELDS.find((field) => !config.get(field))
  if (missing) {
    throw new Error(`"${missing}" cannot be found, please use command "eosbet config" to set first.`)
  }
}

;(async () => {
  ensureConfig()

  const bettor = config.get('account.name')

  const database = await getDatabase()
  signale.success('Database ready')

  monitor.on('connected', () => signale.success('Monitor connected'))
  monitor.on('disconnect', () => signale.error('Monitor disconnect'))
  monitor.on(`roll:${bettor}`, async (data) => {
    signale.note(chalk.gray(JSON.stringify(data, null, 2)))
    await database.get('rolls').push(data).write()
  })
  monitor.connect()

  await new Promise((resolve) => {
    monitor.once('connected', () => resolve())
  })

  while (true) {
    try {
      signale.start('Ready for a new game:')
      let { number, amount, confirm } = await inquirer.prompt([
        {
          type: 'input',
          name: 'number',
          message: 'Your lucky number',
          default: 96,
          filter: toNumber,
          validate: (v) => v >= MINIMUM_NUMBER && v <= MAXIMUM_NUMBER,
        },
        {
          type: 'input',
          name: 'amount',
          message: 'Bet amount',
          default: 0.1,
          filter: toNumber,
          validate: (v) => v >= MINIMUM_AMOUNT,
        },
        {
          type: 'confirm',
          name: 'confirm',
          message: 'You sure? Let\'s make a bet!',
        },
      ])


      if (!confirm) {
        signale.pause('Restart')
        continue
      }

      signale.await('Connecting eosio.token')
      let token = await Token.contract()

      signale.await('Sending transfer')
      let result = await Dice.roll(token, number, amount)

      signale.await('Transaction finished.')
      signale.note(chalk.gray(JSON.stringify(result, null, 2)))

      signale.await('Waiting for result from eosbet')

      await new Promise((resolve) => {
        monitor.once(`roll:${bettor}`, (data) => {
          signale.success('Bet result: %s. You %s', data.roll, isWin(data) ? chalk.green('WIN') : chalk.red('LOSE'))
          resolve()
        })
      })
    } catch (error) {
      signale.error(error)
    }
  }
})()

const inquirer = require('inquirer')
const signale = require('signale')
const chalk = require('chalk')
const config = require('../store/config')

;(async () => {
  try {
    signale.note('Config path', config.path)
    signale.note('Current config', chalk.gray(JSON.stringify(config.get(), null, 2)))

    let { section } = await inquirer.prompt([
      {
        type: 'list',
        name: 'section',
        message: 'Select the config section',
        choices: Object.keys(config.get()),
      }
    ])

    let answers = await inquirer.prompt(
      Object.keys(config.get(section)).map((key) => ({
        type: 'input',
        name: key,
        default: config.get(`${section}.${key}`),
      }))
    )
    config.set(section, answers)

    signale.note('Config saved', chalk.gray(JSON.stringify(config.get(), null, 2)))
  } catch (error) {
    signale.error(error)
  }
})()

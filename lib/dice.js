const config = require('config')
const Eos = require('eosjs')

const eos = Eos({
  chainId: config.get('eos.chainId'),
  httpEndpoint: config.get('eos.httpEndpoint'),
  keyProvider: [config.get('account.private_key')],
  authorization: `${config.get('account.name')}@active`,
  expireInSeconds: 60,
  broadcast: true,
  verbose: false,
  sign: true,
})

const CONTRACT_NAME = 'eosbetdice11'

async function roll (number, value, ref = config.get('eosbet.referrer'), seed = config.get('eosbet.seed')) {
  let beter = config.get('account.name')
  let token = await eos.contract('eosio.token')
  let memo = `${number}-${ref}-${seed}`
  return await token.transfer(beter, CONTRACT_NAME, `${value.toFixed(4)} EOS`, memo)
}

;(async () => {
  const VALUE = 0.5
  const NUMBER = 96
  try {
    let result = await roll(NUMBER, VALUE)
    console.log('Result:', result)
  } catch (error) {
    console.error(error)
  }
})()
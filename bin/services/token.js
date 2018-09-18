const Eos = require('eosjs')
const config = require('../store/config')

const eos = Eos({
  chainId: config.get('eos.chainId'),
  httpEndpoint: config.get('eos.httpEndpoint'),
  keyProvider: [config.get('account.private_key')],
  authorization: `${config.get('account.name')}@${config.get('account.authority')}`,
  expireInSeconds: 60,
  broadcast: true,
  verbose: false,
  sign: true,
})

let token

exports.contract = async function contract () {
  if (token) {
    return token
  }
  token = await eos.contract('eosio.token')
  return token
}

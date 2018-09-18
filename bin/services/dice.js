const config = require('../store/config')

exports.roll = async function roll (token, number, amount) {
  let contract = config.get('eosbet.contract')
  let bettor = config.get('account.name')
  let ref = config.get('eosbet.referrer')
  let seed = config.get('eosbet.seed')
  let memo = `${number}-${ref}-${seed}`
  let value = `${amount.toFixed(4)} EOS`
  return await token.transfer(bettor, contract, value, memo)
}

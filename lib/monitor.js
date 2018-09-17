const config = require('config')
const Client = require('socket.io-client')
const socket = Client('https://ds.eosbet.io/dice')

let bets = []

function isWin (bet) {
  return bet.number > bet.roll
}

socket.on('connect', () => console.log('connected'))
socket.on('disconnect', () => console.log('disconnect'))
socket.on('DiceMessage', (type, data) => {
  if (type === 'NEW_RESOLVED_BET' && data && data.bettor === config.get('account.name')) {
    bets.push(data)
    console.log(data)
    console.log('Result: ', isWin(data) ? 'WIN' : 'LOSE')
  }
})

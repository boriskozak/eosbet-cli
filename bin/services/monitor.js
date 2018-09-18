const Client = require('socket.io-client')
const EventEmitter = require('eventemitter3')

const monitor = new EventEmitter()

monitor.connect = function () {
  const socket = Client('https://ds.eosbet.io/dice')
  socket.on('connect', () => monitor.emit('connected'))
  socket.on('disconnect', () => monitor.emit('disconnect'))
  socket.on('DiceMessage', (type, data) => {
    monitor.emit('message', type, data)
    if (type === 'NEW_RESOLVED_BET') {
      monitor.emit('roll', data)
      monitor.emit(`roll:${data.bettor}`, data)
    }
  })
}

module.exports = monitor

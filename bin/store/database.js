const { resolve } = require('path')
const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')

const DATABASE_PATH = resolve(__dirname, '../../.database.json')
const DEFAULT_STRUCT = {
  rolls: [],
}

const adapter = new FileAsync(DATABASE_PATH)

let isReady = false
let instance

module.exports = async function getDatabase () {
  if (isReady) {
    return instance
  }
  instance = await low(adapter)
  await instance.defaults(DEFAULT_STRUCT).write()
  isReady = true
  return instance
}

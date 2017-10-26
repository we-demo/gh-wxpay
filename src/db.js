let FileSync = require('lowdb/adapters/FileSync')
let low = require('lowdb')

let dbFile = __dirname + '/../db.json'
let adapter = new FileSync(dbFile)
let db = low(adapter)

db.defaults({
  products: [],
  users: [],
  orders: []
})
.write()

exports.db = db

const mongoose = require('mongoose')

const Schema = mongoose.Schema
const UserSchema = new Schema({
  name:String,
  email:String,
  password:String,
  avatar:String,
})

let user = mongoose.model('Users', UserSchema)
module.exports = user
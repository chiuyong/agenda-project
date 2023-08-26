const mongoose = require('mongoose')

// Modelar os dados atraves do schema
const HomeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String
})

// Criar o model
const HomeModel = mongoose.model('Home', HomeSchema)
module.exports = HomeModel
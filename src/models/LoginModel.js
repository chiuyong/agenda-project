const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')


// Modelar os dados atraves do schema
const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
})

// Criar o model
const LoginModel = mongoose.model('Login', LoginSchema)

class Login {
  constructor(body) {
    this.body = body
    this.errors = []
    this.user = null
  }

  async register() {
    this.validate()
    if(this.errors.length > 0) return

    await this.userExists()

    if(this.errors.length > 0) return

    const salt = bcryptjs.genSaltSync()
    this.body.password = bcryptjs.hashSync(this.body.password, salt)

    try {
      this.user = await LoginModel.create(this.body)
    } catch (e) {
      console.log(e)
    }
    console.log(this.body)
  }

  async userExists() {
    const user = await LoginModel.findOne({ email: this.body.email })
    if(user) this.errors.push('Usuário já existe.')
  }

  validate() {
    this.cleanUp()
    // Check e-mail
    if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido')
    // Check password
    if(this.body.password.length < 8 || this.body.password.length > 50) this.errors.push('A senha precisa ter entre 8 e 50 caracteres.')
  }

  cleanUp() {
    // if not string, set to blank string
    for(const key in this.body) {
      if(typeof this.body[key] !== 'string') {
        this.body[key] = ''
      }
    }
    this.body = {
      email: this.body.email,
      password: this.body.password
    }

  }

}

module.exports = Login
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

  async signIn() {
    this.validate()
    if(this.errors.length > 0) return

    // check email
    this.user = await LoginModel.findOne({ email: this.body.email })

    if(!this.user) { 
      this.errors.push('User does not exist.')
      return
    }

    // check password
    if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push('Invalid password')
      this.user = null
      return
    }
  }

  async register() {
    this.validate()
    if(this.errors.length > 0) return

    await this.userExists()

    if(this.errors.length > 0) return

    const salt = bcryptjs.genSaltSync()
    this.body.password = bcryptjs.hashSync(this.body.password, salt)

    this.user = await LoginModel.create(this.body)
  }

  async userExists() {
    this.user = await LoginModel.findOne({ email: this.body.email })
    if(this.user) this.errors.push('User already exists.')
  }

  validate() {
    this.cleanUp()
    // Check e-mail
    if(!validator.isEmail(this.body.email)) this.errors.push('Invalid e-mail.')
    // Check password
    if(this.body.password.length < 8 || this.body.password.length > 50) this.errors.push('The password must be between 8 and 50 characters.')
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
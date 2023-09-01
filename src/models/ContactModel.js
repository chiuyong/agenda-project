const mongoose = require('mongoose')
const validator = require('validator')

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  phone: { type: String, required: false, default: '' },
  createdAt: { type: String, default: Date.now },
})

const ContactModel = mongoose.model('Contact', ContactSchema)

// Constructor function
function Contact(body) {
  this.body = body
  this.errors = []
  this.contact = null
}

Contact.prototype.register = async function() {
  this.validate()
  if(this.errors.length > 0) return

  // await this.contactExists()

  if(this.errors.length > 0) return

  this.contact = await ContactModel.create(this.body)
}

Contact.prototype.validate = function() {
  this.cleanUp()
  // Check e-mail
  if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Invalid e-mail.')
  if(!this.body.name) this.errors.push('Name is required.')
  if(!this.body.email && !this.body.phone) this.errors.push('E-mail or phone is required.')
}

Contact.prototype.cleanUp = function() {
  // if not string, set to blank string
  for(const key in this.body) {
    if(typeof this.body[key] !== 'string') {
      this.body[key] = ''
    }
  }
  this.body = {
    name: this.body.name,
    surname: this.body.surname,
    email: this.body.email,
    phone: this.body.phone
  }
}

Contact.prototype.contactExists = async function() {
  this.contact = await ContactModel.findOne({ email: this.body.email })
  if(this.contact) this.errors.push('Contact already exists.')
}

Contact.prototype.edit = async function(id) {
  if(typeof id !== 'string') return
  this.validate()
  if(this.errors.length > 0) return
  this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true })
}

// Static methods -> do not have this keyword
Contact.searchById = async function(id) {
  if(typeof id !== 'string') return
  const contact = await ContactModel.findById(id)
  return contact
}

Contact.fetchContacts = async function() {
  const contacts = await ContactModel.find().sort({ createdAt: -1 }) // 1 for ascending -1 for descending
  return contacts
}

Contact.delete = async function(id) {
  if(typeof id !== 'string') return
  const contact = await ContactModel.findOneAndDelete({ _id: id})
  return contact
}

module.exports = Contact
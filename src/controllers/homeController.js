const Contact = require('../models/ContactModel')

exports.index = async (req, res) => {
  const contacts = await Contact.fetchContacts()
  return res.render('index', { contacts });
}

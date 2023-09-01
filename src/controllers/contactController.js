const Contact = require('../models/ContactModel')

exports.index = (req, res) => {
  return res.render('contact', 
  { 
    contact: {
      _id: '',
      name: '',
      surname: '',
      email: '',
      phone: ''
    } 
  })
}

exports.register = async (req, res) => {
  try {
    const contact = new Contact(req.body)
    await contact.register()

    if(contact.errors.length > 0) {
      req.flash('errors', contact.errors)
      req.session.save(() => res.redirect('/contacts'))
      return
    }
    req.flash('successes', 'Contact created successfully.')
    req.session.save(() => res.redirect(`/contacts/${contact.contact._id}`))
    return
  } catch (e) {
    return res.render('404')
  }
}

exports.contactDetails = async (req, res) => {
  try {
    if(!req.params.id) return res.render('404')

    const contact = await Contact.searchById(req.params.id)
    if(!contact) return res.render('404')
    res.render('contact', { contact })
  } catch (e) {
    return res.render('404')
  }
}

exports.edit = async(req, res) => {
  try {
    if(!req.params.id) return res.render('404')

    const contact = new Contact(req.body)
    await contact.edit(req.params.id)

    if(contact.errors.length > 0) {
      req.flash('errors', contact.errors)
      req.session.save(() => res.redirect(`/contacts/${req.params.id}`))
      return
    }
    req.flash('successes', 'Contact updated successfully.')
    req.session.save(() => res.redirect(`/contacts/${contact.contact._id}`))
    return

  } catch (e) {
    return res.render('404')
  }
}

exports.delete = async(req, res) => {
  try {
    if(!req.params.id) return res.render('404')

    const contact = await Contact.delete(req.params.id)
    if(!contact) return res.render('404')

    req.flash('successes', 'Contact deleted successfully.')
    req.session.save(() => res.redirect(`/`))
    return
  } catch (e) {
    return res.render('404')
  }
}

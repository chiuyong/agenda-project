const Contact = require('../models/ContactModel')

exports.index = (req, res) => {
  return res.render('contact')
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
    console.log(e)
    return res.render('404')
  }
}

// exports.signin = async (req, res) => {
//   try {
//     const login = new Login(req.body)
//     await login.signin()

//     if(login.errors.length > 0) {
//       req.flash('errors', login.errors)
//       req.session.save(() => {
//         return res.redirect('/login')
//       })
//       return
//     }

//     req.flash('successes', 'You logged in successfully.')
//     req.session.user = login.user
//     req.session.save(() => {
//       return res.redirect('/login')
//     })
//   } catch (e) {
//     console.log(e)
//     return res.render('404')
//   }
// }

// exports.logout = (req, res) => {
//   req.session.destroy()
//   res.redirect('/login')
// }
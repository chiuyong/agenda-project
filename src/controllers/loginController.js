const Login = require('../models/LoginModel')

exports.index = (req, res) => {
  if(req.session.user) return res.render('index')
  return res.render('login')
}

exports.register = async (req, res) => {
  try {
    const login = new Login(req.body)
    await login.register()

    if(login.errors.length > 0) {
      req.flash('errors', login.errors)
      req.session.save(() => {
        return res.redirect('/login')
      })
      return
    }
    req.flash('successes', 'User created successfully.')
    req.session.save(() => {
      return res.redirect('/login')
    })
  } catch (e) {
    console.log(e)
    return res.render('404')
  }
}

exports.signIn = async (req, res) => {
  try {
    const login = new Login(req.body)
    await login.signIn()

    if(login.errors.length > 0) {
      req.flash('errors', login.errors)
      req.session.save(() => {
        return res.redirect('/login')
      })
      return
    }

    req.flash('successes', 'You logged in successfully.')
    req.session.user = login.user
    req.session.save(() => {
      return res.redirect('/login')
    })
  } catch (e) {
    console.log(e)
    return res.render('404')
  }
}

exports.logOut = (req, res) => {
  req.session.destroy()
  res.redirect('/login')
}
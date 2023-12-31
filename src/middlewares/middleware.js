exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash('errors')
  res.locals.successes = req.flash('successes')
  res.locals.user = req.session.user
  next();
}

exports.otherMiddleware = (req, res, next ) => {
  next()
}

exports.checkCsrfError = (err, req, res, next) => {
  if (err) res.render('404')
  next()
}

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
}

exports.loginRequired = (req, res, next) => {
  if(!req.session.user) {
    req.flash('errors', 'You must be logged in.')
    req.session.save(() => res.redirect('/'))
    return
  }
  next();
}
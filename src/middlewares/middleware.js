exports.middlewareGlobal = (req, res, next) => {
  res.locals.localVariable = 'Local variable value' //inject globally into views
  next();
}

exports.otherMiddleware = (req, res, next ) => {
  next()
}

exports.checkCsrfError = (err, req, res, next) => {
  if (err && err.code === 'EBADCSRFTOKEN') res.render('404')
}

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
}
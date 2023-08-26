exports.paginaInicial = (req, res) => {
  res.render('index', {
    // title: 'Title example',
    numbers: [0, 1, 2, 3]
  });
  return;
}

exports.trataPost = (req, res) => {
  console.log(req.body)
  res.send(`O que você me enviou foi: ${req.body.nome}`);
  return;

}
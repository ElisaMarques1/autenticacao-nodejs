function renderizarLogin(req, res) {
    return res.render('login');
}

function autenticarUsuario(req, res) {
   const { email, senha } = req.body;

   console.log(email, senha)

   if (email === "admin@admin.com" && senha === "admin") {

    //salvar a sessão do usuario
    req.session.usuario = {
        email: email
    }
    res.redirect('/dashboard');
   } else {
    console.log("Usuario ou senha inválidos")
   }
}

function deslogarUsuario(req, res) {
    req.session.destroy();
    res.redirect('/');
}

module.exports = {
    renderizarLogin,
    autenticarUsuario,
    deslogarUsuario
}
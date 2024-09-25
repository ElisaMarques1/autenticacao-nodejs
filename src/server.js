var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');

var enableHotReload = require("./hot-reload");
var loginController = require("./controllers/login");
var dashboardController = require("./controllers/dashboard");

var authMiddleware = require("./middlewares/authentication");

const session = require("express-session");

const app = express();

//Configuração do body parser
app.use(bodyParser.urlencoded({ extended: false }));


// Configurações do seu app Express
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

console.log("Views path set to:", path.join(__dirname, "views"));

// Configuração de pasta pública
app.use(express.static(path.join(__dirname, "public")));

//configuranção do espress-session
app.use(session({
  secret: 'elisa',
  resave: false, //Não salva a sessão a cada requisição
  saveUninitialized: false //Não salva sessão vazia
}))

// Habilitar hot-reload
enableHotReload(app);

// Rotas
app.get("/", loginController.renderizarLogin); 
app.post("/autenticar", loginController.autenticarUsuario);

app.get("/dashboard", authMiddleware.protegerRota, dashboardController.renderizarDashboard);
app.get("/logout", loginController.deslogarUsuario);

// Inicie o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
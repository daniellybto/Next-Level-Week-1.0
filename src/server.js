const express = require("express");
const server = express();

//configurar pasta pública - ou seja arquivos estáticos/públicos
server.use(express.static("public"));

//utilizando TEMPLATE ENGINE
const nunjucks = require("nunjucks");
  //configuração do Nunjucks 
  // vou configurar em qual pasta estão os HTML que eu vou utilizar
nunjucks.configure("src/views", {
  express: server, //ligação do nunjucks ao express
  noCache:true
})

//configurar caminhos da minha aplicação:
//configurando a página inicial
// 'req': Requisição
// 'res': Resposta
// ** CONFIGURANDO ROTAS DA APLICAÇÃO:::
// ** configurando a resposta para RENDERIZAR ('.render') minhas páginas através do NUNJUCKS
server.get("/", (req, res) => {
  return res.render("index.html")
});
server.get("/create-point", (req, res) => {
  return res.render("create-point.html")
});
server.get("/search", (req, res) => {
  return res.render("search-results.html")
});



//ligar o servidor
server.listen(3000);


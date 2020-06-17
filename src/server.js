const express = require("express");
const server = express();

//pegar o bancod e dados
const db = require("./database/db");

//configurar pasta pública - ou seja arquivos estáticos/públicos
server.use(express.static("public"));

//habilitar o uso do req.body na nossa aplicação - DADOS ENVIADOS VIA METHOD: 'POST'
server.use(express.urlencoded({ extended: true }))

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

  //req.query: Query String da nossa URL
  console.log(req.query)

  return res.render("create-point.html")
});

server.post("/savepoint", (req, res) => {
  //req.body: O Corpo do nosso formulário
  // console.log(req.body)

  //inserir dados no Banco de Dados


  // 2 - inserir dados na tabela
  const query = `
    INSERT INTO places (
      image,
      name,
      address,
      address2,
      state,
      city,
      items
    ) 
    VALUES (?,?,?,?,?,?,?);`

  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ]

  function afterInsertData(err){
    if(err){
      return console.log("Algo deu errado >>> " + err)
    }
    // console.log(this)
    return res.render("create-point.html", {saved: true})

  }
  
  db.run(query, values, afterInsertData)
})

server.get("/search", (req, res) => {

  const search = req.query.search

  if(search == ''){
    //pesquisa vazia
    return res.render("search-results.html", {total: 0})
  }

  //pegar dados do banco de dados:
  // 3 - consultar os dados na tabela
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
    if(err){
      console.log("Algo deu errado >>> " + err)
      return res.send("Algo deu errado ! ")
    }
    const total = rows.length

    //mostrar a página html com os dados do banco de dados
    return res.render("search-results.html", {places: rows, total: total})
  })
  
});



//ligar o servidor
server.listen(3000);


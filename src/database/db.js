//importar a dependência do sqlite3
//o método .verbose() configura o sqlite3 para que passe a sempre apresentar mensagens!, daí o método ficar 'verboso'
const sqlite3 = require("sqlite3").verbose()

// Criar o objeto que irá fazer operações no Banco de Dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

// utilizar o objeto de banco de dados para nossas operações
// db.serialize(() => {
  // // Com Comandos SQL, vou:
  // // 1 - criar uma tabela
  // db.run(`
  //   CREATE TABLE IF NOT EXISTS places(
  //     id INTEGER PRIMARY KEY AUTOINCREMENT,
  //     image TEXT,
  //     name TEXT,
  //     address TEXT,
  //     address2 TEXT,
  //     state TEXT,
  //     city TEXT,
  //     items TEXT
  //   );
  // `)

  // // 2 - inserir dados na tabela
  // const query = `
  //   INSERT INTO places (
  //     image,
  //     name,
  //     address,
  //     address2,
  //     state,
  //     city,
  //     items
  //   ) 
  //   VALUES (?,?,?,?,?,?,?);`

  // const values = [
  //   "https://images.unsplash.com/photo-1481761289552-381112059e05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=861&q=80",
  //   "Papersider",
  //   "Guilherme Gembala, Jardim América",
  //   "Número 260",
  //   "Santa Catarina",
  //   "Rio do Sul", 
  //   "Papéis e Papelão"
  // ]

  // function afterInsertData(err){
  //   if(err){
  //     return console.log("Algo deu errado >>> " + err)
  //   }
  //   console.log("CADASTRADO COM SUCESSO!!!")
  //   console.log(this)
  // }
  
  // db.run(query, values, afterInsertData)

  // // 3 - consultar os dados na tabela
  // db.all(`SELECT * FROM places`, function(err, rows){
  //   if(err){
  //     return console.log("Algo deu errado >>> " + err)
  //   }
  //   console.log("Aqui estão seus registros")
  //   console.log(rows)
  // })

  // // 4 - deletar um dado da tabela
  // db.run(`DELETE FROM places WHERE id = ?`, [4], function(err){
  //   if(err){
  //     return console.log(err)
  //   }
  //   console.log("Registro deletado com sucesso!")
  // })

// 
// })
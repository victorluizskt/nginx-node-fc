const express = require('express')
const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

app.get('/', (req, res) => {
  const sql = "INSERT INTO people(name) VALUES ('Victor Luiz')";

  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Erro ao inserir no banco:', error);
      return res.status(500).send('Erro no servidor');
    }
    res.send('<h1>Full Cycle</h1>');
  });
});

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})

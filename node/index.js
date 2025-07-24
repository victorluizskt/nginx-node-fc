const express = require('express');
const app = express();
const port = 3000;

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);

app.get('/', (req, res) => {
  const insertSql = "INSERT INTO people(name) VALUES ('Victor Luiz')";
  const selectSql = 'SELECT * FROM people';

  connection.query(insertSql, (insertErr) => {
    if (insertErr) {
      console.error('Erro ao inserir no banco:', insertErr);
      return res.status(500).send('Erro ao inserir no banco de dados');
    }

    connection.query(selectSql, (selectErr, results) => {
      if (selectErr) {
        console.error('Erro ao consultar o banco:', selectErr);
        return res.status(500).send('Erro ao consultar o banco de dados');
      }

      let html = '<h1>Full Cycle Rocks!</h1><ul>';
      results.forEach((row) => {
        html += `<li>${row.name}</li>`;
      });
      html += '</ul>';

      res.send(html);
    });
  });
});

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});

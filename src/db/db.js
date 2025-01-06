// Instalar a biblioteca pg para gerenciar conexões com o PostgreSQL
// npm install pg

const { Pool } = require("pg");

// Abaixo configuro a conexão com o Postgre
const pool = new Pool({
  user: "rangelgs",
  host: "localhost",
  database: "employee_prd",
  password: "201806",
  port: 5432,
});

// Função que abre e consulta no banco
const query = (text, params) => {
  return pool.query(text, params);
};

module.exports = {
  query,
};

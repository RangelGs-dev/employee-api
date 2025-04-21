// Instalar a biblioteca pg para gerenciar conexões com o PostgreSQL
// npm install pg

const { Pool } = require("pg");
require("dotenv").config();

console.log("DATABASE_URL:", process.env.DATABASE_URL);

// Abaixo configuro a conexão com o PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Função que abre e consulta no banco
const query = (text, params) => {
  return pool.query(text, params);
};

module.exports = {
  query,
};

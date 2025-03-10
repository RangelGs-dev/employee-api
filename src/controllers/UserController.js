const db = require("../db/db.js");

module.exports = {
  async listCardLinks(request, response) {
    const { order, page = 1, limit = 8 } = request.query;
    const offset = (page - 1) * limit;
    const orderDirection = order === "desc" ? "DESC" : "ASC";
    console.log(orderDirection);

    const value = [limit, offset];
    const query = `SELECT * FROM cartao_links ORDER BY id ${orderDirection} LIMIT $1 OFFSET $2`;

    try {
      const result = await db.query(query, value);
      // `SELECT * FROM cartao_links ORDER BY id ${orderDirection}`
      response.send(200, result.rows);
    } catch (error) {
      console.error(error);
      response.send(500, { error: "Falha ao buscar links." });
    }
  },
  async getCardLink(request, response) {
    const queryString = request.query.search;

    try {
      const result = await db.query(
        `SELECT * FROM cartao_links cl where cl.titulo ILIKE $1`,
        [`%${queryString}%`]
      );
      response.send(200, result.rows);
    } catch (error) {
      console.error(error);
      response.send(500, { error: "Falha ao buscar o aplicativo." });
    }
  },
  async addCardLink(request, response) {
    const { body } = request;

    try {
      const { title, iconPath, description, link } = body;

      const query =
        "INSERT INTO cartao_links(titulo, endereco_icone, descricao, endereco_aplicacao) VALUES($1, $2, $3, $4)";
      const values = [title, iconPath, description, link];

      await db.query(query, values);
      response.send(200, { message: "Dados inseridos com sucesso!" });
    } catch (error) {
      console.error(error);
      response.send(500, { error: "Falha ao buscar o aplicativo." });
    }
  },
  async addRelease(request, response) {
    const { body } = request;
    try {
      const { title, tag, editorContent } = body;

      const query =
        "INSERT INTO comunicados(titulo, descricao, tag) VALUES($1, $2, $3)";
      const values = [title, editorContent, tag];

      await db.query(query, values);
      response.send(200, { message: "Dados inseridos com sucesso!" });
    } catch (error) {
      console.error(error);
      response.send(500, { error: "Falha ao buscar o aplicativo." });
    }
  },
  async listReleases(request, response) {
    const { order } = request.query;
    const orderDirection = order === "desc" ? "DESC" : "ASC";

    try {
      const result = await db.query(
        `SELECT * FROM comunicados ORDER BY id ${orderDirection}`
      );
      response.send(200, result.rows);
    } catch (error) {
      console.error(error);
      response.send(500, { error: "Falha ao buscar releases." });
    }
  },
};

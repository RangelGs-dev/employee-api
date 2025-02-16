const db = require("../db/db.js");

// let users = require("../mocks/users");
module.exports = {
  async listCardLinks(request, response) {
    const { order, page = 1, limit = 6 } = request.query;
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
      response.send(500, { error: "Failed to fetch users" });
    }
  },
  async listCommunicates(request, response) {
    const { order } = request.query;
    const orderDirection = order === "desc" ? "DESC" : "ASC";

    try {
      const result = await db.query(
        `SELECT * FROM comunicados ORDER BY id ${orderDirection}`
      );
      response.send(200, result.rows);
    } catch (error) {
      console.error(error);
      response.send(500, { error: "Failed to fetch users" });
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
      response.send(500, { error: "Failed to fetch application." });
    }
  },
  async addCardLink(request, response) {
    const { body } = request;

    try {
      const { title, iconPath, description, link } = body;

      const query =
        "INSERT INTO cartao_links(titulo, endereco_icone, descricao, endereco_aplicacao) VALUES($1, $2, $3, $4)";
      const values = [title, iconPath, description, link];

      console.log(values === true);

      await db.query(query, values);
      response.send(200, { message: "Dados inseridos com sucesso!" });
    } catch (error) {
      console.error(error);
      response.send(500, { error: "Failed to fetch application." });
    }
  },
  // getUserById(request, response) {
  //   const { id } = request.params;
  //   const user = users.find((user) => user.id === Number(id));

  //   if (!user) {
  //     return response.send(400, { error: "User not found" });
  //   }

  //   response.send(200, user);
  // },
  // createUser(request, response) {
  //   const { body } = request;
  //   const lastUserId = users[users.length - 1].id;
  //   const newUser = {
  //     id: lastUserId + 1,
  //     name: body.name,
  //   };

  //   users.push(newUser);

  //   response.send(200, newUser);
  // },
  // updateUser(request, response) {
  //   let { id } = request.params;
  //   const { name } = request.body;

  //   id = Number(id);

  //   const usersExists = users.find((user) => user.id === id);
  //   if (!usersExists) {
  //     return response.send(400, { error: "USer not found" });
  //   }

  //   users = users.map((user) => {
  //     if (user.id === id) {
  //       return {
  //         ...user,
  //         name: name,
  //       };
  //     }

  //     return user;
  //   });
  //   response.send(200, { id, name });
  // },
  // deleteUser(request, response) {
  //   let { id } = request.params;
  //   id = Number(id);

  //   users = users.filter((user) => user.id !== id);
  //   response.send(200, { deleted: true });
  // },
};

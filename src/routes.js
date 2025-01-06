const UserController = require("./controllers/UserController");
module.exports = [
  {
    endpoint: "/",
    method: "GET",
    handler: UserController.listCardLinks,
  },
  {
    endpoint: "/communicates",
    method: "GET",
    handler: UserController.listCommunicates,
  },
  {
    endpoint: "/card-link",
    method: "GET",
    handler: UserController.getCardLink,
  },
  {
    endpoint: "/add-card-link",
    method: "POST",
    handler: UserController.addCardLink,
  },
  // {
  //   endpoint: "/users/:id",
  //   method: "GET",
  //   handler: UserController.getUserById,
  // },
  // {
  //   endpoint: "/users",
  //   method: "POST",
  //   handler: UserController.createUser,
  // },
  // {
  //   endpoint: "/users/:id",
  //   method: "PUT",
  //   handler: UserController.updateUser,
  // },
  // {
  //   endpoint: "/users/:id",
  //   method: "DELETE",
  //   handler: UserController.deleteUser,
  // },
];

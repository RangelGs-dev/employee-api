const UserController = require("./controllers/UserController");
module.exports = [
  {
    endpoint: "/",
    method: "GET",
    handler: UserController.listCardLinks,
  },
  {
    endpoint: "/card-link",
    method: "GET",
    handler: UserController.listCardLinks,
  },
  {
    // endpoint: "/card-link",
    endpoint: "/search-link",
    method: "GET",
    handler: UserController.getCardLink,
  },
  {
    endpoint: "/add-card-link",
    method: "POST",
    handler: UserController.addCardLink,
  },
  {
    endpoint: "/releases",
    method: "GET",
    handler: UserController.listReleases,
  },
  {
    endpoint: "/add-release",
    method: "POST",
    handler: UserController.addRelease,
  },
];

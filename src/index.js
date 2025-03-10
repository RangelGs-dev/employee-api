const http = require("http");
const { URL } = require("url");
const bodyParser = require("./helpers/bodyParser.js");

const routes = require("./routes");

const server = http.createServer(function (request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*"); // Permitir apenas o front-end
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // Métodos permitidos
  response.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Cabeçalhos permitidos

  if (request.method === "OPTIONS") {
    response.writeHead(200);
    return response.end();
  }

  const parsedUrl = new URL(`http://localhost:3000${request.url}`);
  console.log(request.url);

  console.log(
    `Request method: ${request.method} | Endpoint ${parsedUrl.pathname}`
  );

  let { pathname } = parsedUrl;
  let id = null;

  const splitEndpoint = pathname
    .split("/")
    .filter((routeItem) => Boolean(routeItem));

  console.log(splitEndpoint);

  if (splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`;
    id = splitEndpoint[1];
  }
  const route = routes.find(function (routeObj) {
    return routeObj.endpoint === pathname && routeObj.method === request.method;
  });

  if (route) {
    request.query = Object.fromEntries(parsedUrl.searchParams);
    request.params = { id };

    response.send = function (statusCode, body) {
      response.writeHead(statusCode, { "content-type": "application/json" });
      response.end(JSON.stringify(body));
    };

    if (request.method === "POST" || request.method === "PUT") {
      bodyParser(request, () => {
        route.handler(request, response);
      });
    } else {
      route.handler(request, response);
    }
  } else {
    response.writeHead(404, { "content-type": "text/html" });
    response.end(`Cannot ${request.method} ${parsedUrl.pathname}`);
  }
});

server.listen(3000, function () {
  console.log("Run Server at http://localhost:3000");
});

import * as bodyParser from "body-parser";

import Server from "./server";
import router from "./router";

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

const server = Server.init(port);

server.app.use(bodyParser.json());
server.app.use(router);

server.start(() => console.log("Server started"));

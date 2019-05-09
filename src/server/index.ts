import * as express from "express";

export default class Server {
  public static init(port: number): Server {
    return new Server(port);
  }
  public app: express.Application;

  constructor(private port: number) {
    this.app = express();
  }

  public start(callback?: any) {
    this.app.listen(this.port, callback);
  }
}

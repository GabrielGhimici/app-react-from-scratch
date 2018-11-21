import * as Express from 'express';
import { Next, Request, Response, ServerLoader, ServerSettings } from '@tsed/common';
import * as Path from 'path';
import { Exception } from 'ts-httpexceptions';

const bodyParser = require('body-parser');

@ServerSettings({
  rootDir: Path.resolve(__dirname),
  port: 3000,
  mount: {
    '/': '${rootDir}/generic/**/*.js',
    '/api': '${rootDir}/api/**/*.js'
  }
})
export class Server extends ServerLoader {
  public $onMountingMiddlewares(): void|Promise<any> {
    this.use(bodyParser.json({limit: '10mb'}), bodyParser.json({ type: 'application/vnd.api+json' }));
    this.use(Express.static(`${__dirname}/../client`));
    return null;
  }

  public $onServerInitError(error: any, @Request() request, @Response() response, @Next() next){
    if (response.headersSent) {
      return next(error);
    }

    if (typeof error === 'string') {
      response.status(404).send(error);
      return next();
    }

    if (error instanceof Exception) {
      response.status(error.status).send(error.message);
      return next();
    }

    if (error.name === 'CastError' || error.name === 'ObjectID' || error.name === 'ValidationError') {
      response.status(400).send('Bad Request');
      return next();
    }

    response.status(error.status || 500).send('Internal Error');
    return next();

  }
}

const server = new Server();
server.start();

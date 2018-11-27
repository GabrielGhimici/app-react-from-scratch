import * as Express from 'express';
import { Next, Request, Response, ServerLoader, ServerSettings } from '@tsed/common';
import * as Path from 'path';
import { Exception } from 'ts-httpexceptions';
import '@tsed/typeorm';

const session = require('express-session');
const bodyParser = require('body-parser');

@ServerSettings({
  rootDir: Path.resolve(__dirname),
  port: 3000,
  mount: {
    '/api': '${rootDir}/api/**/*.js',
    '/': '${rootDir}/generic/**/*.js'
  },
  typeorm: [{
    name: 'default',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'comment_simulator',
    username: 'root',
    password: 'admin123',
    entities: [
      '${rootDir}/api/model/*.js',
    ],
    logging: true
  }],
  logger: {
    logRequest: true
  }
})
export class Server extends ServerLoader {
  public $onMountingMiddlewares(): void|Promise<any> {
    this.use(bodyParser.json({limit: '10mb'}), bodyParser.json({ type: 'application/vnd.api+json' }));
    this.use(Express.static(`${__dirname}/../client`));
    this.use(session({
      secret: 'S3CR37K3Y',
      saveUninitialized: true,
      resave: false,
      cookie: {
        expires: new Date(Number(new Date())+24*60*60*1000),
        secure: 'auto'
      }
    }));
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

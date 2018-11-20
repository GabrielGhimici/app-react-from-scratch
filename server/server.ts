import * as Express from 'express';
import {ServerLoader, ServerSettings} from '@tsed/common';
import * as Path from 'path';

const bodyParser = require('body-parser');

@ServerSettings({
  rootDir: Path.resolve(__dirname),
  port: 3000,
  mount: {
    '/': '${rootDir}/generic/**/*.js',
    '/api': '${rootDir}/api/**/*.js'
  }
})
export class Server extends ServerLoader{
  public $onMountingMiddlewares(): void|Promise<any> {
    this.use(bodyParser.json({limit: '10mb'}), bodyParser.json({ type: 'application/vnd.api+json' }));
    this.use(Express.static(`${__dirname}/../client`));
    return null;
  }

  public $onServerInitError(err){
    console.error(err);
  }
}

let server = new Server();
server.start();

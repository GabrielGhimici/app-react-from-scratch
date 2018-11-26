import { BodyParams, Controller, Post, Request, Required, Response, UseBefore } from '@tsed/common';
import { AuthenticationService } from './authentication.service';
import { Unauthorized, InternalServerError } from 'ts-httpexceptions';
import { AuthorizationMiddleware } from '../../midlewares/authorization.middleware';

const crypto = require('crypto');

@Controller('/auth')
export class AuthenticationController {

  constructor(
    private authenticationService: AuthenticationService
  ) {}


  @Post('/login')
  doLogin(
    @Request() request,
    @Response() response,
    @Required() @BodyParams('username') username: string,
    @Required() @BodyParams('password') password: string,
  ) {
    return this.authenticationService.checkUser(username, password).then((user) => {
      if (user) {
        request.session.user = user;
        request.session.token = crypto.randomBytes(20).toString('hex');
        response.cookie('CSToken', request.session.token, request.session.cookie);
        return 'OK';
      } else {
        throw new Unauthorized('Unauthorized');
      }
    })
  }
  @Post('/logout')
  @UseBefore(AuthorizationMiddleware)
  doLogout(
    @Request() request,
    @Response() response,
  ) {
    request.session.destroy((err) => {
      throw new InternalServerError('Internal Error')
    });
    return 'OK';
  }
}

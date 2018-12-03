import { Controller, Get, PathParams, QueryParams, Request, UseBefore } from '@tsed/common';
import { UserService } from './user.service';
import { User } from '../model/user';
import { AuthorizationMiddleware } from '../../midlewares/authorization.middleware';

@Controller('/users')
export class UserController {
  constructor(
    private userService: UserService
  ) {}

  @Get('')
  @UseBefore(AuthorizationMiddleware)
  getUserList(
    @QueryParams() query: any
  ): Promise<Array<User>> {
    return this.userService.getAllUsers(query);
  }

  @Get('/:id(\\d+)')
  @UseBefore(AuthorizationMiddleware)
  getUser(
    @Request() request,
    @PathParams("id") id: number,
    @QueryParams() query: any
  ): Promise<User> {
    return this.userService.getUser(id, query);
  }

  @Get('/current')
  @UseBefore(AuthorizationMiddleware)
  getCurrentUser(
    @Request() request,
  ) {
    return this.userService.getUser(request.session.user.id, {});
  }
}

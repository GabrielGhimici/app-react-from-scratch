import { Controller, Get, PathParams, QueryParams } from '@tsed/common';
import { UserService } from './user.service';
import { User } from '../model/user';

@Controller('/users')
export class UserController {
  constructor(
    private userService: UserService
  ) {}

  @Get('')
  getUserList(
    @QueryParams() query: any
  ): Promise<Array<User>> {
    return this.userService.getAllUsers(query);
  }

  @Get('/:id')
  getUser(
    @PathParams("id") id: number,
    @QueryParams() query: any
  ): Promise<User> {
    return this.userService.getUser(id, query);
  }
}

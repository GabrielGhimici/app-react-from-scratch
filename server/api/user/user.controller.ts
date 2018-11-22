import { Controller, Get } from '@tsed/common';
import { UserService } from './user.service';
import { User } from '../model/user';

@Controller('/users')
export class UserController {
  constructor(
    private userService: UserService
  ) {}

  @Get('')
  getUserList(): Promise<Array<User>> {
    return this.userService.getAllUsers();

  }
}

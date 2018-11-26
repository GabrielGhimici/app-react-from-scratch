import { AfterRoutesInit, Service, Use } from '@tsed/common';
import { TypeORMService } from '@tsed/typeorm';
import { Connection } from 'typeorm';
import { User } from '../../api/model/user';

@Service()
export class AuthenticationService implements AfterRoutesInit{
  private connection: Connection;

  constructor(
    private typeORMService: TypeORMService
  ) {}


  $afterRoutesInit() {
    this.connection = this.typeORMService.get();
  }

  async checkUser(username: string, password: string): Promise<User> {
    return await this.connection.manager.findOne(User, {username: username, password: password});
  }
}

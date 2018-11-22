import { AfterRoutesInit, Service } from '@tsed/common';
import { Connection } from 'typeorm';
import { TypeORMService } from '@tsed/typeorm';
import { User } from '../model/user';

@Service()
export class UserService implements AfterRoutesInit{
  private connection: Connection;

  constructor(
    private typeORMService: TypeORMService
  ) {}


  $afterRoutesInit() {
    this.connection = this.typeORMService.get();
  }

  async getAllUsers(): Promise<Array<User>> {
    console.log('GET ALL USERS');
    return await this.connection.manager.find(User);
  }
}

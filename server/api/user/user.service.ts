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

  async getAllUsers(queryParams: any): Promise<Array<User>> {
    const includeValue = queryParams ? queryParams['include'] : '';
    const includeList = includeValue ? includeValue.split(',').map(el => el.replace(/\s+/g, '')) : [];
    if (includeList.length !== 0) {
      if (includeList.indexOf('threads') >= 0 && includeList.indexOf('comments') >= 0) {
        return await this.connection.getRepository(User).find({relations: ['threads', 'comments']});
      }
      if (includeList.indexOf('threads') >= 0 && includeList.indexOf('comments') < 0) {
        return await this.connection.getRepository(User).find({relations: ['threads']});
      }
      if (includeList.indexOf('threads') < 0 && includeList.indexOf('comments') >= 0) {
        return await this.connection.getRepository(User).find({relations: ['comments']});
      }
    }
    return await this.connection.manager.find(User);
  }

  async getUser(id: number, queryParams: any): Promise<User> {
    const includeValue = queryParams ? queryParams['include'] : '';
    const includeList = includeValue ? includeValue.split(',').map(el => el.replace(/\s+/g, '')) : [];
    if (includeList.length !== 0) {
      if (includeList.indexOf('threads') >= 0 && includeList.indexOf('comments') >= 0) {
        return await this.connection.getRepository(User).findOne(id,{relations: ['threads', 'comments']});
      }
      if (includeList.indexOf('threads') >= 0 && includeList.indexOf('comments') < 0) {
        return await this.connection.getRepository(User).findOne(id,{relations: ['threads']});
      }
      if (includeList.indexOf('threads') < 0 && includeList.indexOf('comments') >= 0) {
        return await this.connection.getRepository(User).findOne(id,{relations: ['comments']});
      }
    }
    return await this.connection.manager.findOne(User, {id: id});
  }
}

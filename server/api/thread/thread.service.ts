import { Service } from '@tsed/common';
import { TypeORMService } from '@tsed/typeorm';
import { Connection } from 'typeorm';
import { Thread } from '../model/thread';

@Service()
export class ThreadService {
  private connection: Connection;

  constructor(
    private typeORMService: TypeORMService
  ) {}


  $afterRoutesInit() {
    this.connection = this.typeORMService.get();
  }

  async getAllThreads(queryParams: any): Promise<Array<Thread>> {
    const includeValue = queryParams ? queryParams['include'] : '';
    const includeList = includeValue ? includeValue.split(',').map(el => el.replace(/\s+/g, '')) : [];
    if (includeList.length !== 0) {
      if (includeList.indexOf('owner') >= 0 && includeList.indexOf('comments') >= 0) {
        return await this.connection.getRepository(Thread).find({relations: ['owner', 'comments']});
      }
      if (includeList.indexOf('owner') >= 0 && includeList.indexOf('comments') < 0) {
        return await this.connection.getRepository(Thread).find({relations: ['owner']});
      }
      if (includeList.indexOf('owner') < 0 && includeList.indexOf('comments') >= 0) {
        return await this.connection.getRepository(Thread).find({relations: ['comments']});
      }
    }
    return await this.connection.manager.find(Thread);
  }

  async getThread(id: number, queryParams: any): Promise<Thread> {
    const includeValue = queryParams ? queryParams['include'] : '';
    const includeList = includeValue ? includeValue.split(',').map(el => el.replace(/\s+/g, '')) : [];
    if (includeList.length !== 0) {
      if (includeList.indexOf('owner') >= 0 && includeList.indexOf('comments') >= 0) {
        return await this.connection.getRepository(Thread).findOne(id,{relations: ['owner', 'comments']});
      }
      if (includeList.indexOf('owner') >= 0 && includeList.indexOf('comments') < 0) {
        return await this.connection.getRepository(Thread).findOne(id,{relations: ['owner']});
      }
      if (includeList.indexOf('owner') < 0 && includeList.indexOf('comments') >= 0) {
        return await this.connection.getRepository(Thread).findOne(id,{relations: ['comments']});
      }
    }
    return await this.connection.manager.findOne(Thread, {id: id});
  }

}

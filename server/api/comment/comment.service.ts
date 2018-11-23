import { AfterRoutesInit, Service } from '@tsed/common';
import { TypeORMService } from '@tsed/typeorm';
import { Connection } from 'typeorm';
import { Comment } from '../model/comment';

@Service()
export class CommentService implements AfterRoutesInit{
  private connection: Connection;

  constructor(
    private typeORMService: TypeORMService
  ) {}


  $afterRoutesInit() {
    this.connection = this.typeORMService.get();
  }

  async getAllComments(queryParams: any): Promise<Array<Comment>> {
    const includeValue = queryParams ? queryParams['include'] : '';
    const includeList = includeValue ? includeValue.split(',').map(el => el.replace(/\s+/g, '')) : [];
    if (includeList.length !== 0) {
      if (includeList.indexOf('owner') >= 0 && includeList.indexOf('thread') >= 0) {
        return await this.connection.getRepository(Comment).find({relations: ['owner', 'parentThread']});
      }
      if (includeList.indexOf('owner') >= 0 && includeList.indexOf('thread') < 0) {
        return await this.connection.getRepository(Comment).find({relations: ['owner']});
      }
      if (includeList.indexOf('owner') < 0 && includeList.indexOf('thread') >= 0) {
        return await this.connection.getRepository(Comment).find({relations: ['parentThread']});
      }
    }
    return await this.connection.manager.find(Comment);
  }

  async getComment(id: number, queryParams: any): Promise<Comment> {
    const includeValue = queryParams ? queryParams['include'] : '';
    const includeList = includeValue ? includeValue.split(',').map(el => el.replace(/\s+/g, ''))  : [];

    if (includeList.length !== 0) {
      if (includeList.indexOf('owner') >= 0 && includeList.indexOf('thread') >= 0) {
        return await this.connection.getRepository(Comment).findOne(id,{relations: ['owner', 'parentThread']});
      }
      if (includeList.indexOf('owner') >= 0 && includeList.indexOf('thread') < 0) {
        return await this.connection.getRepository(Comment).findOne(id, {relations: ['owner']});
      }
      if (includeList.indexOf('owner') < 0 && includeList.indexOf('thread') >= 0) {
        return await this.connection.getRepository(Comment).findOne(id,{relations: ['parentThread']});
      }
    }
    return await this.connection.manager.findOne(Comment, {id: id});
  }
}

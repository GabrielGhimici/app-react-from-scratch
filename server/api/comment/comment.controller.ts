import { Controller, Get, PathParams, QueryParams } from '@tsed/common';
import { CommentService } from './comment.service';
import { Comment } from '../model/comment';

@Controller('/comments')
export class UserController {
  constructor(
    private commentService: CommentService
  ) {}

  @Get('')
  getUserList(
    @QueryParams() query: any
  ): Promise<Array<Comment>> {
    return this.commentService.getAllComments(query);
  }

  @Get('/:id')
  getUser(
    @PathParams("id") id: number,
    @QueryParams() query: any
  ): Promise<Comment> {
    return this.commentService.getComment(id, query);
  }
}

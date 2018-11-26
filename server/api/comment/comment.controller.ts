import { Controller, Get, PathParams, QueryParams, UseBefore } from '@tsed/common';
import { CommentService } from './comment.service';
import { Comment } from '../model/comment';
import { AuthorizationMiddleware } from '../../midlewares/authorization.middleware';

@Controller('/comments')
export class UserController {
  constructor(
    private commentService: CommentService
  ) {}

  @Get('')
  @UseBefore(AuthorizationMiddleware)
  getUserList(
    @QueryParams() query: any
  ): Promise<Array<Comment>> {
    return this.commentService.getAllComments(query);
  }

  @Get('/:id')
  @UseBefore(AuthorizationMiddleware)
  getUser(
    @PathParams("id") id: number,
    @QueryParams() query: any
  ): Promise<Comment> {
    return this.commentService.getComment(id, query);
  }
}

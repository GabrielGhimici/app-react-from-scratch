import { Controller, Get, PathParams, QueryParams, UseBefore } from '@tsed/common';
import { ThreadService } from './thread.service';
import { Thread } from '../model/thread';
import { AuthorizationMiddleware } from '../../midlewares/authorization.middleware';

@Controller('/threads')
export class ThreadController {
  constructor(
    private threadService: ThreadService
  ) {}

  @Get('')
  @UseBefore(AuthorizationMiddleware)
  getUserList(
    @QueryParams() query: any
  ): Promise<Array<Thread>> {
    return this.threadService.getAllThreads(query);
  }

  @Get('/:id')
  @UseBefore(AuthorizationMiddleware)
  getUser(
    @PathParams("id") id: number,
    @QueryParams() query: any
  ): Promise<Thread> {
    return this.threadService.getThread(id, query);
  }
}

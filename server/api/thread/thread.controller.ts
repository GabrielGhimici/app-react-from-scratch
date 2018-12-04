import { Controller, Get, PathParams, QueryParams, UseBefore } from '@tsed/common';
import { ThreadService } from './thread.service';
import { Thread } from '../model/thread';

@Controller('/threads')
export class ThreadController {
  constructor(
    private threadService: ThreadService
  ) {}

  @Get('')
  getUserList(
    @QueryParams() query: any
  ): Promise<Array<Thread>> {
    return this.threadService.getAllThreads(query);
  }

  @Get('/:id')
  getUser(
    @PathParams("id") id: number,
    @QueryParams() query: any
  ): Promise<Thread> {
    return this.threadService.getThread(id, query);
  }
}

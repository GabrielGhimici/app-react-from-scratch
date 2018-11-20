import { PayloadAction } from '../../store/payload-action';
import { Thread } from './thread-list';

export enum ThreadListActionTypes {
  THREAD_LIST_LOAD_START = '[THREAD_LIST]LOAD_START',
  THREAD_LIST_LOAD_SUCCEEDED = '[THREAD_LIST]LOAD_SUCCEEDED',
  THREAD_LIST_LOAD_FAILED = '[THREAD_LIST]LOAD_FAILED',
}

export class ThreadListActions {
  static loadThreads(): PayloadAction<any, any> {
    return {
      type: ThreadListActionTypes.THREAD_LIST_LOAD_START,
    }
  }
  static threadsLoadSucceeded(threads: Array<Thread>): PayloadAction<any, any> {
    return {
      type: ThreadListActionTypes.THREAD_LIST_LOAD_SUCCEEDED,
      payload: {
        threads
      }
    }
  }
  static threadsLoadFailed(error: any): PayloadAction<any, any> {
    return {
      type: ThreadListActionTypes.THREAD_LIST_LOAD_FAILED,
      error
    }
  }
}

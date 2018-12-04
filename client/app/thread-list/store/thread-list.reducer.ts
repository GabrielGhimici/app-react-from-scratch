import { ThreadList } from './thread-list';
import { PayloadAction } from '../../store/payload-action';
import { ThreadListActionTypes } from './thread-list.actions';
import * as moment from 'moment';

const INITIAL_STATE: ThreadList = {
  items: [],
  loading: false,
  error: null
};

export function threadListReducer(state: ThreadList = INITIAL_STATE, action: PayloadAction<any, any>) {
  switch (action.type) {
    case ThreadListActionTypes.THREAD_LIST_LOAD_START: {
      return {...state, ...{loading: true}};
    }
    case ThreadListActionTypes.THREAD_LIST_LOAD_SUCCEEDED: {
      const processedThreads = (action.payload.threads.slice()).map((thread: any) => {
        thread.owner = `${thread.owner.firstName} ${thread.owner.lastName}`;
        thread.createDate = moment(thread.createDate).format('dddd, D/MMM/YYYY, hh:mm:ss a');
        return thread;
      });
      return {...state, ...{loading: false, items: processedThreads}};
    }
    case ThreadListActionTypes.THREAD_LIST_LOAD_FAILED: {
      return {...state, ...{loading: false, error: action.error}};
    }
    default:
      return state;
  }
}

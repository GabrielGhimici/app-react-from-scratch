import { ThreadList } from './thread-list';
import { PayloadAction } from '../../store/payload-action';
import { ThreadListActionTypes } from './thread-list.actions';

const INITIAL_STATE: ThreadList = {
  items: [],
  loading: false,
  error: null
};

export function threadListReducer(state: ThreadList = INITIAL_STATE, action: PayloadAction<any, any>) {
  switch (action.type) {
    case ThreadListActionTypes.THREAD_LIST_LOAD_START: {
      return {...state, ...{loading: true, items: [{id: 1, ceva: "ui"}, {id: 2, ceva: "uii"}, {id: 3, ceva: "uiii"}]}};
    }
    case ThreadListActionTypes.THREAD_LIST_LOAD_SUCCEEDED: {
      return {...state, ...{loading: false, items: action.payload.threads.slice()}};
    }
    case ThreadListActionTypes.THREAD_LIST_LOAD_FAILED: {
      return {...state, ...{loading: false, error: action.error}};
    }
    default:
      return state;
  }
}

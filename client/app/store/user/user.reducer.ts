import { UserState } from './user';
import { PayloadAction } from '../payload-action';
import { UserActionTypes } from './user.actions';

const INITIAL_STATE: UserState = {
  user: null,
  loading: false,
  authorize: false,
  error: null
};

export function userReducer(state: UserState = INITIAL_STATE, action: PayloadAction<any, any>) {
  switch (action.type) {
    case UserActionTypes.CURRENT_USER_LOAD:
    case UserActionTypes.USER_LOAD_START: {
      return {...state, ...{loading: true}}
    }
    case UserActionTypes.USER_LOAD_SUCCEEDED: {
      return {...state, ...{loading: false, user: action.payload.user}}
    }
    case UserActionTypes.USER_LOAD_FAILED: {
      return {...state, ...{loading: false, error: action.error}}
    }
    case UserActionTypes.USER_LOGIN_START: {
      return {...state, ...{authorize: true}}
    }
    case UserActionTypes.USER_LOGIN_SUCCEEDED: {
      return {...state, ...{authorize: false}}
    }
    case UserActionTypes.USER_LOGIN_FAILED: {
      return {...state, ...{authorize: false, error: action.error}}
    }
    default:
      return state
  }
}

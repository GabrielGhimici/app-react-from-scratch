import { UserState } from './user';
import { PayloadAction } from '../payload-action';

const INITIAL_STATE: UserState = {
  user: null,
  loading: false,
  error: null
};

export function userReducer(state: UserState = INITIAL_STATE, action: PayloadAction<any, any>) {
  switch (action.type) {
    default:
      return state
  }
}

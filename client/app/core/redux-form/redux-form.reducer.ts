import { Action } from 'redux';
import * as _ from 'lodash';
import { ReduxFormActionTypes } from './redux-form.actions';

export const reduxFormReducer = <RootState>(initialState?: RootState | {[x: string]: any}) => {
 return (state: RootState |  {[x: string]: any} | undefined = initialState, action: Action & {path? : Array<any>, payload?: any}) => {
    switch (action.type) {
      case ReduxFormActionTypes.FORM_CHANGE:
        if (!action.path || !action.payload) return state;
        let newState = _.cloneDeep(state);
        let subState = findSubState(newState, action.path);
        Object.assign(subState, action.payload.values);
        return newState;
      default:
        return state;
    }
  };
};

export function findSubState(state: any, connect: Array<any>) {
  let subState = state;
  for (let i = 0; i < connect.length; i++) {
    if (!connect[i]) {
      throw new Error('Unable to connect to Store[undefined]');
    }
    if (subState instanceof Array && isNaN(Number(connect[i]))) {
      throw new Error("Path element is not an index!")
    } else if (subState instanceof Array && Number(connect[i]) < 0) {
      throw new Error(`Unable to find element at index ${connect[i]}`)
    }
    if (!subState[connect[i]]) {
      throw new Error(`Unable to find ${connect[i-1] ? connect[i-1] : 'rootState'}[${connect[i]}]`)
    } else {
      subState = subState[connect[i]]
    }
  }
  return subState;
}

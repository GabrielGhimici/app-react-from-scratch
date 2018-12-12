import { Action } from 'redux';

export enum ReduxFormActionTypes {
  FORM_CHANGE = '@#_@#FORM_CHANGE'
}

export class ReduxFormActions {
  static formChange(path: Array<any>, value: any): Action & {path : Array<any>, payload: any} {
    return {
      type: ReduxFormActionTypes.FORM_CHANGE,
      path,
      payload: value
    }
  }
}

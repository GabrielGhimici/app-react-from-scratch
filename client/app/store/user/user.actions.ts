import { PayloadAction } from '../payload-action';

export enum UserActionTypes {
  USER_LOAD_START = '[USER]LOAD_START',
  USER_LOAD_SUCCEEDED = '[USER]LOAD_SUCCEEDED',
  USER_LOAD_FAILED = '[USER]LOAD_FAILED',
  USER_LOGIN_START = '[USER]LOGIN_START',
  USER_LOGIN_SUCCEEDED = '[USER]LOGIN_SUCCEEDED',
  USER_LOGIN_FAILED = '[USER]LOGIN_FAILED',
  USER_LOGOUT = '[USER]LOGOUT'
}

export class UserActions {
  static loadUser(id: number): PayloadAction<any, any> {
    return {
      type: UserActionTypes.USER_LOAD_START,
      payload: {
        id
      }
    }
  }
  static loadUserSucceeded(user: any): PayloadAction<any, any> {
    return {
      type: UserActionTypes.USER_LOAD_SUCCEEDED,
      payload: {
        user
      }
    }
  }
  static loadUserFailed(error: any): PayloadAction<any, any> {
    return {
      type: UserActionTypes.USER_LOAD_FAILED,
      error: error
    }
  }

  static login(username: string, password: string): PayloadAction<any, any> {
    return {
      type: UserActionTypes.USER_LOGIN_START,
      payload: {
        username,
        password
      }
    }
  }

  static loginSucceeded(): PayloadAction<any, any> {
    return {
      type: UserActionTypes.USER_LOGIN_SUCCEEDED,
    }
  }

  static loginFailed(error: any): PayloadAction<any, any> {
    return {
      type: UserActionTypes.USER_LOGIN_FAILED,
      error
    }
  }

  static logout(): PayloadAction<any, any> {
    return {
      type: UserActionTypes.USER_LOGOUT
    }
  }
}

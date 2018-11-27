import { combineEpics, ofType } from 'redux-observable';
import { UserActions, UserActionTypes } from './user.actions';
import { catchError, delay, map, switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { history } from '../../../index';
import axios from 'axios';
import { PayloadAction } from '../payload-action';

export class UserEpics {
  public createEpics() {
    return combineEpics(
      this.loginEpic(),
      this.loginSuccessfulRedirect()
    )
  }

  private loginEpic() {
    return (action$: any) => action$
      .pipe(
        ofType(UserActionTypes.USER_LOGIN_START),
        delay(1000),
        switchMap((action: PayloadAction<any, any>) => {
          return from(axios.post('/auth/login', action.payload)).pipe(
            switchMap((data: any) => {
              return of(UserActions.loginSucceeded());
            }),
            catchError((error) => of(UserActions.loginFailed(error)))
          );
        })
      );
  }

  private loginSuccessfulRedirect() {
    return (action$: any) => action$
      .pipe(
        ofType(UserActionTypes.USER_LOGIN_SUCCEEDED),
        map(action => {
          history.push('/threads');
          return {type: "[USER]LOGIN_SUCCESSFUL_REDIRECT"};
        })
      );
  }
}

import { combineEpics, ofType } from 'redux-observable';
import { UserActions, UserActionTypes } from './user.actions';
import { catchError, delay, map, switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { PayloadAction } from '../payload-action';
import { UserNotificationsActions } from '../user-notifications/user-notifications.actions';
import { NotificationType } from '../user-notifications/user-notifications';
import { history } from '../../../index';
import http from '../../core/http';

export class UserEpics {
  public createEpics() {
    return combineEpics(
      this.loginEpic(),
      this.loginSuccessfulRedirect(),
      this.loadCurrentUser(),
      this.logoutEpic()
    )
  }

  private loginEpic() {
    return (action$: any) => action$
      .pipe(
        ofType(UserActionTypes.USER_LOGIN_START),
        delay(1000),
        switchMap((action: PayloadAction<any, any>) => {
          return from(http.post('/auth/login', action.payload)).pipe(
            switchMap((data: any) => {
              return of(UserActions.loginSucceeded());
            }),
            catchError((error) => of(
                UserActions.loginFailed(error),
                UserNotificationsActions.notify({
                  type: NotificationType.Error,
                  message: 'Login failed!'
                })
              )
            )
          );
        })
      );
  }

  private loginSuccessfulRedirect() {
    return (action$: any) => action$
      .pipe(
        ofType(UserActionTypes.USER_LOGIN_SUCCEEDED),
        map(action => {
          return UserActions.loadCurrentUser();
        })
      );
  }

  private loadCurrentUser() {
    return (action$: any) => action$
      .pipe(
        ofType(UserActionTypes.CURRENT_USER_LOAD),
        switchMap(action => {
          return from(http.get('/api/users/current')).pipe(
            switchMap((req: any) => {
              return of(req.data);
            }),
            map((data) => {
              history.push('/threads');
              return UserActions.loadUserSucceeded(data)
            }),
            catchError((error) => {
              let errorMessage: string = 'There is a problem with current user loading.';
              let notificationType: NotificationType = NotificationType.Error;
              if (error.response.status === 401) {
                errorMessage = 'Looks you need to login if you want to have full access.';
                notificationType = NotificationType.Info;
              }
              return of(
                UserActions.loadUserFailed(error),
                UserNotificationsActions.notify({
                  type: notificationType,
                  message: errorMessage
                })
              )
              }
            )
          )
        })
      );
  }

  private logoutEpic() {
    return (action$: any) => action$
      .pipe(
        ofType(UserActionTypes.USER_LOGOUT),
        switchMap(action => {
          return from(http.post('/auth/logout'))
            .pipe(
              map(() => UserActions.logoutSucceeded()),
              catchError((error) => of(UserActions.logoutFailed()))
            )
        })
      );
  }
}

import { combineEpics, ofType } from 'redux-observable';
import { ThreadListActions, ThreadListActionTypes } from './thread-list.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import http from '../../core/http';
import { Thread } from './thread-list';

export class ThreadListEpics {

  public createEpics() {
    return combineEpics(
      this.loadThreads()
    );
  }

  private loadThreads() {
    return (action$: any) => action$.pipe(
      ofType(ThreadListActionTypes.THREAD_LIST_LOAD_START),
      switchMap(() => {
        return from(http.get('/api/threads?include=owner')).pipe(
          switchMap((result) => of(result.data)),
          map((data: Array<Thread>) => ThreadListActions.threadsLoadSucceeded(data)),
          catchError((error) => of(ThreadListActions.threadsLoadFailed(error)))
        )
      })
    );
  }
}

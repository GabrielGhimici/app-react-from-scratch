import { UserEpics } from './user/user.epics';
import { ThreadListEpics } from '../thread-list/store/thread-list.epics';

export class RootEpics {
  static createEpics() {
    return [
      new UserEpics().createEpics(),
      new ThreadListEpics().createEpics()
    ]
  }
}

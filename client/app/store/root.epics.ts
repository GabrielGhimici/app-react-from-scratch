import { UserEpics } from './user/user.epics';

export class RootEpics {
  static createEpics() {
    return [
      new UserEpics().createEpics()
    ]
  }
}

export interface UserState {
  user: User | null,
  authorize: boolean,
  loading: boolean,
  error: any
}

export interface User {
  id: number,
  username: string,
  firstName: string,
  lastName: string
}

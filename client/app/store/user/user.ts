export interface UserState {
  user: User | null,
  loading: boolean,
  error: any
}

export interface User {
  id: number,
  username: string,
  firstName: string,
  lastName: string
}

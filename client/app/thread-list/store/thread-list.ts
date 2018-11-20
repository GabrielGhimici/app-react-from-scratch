export interface ThreadList {
  items: Array<any>,
  loading: boolean,
  error: any
}

export interface Thread {
  id: number,
  name: string,
  owner: string,
  createDate: string,
  commentNumber: number
}

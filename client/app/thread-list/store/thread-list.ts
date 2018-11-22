export interface ThreadList {
  items: Array<any>,
  loading: boolean,
  error: any
}

export interface Thread {
  id: number,
  title: string,
  owner: string,
  description: string,
  createDate: string
}

export interface IChat {
  poster: string,
  text: string,
  created_at: any
}

export interface IRoomData {
  // id: string,
  title: string,
  description: string,
  genre: string,
  owner_id: string,
  created_at: any,
  chats: IChat[]
}

export interface IRoomState {
  roomData: IRoomData | null
}

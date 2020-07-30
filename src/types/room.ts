export enum Genre {
  STUDY,
  PORITICS,
  SPORTS,
  OTHER
}

export interface ITranScript {
  content: string
  poster_id: string
  poster_name: string
  created_at: any
}

type UserId = string

export interface IRoomData {
  id: string
  title: string
  // description: string
  genre: string
  owner_id: string
  owner_name: string
  created_at: any
  joined_users: UserId[]
  transcripts?: ITranScript[]
}

export interface IRoomState {
  roomData: IRoomData | null
  inputText: string
}

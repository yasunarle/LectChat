type roomId = string

export interface IUser {
  id: string
  name: string
  photoURL: string
  created_rooms: roomId[]
  joined_rooms: roomId[]
}

export interface IUserPageState {
  pageUser: IUser | null
}

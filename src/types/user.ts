import {} from './room'
type _RoomId = string
interface _Room {
  id: string
  title: string
}

export interface IUser {
  id: string
  name: string
  photoURL: string
  created_rooms: _RoomId[]
  joined_rooms: _RoomId[]
}

export interface IUserPageState {
  pageUser: IUser | null
  joined_rooms: _Room[]
}

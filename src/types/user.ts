import { IRoomData } from './room'

type roomId = string

export interface IUser {
  id: string
  name: string
  photoURL: string
  created_rooms: IRoomData[]
  joined_rooms: roomId[]
}

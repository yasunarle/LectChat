import { IRoomData } from './room'
import { IUser } from './user'
export interface ICommunity {
  id: string
  name: string
  discription: string
  rooms: IRoomData[]
  members: IUser[]
  owner_id: string
  owner_name: string
}

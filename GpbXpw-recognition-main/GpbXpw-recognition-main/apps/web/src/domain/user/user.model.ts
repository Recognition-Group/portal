import { Notification } from '../notification'

import { RightsHolder } from '../rightsHolder'

import { Admin } from '../admin'

export enum UserStatus {
  CREATED = 'CREATED',
  VERIFIED = 'VERIFIED',
}
export class User {
  id: string
  email?: string
  status: UserStatus
  name?: string
  pictureUrl?: string
  password?: string
  dateCreated: string
  dateUpdated: string
  notifications?: Notification[]

  rightsHolders?: RightsHolder[]

  admins?: Admin[]
}

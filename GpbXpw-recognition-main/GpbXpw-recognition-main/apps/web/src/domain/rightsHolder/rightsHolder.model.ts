import { User } from '../user'

import { Track } from '../track'

import { Release } from '../release'

export class RightsHolder {
  id: string

  name: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  userId?: string

  user?: User

  tracks?: Track[]

  releases?: Release[]
}

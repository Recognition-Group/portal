import { User } from '../user'

export class Admin {
  id: string

  name: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  userId?: string

  user?: User
}

import { Users } from '@prisma/client'

import { v7 as uuid } from 'uuid'

export class User implements Users {
  id: string

  password: string
  email: string
  name: string

  updated_at: Date
  created_at: Date

  constructor() {
    if (!this.id) {
      this.created_at = new Date()
      this.updated_at = new Date()
      this.id = uuid()
    }
  }
}

import { v7 as uuid } from 'uuid'

import { Decimal } from '@prisma/client/runtime/library'
import { Movies } from '@prisma/client'

import { MovieLanguageEnum } from '../domains/enums/MovieLanguageEnum'
import { MovieStatusEnum } from '../domains/enums/MovieStatusEnum'
import { MovieGenreEnum } from '../domains/enums/MovieGenreEnum'

export class Movie implements Movies {
  id: string

  owner_id: string

  synopsis: string | null
  original_name: string
  title: string
  name: string

  background: string | null
  trailer: string | null
  cover: string | null

  popularity: number
  duration: number
  revenue: number
  budget: number
  profit: number
  score: number
  votes: number

  release: Date

  language: MovieLanguageEnum[]
  genres: MovieGenreEnum[]
  status: MovieStatusEnum

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

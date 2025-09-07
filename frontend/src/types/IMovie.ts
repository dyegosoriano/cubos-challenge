import type { MovieGenreEnum, MovieLanguageEnum, MovieStatusEnum } from './enums'

export type IMovie = {
  id: string
  owner_id: string

  original_name: string
  synopsis?: string
  title: string
  name: string

  background?: string
  trailer?: string
  cover?: string

  popularity: number
  duration: number
  votes: number

  release: Date

  revenue?: number
  budget?: number
  profit?: number

  language: MovieLanguageEnum[]
  genres: MovieGenreEnum[]
  status: MovieStatusEnum

  updated_at: Date
  created_at: Date
}

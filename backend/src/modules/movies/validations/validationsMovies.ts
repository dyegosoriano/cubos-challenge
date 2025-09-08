import { z } from 'zod'

import { errors } from '@shared/errors/constants'

import { MovieLanguageEnum } from '../domains/enums/MovieLanguageEnum'
import { MovieStatusEnum } from '../domains/enums/MovieStatusEnum'
import { MovieGenreEnum } from '../domains/enums/MovieGenreEnum'

const regex_image = /^data:image\/(jpeg|jpg|png|gif|webp);base64,/

export const validationCreateMovie = z.object({
  score: z.number(errors.movie.score_required).min(0, errors.movie.score_positive).max(100, errors.movie.score_max),
  title: z.string(errors.movie.title_required).min(1, errors.movie.title_min).max(255, errors.movie.title_max),
  name: z.string(errors.required_field).min(1, errors.movie.title_min).max(255, errors.movie.title_max),
  original_name: z.string(errors.movie.original_name_required).max(255, errors.movie.original_name_max),
  duration: z.number(errors.movie.duration_required).positive(errors.movie.duration_positive),
  popularity: z.number(errors.movie.popularity_required).min(0, errors.movie.popularity_min),
  votes: z.number(errors.movie.votes_required).min(0, errors.movie.votes_positive),
  language: z.nativeEnum(MovieLanguageEnum, errors.movie.language_invalid),
  status: z.nativeEnum(MovieStatusEnum, errors.movie.status_invalid),
  genres: z.nativeEnum(MovieGenreEnum, errors.movie.genres_invalid),
  owner_id: z.string(errors.required_field).uuid(errors.id),

  revenue: z.number().positive(errors.movie.revenue_positive).optional().nullable(),
  budget: z.number().positive(errors.movie.budget_positive).optional().nullable(),
  synopsis: z.string().max(1000, errors.movie.synopsis_max).optional().nullable(),
  profit: z.number(errors.movie.profit_number).optional().nullable(),

  background: z.string().regex(regex_image, errors.movie.background_invalid),
  cover: z.string().regex(regex_image, errors.movie.cover_invalid),
  trailer: z.string().url(errors.url),

  release: z
    .string(errors.movie.release_required)
    .datetime(errors.movie.release_invalid)
    .transform(date => new Date(date))
    .or(z.date(errors.movie.release_required))
})

export const validationUpdateMovie = z.object({
  score: z.number(errors.movie.score_required).min(0, errors.movie.score_positive).max(100, errors.movie.score_max).optional().nullable(),
  title: z.string().min(1, errors.movie.title_min).max(255, errors.movie.title_max).optional().nullable(),
  name: z.string().min(1, errors.movie.title_min).max(255, errors.movie.title_max).optional().nullable(),
  language: z.nativeEnum(MovieLanguageEnum, errors.movie.language_invalid).optional().nullable(),
  status: z.nativeEnum(MovieStatusEnum, errors.movie.status_invalid).optional().nullable(),
  original_name: z.string().max(255, errors.movie.original_name_max).optional().nullable(),
  genres: z.nativeEnum(MovieGenreEnum, errors.movie.genres_invalid).optional().nullable(),
  duration: z.number().positive(errors.movie.duration_positive).optional().nullable(),
  revenue: z.number().positive(errors.movie.revenue_positive).optional().nullable(),
  popularity: z.number().min(0, errors.movie.popularity_min).optional().nullable(),
  budget: z.number().positive(errors.movie.budget_positive).optional().nullable(),
  synopsis: z.string().max(1000, errors.movie.synopsis_max).optional().nullable(),
  votes: z.number().min(0, errors.movie.votes_positive).optional().nullable(),
  profit: z.number(errors.movie.profit_number).optional().nullable(),

  background: z.string().regex(regex_image, errors.movie.background_invalid).optional().nullable(),
  cover: z.string().regex(regex_image, errors.movie.cover_invalid).optional().nullable(),
  trailer: z.string().url(errors.url).optional().nullable(),

  owner_id: z.string(errors.required_field).uuid(errors.id),

  release: z
    .string()
    .datetime(errors.movie.release_invalid)
    .transform(date => new Date(date))
    .or(z.date(errors.movie.release_required))
    .optional()
    .nullable()
})

export const validationListMovies = z.object({
  name: z.string().min(1, errors.movie.title_min).max(255, errors.movie.title_max).optional().nullable(),
  language: z.nativeEnum(MovieLanguageEnum, errors.movie.language_invalid).optional().nullable(),
  original_name: z.string().max(255, errors.movie.original_name_max).optional().nullable(),
  status: z.nativeEnum(MovieStatusEnum, errors.movie.status_invalid).optional().nullable(),
  genres: z.nativeEnum(MovieGenreEnum, errors.movie.genres_invalid).optional().nullable(),
  owner_id: z.string(errors.required_field).uuid(errors.id),

  duration_before: z
    .string()
    .transform(number => +number)
    .optional(),

  duration_after: z
    .string()
    .transform(number => +number)
    .optional(),

  release_before: z
    .string()
    .transform(date => (date ? new Date(date) : null))
    .optional(),

  release_after: z
    .string()
    .transform(date => (date ? new Date(date) : null))
    .optional(),

  page_size: z
    .string(errors.pagination_required)
    .regex(/[1-9]+/, errors.pagination)
    .transform(number => +number)
    .or(z.number(errors.pagination_required).int(errors.pagination_int).positive(errors.pagination_positive)),

  page: z
    .string(errors.pagination_required)
    .regex(/[1-9]+/, errors.pagination)
    .transform(number => +number)
    .or(z.number(errors.pagination_required).int(errors.pagination_int).positive(errors.pagination_positive))
})

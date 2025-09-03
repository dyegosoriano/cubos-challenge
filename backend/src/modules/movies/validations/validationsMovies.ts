import { z } from 'zod'

import { errors } from '@shared/errors/constants'

import { MovieLanguageEnum } from '../domains/enums/MovieLanguageEnum'
import { MovieStatusEnum } from '../domains/enums/MovieStatusEnum'
import { MovieGenreEnum } from '../domains/enums/MovieGenreEnum'

export const validationCreateMovie = z.object({
  genres: z.array(z.nativeEnum(MovieGenreEnum, errors.movie.genres_invalid)).min(1, errors.movie.genres_required),
  title: z.string(errors.movie.title_required).min(1, errors.movie.title_min).max(255, errors.movie.title_max),
  name: z.string(errors.required_field).min(1, errors.movie.title_min).max(255, errors.movie.title_max),
  original_name: z.string(errors.movie.original_name_required).max(255, errors.movie.original_name_max),
  duration: z.number(errors.movie.duration_required).positive(errors.movie.duration_positive),
  popularity: z.number(errors.movie.popularity_required).min(0, errors.movie.popularity_min),
  revenue: z.number().positive(errors.movie.revenue_positive).optional().nullable(),
  language: z.array(z.nativeEnum(MovieLanguageEnum, errors.movie.language_invalid)),
  votes: z.number(errors.movie.votes_required).min(0, errors.movie.votes_positive),
  budget: z.number().positive(errors.movie.budget_positive).optional().nullable(),
  synopsis: z.string().max(1000, errors.movie.synopsis_max).optional().nullable(),
  profit: z.number(errors.movie.profit_number).optional().nullable(),
  status: z.nativeEnum(MovieStatusEnum, errors.movie.status_invalid),
  background: z.string().url(errors.url).optional().nullable(),
  owner_id: z.string(errors.required_field).uuid(errors.id),
  trailer: z.string().url(errors.url).optional().nullable(),
  cover: z.string().url(errors.url).optional().nullable(),

  release: z
    .string(errors.movie.release_required)
    .datetime(errors.movie.release_invalid)
    .transform(date => new Date(date))
    .or(z.date(errors.movie.release_required))
})

export const validationUpdateMovie = z.object({
  language: z.array(z.nativeEnum(MovieLanguageEnum, errors.movie.language_invalid)).min(1).optional().nullable(),
  genres: z.array(z.nativeEnum(MovieGenreEnum, errors.movie.genres_invalid)).min(1).optional().nullable(),
  title: z.string().min(1, errors.movie.title_min).max(255, errors.movie.title_max).optional().nullable(),
  name: z.string().min(1, errors.movie.title_min).max(255, errors.movie.title_max).optional().nullable(),
  status: z.nativeEnum(MovieStatusEnum, errors.movie.status_invalid).optional().nullable(),
  original_name: z.string().max(255, errors.movie.original_name_max).optional().nullable(),
  duration: z.number().positive(errors.movie.duration_positive).optional().nullable(),
  revenue: z.number().positive(errors.movie.revenue_positive).optional().nullable(),
  popularity: z.number().min(0, errors.movie.popularity_min).optional().nullable(),
  budget: z.number().positive(errors.movie.budget_positive).optional().nullable(),
  synopsis: z.string().max(1000, errors.movie.synopsis_max).optional().nullable(),
  votes: z.number().min(0, errors.movie.votes_positive).optional().nullable(),
  profit: z.number(errors.movie.profit_number).optional().nullable(),
  background: z.string().url(errors.url).optional().nullable(),
  trailer: z.string().url(errors.url).optional().nullable(),
  cover: z.string().url(errors.url).optional().nullable(),

  release: z
    .string()
    .datetime(errors.movie.release_invalid)
    .transform(date => new Date(date))
    .or(z.date(errors.movie.release_required))
    .optional()
    .nullable()
})

export const validationListMovies = z.object({
  genres: z.array(z.nativeEnum(MovieGenreEnum, errors.movie.genres_invalid)).min(1, errors.movie.genres_required).optional().nullable(),
  name: z.string().min(1, errors.movie.title_min).max(255, errors.movie.title_max).optional().nullable(),
  language: z.nativeEnum(MovieLanguageEnum, errors.movie.language_invalid).optional().nullable(),
  status: z.nativeEnum(MovieStatusEnum, errors.movie.status_invalid).optional().nullable(),
  original_name: z.string().max(255, errors.movie.original_name_max).optional().nullable(),
  release: z.object({ beforeOrEqual: z.date({}), afterOrEqual: z.date({}) }).optional(),

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

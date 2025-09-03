import { z } from 'zod'

import { errors } from '@shared/errors/constants'

const regex_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/

export const validationCreateUser = z.object({
  email: z.string(errors.required_field).max(100, errors.user.email_max).min(6, errors.user.email_min).email(errors.user.email),
  name: z.string(errors.user.name_required).max(100, errors.user.name_max).min(3, errors.user.name_min),

  password: z
    .string(errors.pagination_required)
    .regex(regex_password, errors.user.password_regex)
    .max(16, errors.user.password_max)
    .min(8, errors.user.password_min)
})

export const validationListUsers = z.object({
  email: z.string().max(100, errors.user.email_max).min(6, errors.user.email_min).email(errors.user.email).optional(),
  name: z.string().max(100, errors.user.name_max).min(3, errors.user.name_min).optional(),

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

export const validationAuthenticateUser = z.object({
  email: z.string(errors.required_field).max(100, errors.user.email_max).min(6, errors.user.email_min).email(errors.user.email),

  password: z
    .string(errors.pagination_required)
    .regex(regex_password, errors.user.password_regex)
    .max(16, errors.user.password_max)
    .min(8, errors.user.password_min)
})

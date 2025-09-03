import { z } from 'zod'

import * as validations from '../../validations/validationsMovies'

export type IFindAllMoviesDTO = z.infer<typeof validations.validationListMovies>
export type ICreateMovieDTO = z.infer<typeof validations.validationCreateMovie>
export type IUpdateMovieDTO = z.infer<typeof validations.validationUpdateMovie>

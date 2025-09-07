import type { movieGenre, movieLanguage, movieStatus } from '../../constantes'

export type MovieLanguageEnum = (typeof movieLanguage)[keyof typeof movieLanguage]

export type MovieStatusEnum = (typeof movieStatus)[keyof typeof movieStatus]

export type MovieGenreEnum = (typeof movieGenre)[keyof typeof movieGenre]

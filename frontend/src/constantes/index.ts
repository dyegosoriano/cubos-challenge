export const movieStatus = {
  POST_PRODUCTION: 'Pós-Produção',
  IN_PRODUCTION: 'Em Produção',
  CANCELED: 'Cancelado',
  PLANNED: 'Planejado',
  RELEASED: 'Lançado',
  RUMORED: 'Rumor'
}

export const movieLanguage = {
  PORTUGUESE: 'Português',
  NORWEGIAN: 'Norueguês',
  DANISH: 'Dinamarquês',
  JAPANESE: 'Japonês',
  ITALIAN: 'Italiano',
  SPANISH: 'Espanhol',
  HEBREW: 'Hebraico',
  ENGLISH: 'Inglês',
  CHINESE: 'Chinês',
  FRENCH: 'Francês',
  KOREAN: 'Coreano',
  POLISH: 'Polonês',
  DUTCH: 'Holandês',
  RUSSIAN: 'Russo',
  TURKISH: 'Turco',
  SWEDISH: 'Sueco',
  GERMAN: 'Alemão',
  ARABIC: 'Árabe',
  GREEK: 'Grego',
  HINDI: 'Hindi'
}

export const movieGenre = {
  SCIENCE_FICTION: 'Ficção Científica',
  DOCUMENTARY: 'Documentário',
  BIOGRAPHY: 'Biografia',
  ADVENTURE: 'Aventura',
  ANIMATION: 'Animação',
  THRILLER: 'Suspense',
  WESTERN: 'Faroeste',
  HISTORY: 'História',
  MYSTERY: 'Mistério',
  FANTASY: 'Fantasia',
  ROMANCE: 'Romance',
  FAMILY: 'Família',
  COMEDY: 'Comédia',
  HORROR: 'Terror',
  ACTION: 'Ação',
  SPORT: 'Esporte',
  MUSIC: 'Musical',
  CRIME: 'Crime',
  DRAMA: 'Drama',
  WAR: 'Guerra'
}

export const movieLanguageKeys = Object.keys(movieLanguage) as [keyof typeof movieLanguage, ...Array<keyof typeof movieLanguage>]
export const movieStatusKeys = Object.keys(movieStatus) as [keyof typeof movieStatus, ...Array<keyof typeof movieStatus>]
export const movieGenreKeys = Object.keys(movieGenre) as [keyof typeof movieGenre, ...Array<keyof typeof movieGenre>]

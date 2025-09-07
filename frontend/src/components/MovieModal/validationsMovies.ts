import { z } from 'zod'

import * as constantes from '../../constantes'

const regex_video = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}$/
const regex_image = /^data:image\/(jpeg|jpg|png|gif|webp);base64,/

export const validationCreateMovie = z.object({
  language: z.array(z.enum(constantes.movieLanguage, 'Idioma inválido')).min(1, 'Pelo menos um idioma é obrigatório'),
  genres: z.array(z.enum(constantes.movieGenre, 'Gênero inválido')).min(1, 'Pelo menos um gênero é obrigatório'),
  status: z.enum(constantes.movieStatus, 'Status é obrigatório'),

  title: z.string('Título é obrigatório').min(1, 'Título é obrigatório').max(255, 'Título deve ter no máximo 255 caracteres'),
  name: z.string('Nome é obrigatório').min(1, 'Nome é obrigatório').max(255, 'Nome deve ter no máximo 255 caracteres'),
  original_name: z.string('Nome original é obrigatório').max(255, 'Nome original deve ter no máximo 255 caracteres'),
  synopsis: z.string().max(1000, 'Sinopse deve ter no máximo 1000 caracteres'),

  profit: z.number('Lucro deve ser um número válido').positive('Lucro deve ser um número positivo'),
  popularity: z.number('Popularidade é obrigatória').min(0, 'Popularidade deve ser no mínimo 0'),
  budget: z.number('Orçamento é obrigatório').positive('Orçamento deve ser um número positivo'),
  duration: z.number('Duração é obrigatória').positive('Duração deve ser um número positivo'),
  revenue: z.number('Receita é obrigatória').positive('Receita deve ser um número positivo'),
  votes: z.number('Votos é obrigatório').min(0, 'Votos deve ser no mínimo 0'),

  background: z.string().regex(regex_image, 'Imagem de fundo deve ser uma imagem válida em base64 (jpeg, jpg, png, gif, webp)'),
  cover: z.string().regex(regex_image, 'Capa deve ser uma imagem válida em base64 (jpeg, jpg, png, gif, webp)'),
  trailer: z.string().regex(regex_video, 'URL do trailer deve ser um link válido do YouTube'),

  release: z
    .string()
    .min(1, 'Data de lançamento é obrigatória')
    .refine(date => !isNaN(Date.parse(date)), 'Data de lançamento inválida')
    .transform(date => new Date(date))
    .or(z.date('Data de lançamento é obrigatória'))
})

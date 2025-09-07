import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import { z } from 'zod'

import { validationCreateMovie } from './validationsMovies'
import * as optionsMovies from '../../constantes'
import type { IMovie } from '../../types/IMovie'
import ApiClient from '../../services/ApiClient'
import { toastify } from '../../utils/toast'
import { Container } from '../Container'
import { Button } from '../Button'
import { Input } from '../Input'

type FormData = z.infer<typeof validationCreateMovie>

type IProps = React.ComponentProps<'div'> & {
  mode: 'create' | 'edit'
  movie?: IMovie | null
  onSubmit: () => void
  onClose: () => void
}

export const MovieModal: React.FC<IProps> = input => {
  const [background, setBackground] = useState<string | null>(null)
  const [cover, setCover] = useState<string | null>(null)

  const submitText = input?.mode === 'create' ? 'Adicionar Filme' : 'Editar Filme'
  const title = input?.mode === 'create' ? 'Adicionar Filme' : 'Editar Filme'

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register
  } = useForm<FormData>({
    resolver: zodResolver(validationCreateMovie as any),
    defaultValues: {
      release: (input?.movie?.release ? new Date(input.movie.release).toISOString().split('T')[0] : '') as any,
      original_name: input?.movie?.original_name || '',
      language: (input?.movie?.language || '') as any,
      status: (input?.movie?.status || '') as any,
      genres: (input?.movie?.genres || '') as any,
      popularity: input?.movie?.popularity || 0,
      synopsis: input?.movie?.synopsis || '',
      duration: input?.movie?.duration || 0,
      trailer: input?.movie?.trailer || '',
      revenue: input?.movie?.revenue || 0,
      budget: input?.movie?.budget || 0,
      profit: input?.movie?.profit || 0,
      title: input?.movie?.title || '',
      votes: input?.movie?.votes || 0,
      score: input?.movie?.score || 0,
      name: input?.movie?.name || ''
    }
  })

  const onSubmitForm = async (data: FormData) => {
    try {
      if (!!input?.movie?.id && input?.mode === 'edit') {
        await ApiClient.api.put('movies/' + input?.movie?.id, { ...data, ...(!!background && { background }), ...(!!cover && { cover }) })

        input?.onSubmit()
        input?.onClose()
      }

      if (!input?.movie?.id && input?.mode === 'create') {
        if (!background || !cover) {
          toastify('Por favor, adicione uma imagem de background e uma imagem de capa.', 'error')
          return
        }

        await ApiClient.api.post('movies/', { ...data, background, cover })

        input?.onSubmit()
        input?.onClose()
      }
    } catch (error: any) {
      toastify(error?.response?.status?.message || 'Ocorreu um erro inesperado', 'error')
    }
  }

  return (
    <Container className="fixed top-0 right-0 h-full w-1/2">
      <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col h-full">
        <div className="flex justify-between items-center p-6 border-b border-mauve-6">
          <h2 className="text-xl font-bold">{title}</h2>

          <button
            className="text-mauve-11 hover:text-white transition-colors cursor-pointer text-xl"
            onClick={input?.onClose}
            type="button"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <Input.Container>
                <Input.Label htmlFor="name" text="Nome" />
                <Input.Field {...register('name')} placeholder="Digite o nome do filme" type="text" />
                {!!errors.name?.message && <Input.Error error_message={errors.name?.message} />}
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="original_name" text="Nome Original" />
                <Input.Field {...register('original_name')} placeholder="Digite o nome original do filme" type="text" />
                {!!errors.original_name?.message && <Input.Error error_message={errors.original_name?.message} />}
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="title" text="Título do filme" />
                <Input.Field {...register('title')} placeholder="Digite o título do filme" type="text" />
                {!!errors.title?.message && <Input.Error error_message={errors.title?.message} />}
              </Input.Container>
            </div>

            <Input.Container size="big">
              <Input.Label htmlFor="synopsis" text="Descrição" />
              <Input.TextArea {...register('synopsis')} placeholder="Digite a descrição do filme" />
              {!!errors.synopsis?.message && <Input.Error error_message={errors.synopsis?.message} />}
            </Input.Container>

            <div className="grid gap-6 grid-cols-3">
              <Input.Container>
                <Input.Label htmlFor="genres" text="Gêneros" />
                <Input.Select {...register('genres')} listOptions={optionsMovies.movieGenre} />
                {!!errors.genres?.message && <Input.Error error_message={errors.genres?.message} />}
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="language" text="Idiomas" />
                <Input.Select {...register('language')} listOptions={optionsMovies.movieLanguage} />
                {!!errors.language?.message && <Input.Error error_message={errors.language?.message} />}
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="status" text="Status" />
                <Input.Select {...register('status')} listOptions={optionsMovies.movieStatus} />
                {!!errors.status?.message && <Input.Error error_message={errors.status?.message} />}
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="popularity" text="Popularidade" />
                <Input.Field {...register('popularity', { valueAsNumber: true })} placeholder="Ex: 42.595" type="number" />
                {!!errors.popularity?.message && <Input.Error error_message={errors.popularity?.message} />}
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="votes" text="Votos" />
                <Input.Field {...register('votes', { valueAsNumber: true })} placeholder="Ex: 5704" type="number" />
                {!!errors.votes?.message && <Input.Error error_message={errors.votes?.message} />}
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="score" text="Pontuação" />
                <Input.Field {...register('score', { valueAsNumber: true })} placeholder="Ex: 90" type="number" />
                {!!errors.score?.message && <Input.Error error_message={errors.score?.message} />}
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="budget" text="Orçamento" />
                <Input.Field {...register('budget', { valueAsNumber: true })} placeholder="Ex: 135.00" type="number" />
                {!!errors.budget?.message && <Input.Error error_message={errors.budget?.message} />}
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="revenue" text="Receita" />
                <Input.Field {...register('revenue', { valueAsNumber: true })} placeholder="Ex: 467.99" type="number" />
                {!!errors.revenue?.message && <Input.Error error_message={errors.revenue?.message} />}
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="profit" text="Lucro" />
                <Input.Field {...register('profit', { valueAsNumber: true })} placeholder="Ex: 332.99" type="number" />
                {!!errors.profit?.message && <Input.Error error_message={errors.profit?.message} />}
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="duration" text="Duração (minutos)" />
                <Input.Field {...register('duration', { valueAsNumber: true })} placeholder="Ex: 120" type="number" />
                {!!errors.duration?.message && <Input.Error error_message={errors.duration?.message} />}
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="release" text="Data de Lançamento" />
                <Input.Field {...register('release')} type="date" />
                {!!errors.release?.message && <Input.Error error_message={errors.release?.message} />}
              </Input.Container>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Input.Container>
                <Input.Label htmlFor="cover" text="URL do Poster" />
                <Input.Image onImageSelect={setCover} />
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="background" text="URL do Backdrop" />
                <Input.Image onImageSelect={setBackground} />
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="trailer" text="Trailer URL" />
                <Input.Field {...register('trailer')} placeholder="https://youtube.com/watch?v=..." type="url" />
                {!!errors.trailer?.message && <Input.Error error_message={errors.trailer?.message} />}
              </Input.Container>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 w-4xs ml-auto mt-6">
          <Button type="button" onClick={input?.onClose} color="secondary">
            Cancelar
          </Button>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : submitText}
          </Button>
        </div>
      </form>
    </Container>
  )
}

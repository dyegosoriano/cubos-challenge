import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { z } from 'zod'

import { validationCreateMovie } from './validationsMovies'
import * as optionsMovies from '../../constantes'
import type { IMovie } from '../../types/IMovie'
import { Container } from '../Container'
import { Button } from '../Button'
import { Input } from '../Input'
import ApiClient from '../../services/ApiClient'

type FormData = z.infer<typeof validationCreateMovie>

type IProps = React.ComponentProps<'div'> & {
  mode: 'create' | 'edit'
  movie: IMovie | null
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
    control
  } = useForm<FormData>({
    resolver: zodResolver(validationCreateMovie),
    defaultValues: {
      language: input?.movie?.language || '',
      status: input?.movie?.status || '',
      genres: input?.movie?.genres || '',
      original_name: input?.movie?.original_name || '',
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
      // release: input?.movie?.release || new Date()
    }
  })

  const onSubmitForm = async (data: FormData) => {
    try {
      if (!!input?.movie?.id && input?.mode === 'edit') {
        await ApiClient.api.put('movies/' + input?.movie?.id, { ...data, ...(!!background && { background }), ...(!!cover && { cover }) })
        input?.onSubmit()
        input?.onClose()
      }
    } catch (error) {
      console.error('Erro no submit:', error)
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
                <Controller
                  render={({ field }) => <Input.Field {...field} id="name" placeholder="Digite o nome do filme" type="text" />}
                  control={control}
                  name="name"
                />
                {!!errors.name?.message && <Input.Error error_message={errors.name?.message} />}
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="original_name" text="Nome Original" />
                <Controller
                  render={({ field }) => (
                    <Input.Field {...field} placeholder="Digite o nome original do filme" id="original_name" type="text" />
                  )}
                  name="original_name"
                  control={control}
                />
                {!!errors.original_name?.message && <Input.Error error_message={errors.original_name?.message} />}
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="title" text="Título do filme" />
                <Controller
                  render={({ field }) => <Input.Field {...field} id="title" placeholder="Digite o título do filme" type="text" />}
                  control={control}
                  name="title"
                />
                {!!errors.title?.message && <Input.Error error_message={errors.title?.message} />}
              </Input.Container>
            </div>

            <Input.Container size="big">
              <Input.Label htmlFor="synopsis" text="Descrição" />
              <Controller
                render={({ field }) => <Input.TextArea {...field} id="synopsis" placeholder="Digite a descrição do filme" />}
                control={control}
                name="synopsis"
              />
              {!!errors.synopsis?.message && <Input.Error error_message={errors.synopsis?.message} />}
            </Input.Container>

            <div className="grid gap-6 grid-cols-3">
              <Input.Container>
                <Input.Label htmlFor="genres" text="Gêneros" />
                <Controller
                  render={({ field }) => <Input.Select {...field} id="genres" listOptions={optionsMovies.movieGenre} />}
                  control={control}
                  name="genres"
                />
                {!!errors.genres?.message && <Input.Error error_message={errors.genres?.message} />}
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="language" text="Idiomas" />
                <Controller
                  render={({ field }) => <Input.Select {...field} id="language" listOptions={optionsMovies.movieLanguage} />}
                  control={control}
                  name="language"
                />
                {!!errors.language?.message && <Input.Error error_message={errors.language?.message} />}
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="status" text="Status" />
                <Controller
                  render={({ field }) => <Input.Select {...field} id="status" listOptions={optionsMovies.movieStatus} />}
                  control={control}
                  name="status"
                />
                {!!errors.status?.message && <Input.Error error_message={errors.status?.message} />}
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="popularity" text="Popularidade" />
                <Controller
                  render={({ field }) => <Input.Field {...field} id="popularity" placeholder="Ex: 42.595" type="number" />}
                  control={control}
                  name="popularity"
                />
                {!!errors.popularity?.message && <Input.Error error_message={errors.popularity?.message} />}
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="votes" text="Votos" />
                <Controller
                  render={({ field }) => <Input.Field {...field} id="votes" placeholder="Ex: 5704" type="number" />}
                  control={control}
                  name="votes"
                />
                {!!errors.votes?.message && <Input.Error error_message={errors.votes?.message} />}
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="score" text="Pontuação" />
                <Controller
                  render={({ field }) => <Input.Field {...field} id="score" placeholder="Ex: 90" type="number" />}
                  control={control}
                  name="score"
                />
                {!!errors.score?.message && <Input.Error error_message={errors.score?.message} />}
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="budget" text="Orçamento" />
                <Controller
                  render={({ field }) => <Input.Field {...field} id="budget" placeholder="Ex: 135.00" type="number" />}
                  control={control}
                  name="budget"
                />
                {!!errors.budget?.message && <Input.Error error_message={errors.budget?.message} />}
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="revenue" text="Receita" />
                <Controller
                  render={({ field }) => <Input.Field {...field} id="revenue" placeholder="Ex: 467.99" type="number" />}
                  control={control}
                  name="revenue"
                />
                {!!errors.revenue?.message && <Input.Error error_message={errors.revenue?.message} />}
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="profit" text="Lucro" />
                <Controller
                  render={({ field }) => <Input.Field {...field} id="profit" placeholder="Ex: 332.99" type="number" />}
                  control={control}
                  name="profit"
                />
                {!!errors.profit?.message && <Input.Error error_message={errors.profit?.message} />}
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="duration" text="Duração (minutos)" />
                <Controller
                  control={control}
                  name="duration"
                  render={({ field }) => <Input.Field {...field} placeholder="Ex: 120" type="number" id="duration" />}
                />
                {!!errors.duration?.message && <Input.Error error_message={errors.duration?.message} />}
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="release" text="Data de Lançamento" />
                {/* <Controller name="release" control={control} render={({ field }) => <Input.Field {...field} id="release" type="date" />} /> */}
                {/* {!!errors.release?.message && <Input.Error error_message={errors.release?.message} />} */}
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
                <Controller
                  render={({ field }) => <Input.Field {...field} id="trailer" placeholder="https://youtube.com/watch?v=..." type="url" />}
                  control={control}
                  name="trailer"
                />
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

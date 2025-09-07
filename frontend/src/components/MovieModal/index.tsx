import React from 'react'

import * as optionsMovies from '../../constantes'
import { Container } from '../Container'
import { Button } from '../Button'
import { Input } from '../Input'

type IProps = React.ComponentProps<'div'> & {
  onSubmit: (data: unknown) => void
  mode: 'create' | 'edit'
  onClose: () => void

  movieData?: {
    original_name?: string
    background?: string
    popularity?: number
    synopsis?: string
    language?: string
    duration?: number
    trailer?: string
    release?: string
    revenue?: number
    profit?: number
    status?: string
    genres?: string
    budget?: number
    cover?: string
    title?: string
    votes?: number
    name?: string
  }
}

export const MovieModal: React.FC<IProps> = input => {
  const submitText = input?.mode === 'create' ? 'Adicionar Filme' : 'Editar Filme'
  const title = input?.mode === 'create' ? 'Adicionar Filme' : 'Editar Filme'

  return (
    <Container className="fixed top-0 right-0 h-full w-1/2">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-6 border-b border-mauve-6">
          <h2 className="text-xl font-bold">{title}</h2>

          <button onClick={input?.onClose} className="text-mauve-11 hover:text-white transition-colors cursor-pointer text-xl">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <Input.Container>
                <Input.Label htmlFor="name" text="Nome" />
                <Input.Field id="name" placeholder="Digite o nome do filme" type="text" defaultValue={input?.movieData?.name} />
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="original_name" text="Nome Original" />
                <Input.Field
                  defaultValue={input?.movieData?.original_name}
                  placeholder="Digite o nome original do filme"
                  id="original_name"
                  type="text"
                />
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="title" text="Título do filme" />
                <Input.Field id="title" placeholder="Digite o título do filme" type="text" defaultValue={input?.movieData?.title} />
              </Input.Container>
            </div>

            <Input.Container size="big">
              <Input.Label htmlFor="synopsis" text="Descrição" />
              <Input.TextArea id="synopsis" placeholder="InputTextArea" defaultValue={input?.movieData?.synopsis} />
            </Input.Container>

            <div className="grid gap-6 grid-cols-3">
              <Input.Container>
                <Input.Label htmlFor="genres" text="Gêneros" />
                <Input.Select id="genres" listOptions={optionsMovies.movieGenre} defaultValue={input?.movieData?.genres} />
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="language" text="Idiomas" />
                <Input.Select id="language" listOptions={optionsMovies.movieLanguage} defaultValue={input?.movieData?.language} />
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="status" text="Status" />
                <Input.Select id="status" listOptions={optionsMovies.movieStatus} defaultValue={input?.movieData?.status} />
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="release" text="Data de Lançamento" />
                <Input.Field id="release" type="date" defaultValue={input?.movieData?.release} />
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="duration" text="Duração (minutos)" />
                <Input.Field id="duration" placeholder="Ex: 120" type="number" defaultValue={input?.movieData?.duration} />
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="popularity" text="Popularidade" />
                <Input.Field id="popularity" placeholder="Ex: 42.595" type="number" defaultValue={input?.movieData?.popularity} />
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="votes" text="Votos" />
                <Input.Field id="votes" placeholder="Ex: 5704" type="number" defaultValue={input?.movieData?.votes} />
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="budget" text="Orçamento" />
                <Input.Field id="budget" placeholder="Ex: 135.00" type="number" defaultValue={input?.movieData?.budget} />
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="revenue" text="Receita" />
                <Input.Field id="revenue" placeholder="Ex: 467.99" type="number" defaultValue={input?.movieData?.revenue} />
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="profit" text="Lucro" />
                <Input.Field id="profit" placeholder="Ex: 332.99" type="number" defaultValue={input?.movieData?.profit} />
              </Input.Container>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Input.Container>
                <Input.Label htmlFor="cover" text="URL do Poster" />
                <Input.Field id="cover" placeholder="https://exemplo.com/poster.jpg" type="url" defaultValue={input?.movieData?.cover} />
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="background" text="URL do Backdrop" />
                <Input.Field
                  id="background"
                  placeholder="https://exemplo.com/backdrop.jpg"
                  type="url"
                  defaultValue={input?.movieData?.background}
                />
              </Input.Container>

              <Input.Container>
                <Input.Label htmlFor="trailer" text="Trailer URL" />
                <Input.Field
                  id="trailer"
                  placeholder="https://youtube.com/watch?v=..."
                  type="url"
                  defaultValue={input?.movieData?.trailer}
                />
              </Input.Container>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 w-4xs ml-auto mt-6">
          <Button onClick={input?.onClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={input?.onSubmit}>{submitText}</Button>
        </div>
      </div>
    </Container>
  )
}

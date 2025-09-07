import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { CircularRating } from '../../components/CircularRating'
import { MovieModal } from '../../components/MovieModal'
import { Container } from '../../components/Container'
import * as optionsMovies from '../../constantes'
import type { IMovie } from '../../types/IMovie'
import { Button } from '../../components/Button'
import ApiClient from '../../services/ApiClient'
import { toastify } from '../../utils/toast'

export const Movie = () => {
  const [isOpenEditingModal, setIsOpenEditingModal] = useState(false)
  const [movie, setMovie] = useState<IMovie | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const toggleEditMovieModal = () => setIsOpenEditingModal(prevState => !prevState)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = (await ApiClient.api.get('movies/' + id)) as IMovie
      setMovie(response)
      setIsLoading(false)
    } catch (error: any) {
      toastify(error?.response?.status?.message || 'Ocorreu um erro inesperado ao carregar o filme', 'error')
      navigate('/')
    }
  }

  const handleDeleteMovie = async () => {
    try {
      await ApiClient.api.delete('movies/' + id)
      navigate('/')
    } catch (error: any) {
      toastify(error?.response?.status?.message || 'Ocorreu um erro inesperado ao detetar o filme', 'error')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div className="flex flex-col max-w-7xl h-full mx-auto space-y-8 my-6">
        <div style={{ backgroundImage: `url(${movie?.background})` }} className="bg-cover bg-center bg-no-repeat">
          <div className="bg-gradient-to-r from-black to-transparent space-y-6 p-6">
            <div className="flex justify-between w-full">
              <div>
                <h1 className="text-2xl font-bold">{movie?.name}</h1>
                <p className="text-sm">Titulo origina: {movie?.original_name}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button onClick={handleDeleteMovie} color="secondary">
                  Deletar
                </Button>
                <Button onClick={toggleEditMovieModal}>Editar</Button>
              </div>
            </div>

            <div className="flex gap-6">
              <img className="w-2xs aspect-9/12 object-cover rounded-lg" alt={movie?.original_name} src={movie?.cover} />

              <div className="grid grid-cols-2 gap-6">
                <section className="space-y-6">
                  <h2 className="italic">{movie?.title}</h2>

                  <Container color="secondary">
                    <p>{movie?.synopsis}</p>
                  </Container>

                  <Container color="secondary">
                    <span>Gêneros</span>
                    <div className="flex gap-6">
                      <Container color="third">
                        {optionsMovies.movieGenre[movie?.genres as keyof typeof optionsMovies.movieGenre] || 'Sem gênero definido'}
                      </Container>
                    </div>
                  </Container>
                </section>

                <section className="grid grid-rows-4 gap-6">
                  <div className="flex gap-6">
                    <Container color="secondary">
                      <span className="text-sm uppercase font-extrabold text-mauve-11">Popularidade</span>
                      <span className="text-lg font-bold">{movie?.popularity}</span>
                    </Container>

                    <Container color="secondary">
                      <span className="text-sm uppercase font-extrabold text-mauve-11">Votos</span>
                      <span className="text-lg font-bold">{movie?.votes}</span>
                    </Container>

                    <CircularRating rating={movie?.score || 0} size={100} />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <Container color="secondary">
                      <span className="text-sm uppercase font-extrabold text-mauve-11">Lançamento</span>
                      <span className="text-lg font-bold">
                        {movie?.release ? new Date(movie.release).toLocaleDateString('pt-BR') : 'N/A'}
                      </span>
                    </Container>

                    <Container color="secondary">
                      <span className="text-sm uppercase font-extrabold text-mauve-11">Duração</span>
                      <span className="text-lg font-bold">{movie?.duration} minutos</span>
                    </Container>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <Container color="secondary">
                      <span className="text-sm uppercase font-extrabold text-mauve-11">SITUAÇÃO</span>
                      <span className="text-lg font-bold">
                        {optionsMovies.movieStatus[movie?.status as keyof typeof optionsMovies.movieStatus]}
                      </span>
                    </Container>

                    <Container color="secondary">
                      <span className="text-sm uppercase font-extrabold text-mauve-11">IDIOMA</span>
                      <span className="text-lg font-bold">
                        {optionsMovies.movieLanguage[movie?.language as keyof typeof optionsMovies.movieLanguage]}
                      </span>
                    </Container>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <Container color="secondary">
                      <span className="text-sm uppercase font-extrabold text-mauve-11">Orçamento</span>
                      <span className="text-lg font-bold">${movie?.budget}m</span>
                    </Container>

                    <Container color="secondary">
                      <span className="text-sm uppercase font-extrabold text-mauve-11">Receita</span>
                      <span className="text-lg font-bold">${movie?.revenue}M</span>
                    </Container>

                    <Container color="secondary">
                      <span className="text-sm uppercase font-extrabold text-mauve-11">Lucro</span>
                      <span className="text-lg font-bold">${movie?.profit}M</span>
                    </Container>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Trailer</h3>

          <div className="aspect-video w-full">
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              title={`${movie?.original_name} - Official Trailer`}
              src={movie?.trailer?.replace('watch?v=', 'embed/')}
              className="w-full h-full rounded-lg"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-full">
          <p>Carregando filme...</p>
        </div>
      )}

      {isOpenEditingModal && (
        <div className="flex items-center justify-center fixed inset-0 z-50 backdrop-blur-sm">
          <MovieModal onSubmit={fetchData} onClose={toggleEditMovieModal} mode="edit" movie={movie} />
        </div>
      )}
    </>
  )
}

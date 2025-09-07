import { Link } from 'react-router-dom'
import { useState } from 'react'

import arrowRight from '../../assets/svg/arrow-right.svg'
import arrowLeft from '../../assets/svg/arrow-left.svg'

import { CircularRating } from '../../components/CircularRating'
import { Container } from '../../components/Container'
import * as optionsMovies from '../../constantes'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { MovieModal } from '../../components/MovieModal'

export const Home = () => {
  const [isOpenAddingModal, setIsOpenAddingModal] = useState(false)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  const toggleAddMovieModal = () => setIsOpenAddingModal(prevState => !prevState)
  const toggleFilterModal = () => setIsFilterModalOpen(prevState => !prevState)

  return (
    <>
      <div className="flex flex-col max-w-7xl h-full mx-auto p-4">
        <div className="space-y-6">
          <div className="flex w-full h-12 gap-2">
            <Input.Field id="name" className="w-2xl ml-auto" placeholder="Pesquise por filmes" type="text" />
            <Button color="secondary" onClick={toggleFilterModal}>
              Filtros
            </Button>
            <Button onClick={toggleAddMovieModal}>Adicionar Filme</Button>
          </div>

          <Container>
            <div className="grid grid-cols-2 m-6 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {Array.from({ length: 10 }).map((_, index) => (
                <Link to="/movie">
                  <div
                    className="max-w-2xs w-full bg-mauve-1 aspect-9/12 cursor-pointer rounded-md bg-cover bg-center bg-no-repeat relative"
                    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg)` }}
                    key={index}
                  >
                    <div className="absolute rounded-md inset-0 flex flex-col-reverse h-full w-full bg-gradient-to-t from-black to-transparent">
                      <h2 className="text-center font-extrabold mb-6">Título principal: {index}</h2>
                    </div>

                    <div className="absolute rounded-md inset-0 grid grid-rows-[1fr_60px] h-full w-full bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <CircularRating rating={67} size={100} />

                      <div className="pl-4">
                        <h3 className="font-extrabold">Título secundário: {index}</h3>
                        <p className="text-sm font-light">Ação/Ficção científica</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </div>

        <div className="flex h-10 mx-auto mt-auto gap-2">
          <Button color="paginate">
            <img src={arrowLeft} alt="Listar filmes anteriores" />
          </Button>

          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>

          <Button>
            <img src={arrowRight} alt="Listar próximos filmes" />
          </Button>
        </div>
      </div>

      {(isFilterModalOpen || isOpenAddingModal) && (
        <div className="flex items-center justify-center fixed inset-0 z-50 backdrop-blur-sm">
          {isFilterModalOpen && (
            <Container className="w-3xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Filtros</h2>

                <button onClick={toggleFilterModal} className="text-mauve-11 hover:text-white transition-colors cursor-pointer">
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid gap-6 grid-cols-3">
                  <Input.Container>
                    <Input.Label htmlFor="genres" text="Gênero" />
                    <Input.Select id="genres" listOptions={optionsMovies.movieGenre} />
                  </Input.Container>

                  <Input.Container>
                    <Input.Label htmlFor="language" text="Idioma" />
                    <Input.Select id="language" listOptions={optionsMovies.movieLanguage} />
                  </Input.Container>

                  <Input.Container>
                    <Input.Label htmlFor="status" text="Status" />
                    <Input.Select id="status" listOptions={optionsMovies.movieStatus} />
                  </Input.Container>
                </div>

                <div className="grid gap-2">
                  <label>Busca por período de lançamento</label>

                  <div className="grid gap-6 grid-cols-2">
                    <Input.Container>
                      <Input.Label htmlFor="" text="Data de início" />
                      <Input.Field id="" type="date" />
                    </Input.Container>

                    <Input.Container>
                      <Input.Label htmlFor="" text="Data de término" />
                      <Input.Field id="" type="date" />
                    </Input.Container>
                  </div>
                </div>

                <div className="grid gap-2">
                  <label>Busca por duração</label>

                  <div className="grid gap-6 grid-cols-2">
                    <Input.Container>
                      <Input.Label htmlFor="" text="Duração de início" />
                      <Input.Field id="" placeholder="Ex: 60 minutos " type="number" />
                    </Input.Container>

                    <Input.Container>
                      <Input.Label htmlFor="" text="Duração de término" />
                      <Input.Field id="" placeholder="Ex: 60 minutos " type="number" />
                    </Input.Container>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 w-2xs ml-auto mt-6">
                <Button onClick={toggleFilterModal} color="secondary" className="flex-1">
                  Cancelar
                </Button>

                <Button onClick={toggleFilterModal} className="flex-1">
                  Aplicar Filtros
                </Button>
              </div>
            </Container>
          )}

          {isOpenAddingModal && <MovieModal onSubmit={() => console.log('onSubmit')} onClose={toggleAddMovieModal} mode="create" />}
        </div>
      )}
    </>
  )
}

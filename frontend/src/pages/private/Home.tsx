import { useState } from 'react'

import arrowRight from '../../assets/svg/arrow-right.svg'
import arrowLeft from '../../assets/svg/arrow-left.svg'

import { CircularRating } from '../../components/CircularRating'
import { Container } from '../../components/Container'
import * as optionsMovies from '../../constantes'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

export const Home = () => {
  const [isAddMovieModalOpen, setIsAddMovieModalOpen] = useState(false)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  const toggleAddMovieModal = () => setIsAddMovieModalOpen(prevState => !prevState)
  const toggleFilterModal = () => setIsFilterModalOpen(prevState => !prevState)

  return (
    <>
      <div className="flex flex-col h-full gap-6 p-4">
        <div className="flex gap-2 h-12 ml-auto">
          <Input.Field className="w-2xl" placeholder="Pesquise por filmes" type="text" />
          <Button color="secondary" onClick={toggleFilterModal}>
            Filtros
          </Button>
          <Button onClick={toggleAddMovieModal}>Adicionar Filme</Button>
        </div>

        <Container>
          <div className="grid grid-cols-2 m-6 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                style={{
                  backgroundImage: `url(https://acdn-us.mitiendanube.com/stores/004/687/740/products/pos-03736-0c9fa69c6909c1026017211500446414-1024-1024.webp)`
                }}
                className="w-2xs bg-mauve-1 aspect-9/12 cursor-pointer rounded-md bg-cover bg-center bg-no-repeat relative"
                key={index}
              >
                <div className="absolute inset-0 flex flex-col-reverse h-full w-full bg-gradient-to-t from-black to-transparent hover:opacity-0 transition-opacity duration-300">
                  <h2 className="text-center font-extrabold mb-6">Título principal: {index}</h2>
                </div>

                <div className="absolute inset-0 grid grid-rows-[1fr_60px] h-full w-full bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <CircularRating rating={67} size={100} />

                  <div className="pl-4">
                    <h3 className="font-extrabold">Título secundário: {index}</h3>
                    <p className="text-sm font-light">Ação/Ficção científica</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>

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

      {(isFilterModalOpen || isAddMovieModalOpen) && (
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

          {isAddMovieModalOpen && (
            <Container className="fixed top-0 right-0 h-full w-1/2">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-6 border-b border-mauve-6">
                  <h2 className="text-xl font-bold">Adicionar Filme</h2>

                  <button onClick={toggleAddMovieModal} className="text-mauve-11 hover:text-white transition-colors cursor-pointer text-xl">
                    ✕
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-6">
                      <Input.Container>
                        <Input.Label htmlFor="name" text="Nome" />
                        <Input.Field id="name" placeholder="Digite o nome do filme" type="text" />
                      </Input.Container>

                      <Input.Container>
                        <Input.Label htmlFor="original_name" text="Nome Original" />
                        <Input.Field id="original_name" placeholder="Digite o nome original do filme" type="text" />
                      </Input.Container>

                      <Input.Container>
                        <Input.Label htmlFor="title" text="Título do filme" />
                        <Input.Field id="title" placeholder="Digite o título do filme" type="text" />
                      </Input.Container>
                    </div>

                    <Input.Container size="big">
                      <Input.Label htmlFor="synopsis" text="Descrição" />
                      <Input.TextArea id="synopsis" placeholder="InputTextArea" />
                    </Input.Container>

                    <div className="grid gap-6 grid-cols-3">
                      <Input.Container>
                        <Input.Label htmlFor="genres" text="Gêneros" />
                        <Input.Select id="genres" listOptions={optionsMovies.movieGenre} />
                      </Input.Container>

                      <Input.Container>
                        <Input.Label htmlFor="language" text="Idiomas" />
                        <Input.Select id="language" listOptions={optionsMovies.movieLanguage} />
                      </Input.Container>

                      <Input.Container>
                        <Input.Label htmlFor="status" text="Status" />
                        <Input.Select id="status" listOptions={optionsMovies.movieStatus} />
                      </Input.Container>

                      <Input.Container>
                        <Input.Label htmlFor="release" text="Data de Lançamento" />
                        <Input.Field id="release" type="date" />
                      </Input.Container>

                      <Input.Container>
                        <Input.Label htmlFor="duration" text="Duração (minutos)" />
                        <Input.Field id="duration" placeholder="Ex: 120" type="number" />
                      </Input.Container>

                      <Input.Container>
                        <Input.Label htmlFor="popularity" text="Popularidade" />
                        <Input.Field id="popularity" placeholder="Ex: 42.595" type="number" />
                      </Input.Container>

                      <Input.Container>
                        <Input.Label htmlFor="votes" text="Votos" />
                        <Input.Field id="votes" placeholder="Ex: 5704" type="number" />
                      </Input.Container>

                      <Input.Container>
                        <Input.Label htmlFor="budget" text="Orçamento" />
                        <Input.Field id="budget" placeholder="Ex: 135.00" type="number" />
                      </Input.Container>

                      <Input.Container>
                        <Input.Label htmlFor="revenue" text="Receita" />
                        <Input.Field id="revenue" placeholder="Ex: 467.99" type="number" />
                      </Input.Container>

                      <Input.Container>
                        <Input.Label htmlFor="profit" text="Lucro" />
                        <Input.Field id="profit" placeholder="Ex: 332.99" type="number" />
                      </Input.Container>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <Input.Container>
                        <Input.Label htmlFor="cover" text="URL do Poster" />
                        <Input.Field id="cover" placeholder="https://exemplo.com/poster.jpg" type="url" />
                      </Input.Container>

                      <Input.Container>
                        <Input.Label htmlFor="background" text="URL do Backdrop" />
                        <Input.Field id="background" placeholder="https://exemplo.com/backdrop.jpg" type="url" />
                      </Input.Container>

                      <Input.Container>
                        <Input.Label htmlFor="trailer" text="Trailer URL" />
                        <Input.Field id="trailer" placeholder="https://youtube.com/watch?v=..." type="url" />
                      </Input.Container>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 w-4xs ml-auto mt-6">
                  <Button onClick={toggleAddMovieModal} color="secondary">
                    Cancelar
                  </Button>
                  <Button onClick={toggleAddMovieModal}>Adicionar Filme</Button>
                </div>
              </div>
            </Container>
          )}
        </div>
      )}
    </>
  )
}

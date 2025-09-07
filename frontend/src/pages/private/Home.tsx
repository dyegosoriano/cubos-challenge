import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import arrowRight from '../../assets/svg/arrow-right.svg'
import arrowLeft from '../../assets/svg/arrow-left.svg'

import { CircularRating } from '../../components/CircularRating'
import { MovieModal } from '../../components/MovieModal'
import { Container } from '../../components/Container'
import { useDebounce } from '../../hooks/useDebounce'
import * as optionsMovies from '../../constantes'
import type { IMovie } from '../../types/IMovie'
import { Button } from '../../components/Button'
import ApiClient from '../../services/ApiClient'
import { Input } from '../../components/Input'
import { toastify } from '../../utils/toast'

export const Home = () => {
  const [isOpenAddingModal, setIsOpenAddingModal] = useState(false)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [movies, setMovies] = useState<IMovie[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [totalPages, setTotalPages] = useState(0)

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const toggleAddMovieModal = () => setIsOpenAddingModal(prevState => !prevState)
  const toggleFilterModal = () => setIsFilterModalOpen(prevState => !prevState)

  const fetchData = async (page: number = 1, name?: string) => {
    setIsLoading(true)
    try {
      const params: any = { page, page_size: 10 }
      if (name && name.trim()) {
        params.name = name.trim()
      }

      const response = (await ApiClient.api.get('movies', { params })) as {
        total_pages: number
        results: IMovie[]
        page: number
      }

      setTotalPages(response.total_pages)
      setCurrentPage(response.page)
      setMovies(response.results)
    } catch (error: any) {
      toastify(error?.response?.status?.message || 'Ocorreu um erro inesperado', 'error')
    } finally {
      setIsFilterModalOpen(false)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setCurrentPage(1)
    fetchData(1, debouncedSearchTerm)
  }, [debouncedSearchTerm])

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      fetchData(page, searchTerm)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1)
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1)
  }

  const renderPageNumbers = () => {
    const maxVisiblePages = 3
    const pages = []

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button color={i === currentPage ? 'primary' : 'secondary'} onClick={() => handlePageChange(i)} key={i}>
          {i}
        </Button>
      )
    }

    return pages
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div className="flex flex-col max-w-7xl h-full mx-auto p-4">
        <div className="space-y-6">
          <div className="flex w-full h-12 gap-2">
            <Input.Field
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Pesquise por filmes"
              className="w-2xl ml-auto"
              value={searchTerm}
              type="text"
              id="name"
            />

            <Button color="secondary" onClick={toggleFilterModal}>
              Filtros
            </Button>
            <Button onClick={toggleAddMovieModal}>Adicionar Filme</Button>
          </div>

          <Container>
            {isLoading && (
              <div className="flex justify-center items-center h-64">
                <p>Carregando filmes...</p>
              </div>
            )}

            {!isLoading && (
              <div className="grid grid-cols-2 m-6 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {movies.map(movie => (
                  <Link to={'/movie/' + movie.id} key={movie.id}>
                    <div
                      className="max-w-2xs w-full bg-mauve-1 aspect-9/12 cursor-pointer rounded-md bg-cover bg-center bg-no-repeat relative"
                      style={{ backgroundImage: `url(${movie.cover})` }}
                    >
                      <div className="absolute rounded-md inset-0 flex flex-col-reverse h-full w-full bg-gradient-to-t from-black to-transparent">
                        <h2 className="text-center font-extrabold mb-6">{movie.name}</h2>
                      </div>

                      <div className="absolute rounded-md inset-0 grid grid-rows-[1fr_60px] h-full w-full bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <CircularRating rating={movie?.score} size={100} />

                        <div className="pl-4">
                          <h3 className="font-extrabold">{movie.original_name}</h3>
                          <p className="text-sm font-light">
                            {optionsMovies.movieGenre[movie?.genres as keyof typeof optionsMovies.movieGenre]}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Container>
        </div>

        {totalPages > 1 && (
          <div className="flex h-10 mx-auto mt-auto gap-2">
            <Button color="paginate" onClick={handlePreviousPage} disabled={currentPage === 1}>
              <img src={arrowLeft} alt="Listar filmes anteriores" />
            </Button>

            {renderPageNumbers()}

            <Button color="paginate" onClick={handleNextPage} disabled={currentPage === totalPages}>
              <img src={arrowRight} alt="Listar próximos filmes" />
            </Button>
          </div>
        )}
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

                <Button onClick={() => fetchData(1, searchTerm)} className="flex-1">
                  Aplicar Filtros
                </Button>
              </div>
            </Container>
          )}

          {isOpenAddingModal && <MovieModal onSubmit={() => fetchData(1)} onClose={toggleAddMovieModal} mode="create" />}
        </div>
      )}
    </>
  )
}

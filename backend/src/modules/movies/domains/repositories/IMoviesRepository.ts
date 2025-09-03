import { IFindAllResults } from '@core/types/utils/IFindAllResults'

import { IFindAllMoviesDTO, ICreateMovieDTO, IUpdateMovieDTO } from '../DTOs/IMoviesDTOs'
import { Movie } from '@modules/movies/entities/Movie'

export interface IMoviesRepository {
  create(data: ICreateMovieDTO): Promise<Movie>
  update(id: string, data: IUpdateMovieDTO): Promise<Movie>
  findById(id: string): Promise<Movie | null>
  findAll(data: IFindAllMoviesDTO): Promise<IFindAllResults<Movie>>
  delete(id: string): Promise<void>
}

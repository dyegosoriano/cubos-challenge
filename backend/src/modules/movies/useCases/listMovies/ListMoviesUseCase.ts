import { inject, injectable } from 'tsyringe'

import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider'
import { IResultList } from '@core/types/utils/IResultList'

import { IMoviesRepository } from '../../domains/repositories/IMoviesRepository'
import { validationListMovies } from '../../validations/validationsMovies'
import { IFindAllMoviesDTO } from '../../domains/DTOs/IMoviesDTOs'
import { Movie } from '../../entities/Movie'

@injectable()
export class ListMoviesUseCase {
  constructor(
    @inject('MoviesRepository') private readonly moviesRepository: IMoviesRepository,
    @inject('StorageProvider') private readonly storageProvider: IStorageProvider
  ) {}

  async execute(data: IFindAllMoviesDTO): Promise<IResultList<Movie>> {
    const valid_data = validationListMovies.parse(data)

    const { total, results } = await this.moviesRepository.findAll(valid_data)

    for (const movie of results) {
      const [background, cover] = await Promise.all([
        this.generateUrl('photos', movie?.background),
        this.generateUrl('photos', movie?.cover)
      ])

      Object.assign(movie, { background, cover })
    }

    return {
      total_pages: Math.ceil(total / valid_data.page_size),
      total: total,
      page_size: +valid_data.page_size,
      page: +valid_data.page,
      results: results
    }
  }

  private async generateUrl(type: 'photos' | 'videos', filename: string | null): Promise<string> {
    if (!!filename) return this.storageProvider.getUrl({ type, filename })
    return ''
  }
}

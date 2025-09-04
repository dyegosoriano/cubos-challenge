import { inject, injectable } from 'tsyringe'

import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider'
import { AppError } from '@shared/errors/AppError'

import { IMoviesRepository } from '../../domains/repositories/IMoviesRepository'
import { Movie } from '../../entities/Movie'

@injectable()
export class GetMovieUseCase {
  constructor(
    @inject('MoviesRepository') private readonly moviesRepository: IMoviesRepository,
    @inject('StorageProvider') private readonly storageProvider: IStorageProvider
  ) {}

  async execute(id: string): Promise<Movie> {
    const movie = await this.moviesRepository.findById(id)
    if (!movie) throw new AppError('Movie not found', 404)

    const [background, cover] = await Promise.all([this.generateUrl('photos', movie?.background), this.generateUrl('photos', movie?.cover)])
    Object.assign(movie, { background, cover })

    return movie
  }

  private async generateUrl(type: 'photos' | 'videos', filename: string | null): Promise<string> {
    if (!!filename) return this.storageProvider.getUrl({ type, filename })
    return ''
  }
}

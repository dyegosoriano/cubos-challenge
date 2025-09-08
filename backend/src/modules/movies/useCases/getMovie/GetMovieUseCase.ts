import { inject, injectable } from 'tsyringe'
import z from 'zod'

import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider'
import { AppError } from '@shared/errors/AppError'
import { errors } from '@shared/errors/constants'

import { IMoviesRepository } from '../../domains/repositories/IMoviesRepository'
import { Movie } from '../../entities/Movie'

const validation = z.object({
  owner_id: z.string(errors.required_field).uuid(errors.id),
  id: z.string(errors.required_field).uuid(errors.id)
})

type IRequest = z.infer<typeof validation>

@injectable()
export class GetMovieUseCase {
  constructor(
    @inject('MoviesRepository') private readonly moviesRepository: IMoviesRepository,
    @inject('StorageProvider') private readonly storageProvider: IStorageProvider
  ) {}

  async execute(data: IRequest): Promise<Movie> {
    const valid_data = validation.parse(data)

    const movie = await this.moviesRepository.findById(valid_data.id)
    if (!movie) throw new AppError('Movie not found', 404)
    if (valid_data.owner_id !== movie.owner_id) throw new AppError('You do not have permission to movie.', 401)

    const [background, cover] = await Promise.all([this.generateUrl('photos', movie?.background), this.generateUrl('photos', movie?.cover)])
    Object.assign(movie, { background, cover })

    return movie
  }

  private async generateUrl(type: 'photos' | 'videos', filename: string | null): Promise<string> {
    if (!!filename) return this.storageProvider.getUrl({ type, filename })
    return ''
  }
}

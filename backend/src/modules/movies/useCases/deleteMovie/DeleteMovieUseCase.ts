import { inject, injectable } from 'tsyringe'
import z from 'zod'

import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider'
import { AppError } from '@shared/errors/AppError'
import { errors } from '@shared/errors/constants'

import { IMoviesRepository } from '../../domains/repositories/IMoviesRepository'

const validation = z.object({
  owner_id: z.string(errors.required_field).uuid(errors.id),
  id: z.string(errors.required_field).uuid(errors.id)
})

type IRequest = z.infer<typeof validation>

@injectable()
export class DeleteMovieUseCase {
  constructor(
    @inject('MoviesRepository') private readonly moviesRepository: IMoviesRepository,
    @inject('StorageProvider') private readonly storageProvider: IStorageProvider
  ) {}

  async execute(data: IRequest): Promise<void> {
    const valid_data = validation.parse(data)

    const movie = await this.moviesRepository.findById(valid_data.id)
    if (!movie) throw new AppError('Movie not found', 404)
    if (valid_data.owner_id !== movie.owner_id) throw new AppError('You do not have permission to remove this movie.', 401)

    if (!!movie?.background) await this.storageProvider.delete({ type: 'photos', filename: movie.background })
    if (!!movie?.cover) await this.storageProvider.delete({ type: 'photos', filename: movie.cover })

    await this.moviesRepository.delete(valid_data.id)
  }
}

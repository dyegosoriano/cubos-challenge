import { inject, injectable } from 'tsyringe'
import crypto from 'crypto'
import z from 'zod'

import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider'
import { IUsersRepository } from '@modules/accounts/domains/repositories/IUsersRepository'
import { AppError } from '@shared/errors/AppError'
import { errors } from '@shared/errors/constants'

import { IMoviesRepository } from '../../domains/repositories/IMoviesRepository'
import { validationUpdateMovie } from '../../validations/validationsMovies'
import { IUpdateMovieDTO } from '../../domains/DTOs/IMoviesDTOs'
import { Movie } from '../../entities/Movie'

const validationId = z.object({ id: z.string(errors.required_field).uuid(errors.id) })

@injectable()
export class UpdateMovieUseCase {
  constructor(
    @inject('MoviesRepository') private readonly moviesRepository: IMoviesRepository,
    @inject('StorageProvider') private readonly storageProvider: IStorageProvider,
    @inject('UsersRepository') private readonly usersRepository: IUsersRepository
  ) {}

  async execute(id: string, data: IUpdateMovieDTO): Promise<Movie> {
    const valid_data = validationUpdateMovie.parse(data)
    const valid_id = validationId.parse({ id })

    const userAlreadyExists = await this.usersRepository.findById(valid_data.owner_id)
    if (!userAlreadyExists) throw new AppError('User not exists', 404)

    const movieAlreadyExists = await this.moviesRepository.findById(valid_id.id)
    if (!movieAlreadyExists) throw new AppError('Movie not found', 404)

    if (!!valid_data.background) {
      if (!!movieAlreadyExists?.background) await this.storageProvider.delete({ type: 'photos', filename: movieAlreadyExists.background })
      const filename = crypto.randomBytes(16).toString('hex')
      await this.storageProvider.save({ base64Data: valid_data.background, type: 'photos', filename })
      Object.assign(valid_data, { background: filename })
    }

    if (!!valid_data.cover) {
      if (!!movieAlreadyExists?.cover) await this.storageProvider.delete({ type: 'photos', filename: movieAlreadyExists.cover })
      const filename = crypto.randomBytes(16).toString('hex')
      await this.storageProvider.save({ base64Data: valid_data.cover, type: 'photos', filename })
      Object.assign(valid_data, { cover: filename })
    }

    const movie = await this.moviesRepository.update(valid_id.id, valid_data)

    const [background, cover] = await Promise.all([this.generateUrl('photos', movie?.background), this.generateUrl('photos', movie?.cover)])
    Object.assign(movie, { background, cover })

    return movie
  }

  private async generateUrl(type: 'photos' | 'videos', filename: string | null): Promise<string> {
    if (!!filename) return this.storageProvider.getUrl({ type, filename })
    return ''
  }
}

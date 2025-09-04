import { injectable, inject } from 'tsyringe'
import crypto from 'crypto'

import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider'
import { IUsersRepository } from '@modules/accounts/domains/repositories/IUsersRepository'
import { AppError } from '@shared/errors/AppError'

import { IMoviesRepository } from '../../domains/repositories/IMoviesRepository'
import { validationCreateMovie } from '../../validations/validationsMovies'
import { ICreateMovieDTO } from '../../domains/DTOs/IMoviesDTOs'
import { Movie } from '../../entities/Movie'

@injectable()
export class CreateMovieUseCase {
  constructor(
    @inject('MoviesRepository') private readonly moviesRepository: IMoviesRepository,
    @inject('StorageProvider') private readonly storageProvider: IStorageProvider,
    @inject('UsersRepository') private readonly usersRepository: IUsersRepository
  ) {}

  async execute(data: ICreateMovieDTO): Promise<Movie> {
    const valid_data = validationCreateMovie.parse(data)

    const userAlreadyExists = await this.usersRepository.findById(valid_data.owner_id)
    if (!userAlreadyExists) throw new AppError('User not exists', 404)

    if (!!valid_data.cover) {
      const filename = crypto.randomBytes(16).toString('hex')
      await this.storageProvider.save({ base64Data: valid_data.cover, type: 'photos', filename })
      Object.assign(valid_data, { cover: filename })
    }

    if (!!valid_data.background) {
      const filename = crypto.randomBytes(16).toString('hex')
      await this.storageProvider.save({ base64Data: valid_data.background, type: 'photos', filename })
      Object.assign(valid_data, { background: filename })
    }

    const movie = await this.moviesRepository.create(valid_data)

    const [background, cover] = await Promise.all([this.generateUrl('photos', movie?.background), this.generateUrl('photos', movie?.cover)])
    Object.assign(movie, { background, cover })

    return movie
  }

  private async generateUrl(type: 'photos' | 'videos', filename: string | null): Promise<string> {
    if (!!filename) return this.storageProvider.getUrl({ type, filename })
    return ''
  }
}

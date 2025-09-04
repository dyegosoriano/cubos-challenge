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
      const cover = await this.storageProvider.save({
        filename: crypto.randomBytes(16).toString('hex'),
        base64Data: valid_data.cover,
        type: 'photos'
      })

      Object.assign(valid_data, { cover })
    }

    if (!!valid_data.background) {
      const background = await this.storageProvider.save({
        filename: crypto.randomBytes(16).toString('hex'),
        base64Data: valid_data.background,
        type: 'photos'
      })

      Object.assign(valid_data, { background })
    }

    return await this.moviesRepository.create(valid_data)
  }
}

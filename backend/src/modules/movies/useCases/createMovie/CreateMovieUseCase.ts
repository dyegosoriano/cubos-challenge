import { injectable, inject } from 'tsyringe'

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
    @inject('UsersRepository') private readonly usersRepository: IUsersRepository
  ) {}

  async execute(data: ICreateMovieDTO): Promise<Movie> {
    const valid_data = validationCreateMovie.parse(data)

    const userAlreadyExists = await this.usersRepository.findById(valid_data.owner_id)
    if (!userAlreadyExists) throw new AppError('User not exists', 404)

    return await this.moviesRepository.create(valid_data)
  }
}

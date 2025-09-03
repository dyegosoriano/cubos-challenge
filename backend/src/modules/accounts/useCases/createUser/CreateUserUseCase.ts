import { inject, injectable } from 'tsyringe'

import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider'
import { IUseCase } from '@core/types/structures/IUseCase'
import { AppError } from '@shared/errors/AppError'

import { ICreateUserDTO, IUserResponseDTO } from '../../domains/DTOs/IUsersDTOs'
import { IUsersRepository } from '../../domains/repositories/IUsersRepository'
import { validationCreateUser } from '../../validations/validationsUsers'
import { UserMap } from '../../mappers/UserMap'

@injectable()
export class CreateUserUseCase implements IUseCase<IUserResponseDTO> {
  constructor(
    @inject('UsersRepository') private readonly usersRepository: IUsersRepository,
    @inject('HashProvider') private readonly hashProvider: IHashProvider
  ) {}

  async execute(data: ICreateUserDTO) {
    const valid_data = validationCreateUser.parse(data)

    const userAlreadyExists = await this.usersRepository.findByEmail(valid_data.email)
    if (userAlreadyExists) throw new AppError('User already exists')

    const hashedPassword = await this.hashProvider.generateHash(valid_data.password)

    const user = await this.usersRepository.create({ ...valid_data, password: hashedPassword })

    return UserMap.toDTO(user)
  }
}

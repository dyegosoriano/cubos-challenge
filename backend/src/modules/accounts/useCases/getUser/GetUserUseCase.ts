import { inject, injectable } from 'tsyringe'
import { z } from 'zod'

import { IUseCase } from '@core/types/structures/IUseCase'
import { AppError } from '@shared/errors/AppError'
import { errors } from '@shared/errors/constants'

import { IUsersRepository } from '../../domains/repositories/IUsersRepository'
import { IUserResponseDTO } from '../../domains/DTOs/IUsersDTOs'
import { UserMap } from '../../mappers/UserMap'

const validationId = z.object({ id: z.string().uuid(errors.id) })

type IRequest = z.infer<typeof validationId>

@injectable()
export class GetUserUseCase implements IUseCase<IUserResponseDTO> {
  constructor(@inject('UsersRepository') private readonly usersRepository: IUsersRepository) {}

  async execute(data: IRequest) {
    const valid_data = validationId.parse(data)

    const user = await this.usersRepository.findById(valid_data.id)

    if (!user) throw new AppError('User does not exists', 404)

    return UserMap.toDTO(user)
  }
}

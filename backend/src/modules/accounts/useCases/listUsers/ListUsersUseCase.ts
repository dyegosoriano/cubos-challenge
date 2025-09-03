import { inject, injectable } from 'tsyringe'

import { IResultList } from '@core/types/utils/IResultList'
import { IUseCase } from '@core/types/structures/IUseCase'

import { IFindAllUsersDTO, IUserResponseDTO } from '../../domains/DTOs/IUsersDTOs'
import { IUsersRepository } from '../../domains/repositories/IUsersRepository'
import { validationListUsers } from '../../validations/validationsUsers'
import { UserMap } from '../../mappers/UserMap'

@injectable()
export class ListUsersUseCase implements IUseCase<IResultList<IUserResponseDTO>> {
  constructor(@inject('UsersRepository') private readonly usersRepository: IUsersRepository) {}

  async execute(data: IFindAllUsersDTO) {
    const valid_data = validationListUsers.parse(data)

    const { total, results } = await this.usersRepository.findAll(valid_data)

    return {
      total_pages: Math.ceil(total / valid_data.page_size),
      total: total,
      page_size: +valid_data.page_size,
      page: +valid_data.page,
      results: results.map(user => UserMap.toDTO(user))
    }
  }
}

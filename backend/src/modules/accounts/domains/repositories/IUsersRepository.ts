import { IFindAllResults } from '@core/types/utils/IFindAllResults'

import { ICreateUserDTO, IFindAllUsersDTO } from '../DTOs/IUsersDTOs'
import { User } from '../../entities/User'

export interface IUsersRepository {
  findAll(data: IFindAllUsersDTO): Promise<IFindAllResults<User>>
  findByEmail(email: string): Promise<User | null>
  create(data: ICreateUserDTO): Promise<User>
  findById(id: string): Promise<User | null>
}

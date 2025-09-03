import { filterObject } from '@shared/utils'

import { IUserResponseDTO } from '../domains/DTOs/IUsersDTOs'
import { User } from '../entities/User'

export class UserMap {
  static toDTO (data: User): IUserResponseDTO {
    const user = filterObject(data, ['password'])
    return user
  }
}

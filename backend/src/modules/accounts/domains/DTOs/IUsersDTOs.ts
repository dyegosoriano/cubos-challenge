import { z } from 'zod'

import * as validations from '../../validations/validationsUsers'
import { User } from '../../entities/User'

export type IFindAllUsersDTO = z.infer<typeof validations.validationListUsers>
export type ICreateUserDTO = z.infer<typeof validations.validationCreateUser>

export type IUserResponseDTO = Omit<User, 'password'>

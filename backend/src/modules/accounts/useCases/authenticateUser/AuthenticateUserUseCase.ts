import { inject, injectable } from 'tsyringe'
import { sign } from 'jsonwebtoken'
import { z } from 'zod'

import { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider'
import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider'
import { IUseCase } from '@core/types/structures/IUseCase'
import { AppError } from '@shared/errors/AppError'
import { config_auth } from '@core/config/auth'

import { IRefreshTokensRepository } from '../../domains/repositories/IRefreshTokensRepository'
import { IUsersRepository } from '../../domains/repositories/IUsersRepository'
import { validationAuthenticateUser } from '../../validations/validationsUsers'
import { IUserResponseDTO } from '../../domains/DTOs/IUsersDTOs'
import { UserMap } from '../../mappers/UserMap'

type IAuthentication = { authentication: { refresh_token: string; token: string } }
type IRequest = z.infer<typeof validationAuthenticateUser>

@injectable()
export class AuthenticateUserUseCase implements IUseCase<IUserResponseDTO & IAuthentication> {
  constructor(
    @inject('RefreshTokensRepository') private readonly refreshTokensRepository: IRefreshTokensRepository,
    @inject('UsersRepository') private readonly usersRepository: IUsersRepository,
    @inject('HashProvider') private readonly hashProvider: IHashProvider,
    @inject('DateProvider') private readonly dateProvider: IDateProvider
  ) {}

  async execute(data: IRequest): Promise<IUserResponseDTO & IAuthentication> {
    const valid_data = validationAuthenticateUser.parse(data)

    const user = await this.usersRepository.findByEmail(valid_data.email)
    if (!user) throw new AppError('User or password does not match')

    const passwordMatched = await this.hashProvider.compareHash(valid_data.password, user.password)
    if (!passwordMatched) throw new AppError('User or password does not match')

    await this.refreshTokensRepository.deleteAllByUserId(user.id)

    const expires_date = this.dateProvider.addDays(config_auth.auth.expires_refresh_token_days)

    const { refresh_token } = await this.refreshTokensRepository.create({ user_id: user.id, expires_date })

    const token = sign({ roles: user.roles }, config_auth.auth.secret_token, {
      subject: user.id,
      expiresIn: '1h'
    })

    const response = UserMap.toDTO(user)

    return {
      ...response,
      authentication: { refresh_token, token }
    }
  }
}

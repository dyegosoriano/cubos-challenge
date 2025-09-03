import { inject, injectable } from 'tsyringe'
import { sign } from 'jsonwebtoken'
import { z } from 'zod'

import { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider'
import { IUseCase } from '@core/types/structures/IUseCase'
import { AppError } from '@shared/errors/AppError'
import { errors } from '@shared/errors/constants'
import { config_auth } from '@core/config/auth'

import { IRefreshTokensRepository } from '../../domains/repositories/IRefreshTokensRepository'
import { IUsersRepository } from '../../domains/repositories/IUsersRepository'

const validationRefreshToken = z.object({ refresh_token: z.string().uuid(errors.id) })

type IRequest = z.infer<typeof validationRefreshToken>
type IResponse = { token: string }

@injectable()
export class RefreshTokenUseCase implements IUseCase<IResponse> {
  constructor(
    @inject('RefreshTokensRepository') private readonly refreshTokensRepository: IRefreshTokensRepository,
    @inject('UsersRepository') private readonly usersRepository: IUsersRepository,
    @inject('DateProvider') private readonly dateProvider: IDateProvider
  ) {}

  async execute(data: IRequest) {
    const valid_data = validationRefreshToken.parse(data)

    const refreshTokenAlreadyExists = await this.refreshTokensRepository.findByRefreshToken(valid_data)
    if (!refreshTokenAlreadyExists) throw new AppError('Refresh token does not exist')

    const user = await this.usersRepository.findById(refreshTokenAlreadyExists.user_id)
    const { expires_date, user_id } = refreshTokenAlreadyExists
    const dateNow = this.dateProvider.dateNow()

    const tokenExpired = this.dateProvider.compareIfAfter(dateNow, expires_date)
    if (tokenExpired) throw new AppError('Refresh token expired')

    return {
      token: sign({ roles: user?.roles }, config_auth.auth.secret_token, {
        subject: user_id,
        expiresIn: '1h'
      })
    }
  }
}

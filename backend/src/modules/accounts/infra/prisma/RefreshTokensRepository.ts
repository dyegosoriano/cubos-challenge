import { prisma } from '@infra/prisma/client'

import { ICreateRefreshTokensDTO, IFindByRefreshTokensDTO } from '../../domains/DTOs/IRefreshTokensDTOs'
import { IRefreshTokensRepository } from '../../domains/repositories/IRefreshTokensRepository'
import { RefreshToken } from '../../entities/RefreshToken'

export class RefreshTokensRepository implements IRefreshTokensRepository {
  async create({ expires_date, user_id }: ICreateRefreshTokensDTO): Promise<RefreshToken> {
    const refreshToken = new RefreshToken()

    Object.assign(refreshToken, { expires_date, user_id })

    return await prisma.refreshTokens.create({ data: refreshToken })
  }

  async findByRefreshToken({ refresh_token, user_id }: IFindByRefreshTokensDTO): Promise<RefreshToken> {
    return (await prisma.refreshTokens.findFirst({ where: { refresh_token, user_id } })) as RefreshToken
  }

  async deleteAllByUserId(user_id: string): Promise<void> {
    await prisma.refreshTokens.deleteMany({ where: { user_id } })
  }

  async delete(id: string): Promise<void> {
    await prisma.refreshTokens.delete({ where: { id } })
  }
}

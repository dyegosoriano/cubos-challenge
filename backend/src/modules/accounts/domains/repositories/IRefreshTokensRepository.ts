import { ICreateRefreshTokensDTO, IFindByRefreshTokensDTO } from '../DTOs/IRefreshTokensDTOs'
import { RefreshToken } from '../../entities/RefreshToken'

export interface IRefreshTokensRepository {
  findByRefreshToken({ refresh_token, user_id }: IFindByRefreshTokensDTO): Promise<RefreshToken>
  create({ expires_date, user_id }: ICreateRefreshTokensDTO): Promise<RefreshToken>
  deleteAllByUserId(user_id: string): Promise<void>
  delete(id: string): Promise<void>
}

import { container } from 'tsyringe'

import '@shared/container/providers'

import { IRefreshTokensRepository } from '@modules/accounts/domains/repositories/IRefreshTokensRepository'
import { IUsersRepository } from '@modules/accounts/domains/repositories/IUsersRepository'
import { RefreshTokensRepository } from '@modules/accounts/infra/prisma/RefreshTokensRepository'
import { UsersRepository } from '@modules/accounts/infra/prisma/UsersRepository'

container.registerSingleton<IRefreshTokensRepository>('RefreshTokensRepository', RefreshTokensRepository)
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)

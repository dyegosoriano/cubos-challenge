import { container } from 'tsyringe'

import '@shared/container/providers'

import { IRefreshTokensRepository } from '@modules/accounts/domains/repositories/IRefreshTokensRepository'
import { RefreshTokensRepository } from '@modules/accounts/infra/prisma/RefreshTokensRepository'
import { IMoviesRepository } from '@modules/movies/domains/repositories/IMoviesRepository'
import { IUsersRepository } from '@modules/accounts/domains/repositories/IUsersRepository'
import { MoviesRepository } from '@modules/movies/infra/prisma/MoviesRepository'
import { UsersRepository } from '@modules/accounts/infra/prisma/UsersRepository'

container.registerSingleton<IRefreshTokensRepository>('RefreshTokensRepository', RefreshTokensRepository)
container.registerSingleton<IMoviesRepository>('MoviesRepository', MoviesRepository)
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)

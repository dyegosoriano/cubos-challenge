import { IFindAllResults } from '@core/types/utils/IFindAllResults'
import { prisma } from '@infra/prisma/client'

import { ICreateUserDTO, IFindAllUsersDTO } from '../../domains/DTOs/IUsersDTOs'
import { IUsersRepository } from '../../domains/repositories/IUsersRepository'
import { User } from '../../entities/User'

export class UsersRepository implements IUsersRepository {
  async create({ password, email, name }: ICreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, { password, email, name })

    return await prisma.users.create({ data: user })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.users.findUnique({ where: { email } })
  }

  async findById(id: string): Promise<User | null> {
    return await prisma.users.findUnique({ where: { id } })
  }

  async findAll({ page_size = 10, page = 1, ...filters }: IFindAllUsersDTO): Promise<IFindAllResults<User>> {
    const where = {}

    if (!!filters.email) Object.assign(where, { email: { contains: filters.email, mode: 'insensitive' } })
    if (!!filters.name) Object.assign(where, { name: { contains: filters.name, mode: 'insensitive' } })

    const [total, results] = await prisma.$transaction([
      prisma.users.count({ where }),
      prisma.users.findMany({
        skip: +page === 0 || +page === 1 ? 0 : page * page_size,
        orderBy: { created_at: 'asc' },
        take: +page_size,
        where
      })
    ])

    return { total, results }
  }
}

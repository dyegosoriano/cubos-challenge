import { Prisma } from '@prisma/client'

import { IFindAllResults } from '@core/types/utils/IFindAllResults'
import { prisma } from '@infra/prisma/client'

import { ICreateMovieDTO, IUpdateMovieDTO, IFindAllMoviesDTO } from '../../domains/DTOs/IMoviesDTOs'
import { IMoviesRepository } from '../../domains/repositories/IMoviesRepository'
import { Movie } from '../../entities/Movie'

export class MoviesRepository implements IMoviesRepository {
  async create(data: ICreateMovieDTO): Promise<Movie> {
    const movie = new Movie()

    Object.assign(movie, { ...data })

    return (await prisma.movies.create({ data: movie })) as Movie
  }

  async update(id: string, data: IUpdateMovieDTO): Promise<Movie> {
    return (await prisma.movies.update({ where: { id }, data: { ...(data as any) } })) as Movie
  }

  async delete(id: string): Promise<void> {
    await prisma.movies.delete({ where: { id } })
  }

  async findById(id: string): Promise<Movie | null> {
    return (await prisma.movies.findUnique({ where: { id } })) as Movie | null
  }

  async findAll({ page_size = 10, page = 1, ...filters }: IFindAllMoviesDTO): Promise<IFindAllResults<Movie>> {
    const where: Prisma.MoviesWhereInput = {}

    if (!!filters?.duration_before || !!filters?.duration_after) {
      where.duration = {
        ...(!!filters?.duration_before && { lte: filters.duration_before }),
        ...(!!filters?.duration_after && { gte: filters.duration_after })
      }
    }

    if (!!filters?.release_before || !!filters?.release_after) {
      where.release = {
        ...(!!filters?.release_before && { lte: filters.release_before }),
        ...(!!filters?.release_after && { gte: filters.release_after })
      }
    }

    if (!!filters?.original_name) where.original_name = { contains: filters.original_name, mode: 'insensitive' }
    if (!!filters?.name) where.name = { contains: filters.name, mode: 'insensitive' }
    if (!!filters?.language) where.language = filters.language
    if (!!filters?.owner_id) where.owner_id = filters.owner_id
    if (!!filters?.genres) where.genres = filters.genres
    if (!!filters?.status) where.status = filters.status

    const [total, results] = await prisma.$transaction([
      prisma.movies.count({ where }),
      prisma.movies.findMany({
        skip: (page - 1) * page_size,
        orderBy: { created_at: 'asc' },
        take: +page_size,
        where
      })
    ])

    return { total, results } as IFindAllResults<Movie>
  }
}

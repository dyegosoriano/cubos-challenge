import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListMoviesUseCase } from './ListMoviesUseCase'

export class ListMoviesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { query, user } = request

    const listMoviesUseCase = container.resolve(ListMoviesUseCase)
    const movies = await listMoviesUseCase.execute({ ...(query as any), owner_id: user.id })

    return response.status(200).json(movies)
  }
}

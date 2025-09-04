import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListMoviesUseCase } from './ListMoviesUseCase'

export class ListMoviesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { query } = request

    const listMoviesUseCase = container.resolve(ListMoviesUseCase)
    const movies = await listMoviesUseCase.execute(query)

    return response.status(200).json(movies)
  }
}

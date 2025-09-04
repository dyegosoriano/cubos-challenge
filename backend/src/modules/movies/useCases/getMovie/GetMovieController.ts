import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetMovieUseCase } from './GetMovieUseCase'

export class GetMovieController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getMovieUseCase = container.resolve(GetMovieUseCase)
    const movie = await getMovieUseCase.execute(request.params.id)

    return response.status(200).json(movie)
  }
}

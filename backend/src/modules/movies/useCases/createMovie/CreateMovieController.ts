import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateMovieUseCase } from './CreateMovieUseCase'

export class CreateMovieController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { body, user } = request

    const createMovieUseCase = container.resolve(CreateMovieUseCase)
    const movie = await createMovieUseCase.execute({ ...body, owner_id: user.id })

    return response.status(201).json(movie)
  }
}

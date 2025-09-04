import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UpdateMovieUseCase } from './UpdateMovieUseCase'

export class UpdateMovieController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { params, body, user } = request

    const updateMovieUseCase = container.resolve(UpdateMovieUseCase)
    const movie = await updateMovieUseCase.execute(params.id, { ...body, owner_id: user.id })

    return response.status(200).json(movie)
  }
}

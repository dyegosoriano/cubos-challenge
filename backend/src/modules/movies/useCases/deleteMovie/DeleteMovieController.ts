import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { DeleteMovieUseCase } from './DeleteMovieUseCase'

export class DeleteMovieController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { params, user } = request

    const deleteMovieUseCase = container.resolve(DeleteMovieUseCase)
    await deleteMovieUseCase.execute({ owner_id: user.id, id: params.id })

    return response.status(200).json({ message: 'Movie deleted' })
  }
}

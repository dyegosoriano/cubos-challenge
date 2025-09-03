import { Router } from 'express'

import { ensureAuthenticate } from '@infra/express/middlewares/ensureAuthenticate'

import { CreateMovieController } from '../../useCases/createMovie/CreateMovieController'

const createMovieController = new CreateMovieController()

const path_route = '/movies'
const routes = Router()

routes.use(ensureAuthenticate).post(path_route, createMovieController.handle)

export { routes }

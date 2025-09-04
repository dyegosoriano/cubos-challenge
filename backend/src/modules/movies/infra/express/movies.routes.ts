import { Router } from 'express'

import { ensureAuthenticate } from '@infra/express/middlewares/ensureAuthenticate'

import { CreateMovieController } from '../../useCases/createMovie/CreateMovieController'
import { ListMoviesController } from '../../useCases/listMovies/ListMoviesController'
import { GetMovieController } from '../../useCases/getMovie/GetMovieController'

const createMovieController = new CreateMovieController()
const listMoviesController = new ListMoviesController()
const getMovieController = new GetMovieController()

const path_route = '/movies'
const routes = Router()

routes
  .use(ensureAuthenticate)
  .get(path_route + '/:id', getMovieController.handle)
  .post(path_route, createMovieController.handle)
  .get(path_route, listMoviesController.handle)

export { routes }

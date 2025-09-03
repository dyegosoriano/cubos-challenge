import { Router } from 'express'

import { ensureAuthenticate } from '@infra/express/middlewares/ensureAuthenticate'

import { CreateUserController } from '../../useCases/createUser/CreateUserController'
import { ListUsersController } from '../../useCases/listUsers/ListUsersController'
import { GetUserController } from '../../useCases/getUser/GetUserController'

const createUserController = new CreateUserController()
const listUsersController = new ListUsersController()
const getUserController = new GetUserController()

const path_route = '/users'
const routes = Router()

routes
  .post(path_route, createUserController.handle)
  .use(ensureAuthenticate)
  .get(path_route + '/:id', getUserController.handle)
  .get(path_route, listUsersController.handle)

export { routes }

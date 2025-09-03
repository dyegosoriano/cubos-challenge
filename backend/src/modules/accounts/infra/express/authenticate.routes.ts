import { Router } from 'express'

import { AuthenticateUserController } from '../../useCases/authenticateUser/AuthenticateUserController'
import { RefreshTokenController } from '../../useCases/refreshToken/RefreshTokenController'

const authenticateUserController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()

const path_route = '/authenticate'
const routes = Router()

routes.post(path_route + '/refresh-token', refreshTokenController.handle).post(path_route + '/login', authenticateUserController.handle)

export { routes }

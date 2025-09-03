import { Router, Response } from 'express'

import { ensureAuthenticate } from '@infra/express/middlewares/ensureAuthenticate'

const path_route = '/movies'
const routes = Router()

routes.use(ensureAuthenticate).get(path_route, (_, res: Response) => res.status(200).json({ message: 'Movies module' }))

export { routes }

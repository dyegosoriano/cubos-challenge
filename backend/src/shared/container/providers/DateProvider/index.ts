import { container } from 'tsyringe'

import { NodeDateProvider } from './implementations/NodeDateProvider'
import { IDateProvider } from './models/IDateProvider'

container.registerSingleton<IDateProvider>('DateProvider', NodeDateProvider)

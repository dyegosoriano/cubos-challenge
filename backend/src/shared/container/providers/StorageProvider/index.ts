import { container } from 'tsyringe'

import { S3StorageProvider } from './implementations/S3StorageProvider'
import { IStorageProvider } from './IStorageProvider'

container.registerSingleton<IStorageProvider>('StorageProvider', S3StorageProvider)

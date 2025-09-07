import { BrowserRouter } from 'react-router-dom'
import React from 'react'

import { PrivateRoutes } from './routes.private'
import { PublicRoutes } from './routes.public'
import { useAuth } from '../hooks/useAuth'

export const Routes: React.FC = () => {
  const { signed } = useAuth()

  return <BrowserRouter>{signed ? <PrivateRoutes /> : <PublicRoutes />}</BrowserRouter>
}

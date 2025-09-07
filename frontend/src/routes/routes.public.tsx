import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { CreateAccount } from '../pages/public/CreateAccount'
import { Login } from '../pages/public/Login'

export const PublicRoutes: React.FC = () => (
  <Routes>
    <Route path="/create-account" element={<CreateAccount />} />
    <Route path="/" element={<Login />} />
  </Routes>
)

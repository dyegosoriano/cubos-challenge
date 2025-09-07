import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Movie } from '../pages/private/Movie'
import { Home } from '../pages/private/Home'

export const PrivateRoutes: React.FC = () => (
  <Routes>
    <Route path="/movie/:id" element={<Movie />} />
    <Route path="/" element={<Home />} />
  </Routes>
)

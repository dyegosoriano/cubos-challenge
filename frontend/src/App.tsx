import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { CreateAccount } from './pages/public/CreateAccount'
import { MainContainer } from './components/MainContainer'
import { Movie } from './pages/private/Movie'
import { Login } from './pages/public/Login'
import { Home } from './pages/private/Home'

export const App = () => {
  return (
    <MainContainer>
      <Router>
        <Routes>
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </MainContainer>
  )
}

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { CreateAccount } from './pages/public/CreateAccount'
import { MainContainer } from './components/MainContainer'
import { Login } from './pages/public/Login'

export const App = () => {
  return (
    <MainContainer>
      <Router>
        <Routes>
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </MainContainer>
  )
}

import { ToastContainer } from 'react-toastify'

import { MainContainer } from './components/MainContainer'
import { AuthProvider } from './context/AuthContext'
import { Routes } from './routes'

export const App = () => {
  return (
    <>
      <AuthProvider>
        <MainContainer>
          <Routes />
        </MainContainer>
      </AuthProvider>

      <ToastContainer />
    </>
  )
}

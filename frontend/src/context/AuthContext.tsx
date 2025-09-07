import React, { createContext, useState, useEffect } from 'react'

import ApiClient from '../services/ApiClient'
import type { IUser } from '../types/IUser'
import { toastify } from '../utils/toast'

type ILoginResponse = IUser & { authentication: { refresh_token: string; token: string } }
type ILoginPayload = { password: string; email: string }

interface IAuthenticateContext {
  handleSignIn({ password, email }: ILoginPayload): Promise<IUser | void>
  handleSignOut(): void
  user: IUser | null
  signed: boolean
}

interface IAuthProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext<IAuthenticateContext>({} as IAuthenticateContext)

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [signed, setSigned] = useState<boolean>(false)
  const [user, setUser] = useState<IUser | null>(null)

  async function handleSignIn({ email, password }: ILoginPayload) {
    try {
      const response = (await ApiClient.api.post('authenticate/login', { email, password })) as ILoginResponse
      const { authentication, ...user } = response

      localStorage.setItem('@tokens', JSON.stringify({ refresh_token: authentication?.refresh_token, token: authentication?.token }))
      localStorage.setItem('@user', JSON.stringify(user))

      ApiClient.setTokenInHeader(authentication?.token)
      setSigned(true)
      setUser(user)
    } catch (error: any) {
      toastify(error?.response?.status?.message || 'Ocorreu um erro ao tentar fazer login', 'error')
      handleSignOut()
    }
  }

  function handleSignOut() {
    setSigned(false)
    setUser(null)

    window.location.href = '/'
    localStorage.clear()
  }

  function loadStorageData() {
    const tokensStorage = localStorage.getItem('@tokens')
    const userStorage = localStorage.getItem('@user')

    if (tokensStorage && userStorage) {
      const { token } = JSON.parse(tokensStorage)
      const user = JSON.parse(userStorage)

      ApiClient.setTokenInHeader(token)

      setSigned(true)
      setUser(user)
    }
  }

  useEffect(() => loadStorageData(), [])

  return (
    <AuthContext.Provider
      value={{
        handleSignOut,
        handleSignIn,
        signed,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }

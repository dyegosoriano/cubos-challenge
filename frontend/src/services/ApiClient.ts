import axios, { type AxiosRequestConfig, Axios, AxiosError } from 'axios'
import { jwtDecode } from 'jwt-decode'

interface ITokens {
  refresh_token: string
  token: string
}

let tokens: ITokens | null = null
let fetchingRefreshToken = false

class ApiClient {
  api: Axios

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      responseType: 'json',
      timeout: 60000
    })

    this.api.interceptors.request.use(async request => await this.refreshToken(request))

    this.api.interceptors.response.use(
      success => Promise.resolve(success.data),
      async (error: AxiosError) => Promise.reject(error)
    )
  }

  async refreshToken(request: AxiosRequestConfig) {
    if (!tokens) {
      const storageExist = localStorage.getItem('@tokens')
      tokens = storageExist ? JSON.parse(storageExist) : null

      return request
    }

    const { refresh_token, token: storageToken } = tokens

    const decodedToken = jwtDecode(storageToken) as { exp: number }
    const isExpired = decodedToken.exp * 1000 <= Date.now()

    try {
      if (isExpired && fetchingRefreshToken === false) {
        fetchingRefreshToken = true

        const response = (await this.api.post('/authenticate/refresh-token/', { refresh_token })) as { token: string }
        const { token } = response

        localStorage.setItem('@tokens', JSON.stringify({ refresh_token, token }))

        tokens = { refresh_token, token }
        fetchingRefreshToken = false

        this.setTokenInHeader(token)
      }

      return request
    } catch {
      delete this.api.defaults.headers.common.Authorization
      window.location.href = '/'
      localStorage.clear()
    }
  }

  setTokenInHeader(token: string): void {
    this.api.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8'
    this.api.defaults.headers.common.Authorization = `Bearer ${token}`
  }
}

export default new ApiClient()

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './styles/global.css'

import { App } from './App.tsx'

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const savedTheme = localStorage.getItem('theme')
const theme = savedTheme || (prefersDark ? 'dark' : 'light')

document.documentElement.setAttribute('data-theme', theme)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)

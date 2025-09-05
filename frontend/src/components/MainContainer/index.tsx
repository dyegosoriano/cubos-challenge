import React from 'react'

import cubosLogoMobile from '../../assets/svg/logo-mobile.svg'
import cubosLogo from '../../assets/svg/logo.svg'
import sunIcon from '../../assets/svg/sun.svg'

import { useTheme } from '../../hooks/useTheme'
import { Button } from '../Button'

type IProps = React.ComponentProps<'div'>

export const MainContainer: React.FC<IProps> = ({ children }) => {
  const { toggleTheme } = useTheme()

  return (
    <div className="flex flex-col w-screen h-screen text-base text-white">
      <header className="flex items-center h-20 justify-between bg-mauve-1 px-6 border-b-mauve-5 border-b-2">
        <img src={cubosLogoMobile} alt="Cubos Movies" className="block md:hidden" />
        <img src={cubosLogo} alt="Cubos Movies" className="hidden md:block" />

        <div className="grid grid-cols-2 gap-1.5">
          <Button onClick={toggleTheme} color="secondary">
            <img src={sunIcon} className="filter brightness-0 invert" />
          </Button>

          <Button>Logout</Button>
        </div>
      </header>

      <main className="flex items-center justify-center w-full h-full">{children}</main>

      <footer className="flex items-center h-20 justify-center border-t-mauve-5 border-t-2">
        <p className="text-mauve-11">
          2025 © Todos os direitos reservados a <strong>Cubos Movies</strong>
        </p>
      </footer>
    </div>
  )
}

import { Link } from 'react-router-dom'

import { Container } from '../../components/Container'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

export const Login = () => {
  return (
    <Container>
      <Input.Container>
        <Input.Label text="E-mail" />
        <Input.Field placeholder="Digite seu email" type="email" />
      </Input.Container>

      <Input.Container>
        <Input.Label text="Senha" />
        <Input.Field placeholder="Digite sua senha" type="password" />
      </Input.Container>

      <div className="flex justify-between">
        <Link to="create-account">Criar conta</Link>

        <Link to="home">
          <Button>Entrar</Button>
        </Link>
      </div>
    </Container>
  )
}

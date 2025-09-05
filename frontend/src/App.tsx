import { MainContainer } from './components/MainContainer'
import { Input } from './components/Input'
import { Container } from './components/Container'
import { Button } from './components/Button'

export const App = () => {
  return (
    <MainContainer>
      <Container>
        <Input.Container>
          <Input.Label text="E-mail" />
          <Input.Field placeholder="Digite seu email" type="email" />
          <Input.Error error_message={'errors.email?.message'} />
        </Input.Container>

        <Input.Container>
          <Input.Label text="Senha" />
          <Input.Field placeholder="Digite sua senha" type="password" />
        </Input.Container>

        <div className="flex justify-between">
          <a href="#">Esqueceu a senha?</a>
          <Button>Entrar</Button>
        </div>
      </Container>
    </MainContainer>
  )
}

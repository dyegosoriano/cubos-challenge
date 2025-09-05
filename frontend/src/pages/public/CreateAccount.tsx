import { Container } from '../../components/Container'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

export const CreateAccount = () => {
  return (
    <Container>
      <Input.Container>
        <Input.Label text="Nome" />
        <Input.Field placeholder="Digite seu nome" type="email" />
      </Input.Container>

      <Input.Container>
        <Input.Label text="E-mail" />
        <Input.Field placeholder="Digite seu email" type="email" />
      </Input.Container>

      <Input.Container>
        <Input.Label text="Senha" />
        <Input.Field placeholder="Digite sua senha" type="password" />
      </Input.Container>

      <Input.Container>
        <Input.Label text="Confirmação de senha" />
        <Input.Field placeholder="Digite sua senha novamente" type="password" />
      </Input.Container>

      <Button className="ml-auto">Cadastrar</Button>
    </Container>
  )
}

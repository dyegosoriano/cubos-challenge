import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Container } from '../../components/Container'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { useAuth } from '../../hooks/useAuth'

const validation = z.object({
  password: z.string().max(16, 'Senha deve ter no máximo 16 caracteres').min(8, 'Senha deve ter no mínimo 8 caracteres'),
  email: z.string().min(6, 'Email deve ter no mínimo 6 caracteres').email('Email inválido')
})

type FormData = z.infer<typeof validation>

export const Login = () => {
  const { handleSubmit, register, formState } = useForm<FormData>({ resolver: zodResolver(validation) })
  const { errors, isSubmitting } = formState
  const { handleSignIn } = useAuth()
  const navigate = useNavigate()

  async function onSubmit(data: FormData) {
    await handleSignIn(data)
    navigate('/movie')
  }

  return (
    <div className="flex items-center justify-center h-full">
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input.Container>
            <Input.Label text="E-mail" />
            <Input.Field placeholder="Digite seu email" type="email" {...register('email')} />
            {errors.email && <Input.Error error_message={errors.email.message} />}
          </Input.Container>

          <Input.Container>
            <Input.Label text="Senha" />
            <Input.Field placeholder="Digite sua senha" type="password" {...register('password')} />
            {errors.password && <Input.Error error_message={errors.password.message} />}
          </Input.Container>

          <div className="flex justify-between">
            <Link className="text-purple-9 underline" to="create-account">
              Criar conta
            </Link>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </Button>
          </div>
        </form>
      </Container>
    </div>
  )
}

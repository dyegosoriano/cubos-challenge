import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { Container } from '../../components/Container'
import { Button } from '../../components/Button'
import ApiClient from '../../services/ApiClient'
import { Input } from '../../components/Input'
import { useAuth } from '../../hooks/useAuth'
import { toastify } from '../../utils/toast'

const regex_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/

const validation = z
  .object({
    name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').max(100, 'Nome deve ter no máximo 100 caracteres'),
    email: z
      .string()
      .min(6, 'Email deve ter no mínimo 6 caracteres')
      .max(100, 'Email deve ter no máximo 100 caracteres')
      .email('Email inválido'),
    password: z
      .string()
      .regex(regex_password, 'Senha deve conter ao menos uma letra minúscula, maiúscula e um número')
      .min(8, 'Senha deve ter no mínimo 8 caracteres')
      .max(16, 'Senha deve ter no máximo 16 caracteres'),
    confirmPassword: z.string()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Senhas não coincidem',
    path: ['confirmPassword']
  })

type FormData = z.infer<typeof validation>

export const CreateAccount = () => {
  const navigate = useNavigate()
  const { handleSubmit, register, formState } = useForm<FormData>({ resolver: zodResolver(validation) })
  const { errors, isSubmitting } = formState
  const { handleSignIn } = useAuth()

  async function onSubmit(data: FormData) {
    try {
      await ApiClient.api.post('users', data)
      await handleSignIn(data)
      navigate('/movie')
    } catch (error: any) {
      toastify(error?.response?.status?.message || 'Ocorreu um erro ao tentar cadastrar o usuário', 'error')
    }
  }

  return (
    <div className="flex items-center justify-center h-full">
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input.Container>
            <Input.Label text="Nome" />
            <Input.Field placeholder="Digite seu nome" type="text" {...register('name')} />
            {errors.name && <Input.Error error_message={errors.name.message} />}
          </Input.Container>

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

          <Input.Container>
            <Input.Label text="Confirmação de senha" />
            <Input.Field placeholder="Digite sua senha novamente" type="password" {...register('confirmPassword')} />
            {errors.confirmPassword && <Input.Error error_message={errors.confirmPassword.message} />}
          </Input.Container>

          <Button className="ml-auto" disabled={isSubmitting}>
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
          </Button>
        </form>
      </Container>
    </div>
  )
}

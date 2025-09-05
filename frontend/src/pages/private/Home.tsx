import arrowRight from '../../assets/svg/arrow-right.svg'
import arrowLeft from '../../assets/svg/arrow-left.svg'

import { Container } from '../../components/Container'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

export const Home = () => {
  return (
    <div className="flex flex-col h-full gap-6 p-4">
      <div className="flex gap-2 h-12 ml-auto">
        <Input.Field className="w-2xl" placeholder="Pesquise por filmes" type="text" />
        <Button color="secondary">Filtros</Button>
        <Button>Adicionar Filme</Button>
      </div>

      <Container>
        <div className="grid grid-cols-2 m-6 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="w-2xs bg-mauve-1 aspect-9/12 cursor-pointer rounded-md" />
          ))}
        </div>
      </Container>

      <div className="flex h-10 mx-auto mt-auto gap-2">
        <Button color="paginate">
          <img src={arrowLeft} alt="Listar filmes anteriores" />
        </Button>

        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>

        <Button>
          <img src={arrowRight} alt="Listar próximos filmes" />
        </Button>
      </div>
    </div>
  )
}

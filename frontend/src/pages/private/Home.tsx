import arrowRight from '../../assets/svg/arrow-right.svg'
import arrowLeft from '../../assets/svg/arrow-left.svg'

import { CircularRating } from '../../components/CircularRating'
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
            <div
              style={{
                backgroundImage: `url(https://acdn-us.mitiendanube.com/stores/004/687/740/products/pos-03736-0c9fa69c6909c1026017211500446414-1024-1024.webp)`
              }}
              className="w-2xs bg-mauve-1 aspect-9/12 cursor-pointer rounded-md bg-cover bg-center bg-no-repeat relative"
              key={index}
            >
              <div className="absolute inset-0 flex flex-col-reverse h-full w-full bg-gradient-to-t from-black to-transparent hover:opacity-0 transition-opacity duration-300">
                <h2 className="text-center font-extrabold mb-6">Título principal: {index}</h2>
              </div>

              <div className="absolute inset-0 grid grid-rows-[1fr_60px] h-full w-full bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                <CircularRating rating={67} size={100} />

                <div className="pl-4">
                  <h3 className="font-extrabold">Título secundário: {index}</h3>
                  <p className="text-sm font-light">Ação/Ficção científica</p>
                </div>
              </div>
            </div>
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

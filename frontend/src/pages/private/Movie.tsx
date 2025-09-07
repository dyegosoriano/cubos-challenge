import { CircularRating } from '../../components/CircularRating'
import { Container } from '../../components/Container'
import { Button } from '../../components/Button'

export const Movie = () => {
  return (
    <div className="flex flex-col max-w-7xl h-full mx-auto space-y-8 my-6">
      <div
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg)` }}
        className="bg-cover bg-center bg-no-repeat"
      >
        <div className="bg-gradient-to-r from-black to-transparent space-y-6 p-6">
          <div className="flex justify-between w-full">
            <div>
              <h1 className="text-2xl font-bold">Alien: Romulus</h1>
              <p className="text-sm">Titulo origina: Alien: Romulus</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button color="secondary">Deletar</Button>
              <Button>Editar</Button>
            </div>
          </div>

          <div className="flex gap-6">
            <img
              src="https://image.tmdb.org/t/p/original/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg"
              className="w-2xs aspect-9/12 object-cover rounded-lg"
              alt="Alien: Romulus Banner"
            />

            <div className="grid grid-cols-2 gap-6">
              <section className="space-y-6">
                <h2 className="italic">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h2>

                <Container color="secondary">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione hic, optio numquam a eius nihil et sit architecto,
                    blanditiis non unde doloremque, officia dolores. Facere iste suscipit repellendus doloribus commodi.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione hic, optio numquam a eius nihil et sit architecto,
                    blanditiis non unde doloremque, officia dolores. Facere iste suscipit repellendus doloribus commodi.
                  </p>
                </Container>

                <Container color="secondary">
                  <span>Gêneros</span>
                  <div className="flex gap-6">
                    <Container color="third">fICÇÃO CIENTÍFICA</Container>
                    <Container color="third">Terror</Container>
                  </div>
                </Container>
              </section>

              <section className="grid grid-rows-4 gap-6">
                <div className="flex gap-6">
                  <Container color="secondary">
                    <span className="text-sm uppercase font-extrabold text-mauve-11">Popularidade</span>
                    <span className="text-lg font-bold">42.595</span>
                  </Container>

                  <Container color="secondary">
                    <span className="text-sm uppercase font-extrabold text-mauve-11">Votos</span>
                    <span className="text-lg font-bold">5704</span>
                  </Container>

                  <CircularRating rating={67} size={100} />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <Container color="secondary">
                    <span className="text-sm uppercase font-extrabold text-mauve-11">Lançamento</span>
                    <span className="text-lg font-bold">12/08/2024</span>
                  </Container>

                  <Container color="secondary">
                    <span className="text-sm uppercase font-extrabold text-mauve-11">Duração</span>
                    <span className="text-lg font-bold">119 minutos</span>
                  </Container>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <Container color="secondary">
                    <span className="text-sm uppercase font-extrabold text-mauve-11">SITUAÇÃO</span>
                    <span className="text-lg font-bold">Lançado</span>
                  </Container>

                  <Container color="secondary">
                    <span className="text-sm uppercase font-extrabold text-mauve-11">IDIOMA</span>
                    <span className="text-lg font-bold">Inglês</span>
                  </Container>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <Container color="secondary">
                    <span className="text-sm uppercase font-extrabold text-mauve-11">Orçamento</span>
                    <span className="text-lg font-bold">$135m</span>
                  </Container>

                  <Container color="secondary">
                    <span className="text-sm uppercase font-extrabold text-mauve-11">Receita</span>
                    <span className="text-lg font-bold">$467.99M</span>
                  </Container>

                  <Container color="secondary">
                    <span className="text-sm uppercase font-extrabold text-mauve-11">Lucro</span>
                    <span className="text-lg font-bold">$332.99M</span>
                  </Container>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Trailer</h3>

        <div className="aspect-video w-full">
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            src="https://www.youtube.com/embed/x0XDEhP4MQs"
            title="Alien: Romulus - Official Trailer"
            className="w-full h-full rounded-lg"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}

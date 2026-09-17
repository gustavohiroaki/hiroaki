import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { profile } from "../data/profile";
import { photos, personalImages } from "../data/photos";
import { PageIntro, TextLink, Reveal } from "../components/Shared";
export default function About() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash !== "#contact") return;
    const frame = requestAnimationFrame(() => {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.hash]);
  return (
    <div className="about-page">
      <div className="page-shell">
        <PageIntro
          title="About me"
          description="Software engineer. Photographer. Uma pessoa, muitos interesses."
        />
        <div className="about-opener">
          <figure>
            <img
              src={personalImages.camera}
              alt="Câmera fotográfica em imagem de referência"
            />
            <figcaption>Uma câmera por perto. Um mundo pela frente.</figcaption>
          </figure>
          <div>
            <h2>
              Prazer,
              <br />
              Gustavo.
            </h2>
            <p>{profile.about}</p>
            <p className="muted">
              Gosto de construir, de observar e de fazer perguntas. Às vezes
              isso vira software. Às vezes, uma fotografia. Outras vezes, só uma
              nova vontade de aprender.
            </p>
            <TextLink to="/resume">Meu lado profissional</TextLink>
          </div>
        </div>
        <section className="about-beliefs">
          <h2>O que me move.</h2>
          <div className="belief-row">
            <span>Construir</span>
            <p>
              Programação, tecnologia e gadgets. Entender as peças, experimentar
              possibilidades e transformar ideias em algo que funciona.
            </p>
          </div>
          <div className="belief-row">
            <span>Observar</span>
            <p>
              Fotografia, natureza e viagens. Prestar atenção à luz, às pessoas
              e aos lugares que deixam alguma coisa com a gente.
            </p>
          </div>
          <div className="belief-row">
            <span>Explorar</span>
            <p>
              Japão, música e violão. Outros ritmos, culturas e maneiras de
              olhar. A curiosidade não precisa ficar em uma única área.
            </p>
          </div>
        </section>
      </div>
      <Reveal className="about-landscape">
        <img src={photos[2].image} alt={photos[2].alt} loading="lazy" />
        <div>
          <span>Às vezes, é preciso sair da tela.</span>
          <h2>
            Há muito
            <br />
            mundo lá fora.
          </h2>
        </div>
      </Reveal>
      <div className="page-shell">
        <section className="about-timeline">
          <div>
            <h2>
              Um caminho
              <br />
              em construção.
            </h2>
            <p className="muted">
              Um espaço para contar os capítulos dessa história.
            </p>
            <span className="small muted">Marcos pessoais a preencher</span>
          </div>
          <div className="timeline">
            <div>
              <span>O começo / ano a preencher</span>
              <h3>Primeiros encontros com a tecnologia</h3>
              <p>Espaço reservado para contar como tudo começou.</p>
            </div>
            <div>
              <span>Um novo olhar / ano a preencher</span>
              <h3>A fotografia entra na história</h3>
              <p>
                Espaço reservado para as primeiras descobertas com a câmera.
              </p>
            </div>
            <div>
              <span>Agora</span>
              <h3>Continuar curioso</h3>
              <p>Software, fotografia e muito mais pelo caminho.</p>
            </div>
          </div>
        </section>
        <section id="contact" className="contact-section">
          <h2>
            Boas conversas
            <br />
            começam com um olá.
          </h2>
          <div>
            <p>Sobre um projeto, uma fotografia ou alguma ideia em comum.</p>
            {profile.email ? (
              <a className="text-link" href={`mailto:${profile.email}`}>
                {profile.email}
                <ArrowUpRight />
              </a>
            ) : (
              <p className="contact-placeholder">
                Contato em breve
                <span>
                  O e-mail e os perfis pessoais ainda não foram adicionados.
                </span>
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

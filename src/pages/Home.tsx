import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowDown, Plus } from "lucide-react";
import { profile } from "../data/profile";
import { photos, personalImages } from "../data/photos";
import { projects } from "../data/projects";
import { posts } from "../data/posts";
import { Reveal, TextLink, ProjectPreview } from "../components/Shared";
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="hero-topline">
            <span>Entre o digital e o mundo lá fora.</span>
            <span className="hero-jp" lang="ja">
              好奇心
            </span>
          </div>
          <h1>
            <span>Gustavo</span>
            <span>
              Hiroaki<span className="heading-dot">.</span>
            </span>
          </h1>
          <div className="hero-bottom">
            <div className="hero-roles">
              {profile.roles.map((r) => (
                <p key={r}>{r}</p>
              ))}
            </div>
            <Link to="/photography" className="primary-button">
              Explore meu olhar <ArrowUpRight size={20} />
            </Link>
          </div>
          <img className="hero-mark" src="/brand/mark.webp" alt="" />
        </div>
        <Link to="/photography" className="hero-photo">
          <img src={photos[0].image} alt={photos[0].alt} fetchPriority="high" />
          <div className="hero-photo-top">
            <span>Um mundo para observar.</span>
            <ArrowUpRight size={22} />
          </div>
          <div className="hero-photo-caption">
            <span>Monte Fuji, Japão</span>
            <span>Fotografia de referência</span>
          </div>
          <span className="photo-side-label">A different point of view</span>
        </Link>
        <div className="hero-baseline">
          <span>Software & photography</span>
          <a href="#intro">
            Um pouco mais sobre mim <ArrowDown size={16} />
          </a>
          <span>Scroll to explore</span>
        </div>
      </section>
      <section id="intro" className="intro-section section-shell">
        <Reveal className="intro-grid">
          <div className="section-side">
            <span>Olá, eu sou o Gustavo.</span>
            <Plus size={22} />
          </div>
          <div>
            <h2>
              Construir.
              <br />
              Observar. Descobrir.
            </h2>
            <p className="intro-description">{profile.intro}</p>
            <p className="muted">
              Tecnologia, música, Japão, viagens e uma boa trilha. Este é meu
              espaço para reunir um pouco de tudo isso.
            </p>
            <TextLink to="/about">Além da apresentação</TextLink>
          </div>
        </Reveal>
      </section>
      <section className="home-photography section-shell">
        <div className="section-heading">
          <h2>
            Um jeito de
            <br />
            ver o mundo.
          </h2>
          <TextLink to="/photography">Photography</TextLink>
        </div>
        <div className="home-photo-grid">
          {[photos[1], photos[2]].map((p, i) => (
            <Reveal key={p.id} className={`photo-story photo-story-${i}`}>
              <Link to="/photography" className="image-link">
                <img src={p.image} alt={p.alt} loading="lazy" />
                <span className="image-hover">
                  Explorar fotografias <ArrowUpRight />
                </span>
              </Link>
              <div className="image-caption">
                <h3>{p.title}</h3>
                <span>{p.location}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="image-disclaimer">
          Seleção visual de referência. Fotografias de demonstração via
          Unsplash.
        </p>
      </section>
      <section className="interests-section section-shell">
        <div className="interest-title">
          <span>Fora do enquadramento</span>
          <h2>
            Muito além
            <br />
            de uma coisa só.
          </h2>
        </div>
        <div className="interest-composition">
          <div className="interest-words">
            <span>
              Code<span className="interest-symbol"> / </span>Photography
            </span>
            <span className="muted">
              Japan<span className="interest-symbol"> + </span>Music
            </span>
            <span>
              Travel<span className="interest-symbol"> / </span>Technology
            </span>
            <span className="muted">
              Mountains<span className="interest-symbol"> + </span>Cameras
            </span>
          </div>
          <div className="interest-photo">
            <img
              src={personalImages.guitar}
              alt="Cordas e corpo de um violão"
              loading="lazy"
            />
            <span>Às vezes, a melhor pausa tem seis cordas.</span>
          </div>
          <p className="interest-note">
            Gosto de entender como as coisas funcionam.
            <br />E de me perder um pouco
            <br />
            no que ainda não conheço.
          </p>
        </div>
      </section>
      <section className="home-projects section-shell">
        <div className="section-heading">
          <div>
            <span className="muted small">Ideias que ganham forma</span>
            <h2>Built with curiosity.</h2>
          </div>
          <TextLink to="/projects">Todos os projetos</TextLink>
        </div>
        <Link to="/projects" className="featured-project">
          <ProjectPreview project={projects[0]} />
          <div className="featured-project-copy">
            <span className="small muted">
              Conceito de demonstração / {projects[0].year}
            </span>
            <h3>
              {projects[0].title}
              <ArrowUpRight />
            </h3>
            <p>{projects[0].description}</p>
            <div className="stack">
              {projects[0].stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
        </Link>
      </section>
      <section className="home-journal section-shell">
        <div className="section-heading">
          <h2>Notas pelo caminho.</h2>
          <TextLink to="/blog">Abrir o journal</TextLink>
        </div>
        {posts.slice(0, 2).map((p) => (
          <Link className="journal-row" key={p.slug} to={`/blog/${p.slug}`}>
            <span className="small muted">{p.category}</span>
            <h3>{p.title}</h3>
            <span className="small muted">{p.date}</span>
            <ArrowUpRight />
          </Link>
        ))}
      </section>
      <section className="blue-outro">
        <img src="/brand/mark.webp" alt="" />
        <div>
          <p>O próximo assunto pode ser qualquer um.</p>
          <h2>Vamos trocar ideias?</h2>
          <TextLink to="/about#contact">Encontre-me por aqui</TextLink>
        </div>
      </section>
    </>
  );
}

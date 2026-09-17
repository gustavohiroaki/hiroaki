import { BrandMark } from "../components/BrandMark";
import { Download } from "lucide-react";
import { resume } from "../data/resume";
import { profile } from "../data/profile";
import { PageIntro, TextLink } from "../components/Shared";
export default function Resume() {
  return (
    <div className="page-shell resume-page">
      <PageIntro
        title="Resume"
        description="Gustavo Hiroaki / Software Engineer & Photographer"
      />
      <div className="resume-layout">
        <aside className="resume-sidebar">
          <BrandMark />
          <h2>
            Gustavo
            <br />
            Hiroaki
          </h2>
          <p>{resume.summary}</p>
          {resume.cvUrl ? (
            <a className="primary-button" href={resume.cvUrl} download>
              Download CV <Download size={18} />
            </a>
          ) : (
            <>
              <button className="primary-button" disabled>
                Download CV <Download size={18} />
              </button>
              <span className="small muted">PDF em preparação</span>
            </>
          )}
          <nav aria-label="Seções do currículo">
            {[
              ["experience", "Experiência"],
              ["education", "Formação"],
              ["technologies", "Tecnologias"],
              ["languages", "Idiomas"],
              ["selected-projects", "Projetos"],
              ["resume-contact", "Contato"],
            ].map(([id, name]) => (
              <a key={id} href={`#${id}`}>
                {name}
              </a>
            ))}
          </nav>
        </aside>
        <div className="resume-content">
          <p className="placeholder-note">
            Currículo em preparação. Os campos abaixo são placeholders e não
            representam experiências, qualificações ou níveis de idioma reais.
          </p>
          <section id="experience">
            <h2>Experiência</h2>
            {resume.experience.map((e) => (
              <div className="resume-entry" key={e.role}>
                <span>{e.period}</span>
                <h3>{e.role}</h3>
                <h4>{e.company}</h4>
                <p>{e.description}</p>
              </div>
            ))}
          </section>
          <section id="education">
            <h2>Formação</h2>
            {resume.education.map((e) => (
              <div className="resume-entry" key={e.course}>
                <span>{e.period}</span>
                <h3>{e.course}</h3>
                <p>{e.institution}</p>
              </div>
            ))}
          </section>
          <section id="technologies">
            <h2>Tecnologias</h2>
            <p className="muted">
              Preencha com as tecnologias que fazem parte da sua experiência.
            </p>
            <ul className="resume-tech">
              {resume.technologies.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
          <section id="languages">
            <h2>Idiomas</h2>
            {resume.languages.map((l) => (
              <div className="language-row" key={l.name}>
                <span>{l.name}</span>
                <span className="muted">{l.level}</span>
              </div>
            ))}
          </section>
          <section id="selected-projects">
            <h2>Projetos</h2>
            <p className="muted">
              Adicione os projetos reais que melhor representam seu trabalho,
              com contexto e contribuições.
            </p>
            <TextLink to="/projects">Ver a apresentação de projetos</TextLink>
          </section>
          <section id="resume-contact">
            <h2>Contato</h2>
            <p>{profile.email || "E-mail profissional a preencher"}</p>
            <p className="muted">GitHub e LinkedIn a preencher.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

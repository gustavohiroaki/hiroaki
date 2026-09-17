import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "../data/projects";
import { PageIntro, ProjectPreview, Reveal } from "../components/Shared";
export default function Projects() {
  return (
    <div className="page-shell projects-page">
      <PageIntro
        title="Projects"
        description="Ideias, experimentos e coisas que ganham vida através do código."
        aside="Software feito com intenção"
      />
      <p className="placeholder-note compact-note">
        Projetos conceituais de demonstração. Os trabalhos reais e seus links
        serão adicionados aqui.
      </p>
      <div className="projects-list">
        {projects.map((p, i) => (
          <Reveal key={p.id} className={`project-entry project-entry-${i}`}>
            <ProjectPreview project={p} />
            <div className="project-details">
              <div className="project-name">
                <span className="small muted">
                  {p.label} / {p.year}
                </span>
                <h2>{p.title}</h2>
              </div>
              <div>
                <p>{p.description}</p>
                <div className="stack">
                  {p.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
                <div className="project-links">
                  {p.github ? (
                    <a href={p.github} target="_blank" rel="noreferrer">
                      <Github size={16} /> GitHub <ArrowUpRight size={16} />
                    </a>
                  ) : (
                    <span>
                      <Github size={16} /> GitHub <small>em breve</small>
                    </span>
                  )}
                  {p.website ? (
                    <a href={p.website} target="_blank" rel="noreferrer">
                      Visitar projeto <ArrowUpRight size={16} />
                    </a>
                  ) : (
                    <span>
                      Visitar projeto <small>em breve</small>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

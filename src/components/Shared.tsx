import { useEffect, useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { Project } from "../data/projects";
import { photos } from "../data/photos";
export function TextLink({
  to,
  children,
  className = "",
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link className={`text-link ${className}`} to={to}>
      {children}
      <ArrowUpRight size={18} />
    </Link>
  );
}
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          el.classList.add("revealed");
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
export function PageIntro({
  title,
  description,
  aside,
}: {
  title: string;
  description: string;
  aside?: string;
}) {
  return (
    <div className="page-intro">
      <h1>
        {title}
        <span className="heading-dot">.</span>
      </h1>
      <div className="intro-bottom">
        <p>{description}</p>
        {aside && <span className="small muted">{aside}</span>}
      </div>
    </div>
  );
}
export function ProjectPreview({ project }: { project: Project }) {
  return (
    <div
      className={`project-preview preview-${project.kind}`}
      aria-label={`Prévia conceitual do projeto ${project.title}`}
    >
      <div className="preview-toolbar">
        <span className="window-dots">
          <i />
          <i />
          <i />
        </span>
        <span>{project.title.toLowerCase()} / personal experiment</span>
        <ArrowUpRight size={14} />
      </div>
      {project.kind === "atlas" ? (
        <div className="atlas-layout">
          <div className="atlas-text">
            <span className="small">Seu próximo caminho</span>
            <h3>
              Somewhere
              <br />
              new.
            </h3>
            <div className="atlas-route">
              <span>01 &nbsp; Tokyo</span>
              <span>02 &nbsp; Kyoto</span>
              <span>03 &nbsp; Fuji</span>
            </div>
            <span className="mini-link">
              Explore Japan <ArrowRight size={16} />
            </span>
          </div>
          <img src={photos[0].thumbnail} alt="" loading="lazy" />
        </div>
      ) : project.kind === "frame" ? (
        <div className="frame-layout">
          <div>
            <h3>frame.</h3>
            <span>Collect moments.</span>
          </div>
          <div className="frame-images">
            {photos.slice(0, 3).map((p) => (
              <img key={p.id} src={p.thumbnail} alt="" loading="lazy" />
            ))}
          </div>
          <span className="small">A personal photographic archive</span>
        </div>
      ) : (
        <div className="notes-layout">
          <span>Field Notes</span>
          <h3>
            Ideas worth
            <br />
            keeping.
          </h3>
          <div>
            <span>On making things</span>
            <ArrowUpRight size={16} />
          </div>
          <div>
            <span>A little curiosity</span>
            <ArrowUpRight size={16} />
          </div>
        </div>
      )}
    </div>
  );
}

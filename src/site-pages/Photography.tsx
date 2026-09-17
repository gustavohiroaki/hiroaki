"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X, Maximize2 } from "lucide-react";
import { photos, categories, type Photo } from "../data/photos";
import { PageIntro, Reveal } from "../components/Shared";
export default function Photography() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Photo | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const filtered =
    filter === "All"
      ? photos
      : filter === "Travel"
        ? photos.filter(
            (p) =>
              p.category === "Japan" ||
              p.category === "Street" ||
              p.category === "Landscape",
          )
        : photos.filter((p) => p.category === filter);
  useEffect(() => {
    if (selected) {
      dialog.current?.showModal();
      const old = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = old;
      };
    } else dialog.current?.close();
  }, [selected]);
  function close() {
    setSelected(null);
    opener.current?.focus();
  }
  function move(direction: number) {
    if (!selected) return;
    const index = filtered.findIndex((p) => p.id === selected.id);
    setSelected(
      filtered[(index + direction + filtered.length) % filtered.length],
    );
  }
  return (
    <div className="page-shell photography-page">
      <PageIntro
        title="Photography"
        description="Lugares, instantes e pequenos detalhes. Um convite para olhar um pouco mais devagar."
        aside="Um olhar em movimento"
      />
      <div className="gallery-controls">
        <div className="filters" aria-label="Categorias de fotografia">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
            >
              {c}
            </button>
          ))}
        </div>
        <span className="small muted">
          {String(filtered.length).padStart(2, "0")} fotografias
        </span>
      </div>
      <div className="photo-gallery" key={filter}>
        {filtered.map((p, i) => (
          <Reveal key={p.id} className={`gallery-item gallery-item-${i % 5}`}>
            <button
              className="photo-open"
              onClick={(e) => {
                opener.current = e.currentTarget;
                setSelected(p);
              }}
              aria-label={`Ampliar ${p.title}`}
            >
              <img
                src={p.image}
                srcSet={`${p.thumbnail} 720w, ${p.image} 1600w`}
                sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 65vw"
                alt={p.alt}
                loading={i === 0 ? "eager" : "lazy"}
              />
              <span className="photo-zoom">
                <Maximize2 size={20} />
              </span>
            </button>
            <div className="image-caption">
              <div>
                <h2>{p.title}</h2>
                <span>{p.location}</span>
              </div>
              <span>{p.category}</span>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="placeholder-note">
        Este acervo usa imagens de referência do Unsplash, não fotografias
        autorais de Gustavo. As fotos e seus dados podem ser substituídos pelo
        acervo pessoal.
      </p>
      <dialog
        ref={dialog}
        className="lightbox"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            move(1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            move(-1);
          }
        }}
        aria-label={selected?.title || "Fotografia ampliada"}
      >
        {selected && (
          <>
            <button
              autoFocus
              className="lightbox-close icon-button"
              onClick={close}
              aria-label="Fechar fotografia"
            >
              <X />
            </button>
            <div className="lightbox-image" key={selected.id}>
              <img src={selected.image} alt={selected.alt} />
            </div>
            <div className="lightbox-bottom">
              <div>
                <h2>{selected.title}</h2>
                <p>
                  {selected.location} / {selected.category}
                </p>
                <a href={selected.source} target="_blank" rel="noreferrer">
                  Fotografia de referência · Unsplash
                </a>
                {selected.camera && <p>{selected.camera}</p>}
              </div>
              <div className="lightbox-nav">
                <button
                  className="icon-button"
                  onClick={() => move(-1)}
                  aria-label="Fotografia anterior"
                >
                  <ArrowLeft />
                </button>
                <span>
                  {filtered.findIndex((p) => p.id === selected.id) + 1} /{" "}
                  {filtered.length}
                </span>
                <button
                  className="icon-button"
                  onClick={() => move(1)}
                  aria-label="Próxima fotografia"
                >
                  <ArrowRight />
                </button>
              </div>
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}

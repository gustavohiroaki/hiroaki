import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { posts } from "../data/posts";
export default function Article() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  if (!post)
    return (
      <div className="not-found">
        <h1>Texto não encontrado.</h1>
        <Link className="text-link" to="/blog">
          Voltar ao journal <ArrowLeft />
        </Link>
      </div>
    );
  const next = posts[(posts.indexOf(post) + 1) % posts.length];
  return (
    <article className="article-page">
      <div className="article-header">
        <Link className="text-link" to="/blog">
          <ArrowLeft size={17} /> Voltar ao journal
        </Link>
        <div className="post-meta">
          <span>{post.category}</span>
          <span>{post.date}</span>
          <span>{post.readTime} de leitura</span>
        </div>
        <h1>{post.title}</h1>
        <p className="article-deck">{post.excerpt}</p>
        <span className="small muted">
          Por Gustavo Hiroaki / Texto de demonstração
        </span>
      </div>
      {post.image && (
        <figure className="article-image">
          <img src={post.image} alt={post.alt} />
          <figcaption>Imagem de referência via Unsplash.</figcaption>
        </figure>
      )}
      <div className="article-body">
        <p className="article-notice">
          Este artigo é um exemplo editorial para visualizar o futuro blog.
        </p>
        {post.sections.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            <p>{s.text}</p>
          </section>
        ))}
        <blockquote>
          Continuar curioso é uma boa maneira de continuar aprendendo.
        </blockquote>
        <Link className="article-next" to={`/blog/${next.slug}`}>
          <span className="small muted">Próxima leitura</span>
          <h2>{next.title}</h2>
          <ArrowUpRight />
        </Link>
      </div>
    </article>
  );
}

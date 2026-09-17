import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { posts } from "../data/posts";
import { PageIntro } from "../components/Shared";
export default function Blog() {
  const first = posts[0];
  return (
    <div className="page-shell blog-page">
      <PageIntro
        title="Journal"
        description="Um caderno aberto sobre software, fotografia e tudo que desperta curiosidade."
        aside="Textos de demonstração"
      />
      <Link className="blog-feature" href={`/blog/${first.slug}`}>
        <div className="image-link">
          <img src={first.image} alt={first.alt} fetchPriority="high" />
        </div>
        <div className="blog-feature-copy">
          <div className="post-meta">
            <span>{first.category}</span>
            <span>{first.date}</span>
          </div>
          <h2>{first.title}</h2>
          <p>{first.excerpt}</p>
          <span className="text-link">
            Ler a história <ArrowUpRight size={20} />
          </span>
        </div>
      </Link>
      <div className="blog-grid">
        {posts.slice(1).map((post) => (
          <Link className="blog-post" key={post.slug} href={`/blog/${post.slug}`}>
            {post.image ? (
              <div className="blog-thumbnail">
                <img src={post.image} alt={post.alt} loading="lazy" />
              </div>
            ) : (
              <div className="blog-code-art">
                <img src="/brand/mark.webp" alt="" />
                <span>Less, but better.</span>
              </div>
            )}
            <div className="post-meta">
              <span>{post.category}</span>
              <span>{post.date}</span>
            </div>
            <h2>
              {post.title}
              <ArrowUpRight size={20} />
            </h2>
            <p>{post.excerpt}</p>
            <span className="small muted">{post.readTime} de leitura</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

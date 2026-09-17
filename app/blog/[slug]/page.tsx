import Article from "../../../src/site-pages/Article";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <Article slug={slug} />;
}

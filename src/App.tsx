import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { NavLink, Link, Route, Routes, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X, ArrowUp } from "lucide-react";
import { profile } from "./data/profile";
import Home from "./pages/Home";
const Photography = lazy(() => import("./pages/Photography"));
const Projects = lazy(() => import("./pages/Projects"));
const Blog = lazy(() => import("./pages/Blog"));
const Article = lazy(() => import("./pages/Article"));
const About = lazy(() => import("./pages/About"));
const Resume = lazy(() => import("./pages/Resume"));
const navigation = [
  ["/", "Home"],
  ["/photography", "Photography"],
  ["/projects", "Projects"],
  ["/blog", "Blog"],
  ["/about", "About"],
  ["/resume", "Resume"],
];
export default function App() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLDivElement>(null);
  const firstLoad = useRef(true);
  useEffect(() => {
    if (!location.hash) window.scrollTo({ top: 0, behavior: "instant" });
    setOpen(false);
    const label =
      navigation.find((n) => n[0] === location.pathname)?.[1] || "Journal";
    document.title = `${label === "Home" ? "Software, fotografia e curiosidade" : label} — Gustavo Hiroaki`;
    if (!firstLoad.current)
      document.getElementById("main")?.focus({ preventScroll: true });
    firstLoad.current = false;
  }, [location.pathname, location.hash]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuPanel.current?.querySelector<HTMLElement>("a")?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
      if (e.key === "Tab") {
        const nodes = [
          menuButton.current,
          ...Array.from(
            menuPanel.current?.querySelectorAll<HTMLElement>("a,button") || [],
          ),
        ].filter(Boolean) as HTMLElement[];
        const first = nodes[0],
          last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const mq = matchMedia("(min-width: 901px)");
    const resize = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", resize);
    document.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", handler);
      mq.removeEventListener("change", resize);
    };
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main">
        Pular para o conteúdo
      </a>
      <header className="site-header">
        <Link className="wordmark" to="/" aria-label="Gustavo Hiroaki — Home">
          <img src="/brand/mark.webp" alt="" width="36" height="42" />
          <span>GUSTAVO HIROAKI</span>
        </Link>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map(([to, label]) => (
            <NavLink
              key={to}
              end={to === "/"}
              to={to}
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <button
          className="menu-toggle"
          ref={menuButton}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </header>
      {open && (
        <div
          className="mobile-menu"
          id="mobile-nav"
          ref={menuPanel}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
        >
          <nav>
            {navigation.map(([to, label], i) => (
              <NavLink
                key={to}
                end={to === "/"}
                to={to}
                onClick={() => setOpen(false)}
              >
                <span className="small">0{i + 1}</span>
                {label}
                <ArrowUpRight />
              </NavLink>
            ))}
          </nav>
          <p>
            Software, fotografia
            <br />e tudo pelo caminho.
          </p>
          <img src="/brand/mark.webp" alt="" />
        </div>
      )}
      <main
        id="main"
        tabIndex={-1}
        key={location.pathname}
        className="route-enter"
      >
        <Suspense
          fallback={
            <div className="page-loading" role="status">
              Abrindo um novo caminho…
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/photography" element={<Photography />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Article />} />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route
              path="*"
              element={
                <div className="not-found">
                  <h1>
                    Um caminho
                    <br />a descobrir.
                  </h1>
                  <p>Esta página não existe por aqui.</p>
                  <Link className="primary-button" to="/">
                    Voltar para Home <ArrowUpRight />
                  </Link>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </main>
      <footer className="site-footer">
        <div className="footer-top">
          <Link className="wordmark" to="/">
            <img src="/brand/mark.webp" alt="" width="40" height="46" />
            <span>GUSTAVO HIROAKI</span>
          </Link>
          <p>
            Um olhar curioso.
            <br />
            Muitas possibilidades.
          </p>
          <div className="social-links">
            {profile.socials.map((s) =>
              s.url ? (
                <a key={s.name} href={s.url} target="_blank" rel="noreferrer">
                  {s.name}
                  <ArrowUpRight size={14} />
                </a>
              ) : (
                <span
                  key={s.name}
                  className="social-placeholder"
                  title="Perfil ainda não informado"
                >
                  {s.name}
                  <span>em breve</span>
                </span>
              ),
            )}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Gustavo Hiroaki</span>
          <span>Feito com intenção e curiosidade.</span>
          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "instant"
                  : "smooth",
              })
            }
          >
            Voltar ao topo <ArrowUp size={16} />
          </button>
        </div>
      </footer>
    </>
  );
}

"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X, ArrowUp } from "lucide-react";
import { SiteOpening } from "./components/SiteOpening";
import { BrandMark } from "./components/BrandMark";
import { profile } from "./data/profile";

const navigation = [["/", "Home"], ["/photography", "Photography"], ["/projects", "Projects"], ["/blog", "Blog"], ["/about", "About"], ["/resume", "Resume"]] as const;

export default function App({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLDivElement>(null);
  const firstLoad = useRef(true);

  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0, behavior: "instant" });
    setOpen(false);
    const current = navigation.find(([to]) => to === pathname)?.[1] || "Journal";
    document.title = `${current === "Home" ? "Software, fotografia e curiosidade" : current} — Gustavo Hiroaki`;
    if (!firstLoad.current) document.getElementById("main")?.focus({ preventScroll: true });
    firstLoad.current = false;
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuPanel.current?.querySelector<HTMLElement>("a")?.focus();
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
      if (event.key === "Tab") {
        const nodes = [menuButton.current, ...Array.from(menuPanel.current?.querySelectorAll<HTMLElement>("a,button") || [])].filter(Boolean) as HTMLElement[];
        const first = nodes[0], last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    const media = matchMedia("(min-width: 901px)");
    const resize = () => media.matches && setOpen(false);
    media.addEventListener("change", resize);
    document.addEventListener("keydown", handler);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", handler); media.removeEventListener("change", resize); };
  }, [open]);

  const isActive = (to: string) => to === "/" ? pathname === "/" : pathname.startsWith(to);
  return <>
    <SiteOpening />
    <a className="skip-link" href="#main">Pular para o conteúdo</a>
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Gustavo Hiroaki — Home"><BrandMark /><span>GUSTAVO HIROAKI</span></Link>
      <nav className="desktop-nav" aria-label="Navegação principal">{navigation.map(([to, label]) => <Link key={to} className={isActive(to) ? "active" : ""} href={to} aria-current={isActive(to) ? "page" : undefined}>{label}</Link>)}</nav>
      <button className="menu-toggle" ref={menuButton} aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </header>
    {open && <div className="mobile-menu" id="mobile-nav" ref={menuPanel} role="dialog" aria-modal="true" aria-label="Menu de navegação"><nav>{navigation.map(([to, label], index) => <Link key={to} href={to} aria-current={isActive(to) ? "page" : undefined} onClick={() => setOpen(false)}><span className="small">0{index + 1}</span>{label}<ArrowUpRight /></Link>)}</nav><p>Software, fotografia<br />e tudo pelo caminho.</p><BrandMark /></div>}
    <main id="main" tabIndex={-1}>{children}</main>
    <footer className="site-footer"><div className="footer-top"><Link className="wordmark" href="/"><BrandMark /><span>GUSTAVO HIROAKI</span></Link><p>Um olhar curioso.<br />Muitas possibilidades.</p><div className="social-links">{profile.socials.map((social) => social.url ? <a key={social.name} href={social.url} target="_blank" rel="noreferrer">{social.name}<ArrowUpRight size={14} /></a> : <span key={social.name} className="social-placeholder" title="Perfil ainda não informado">{social.name}<span>em breve</span></span>)}</div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Gustavo Hiroaki</span><span>Feito com intenção e curiosidade.</span><button onClick={() => window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}>Voltar ao topo <ArrowUp size={16} /></button></div></footer>
  </>;
}

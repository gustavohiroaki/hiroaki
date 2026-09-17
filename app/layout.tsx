import type { Metadata } from "next";
import App from "../src/App";
import "../src/styles.css";

export const metadata: Metadata = {
  title: "Gustavo Hiroaki — Software, fotografia e curiosidade",
  description: "O espaço pessoal de Gustavo Hiroaki. Software, fotografia e um olhar curioso para o mundo.",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body><App>{children}</App></body></html>;
}

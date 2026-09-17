export type Project = {
  id: string;
  title: string;
  description: string;
  stack: string[];
  year: string;
  kind: "atlas" | "frame" | "notes";
  github: string;
  website: string;
  label: string;
};
export const projects: Project[] = [
  {
    id: "atlas",
    title: "Atlas",
    description:
      "Um lugar para reunir rotas, descobertas e lugares que merecem uma próxima viagem.",
    stack: ["React", "TypeScript", "Map interfaces"],
    year: "2026",
    kind: "atlas",
    github: "",
    website: "",
    label: "Planejamento de viagens",
  },
  {
    id: "frame",
    title: "Frame",
    description:
      "Um acervo fotográfico pensado para deixar a imagem falar. Organização simples, espaço para olhar.",
    stack: ["React", "Tailwind CSS", "Photography"],
    year: "2026",
    kind: "frame",
    github: "",
    website: "",
    label: "Arquivo fotográfico",
  },
  {
    id: "fieldnotes",
    title: "Field Notes",
    description:
      "Pequenas notas sobre o que estou aprendendo. Uma experiência de leitura sem distrações.",
    stack: ["TypeScript", "CSS", "Local data"],
    year: "2025",
    kind: "notes",
    github: "",
    website: "",
    label: "Experimento de interface",
  },
];

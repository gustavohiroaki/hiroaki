import fuji from "../assets/photos/fuji.webp";
import tokyo from "../assets/photos/tokyo.webp";
import forest from "../assets/photos/forest.webp";
import mountains from "../assets/photos/mountains.webp";
import camera from "../assets/photos/camera.webp";
import guitar from "../assets/photos/guitar.webp";
import portrait from "../assets/photos/portrait.webp";
import fujiSmall from "../assets/photos/fuji-small.webp";
import tokyoSmall from "../assets/photos/tokyo-small.webp";
import forestSmall from "../assets/photos/forest-small.webp";
import mountainsSmall from "../assets/photos/mountains-small.webp";
import portraitSmall from "../assets/photos/portrait-small.webp";
export type Photo = {
  id: string;
  image: string;
  thumbnail: string;
  title: string;
  location: string;
  category: string;
  date: string;
  camera?: string;
  alt: string;
  source: string;
};
export const photos: Photo[] = [
  {
    id: "fuji",
    image: fuji,
    thumbnail: fujiSmall,
    title: "Entre o céu e o silêncio",
    location: "Monte Fuji, Japão",
    category: "Japan",
    date: "Acervo de demonstração",
    alt: "Monte Fuji coberto de neve refletido em um lago azul",
    source: "https://unsplash.com/photos/6aV2WKzGJ_4",
  },
  {
    id: "tokyo",
    image: tokyo,
    thumbnail: tokyoSmall,
    title: "A cidade não espera",
    location: "Tóquio, Japão",
    category: "Street",
    date: "Acervo de demonstração",
    alt: "Vista urbana de Tóquio com luzes e arquitetura japonesa",
    source: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
  },
  {
    id: "mountains",
    image: mountains,
    thumbnail: mountainsSmall,
    title: "Lá fora, tudo muda",
    location: "Montanhas",
    category: "Landscape",
    date: "Acervo de demonstração",
    alt: "Picos rochosos sob um céu com nuvens",
    source: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
  },
  {
    id: "forest",
    image: forest,
    thumbnail: forestSmall,
    title: "Um pouco mais devagar",
    location: "Entre as árvores",
    category: "Nature",
    date: "Acervo de demonstração",
    alt: "Luz do sol atravessando árvores de uma floresta",
    source: "https://images.unsplash.com/photo-1448375240586-882707db888b",
  },
  {
    id: "portrait",
    image: portrait,
    thumbnail: portraitSmall,
    title: "Histórias em um olhar",
    location: "Retrato de exemplo",
    category: "Portrait",
    date: "Acervo de demonstração",
    alt: "Retrato de um modelo em luz natural; não representa Gustavo",
    source: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
  },
];
export const personalImages = { camera, guitar };
export const categories = [
  "All",
  "Japan",
  "Street",
  "Landscape",
  "Nature",
  "Portrait",
  "Travel",
];

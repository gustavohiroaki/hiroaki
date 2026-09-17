import { photos, personalImages } from "./photos";
export const posts = [
  {
    slug: "aprender-a-olhar",
    title: "Fotografar é aprender a prestar atenção.",
    excerpt:
      "Sobre desacelerar, observar a luz e encontrar histórias no que parece comum.",
    date: "12 set. 2026",
    category: "Photography",
    image: photos[0].image,
    alt: photos[0].alt,
    readTime: "3 min",
    sections: [
      {
        heading: "Antes do primeiro clique",
        text: "Existe um intervalo entre ver alguma coisa e realmente olhar para ela. Fotografar pode ser uma maneira de permanecer nesse intervalo um pouco mais. Uma mudança de luz, um reflexo, a maneira como uma pessoa ocupa a rua: o assunto nem sempre se anuncia.",
      },
      {
        heading: "Menos equipamento, mais presença",
        text: "Este é um texto de demonstração para o futuro blog. A ideia aqui é imaginar um espaço para compartilhar observações sobre fotografia, escolhas de enquadramento e o hábito de carregar uma câmera. As histórias reais virão depois.",
      },
      {
        heading: "Levar esse olhar para o dia a dia",
        text: "Não é preciso estar longe para encontrar algo interessante. Voltar ao mesmo lugar em outro horário já muda a fotografia. Talvez a parte mais bonita desse exercício seja perceber que o cotidiano nunca se repete exatamente.",
      },
    ],
  },
  {
    slug: "construir-com-menos",
    title: "Construir com menos, entender melhor.",
    excerpt:
      "Algumas ideias sobre simplicidade, software e a vontade de descobrir como as coisas funcionam.",
    date: "05 set. 2026",
    category: "Code",
    image: undefined,
    alt: "",
    readTime: "4 min",
    sections: [
      {
        heading: "A pergunta antes da ferramenta",
        text: "O que esta experiência precisa fazer? Começar por essa pergunta costuma revelar mais do que começar pela biblioteca. Este artigo de exemplo reserva um lugar para aprendizados de programação e decisões de projeto.",
      },
      {
        heading: "Espaço para experimentar",
        text: "Um projeto pequeno pode ser uma boa oportunidade de investigar uma ideia por inteiro. Da primeira interface até os detalhes que tornam uma interação previsível, o aprendizado aparece no processo.",
      },
    ],
  },
  {
    slug: "japao-nos-detalhes",
    title: "O Japão que mora nos detalhes.",
    excerpt:
      "Arquitetura, ruas e pequenos rituais. Um caderno aberto sobre um lugar que desperta curiosidade.",
    date: "28 ago. 2026",
    category: "Japan",
    image: photos[1].image,
    alt: photos[1].alt,
    readTime: "3 min",
    sections: [
      {
        heading: "O caminho também é o assunto",
        text: "Uma estação, uma placa, uma rua estreita. Este texto ilustrativo abre espaço para futuras histórias sobre Japão, cultura, viagens e fotografia, sem pressupor uma viagem ou experiência já vivida.",
      },
      {
        heading: "Um caderno que continua aberto",
        text: "Aprender sobre um lugar é perceber que sempre existe outra camada. A língua, a música, as formas de criar e os objetos do cotidiano oferecem pontos de partida diferentes.",
      },
    ],
  },
  {
    slug: "entre-acordes",
    title: "Entre um acorde e outro.",
    excerpt:
      "Música como pausa, prática e outra forma de continuar aprendendo.",
    date: "14 ago. 2026",
    category: "Music",
    image: personalImages.guitar,
    alt: "Detalhe de um violão",
    readTime: "2 min",
    sections: [
      {
        heading: "Aprender em outro ritmo",
        text: "Um espaço de exemplo para escrever sobre música e violão. Repetir um trecho, escutar com atenção e tentar de novo: aprender também pode ter esse ritmo.",
      },
      {
        heading: "O valor da pausa",
        text: "Nem todo interesse precisa se transformar em projeto. Alguns existem simplesmente porque tornam os dias mais interessantes.",
      },
    ],
  },
];

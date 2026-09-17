---
name: Gustavo Hiroaki
description: Espaço pessoal editorial de software, fotografia e curiosidade.
colors:
  blue: "#0021ce"
  navy: "#001273"
  slate: "#323a4f"
  silver: "#e2e1e1"
  background: "#08090b"
  surface: "#101218"
  muted: "#9ea3af"
  line: "#303237"
  accent-detail: "#304eff"
  focus: "#8092ff"
  button-hover: "#163aec"
typography:
  display:
    fontFamily: "Gruppo, sans-serif"
    fontSize: "clamp(64px, 8vw, 120px)"
    fontWeight: 400
    lineHeight: 1
  headline:
    fontFamily: "Gruppo, sans-serif"
    fontSize: "clamp(44px, 5vw, 72px)"
    fontWeight: 400
    lineHeight: 1.05
  body:
    fontFamily: "Metropolis, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.85
  label:
    fontFamily: "Metropolis, Arial, sans-serif"
    fontSize: "12px"
    lineHeight: 1.6
spacing:
  gutter: "clamp(24px, 5vw, 80px)"
  gutter-mobile: "24px"
  section: "110px"
  section-mobile: "72px"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.silver}"
    padding: "20px 24px"
  button-primary-hover:
    backgroundColor: "{colors.button-hover}"
  icon-button:
    width: "48px"
    height: "48px"
---

# Design System: Gustavo Hiroaki

## Overview

Sistema editorial escuro, geométrico e espaçoso, derivado da identidade fornecida. Gruppo, monograma original, prata e azul elétrico unem fotografia e conteúdo pessoal. Decisões de interface foram delegadas pelo usuário; não existe uma segunda comp de referência.

Os tokens acima e as seções de implementação abaixo registram `src/styles.css` e os componentes atuais. A extração inicial permanece a seguir como histórico da referência; medidas e movimentos provisórios nela descritos não substituem os valores implementados.

### Identidade e direção — registro original
Fonte de verdade: /home/gustavohiroaki/Downloads/PROJETO DE IDENTIDADE VISUAL.pdf.pdf (15 páginas) e arquivos fornecidos.
### Extração da referência — registro original
- Cores explícitas (p. 3): #323a4f, #001273, #0021ce, #e2e1e1. Preto domina as aplicações; branco/prata nos traços e textos.
- Tipo principal (p. 8): Gruppo Regular. Secundária (p. 9): Gotham. O arquivo entregue contém alternativas, não Gotham: Metropolis Regular/Medium/Bold foi selecionada do pacote, com licença OFL.
- Marca: monograma angular isométrico, traço fino. Usar PNG original convertido sem alterar desenho. Repetição geométrica é um recurso autorizado pela prancha de pattern.
- Composição: grandes campos negativos, contrastes de escala, alinhamentos ortogonais e assimetria. Pranchas alternam preto, azul saturado e prata; imagens de câmera e materiais ganham grande área.
- Bordas, sombras, raios: não há especificação de interface. Extensão: cantos retos, separadores de 1px em prata discreta, sem sombras ou cartões flutuantes.
- Escala: não há tamanhos de web prescritos. Gruppo em 48–128px para display responsivo; Metropolis 16–18px no corpo, 12–14px em metadados. Espaçamento de 8px, margem fluida 24–72px, blocos de 88–144px.
- Tratamento de imagens: proporções grandes, recortes retangulares, contraste e tons frios. Fotografias de exemplo preservam cores naturais. Sem gradientes decorativos.
- Botões, navegação e ícones: não definidos no PDF. Extensão com botões retos azuis, links discretos e Lucide de traço fino; menu mobile de largura total.
- Animação: não especificada em PDF estático. Extensão com entrada coordenada do hero, máscaras por transform, escala sutil em fotos, transição curta de rota; reduced motion desativa tudo.
### Contrato de composição — registro original
Modo Experience. Hero como díptico: nome Gruppo grande à esquerda; fotografia vertical à direita. O monograma original atravessa o limite entre os dois. Azul elétrico nos gestos de navegação e no fechamento. Conteúdo pessoal em montagem de imagem, palavras e texto, não grade de oito cartões. Fotografia com grandes proporções alternadas; projetos com prévias de interfaces; blog editorial; currículo sóbrio e legível.
### Decisões delegadas
Implementação direta em código, seguindo pedido de tomar decisões sem bloquear. Não há uma segunda identidade ou comp gerada. Textos em português com rótulos de navegação pedidos em inglês.

## Colors

O azul elétrico (`blue`) concentra ações, filtros selecionados e o encerramento da Home. O azul profundo (`navy`) aparece em arte editorial e prévias; o cinza azulado (`slate`) sustenta planos de imagem e linhas secundárias. Essas três cores e a prata (`silver`) vêm da identidade.

A interface estende a paleta com fundo quase preto, superfície de interesses discretamente mais clara, texto secundário (`muted`) e separadores (`line`). `accent-detail` marca pontos de títulos e navegação ativa. `focus` identifica o foco por teclado; `button-hover` distingue a ação primária ao passar o ponteiro. Fotografias mantêm cores naturais, com redução localizada de brilho/saturação no hero e nas composições pessoais.

## Typography

Gruppo Regular original, carregada localmente, conduz títulos e marca escrita. Metropolis local em pesos 400, 500 e 700 é a alternativa entregue para a Gotham citada no PDF; corpo e interface usam principalmente 400. Todas as fontes usam `font-display: swap`, sem síntese artificial.

A hierarquia base está no frontmatter. O nome no hero usa `clamp(84px, 9.2vw, 154px)`, entrelinha 0.94 e tracking −0.035em. No celular passa a `clamp(72px, 18vw, 115px)` e entrelinha 0.9. Títulos de artigos usam `clamp(52px, 6vw, 86px)`; o corpo de artigo usa 17px/1.95 e 15px no celular. Metadados variam por contexto, geralmente entre 10 e 13px; não aplicar Gruppo a textos longos.

## Layout

Contêineres centrais de até 1800px, margens fluidas e respiro vertical definido no frontmatter. A implementação não adota uma escala rígida de 8px: espaçamentos são ajustados às composições. Artigos têm cabeçalho de até 920px e corpo de até 740px, incluindo padding.

- `/`: díptico com proporção 1.07:1, nome à esquerda, foto à direita e marca atravessando os planos; fotos alternadas, montagem de interesses, prévia de projeto, linhas de artigos e fechamento azul.
- `/photography`: galeria assimétrica 1.2:0.8, com deslocamentos verticais, uma imagem expandida e filtros; visualizador modal.
- `/projects`: prévias conceituais de interfaces e informações em blocos editoriais.
- `/blog` e `/blog/:slug`: destaque largo, grade de três artigos e leitura em coluna central.
- `/about`: retrato, texto, princípios, paisagem e linha do tempo.
- `/resume`: coluna lateral de 310px com posição sticky e conteúdo seccionado; campos ainda não fornecidos permanecem explícitos.

Breakpoints efetivos: a partir de 1800px, hero fotográfico ampliado e encerramento centralizado; até 1100px, redução de gaps, imagens e tipografia; até 900px, menu móvel, projetos destacados em coluna e blog com duas colunas; até 650px, margem de 24px, hero e maioria das grades em coluna, currículo sem sticky e visualizador com largura total. A galeria conserva alguma assimetria no celular. Largura mínima do documento: 320px. Cabeçalho: 102px, 86px até 900px e 78px até 650px.

## Elevation & Depth

Sem sombras de caixas nem cartões flutuantes. Profundidade vem de sobreposição do monograma, cortes fotográficos, variação tonal e foto de interesses levemente rotacionada. Legendas sobre a foto do hero usam sombra de texto para leitura. O visualizador tem fundo escuro e backdrop preto translúcido; não introduzir gradientes decorativos.

## Shapes

Predominam cantos retos, separadores de 1px e recortes retangulares. O monograma em `/brand/mark.webp` deriva do PNG original e conserva seu desenho angular isométrico. Ícones Lucide acompanham a geometria por traços. Os pequenos pontos circulares das prévias de janela são uma exceção localizada, não um sistema de botões arredondados.

## Components

**Ações e links.** Botão primário azul, altura mínima de 58px, ícone à direita e hover com deslocamento vertical de −2px. No hero móvel ele vira ação quadrada de 48px com ícone e nome acessível preservado. Links editoriais têm sublinhado de 1px, altura mínima de 44px e seta que se desloca no hover. Controles quadrados de ícone têm borda discreta. Ações indisponíveis ficam desabilitadas ou são apresentadas como texto de placeholder.

**Navegação.** Desktop em Metropolis de 12px; rota ativa em prata com linha azul inferior. Menu móvel de largura total, links grandes em Gruppo e enumeração discreta. Possui nome acessível, estado expandido, foco inicial, ciclo de Tab, Escape e bloqueio de rolagem enquanto aberto; fecha ao navegar e ao voltar ao desktop.

**Fotografias.** Imagens com recorte `cover`, legendas externas e ampliação sutil no hover (1.035–1.04). O botão de zoom aparece também no foco e permanece visível no celular. Filtros usam `aria-pressed` e fundo azul quando ativos. O visualizador usa `dialog` modal, imagem em `contain`, fechamento por Escape e navegação por setas; ao fechar, devolve o foco ao acionador. Fotos de referência são identificadas como tal e têm descrição alternativa.

**Leitura e prévias.** Títulos de seção combinam Gruppo e ponto azul. Artigos em linhas usam separadores; prévias de projetos reproduzem pequenas interfaces, sem funcionar como aplicações independentes. Tags técnicas são retangulares, com borda de 1px e texto pequeno. Não há formulários nesta implementação.

**Acessibilidade e movimento.** Link de salto para o conteúdo, foco visível de 2px com afastamento de 6px, rótulos nos controles e foco no conteúdo após mudança de rota. Entradas usam `cubic-bezier(0.16, 1, 0.3, 1)`: rota 0.45s, revelação ao entrar na viewport 0.8s, texto do hero 0.95s, monograma 1.4s e foto 1.5s. Hover de fotos dura cerca de 0.7–1.2s; estados de controles, 0.2–0.35s. `prefers-reduced-motion` desativa animações, transições e rolagem suave; também remove transformações de hover das imagens explicitamente contempladas no CSS. O componente de revelação mantém conteúdo visível sem observação. Estes são comportamentos registrados no código, não uma declaração de auditoria de conformidade.

## Do's and Don'ts

- **Do:** preservar a marca original, Gruppo, cores da identidade e a hierarquia entre títulos leves e corpo legível.
- **Do:** usar espaço negativo, proporções fotográficas variadas, linhas finas e azul para ações e gestos editoriais.
- **Do:** manter fotos de referência, projetos de demonstração e dados não fornecidos identificados com clareza.
- **Do:** conservar estados de teclado, nomes acessíveis e tratamento de movimento reduzido ao expandir componentes.
- **Don't:** redesenhar o monograma, substituir Gruppo ou apresentar Metropolis como a Gotham original.
- **Don't:** transformar todas as seções em cartões iguais, adicionar sombras flutuantes, gradientes decorativos ou arredondamentos generalizados.

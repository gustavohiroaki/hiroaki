# Gustavo Hiroaki — portfólio pessoal

Site estático em Vite, React, TypeScript e Tailwind CSS. Sem backend, banco, autenticação, CMS ou APIs em tempo de execução.

## Executar

```sh
npm install
npm run dev
```

O Vite exibe o endereço local. Para produção:

```sh
npm run build
npm run preview
```

A pasta `dist/` contém o site pronto para hospedagem estática. Configure a hospedagem para servir `index.html` nas rotas não correspondentes a arquivos (fallback de SPA), incluindo `/blog/:slug`. Não há publicação remota configurada.

## Editar conteúdo

- `src/data/profile.ts`: apresentação, interesses, e-mail e redes sociais. URLs vazias aparecem como “em breve”.
- `src/data/photos.ts`: fotos, miniaturas, texto alternativo, título, local, categoria, data, câmera opcional e fonte.
- `src/assets/photos/`: imagens WebP locais. Substitua os arquivos ou altere os imports. `thumbnail` é a versão pequena usada no `srcSet` e nas prévias.
- `src/data/projects.ts`: projetos, stack, ano, descrição e URLs. As três interfaces são demonstrações, não trabalhos reais alegados.
- `src/data/posts.ts`: posts e seções dos artigos. São dados TypeScript; não há Markdown nem sistema de publicação.
- `src/data/resume.ts`: currículo. Preencha experiência, formação, tecnologias, idiomas e `cvUrl`. Um PDF em `public/cv.pdf` pode ser ativado com `cvUrl: '/cv.pdf'`.

Fotos, projetos, datas de posts, artigos e currículo são demonstrativos. Nenhuma empresa, formação ou nível de idioma foi atribuído a Gustavo. O retrato da galeria é de um modelo e não é usado como retrato pessoal.

## Identidade

`DESIGN.md` documenta a análise do PDF e a extensão para interface. As quatro cores declaradas no manual foram preservadas. Gruppo é a fonte principal; Metropolis foi escolhida entre as alternativas à Gotham fornecidas no pacote. Fontes e licenças estão em `public/fonts/`. A marca em `public/brand/` foi recortada a partir dos PNGs transparentes originais, sem redesenho.

As fotografias de referência são do Unsplash; origens estão em `src/assets/photos/README.md` e nos registros de fotos. A aplicação carrega todas as imagens e fontes localmente.

## Interações e acessibilidade

- Menu mobile com foco controlado, Escape, fechamento após navegação e bloqueio de rolagem.
- Filtros reais na galeria; lightbox nativo com anterior/próxima, setas do teclado, Escape e retorno do foco.
- Navegação entre páginas com foco no conteúdo e retorno ao topo.
- Carregamento diferido de páginas e fotos, imagens WebP e fontes locais.
- Animações CSS discretas; `prefers-reduced-motion` desativa movimento.
- Links indisponíveis são texto identificado; o download do CV fica desabilitado até receber um arquivo.

## Verificação

```sh
npx playwright install chromium
npm run dev -- --port 5173
# Em outro terminal:
npm run test:e2e
```

O script verifica sete rotas em desktop, tablet e mobile, ausência de overflow horizontal, carregamento das imagens, filtros, visualizador e navegação mobile. As capturas ficam em `.impeccable/review/` (fora do Git). `npm run build` valida o TypeScript e gera o bundle.

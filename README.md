# Static version (organizado)

Esta pasta contém uma versão em HTML/CSS/JS puro do projeto React original, agora organizada como um pequeno projeto estático.

Estrutura criada:

- `index.html` — página inicial (entrypoint)
- `catalogo.html` — página separada do catálogo de startups
- `css/` — estilos (hoje `styles.css`)
- `js/` — scripts (hoje `main.js`)
- `data/` — dados estáticos (hoje `startups.js`)
- `assets/` — imagens e ícones (subpastas `images/`, `icons/`)

Como usar:

- Sirva o diretório com um servidor estático (recomendado) ou abra `index.html` e `catalogo.html` diretamente.
- `data/startups.js` define `window.STARTUPS` (usado por `js/main.js` para renderizar o catálogo).

Próximos passos sugeridos:

- Substituir emojis por SVGs em `assets/icons/` (melhor aparência). ✅
- Remover arquivos antigos (`styles.css`, `script.js`) ou arquivá-los se preferir.
- Melhorar acessibilidade e adicionar testes simples.

Se quer, eu faço uma limpeza final (remover arquivos antigos) e adiciono ícones SVG e um pequeno `serve` script para desenvolvimento.

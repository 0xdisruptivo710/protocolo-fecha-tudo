# Design

Este projeto tem **duas superfícies** com identidades visuais distintas, irmãs pelo conteúdo e pelo Felipe, opostas pelo registro estético. Tudo abaixo está organizado por superfície.

---

## Superfície A — Página Hotmart Cinematográfica (`/pagina-a-dor`)

Códigos de info-produto brasileiro, executados com produção fora do mercado.

### Theme

Light mode com blocos de injeção dark.

Cena física: esteticista no fim do dia, celular na mão, abrindo a página entre conversas de cliente. Iluminação ambiente forte (sol de fim de tarde no salão). Light interface ganha porque é onde ela está. Dark blocks aparecem como momentos de gravidade (autoridade, oferta).

### Color

**Estratégia:** Committed, com contraste alto entre amarelo e preto.

| Token | OKLCH | HEX aprox | Uso |
|---|---|---|---|
| `--bg` | `oklch(0.985 0.005 85)` | `#FAF7F2` | fundo geral, papel quente |
| `--ink` | `oklch(0.18 0.012 60)` | `#221E18` | texto principal, headlines |
| `--ink-soft` | `oklch(0.45 0.01 60)` | `#5C544A` | texto auxiliar |
| `--alert` | `oklch(0.62 0.22 27)` | `#E63426` | destaques de urgência, "antes" tachado, alerta |
| `--alert-deep` | `oklch(0.45 0.18 27)` | `#A4231A` | hover de alerta, fundo de aviso |
| `--accent` | `oklch(0.86 0.16 95)` | `#F2C744` | CTA principal (amarelo de info-produto, calibrado) |
| `--accent-deep` | `oklch(0.74 0.18 88)` | `#D9A82A` | hover do CTA |
| `--surface-dark` | `oklch(0.16 0.01 60)` | `#1B1814` | blocos de autoridade e fechamento |
| `--surface-dark-ink` | `oklch(0.96 0.005 85)` | `#F4EFE8` | texto sobre dark |

Preto puro `#000` e branco puro `#fff` proibidos. Todos os neutros tintados com matiz quente (60-85).

### Typography

Duas famílias com propósitos opostos:

- **Headline / Hero**: **Anton** ou similar condensada — escala extrema, peso sólido, faz o headline "gritar" sem precisar de cor. Toda em maiúsculas para titulares principais. Tracking apertado (-0.02em).
- **Body / UI**: **Inter** — pesos 400/500/600/700. Body em 17px. Line-height 1.5.

Escala (escalonamento 1.333):

| Nível | Tamanho | Peso |
|---|---|---|
| `display` (hero) | clamp(48px, 8vw, 96px) | 800 |
| `h1` | clamp(36px, 5vw, 60px) | 700 |
| `h2` | clamp(28px, 3.5vw, 42px) | 700 |
| `h3` | 22px | 600 |
| `body` | 17px | 400 |
| `small` | 14px | 500 |

### Layout & Spacing

- Grid 12 colunas, `gap: 24px`
- Container max-width: 1180px
- Section padding vertical: clamp(72px, 10vw, 140px)
- Ritmo: blocos altos alternam com blocos densos. Hero respira; "stack de oferta" é apertado.

### Components

- **CTA primário**: amarelo `--accent`, texto `--ink`, peso 700, padding 22px 40px, border-radius 12px, com seta `→` que se move 4px no hover. **Sem brilho gradient**. Sombra `0 8px 0 var(--accent-deep)` (dá efeito de botão "apertável" típico de info-produto, mas calibrado).
- **Bloco de urgência**: fundo `--alert`, texto branco quente, padding 14px 24px, fonte condensada caixa-alta
- **Stack de oferta**: cards listados dentro de uma "caixa preta" `--surface-dark`, cada item com preço riscado `--alert` à direita
- **Logo bar de franquias**: barra horizontal cinza neutra (#EFEAE2), logos em monocromia escura, scroll horizontal automático suave em mobile (linear, 40s)

### Motion

- Transitions: `cubic-bezier(0.23, 1, 0.32, 1)` (strong ease-out) por padrão, 200ms em UI, 400ms em entradas de seção
- Stagger no hero: headline, subheadline, CTAs entram com 80ms de delay entre si
- CTAs: `transform: scale(0.97)` no `:active`
- Logos das franquias: marquee horizontal contínuo, sem hover-pause (passa, registra, segue)
- `prefers-reduced-motion`: marquee para, stagger sem translate, só fade

### Photo

**Foto 2 (P&B com persiana)** — hero direito, recorte vertical 3:4. Aplicar overlay sutil quente para integrar à paleta. Etiqueta vermelha sobreposta no canto inferior: "FELIPE / IDEALIZADOR DO MÉTODO MACA".

### What this is NOT

- Não tem timer de countdown
- Não tem stickers "GARANTIA TOTAL" coloridos
- Não tem emoji em headline
- Não tem ilustração 3D
- Não tem gradient text
- Não tem em dash

---

## Superfície B — Estúdio do Estrategista (`/pagina-b-aspiracao`)

Layout editorial de revista de negócios. Felipe como sujeito de matéria.

### Theme

Light mode com um único bloco dark de fechamento.

Cena física: esteticista que já tem clientela, no fim de semana, no laptop, lendo sobre como subir o ticket sem espantar quem vai chegar. Atmosfera de escritório residencial, café preto, revista em cima da mesa.

### Color

**Estratégia:** Restrained — neutros tintados quentes com 1 acento de pigmento profundo.

| Token | OKLCH | HEX aprox | Uso |
|---|---|---|---|
| `--paper` | `oklch(0.97 0.008 85)` | `#F5F1EA` | fundo principal, papel de carta |
| `--paper-soft` | `oklch(0.93 0.01 85)` | `#EAE3D6` | seções alternadas, divisores |
| `--ink` | `oklch(0.16 0.008 60)` | `#1A1714` | texto principal |
| `--ink-mute` | `oklch(0.42 0.01 60)` | `#544D43` | texto auxiliar, metadata |
| `--pigment` | `oklch(0.42 0.12 35)` | `#9A4A2E` | acento único: links, marcações, fios |
| `--pigment-deep` | `oklch(0.32 0.12 35)` | `#763925` | hover do pigmento |
| `--charcoal` | `oklch(0.13 0.005 60)` | `#15120F` | bloco fechamento |
| `--charcoal-ink` | `oklch(0.94 0.008 85)` | `#EFEBE3` | texto sobre charcoal |

### Typography

Editorial. Duas famílias.

- **Display / Title**: **Playfair Display** (serif clássica), pesos 500/700/900. Itálicas usadas com intenção (não decoração).
- **Body / UI**: **Inter** — 400/500/600. Body em 18px. Line-height 1.65. Cap em 65ch para colunas longas.

Escala (1.25):

| Nível | Tamanho | Peso | Família |
|---|---|---|---|
| `display` (hero) | clamp(48px, 7vw, 88px) | 500 | Playfair |
| `h1` | clamp(36px, 4.5vw, 56px) | 500 | Playfair |
| `h2` | clamp(28px, 3vw, 38px) | 500 | Playfair |
| `h3` | 22px | 600 | Inter |
| `body` | 18px | 400 | Inter |
| `quote` | 24px | 400 italic | Playfair |

### Layout & Spacing

- Hero assimétrico 5+7 (texto à esquerda 5/12, foto à direita 7/12)
- Container max-width: 1240px (mais respiração que A)
- Section padding vertical: clamp(96px, 12vw, 180px) — significativamente mais que A
- Fios horizontais finos (1px `--ink` 12% opacity) marcam mudança de seção em vez de cards

### Components

- **CTA primário**: fundo `--ink`, texto `--paper`, padding 20px 36px, sem sombra (sem cliché de info-produto), seta tipográfica `→` mais fina, transição em color/border 200ms
- **CTA WhatsApp**: outline `--pigment`, texto `--pigment`, hover preenche
- **Bloco autoridade**: barra horizontal de logos com nomes em texto (`Face Doctor · Botoclinic · Studio Mines · Smile Skin`), separados por `·` em `--ink-mute`
- **Card de autoridade Felipe**: layout magazine (foto + bloco texto), borda fina apenas no topo
- **Pull quote**: serif itálico, indent à esquerda, fio vertical `--pigment` 2px

### Motion

- Mesma curva de easing que A
- Hero entry: foto entra com `clip-path: inset(0 0 0 100%)` revelando da esquerda, 600ms `cubic-bezier(0.32, 0.72, 0, 1)`. Texto faz stagger ao mesmo tempo.
- Sem marquee. Sem urgência visual.
- Scroll reveal: `IntersectionObserver` aciona fade + 8px translateY em blocos editoriais

### Photo

- **Foto 3 (turtleneck close-up)** — hero direito, fundo `--paper`. Aplica blend mode `multiply` sutil para aderir à paleta.
- **Foto 1 (camisa preta, 3/4)** — seção "Sobre" em layout magazine, lado a lado com bio de 3 parágrafos
- **Foto 2 (P&B persiana)** — bloco "O Método MACA" como pano de fundo, com overlay charcoal 70% para legibilidade

### What this is NOT

- Não é cream + gold + borboletas
- Não é "luxo de Instagram" com paleta dusty rose
- Não tem CTA piscando
- Não tem prova social em caixa
- Não tem em dash

---

## Shared Cross-Surface Rules

### Iconografia

Mínimo. Quando aparecer (checkmarks de garantia, setas), usa stroke-only, weight 2, line-cap round, 18-24px. Nunca ícones de pacote (Heroicons OK, Phosphor OK; Lottie animations não).

### Imagens

Apenas as 3 fotos do Felipe. Sem stock photos. Sem ilustrações. Se precisar de "decoração", é tipografia ou linha geométrica.

### Performance

- Fontes via `<link rel="preload">` com swap
- Imagens com `loading="lazy"` exceto hero
- Largest Contentful Paint < 2s em conexão 4G
- Cumulative Layout Shift < 0.05

### Bans Absolutos (em ambas)

- Em dash em qualquer lugar (já há regra)
- `border-left: Xpx solid` em cards
- `background-clip: text` com gradient
- `glass-morphism` (blur de fundo decorativo)
- Modais para qualquer coisa (FAQ é accordion inline)
- "Hero metric template" (números enormes em grid simétrico)
- Cards iguais em grid (3 ou 4 cards idênticos com ícone+heading+texto)

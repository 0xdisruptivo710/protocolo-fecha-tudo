# Design System: Protocolo Fecha-Tudo — Página B (Estúdio do Estrategista)

> **Use:** este arquivo é a fonte única para prompts no Google Stitch ao gerar telas para a **Página B** (registro ASPIRAÇÃO). Tudo abaixo é interpretável como linguagem semântica para o agente Stitch.

---

## 1. Visual Theme & Atmosphere

Uma interface **editorial, restrained, quase silenciosa** que assume o registro de uma **revista de negócios impressa** — não site de curso. Felipe é tratado como **sujeito de matéria de capa**, não como vendedor. A cena imaginária é uma esteticista que já tem clientela, num fim de semana de manhã, no laptop em casa, com café preto na mesa e uma revista física aberta ao lado, lendo sobre como subir o ticket sem espantar quem já chega.

A página é **quieta, generosa em respiração, autoritativa por contenção**. Onde a Página A grita em amarelo, esta sussurra em papel cru com um único pigmento terra-bordô que se permite aparecer.

- **Densidade:** 3/10 — "Art Gallery Airy" — espaço em branco é o material principal
- **Variância:** 6/10 — "Offset Asymmetric" — split 5+7, fios horizontais finos como divisores de seção em vez de cards
- **Motion:** 4/10 — "Fluid CSS restrained" — reveal sutil em scroll, sem coreografia, sem cinematografia, sem marquee

O resultado deve parecer uma **página de Monocle ou Kinfolk reinterpretada para web** — não uma "página de curso premium".

---

## 2. Color Palette & Roles

Paleta restrained: neutros tintados quentes (matiz 60–85) com **um único pigmento profundo** terra-bordô que aparece em links, marcações, fios verticais de pull-quote. Não há amarelo. Não há vermelho de alerta.

- **Papel Carta** (`#F5F1EA`) — fundo principal. É papel de carta com leve calor.
- **Papel Suave** (`#EAE3D6`) — fundo de seções alternadas, divisores, sub-superfícies.
- **Tinta Editorial** (`#1A1714`) — texto principal, headlines, body. Substitui o preto puro.
- **Tinta Mute** (`#544D43`) — texto auxiliar, metadata, captions, byline.
- **Pigmento Terra-Bordô** (`#9A4A2E`) — acento único: links, marcações de texto, fio vertical de pull-quote, hover de CTA secundário. Saturação contida, terroso, **nunca neon, nunca rose, nunca pink**.
- **Pigmento Profundo** (`#763925`) — hover do pigmento, estados ativos.
- **Charcoal Bloco** (`#15120F`) — único bloco dark da página, usado no fechamento da oferta como contraponto tonal.
- **Tinta Sobre Charcoal** (`#EFEBE3`) — texto sobre charcoal, mantém calor.
- **Whisper Border** (`rgba(26, 23, 20, 0.12)`) — fios horizontais de 1px que substituem cards. Quase invisível mas estrutural.

**Banido:** preto puro `#000000`, branco puro `#FFFFFF`, qualquer amarelo, vermelho de alerta, dusty rose, cream + gold, lavanda, neon de qualquer cor, gradiente sutil de fundo, blob shapes.

---

## 3. Typography Rules

Duas famílias editoriais. Serif para títulos e citações, sans neutra para corpo. Itálico é usado **com intenção**, não como decoração.

- **Display / Title / H1–H2 / Pull-quote:** **Playfair Display** (serif clássica de revista), pesos 500/700/900. Itálicas reservadas para citações e ênfase intencional. Tracking neutro (`0`). Os títulos são **proporcionais, não gigantes** — hierarquia se constrói por contraste serif vs sans, não por escala extrema.
- **Body / UI / H3:** **Inter** — pesos 400/500/600. Body em **18px**, line-height **1.65**. Cap em **65ch** para colunas longas (regra editorial dura, não sugestão).
- **Metadata / Byline / Caption:** Inter 14px peso 500, `text-transform: uppercase`, tracking `0.08em`, cor `#544D43`.

**Escala (proporção 1.25 — moderada, não extrema):**

| Nível | Tamanho | Peso | Família | Estilo |
|---|---|---|---|---|
| display (hero) | `clamp(48px, 7vw, 88px)` | 500 | Playfair Display | regular |
| h1 | `clamp(36px, 4.5vw, 56px)` | 500 | Playfair Display | regular |
| h2 | `clamp(28px, 3vw, 38px)` | 500 | Playfair Display | regular |
| h3 | 22px | 600 | Inter | regular |
| body | 18px | 400 | Inter | regular |
| quote | 24px | 400 | Playfair Display | **italic** |
| byline | 14px | 500 | Inter | uppercase tracked |

**Alternativa de serif aceita:** Fraunces, Editorial New, Instrument Serif — caso Playfair seja substituído. **Banido:** Times New Roman, Georgia, Garamond, Palatino (genéricos, denunciam sistema padrão), qualquer serif decorativa "script", Anton (pertence à Página A), itálico em parágrafo inteiro.

---

## 4. Hero Section

Layout **5+7 deslocado**, registro editorial: bloco de texto à esquerda (5 colunas), foto turtleneck close-up de Felipe à direita (7 colunas, recorte vertical 4:5).

- **Eyebrow editorial** acima do headline: pequena linha em Inter 14px caixa alta tracking 0.08em cor `#544D43` — algo como `MÉTODO MACA · PELO ESTRATEGISTA FELIPE`. Funciona como kicker de matéria de revista.
- **Headline em Playfair Display 500**, escala moderada via `clamp(48px, 7vw, 88px)`, máximo 3 linhas, **sem caixa alta**. Pode conter uma palavra em **itálico** como ênfase tipográfica intencional (e não decorativa).
- **Subheadline** em Inter 18px regular, cor `#544D43`, máximo 2 linhas, cap em 60ch.
- **CTA primário discreto:** retângulo preenchido `#1A1714`, texto `#F5F1EA` em Inter 500, padding `20px 36px`, **sem sombra**, **sem border-radius arredondado** (4px máximo). Seta `→` tipográfica fina. Texto: `Adquirir o protocolo`.
- **CTA secundário:** outline 1px `#9A4A2E`, texto `#9A4A2E` em Inter 500. Hover preenche fundo com `#9A4A2E` e inverte texto para `#F5F1EA`. Texto: `Saber mais via WhatsApp`.
- **Foto:** turtleneck close-up, fundo papel `#F5F1EA` (foto deve aderir ao fundo, não destacar). Aplica blend-mode `multiply` sutil para integrar à paleta. Sem etiqueta sobreposta — a foto fala por si.
- **Foto entra com `clip-path` reveal** da esquerda para direita em 600ms `cubic-bezier(0.32, 0.72, 0, 1)`.

**Banido no hero:** badge "Hot" no canto da foto, countdown, marquee de logos no topo, CTA amarelo, hero centrado simétrico, mais de 1 CTA primário, "Scroll para explorar".

---

## 5. Component Stylings

- **CTA Primário (dark):** retângulo `#1A1714`, texto `#F5F1EA` em Inter 500, padding `20px 36px`, border-radius **4px** (não 12px), sem sombra de elevação. Hover suaviza para `#15120F` em 200ms. Sem efeito "apertável". Sem outer glow.
- **CTA Secundário (outline):** border 1px `#9A4A2E`, texto `#9A4A2E` em Inter 500, mesmo padding. Hover preenche fundo com `#9A4A2E` e inverte texto.
- **Bloco de Autoridade (Felipe):** layout magazine clássico — foto de Felipe camisa preta à esquerda (4:5), bloco de texto à direita com bio em 3 parágrafos curtos, byline em caps tracked no topo. **Borda fina apenas no topo** (`1px solid rgba(26,23,20,0.12)`), nada nos outros lados. Sem card, sem sombra, sem fundo de cor diferente.
- **Logo Bar de Franquias (em texto):** **não tem imagens de logo**. É uma linha horizontal com os nomes em **texto**: `Face Doctor · Botoclinic · Estúdio Mais · Smile Skin · Best Laser · Gio Laser · Dr. Colágeno`, separados por `·` em `#544D43`, Inter 16px peso 500. Sem marquee. Centralizada ou alinhada à esquerda, contida na largura do container.
- **Pull-quote:** texto em Playfair Display 24px **itálico**, indent à esquerda de 32px, com fio vertical `#9A4A2E` 2px à esquerda. Sem aspas gigantes decorativas. Sem fundo. Citação seguida de atribuição em Inter 14px caps tracked.
- **Bloco "O Método MACA":** seção dark única da página, fundo `#15120F`, padding generoso (`clamp(96px, 14vw, 180px)` vertical), texto `#EFEBE3`. Pode opcionalmente usar a foto P&B persiana como pano de fundo com overlay charcoal 70%. **Único** uso de tom escuro na página.
- **FAQ:** accordion inline silencioso. Pergunta em Playfair Display 22px peso 500. Toggle visual é apenas um traço horizontal `#9A4A2E` 2px que vira `+` sutil — não é ícone de pacote.
- **Inputs (se houver):** label acima em Inter 14px caps tracked, input com border-bottom 1px `#1A1714`, padding bottom 8px. Focus muda border para `#9A4A2E`. Sem border lateral, sem fundo, sem floating label.
- **Skeletal Loader (se houver):** retângulos da exata dimensão final, sem shimmer agressivo — apenas pulse de opacity 0.6 ↔ 1 em 2s. **Nunca** spinner circular.

---

## 6. Layout Principles

- **Grid 12 colunas**, gap 32px (maior que A), container max-width **1240px** centralizado.
- **Section padding vertical:** `clamp(96px, 12vw, 180px)` — significativamente mais respiração que Página A. O espaço em branco é parte do conteúdo.
- **Fios horizontais finos `rgba(26,23,20,0.12)` 1px** marcam mudança de seção em vez de cards, fundos alternados ou bordas pesadas.
- **Hero assimétrico 5+7** — texto esquerda, foto direita. Mobile colapsa para single column com foto **abaixo** do headline.
- **Sem sobreposição de elementos.** Cada bloco ocupa seu próprio retângulo limpo. Sem texto sobre foto. Sem badge sobreposto.
- **Sem grid de 3 cards iguais.** Use 2-column zig-zag (texto-foto, foto-texto, texto-foto) ou coluna única editorial.
- Use `min-h-[100dvh]` em seções full-height. Nunca `100vh`.
- CSS Grid sempre. **Banido:** `calc()` com porcentagens, flexbox math hackeado.

---

## 7. Responsive Rules

- **Mobile-first collapse abaixo de 768px:** todas as colunas múltiplas viram coluna única. Hero passa eyebrow → headline → subheadline → foto → CTAs.
- **Sem scroll horizontal** em nenhuma viewport.
- **Tipografia escala via `clamp()`** — display do hero entre 48px e 88px.
- **Touch targets ≥ 44px** em todos os links e CTAs.
- **Cap de coluna preservado:** 65ch em mobile também — parágrafos não devem encher toda a largura do device em telas largas.
- **Espaçamento de seção escala:** `clamp(96px, 12vw, 180px)` — naturalmente diminui em mobile mas mantém generosidade.
- **Nav:** topbar fina horizontal com nome de marca à esquerda e CTA secundário sutil à direita. Em mobile, vira topbar com nome de marca apenas + CTA sticky no rodapé.

---

## 8. Motion & Interaction

- **Easing padrão:** `cubic-bezier(0.32, 0.72, 0, 1)` (ease editorial) para entradas. 200ms em UI, 600ms em reveals de seção.
- **Hero foto entry:** `clip-path: inset(0 0 0 100%)` → `inset(0 0 0 0%)` em 600ms — revela da esquerda para direita. Texto faz stagger simultâneo com `opacity 0→1` + `translateY 8px→0`, 80ms de delay entre eyebrow, headline, subheadline, CTAs.
- **Scroll reveal:** `IntersectionObserver` ativa fade-in (0→1) + translateY 8px→0 em blocos editoriais. Threshold 0.2.
- **Sem marquee.** Sem scroll horizontal automático.
- **Sem urgência visual** (nada pisca, nada pulsa, nada chama atenção fora do contexto de leitura).
- **CTAs:** mudança suave de cor em hover/active, sem translate, sem sombra colapsando.
- **Performance:** animar **apenas** `transform` e `opacity` (`clip-path` aceitável no hero entry).
- **`prefers-reduced-motion: reduce`:** clip-path reveal vira fade puro, stagger vira fade sem translate.

---

## 9. Photo Direction

- **Hero:** turtleneck close-up (Felipe), recorte vertical 4:5, fundo papel. Blend `multiply` sutil para aderir à paleta — a foto não deve "saltar" do papel, deve **pertencer** a ele.
- **Bloco "Sobre Felipe":** foto camisa preta 3/4, lado a lado com bio em 3 parágrafos. Layout magazine clássico, sem moldura, sem sombra.
- **Bloco "Método MACA":** foto P&B persiana como pano de fundo, com overlay charcoal `rgba(21, 18, 15, 0.7)` por cima para garantir legibilidade do texto em branco quente.
- **Banido:** stock photos, ilustrações, fotos de "esteticista feliz com cliente", mockups de produto, screenshots de WhatsApp, frames de vídeo.

---

## 10. Anti-Patterns (Banidos)

Esta lista é tão importante quanto as regras positivas. Stitch deve **nunca** gerar nenhum dos itens abaixo:

- ❌ **Anton como fonte de display** — pertence à Página A.
- ❌ **Headlines em CAIXA ALTA gigante** — esta página é mixed-case, escala moderada, hierarquia por contraste serif/sans.
- ❌ **Amarelo `#F2C744`** ou qualquer amarelo — pertence à Página A.
- ❌ **Vermelho `#E63426`** ou qualquer vermelho de alerta — não há urgência visual nesta página.
- ❌ **Pure black `#000000`** — usar `#1A1714` (Tinta Editorial).
- ❌ **Pure white `#FFFFFF`** — usar `#F5F1EA` (Papel Carta).
- ❌ **Sombra "apertável" sólida em CTA** (efeito info-produto da Página A).
- ❌ **Neon glow / outer box-shadow difusa**.
- ❌ **Gradiente em texto** (background-clip: text).
- ❌ **Glassmorphism / backdrop-blur decorativo**.
- ❌ **Custom mouse cursors**.
- ❌ **Emojis em qualquer lugar**.
- ❌ **Em-dash** (`—`) em qualquer copy — usar `·` ou ponto final ou vírgula.
- ❌ **Aspas tipográficas gigantes decorativas** em pull-quote (`"`/`"` em 200px ao lado da citação).
- ❌ **Border-left: Xpx solid** em cards — apenas em pull-quote como fio vertical de 2px pigmento.
- ❌ **Marquee de logos** ou scroll horizontal automático.
- ❌ **Countdown timer**, stickers de urgência, badges piscando.
- ❌ **Modais** — FAQ é accordion inline.
- ❌ **Hero metric template** (números gigantes em grid).
- ❌ **3 cards iguais com ícone + heading + texto curto** — use 2-column zig-zag ou coluna única editorial.
- ❌ **Cream + gold + script font** (cliché "luxo beauty").
- ❌ **Dusty rose, blush, rose-nude** (cliché "site institucional de psicóloga").
- ❌ **Times New Roman, Georgia, Garamond** — serifs genéricas que denunciam sistema.
- ❌ **Itálico em parágrafo inteiro** — itálico é ênfase pontual, não decoração.
- ❌ **Filler UI text:** "Scroll to explore", "Swipe down", setas bouncing.
- ❌ **Nomes genéricos** em depoimentos ("John Doe", "Cliente Anônima").
- ❌ **Números falsos arredondados** (`99.99%`, `100% garantido`).
- ❌ **AI copywriting clichês:** "Eleve", "Destrave", "Transforme", "Jornada", "Potencial", "Próximo nível".
- ❌ **Centered hero simétrico** — usar split 5+7.
- ❌ **Foto de braços cruzados na frente de parede de tijolos** (cliché coach motivacional).
- ❌ **Pílulas "Novo!" / "Best-seller"** no canto de elementos.

---

## Implementation Notes for Stitch

- Idioma: **pt-BR** (`<html lang="pt-BR">`).
- Acessibilidade: WCAG 2.1 AA mínimo. Contraste de texto ≥ 4.5:1 — o terra-bordô `#9A4A2E` sobre papel `#F5F1EA` precisa ser checado em corpo pequeno (preferir usá-lo em links e ênfase, não em parágrafos inteiros).
- Fontes: Google Fonts com `<link rel="preload">` para Playfair Display e Inter. `font-display: swap`.
- Imagens: 3 fotos do Felipe apenas. Sem stock. Sem ilustrações.
- Checkout: link único para Ticto `https://checkout.ticto.app/OCC46FBCB`.
- Sucesso da página = clique no CTA primário. Secundário = clique no WhatsApp `https://wa.me/5515981730591`.
- **Tom da copy:** operacional, não motivacional. Fala em movimentos, sequência, conversa. **Banido:** "jornada", "potencial", "sonho", "transformação".

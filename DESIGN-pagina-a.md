# Design System: Protocolo Fecha-Tudo — Página A (Hotmart Cinematográfico)

> **Use:** este arquivo é a fonte única para prompts no Google Stitch ao gerar telas para a **Página A** (registro DOR / urgência). Tudo abaixo é interpretável como linguagem semântica para o agente Stitch.

---

## 1. Visual Theme & Atmosphere

Uma interface **light, densa e committed** que assume os códigos do info-produto brasileiro (urgência, oferta empilhada, prova de autoridade pesada) mas executa com produção fora desse mercado. A cena imaginária é uma esteticista no fim do dia, celular na mão entre uma cliente e outra, com sol de fim de tarde no salão — por isso o fundo é papel quente, não branco frio. Há **blocos dark de gravidade** (autoridade Felipe, fechamento de oferta) que quebram o ritmo claro como momentos de pausa cinematográfica.

- **Densidade:** 6/10 — "Daily App Balanced" tendendo a denso na stack de oferta, airy no hero
- **Variância:** 7/10 — "Offset Asymmetric" — hero com foto deslocada à direita, blocos alternam ritmo
- **Motion:** 5/10 — "Fluid CSS" — sem coreografia cinematográfica; o que se move tem propósito (CTA aperta, marquee de logos passa)

O resultado deve parecer um **anúncio impresso de jornal de negócios dos anos 70 reinterpretado para celular** — não uma "página de curso na Hotmart".

---

## 2. Color Palette & Roles

Paleta committed com contraste alto entre amarelo info-produto calibrado e preto quente. Todos os neutros são **tintados em matiz quente (60–85)** — nada de cinza neutro frio.

- **Papel Quente** (`#FAF7F2`) — fundo principal de toda a página. Não é branco. É papel envelhecido sob iluminação ambiente.
- **Tinta Charcoal** (`#221E18`) — texto principal, headlines, body. Substitui o preto puro.
- **Tinta Suave** (`#5C544A`) — texto auxiliar, metadata, captions de foto.
- **Amarelo Comissão** (`#F2C744`) — acento único de CTA. Amarelo info-produto **calibrado** (saturação contida), nunca neon.
- **Amarelo Profundo** (`#D9A82A`) — hover do CTA e sombra "apertável" sob o botão.
- **Vermelho Alerta** (`#E63426`) — destaques de urgência, preço "antes" tachado, etiqueta de autoridade sobre foto.
- **Vermelho Grave** (`#A4231A`) — hover de alerta, barras de aviso preenchidas.
- **Superfície Dark** (`#1B1814`) — blocos de autoridade e fechamento de oferta. Não é preto puro.
- **Tinta Sobre Dark** (`#F4EFE8`) — texto sobre superfície dark, mantém calor.

**Banido:** preto puro `#000000`, branco puro `#FFFFFF`, qualquer roxo/lilás/azul-neon, gradiente em texto, glow externo em botão amarelo, paleta dusty rose / cream + gold / borboletas.

---

## 3. Typography Rules

Duas famílias com propósitos opostos: uma condensada que **grita sem precisar de cor**, outra neutra que carrega a leitura.

- **Display / Hero / H1–H2:** **Anton** — sans-serif condensada, peso 800, em CAIXA ALTA para titulares principais. Tracking apertado (`-0.02em`). Escala extrema via `clamp(48px, 8vw, 96px)` no hero. Hierarquia se constrói por **peso e contraste**, não por cor.
- **Body / UI / H3 / botões:** **Inter** — pesos 400/500/600/700. Body em **17px**, line-height 1.5. Cap em 65 caracteres por linha em parágrafos longos.
- **Números de preço:** Inter Tabular (`font-variant-numeric: tabular-nums`) para alinhar dígitos no stack de oferta.

**Escala (proporção 1.333):**

| Nível | Tamanho | Peso | Família |
|---|---|---|---|
| display (hero) | `clamp(48px, 8vw, 96px)` | 800 | Anton |
| h1 | `clamp(36px, 5vw, 60px)` | 700 | Anton |
| h2 | `clamp(28px, 3.5vw, 42px)` | 700 | Anton |
| h3 | 22px | 600 | Inter |
| body | 17px | 400 | Inter |
| small | 14px | 500 | Inter |

**Banido:** serif de qualquer tipo (Times, Georgia, Playfair, Fraunces — pertencem à Página B), fontes "script" decorativas, Comic Sans, weight 100/200 (anêmico em qualquer contexto), itálico em headline.

---

## 4. Hero Section

Layout **5+7 deslocado**: bloco de texto à esquerda (5 colunas), foto de Felipe à direita (7 colunas, recorte vertical 3:4).

- **Headline em Anton CAIXA ALTA**, no máximo 7 palavras por linha, quebra manual em 2–3 linhas. Sem inline images entre palavras (este surface não usa essa técnica — pertence à Página B).
- **Foto:** retrato P&B com persiana, overlay quente sutil para integrar à paleta. Etiqueta vermelha sobreposta no canto inferior-direito da foto: `FELIPE / IDEALIZADOR DO MÉTODO MACA` em Anton 14px caixa alta, fundo `#E63426`, texto `#FAF7F2`, padding 8px 14px, sem border-radius.
- **CTA único primário** abaixo do headline + subheadline. Texto: `QUERO O PROTOCOLO →`. Amarelo `#F2C744`, texto `#221E18`, peso 700, padding `22px 40px`, border-radius 12px, sombra **sólida** `0 8px 0 #D9A82A` (efeito de botão "apertável", não glow difuso).
- **Sub-CTA secundário** em texto link discreto abaixo: `Saber mais via WhatsApp` em `#5C544A`, sublinhado fino, sem botão.
- **Barra de urgência** acima do headline: faixa fina `#E63426` ocupando largura total, texto `#FAF7F2` em Anton 14px caixa alta. Conteúdo factual, não falso: `OFERTA DE LANÇAMENTO · R$ 44,90 PAGAMENTO ÚNICO`.

**Banido no hero:** countdown timer piscando, emoji 🔥, "scroll to explore" / setas bouncing, hero centrado simétrico, vídeo VSL embed, stickers "GARANTIA TOTAL" coloridos.

---

## 5. Component Stylings

- **CTA Primário (amarelo):** retângulo cheio `#F2C744`, texto `#221E18` em Inter 700, padding `22px 40px`, border-radius 12px, sombra sólida `0 8px 0 #D9A82A`. Hover translaca 2px pra baixo e diminui sombra para `0 6px 0 #D9A82A`. Active translaca 8px pra baixo, sombra `0 0 0 #D9A82A` (sensação de botão apertado). Sem outer glow. Sem gradiente. Seta `→` que avança 4px no hover.
- **CTA Secundário (dark):** retângulo `#1B1814`, texto `#F4EFE8` em Inter 600, sem sombra de elevação. Usado em blocos dark.
- **Bloco de Urgência:** faixa horizontal `#E63426`, padding `14px 24px`, texto `#FAF7F2` em Anton caixa alta 14px, tracking `0.08em`. Sem ícone de chama, sem timer.
- **Stack de Oferta:** card grande `#1B1814` com border-radius 20px, padding `48px 40px`. Dentro, lista vertical de itens: cada linha tem **descrição à esquerda** em Inter 16px branco quente + **preço riscado à direita** em `#E63426` com `text-decoration: line-through`. Linha final destaca o **preço final em Anton 56px amarelo** `#F2C744`.
- **Logo Bar de Franquias:** barra horizontal cinza neutra `#EFEAE2`, altura 80px, logos em monocromia escura (`#221E18`), opacidade 70%. **Marquee horizontal contínuo** em mobile a 40s linear infinite, sem pause-on-hover. Conteúdo: `Face Doctor · Botoclinic · Estúdio Mais · Smile Skin · Best Laser · Gio Laser · Dr. Colágeno`.
- **Cards de Objeção (FAQ):** accordion inline. Pergunta em Anton 20px caixa alta, sem ícone +/− pesado — apenas um traço vertical fino `#221E18` 2px que rotaciona 90° quando expande. Sem modal, sem overlay.
- **Inputs (se houver):** label acima em Inter 14px peso 600, input com border-bottom de 2px `#221E18`, sem border lateral, focus ring substituído por mudança de cor da border para `#E63426`.
- **Skeletal Loader (se houver):** retângulos com mesma dimensão do conteúdo final, shimmer horizontal sutil de `#EFEAE2` para `#FAF7F2`. **Nunca** spinner circular.

---

## 6. Layout Principles

- **Grid 12 colunas**, gap 24px, container max-width **1180px** centralizado.
- **Section padding vertical:** `clamp(72px, 10vw, 140px)`. Ritmo alterna seções "altas que respiram" (hero, manifesto) com seções "densas e apertadas" (stack de oferta).
- **Hero assimétrico 5+7** — texto esquerda, foto direita. Mobile colapsa para single column com foto **abaixo** do headline.
- **Bloco dark de fechamento** ocupa 100vw com cor de fundo `#1B1814`, padding interno respeitando o container.
- **Nenhum elemento se sobrepõe a outro** — toda foto, texto, badge e botão ocupa seu próprio retângulo limpo. Sem texto sobreposto a imagem (exceto a etiqueta de autoridade no hero, que é o único caso intencional).
- **Sem grid de 3 cards iguais** (heading + ícone + texto). Se aparecer "3 razões", use lista numerada vertical em uma única coluna.
- Use `min-h-[100dvh]` em seções full-height. Nunca `100vh` (causa pulo no iOS Safari).
- CSS Grid sempre que possível. **Banido:** `calc()` com porcentagens hackeadas para "centralizar".

---

## 7. Responsive Rules

- **Mobile-first collapse abaixo de 768px:** todas as colunas múltiplas viram coluna única. O hero passa a headline → foto → subheadline → CTA.
- **Sem scroll horizontal** em nenhuma viewport (exceto o marquee de logos, contido em `overflow: hidden` no parent).
- **Tipografia escala via `clamp()`** — display do hero não pode ficar menor que 48px nem maior que 96px.
- **Touch targets ≥ 44px** em todos os links e CTAs.
- **Espaçamento vertical entre seções escala:** `clamp(72px, 10vw, 140px)` — naturalmente diminui em mobile.
- **Nav:** topbar fina horizontal em desktop colapsa para CTA único "Quero o protocolo" sticky no rodapé em mobile (não menu hambúrguer — esta página não tem múltiplas rotas).

---

## 8. Motion & Interaction

- **Easing padrão:** `cubic-bezier(0.23, 1, 0.32, 1)` (strong ease-out). 200ms em interações UI, 400ms em entradas de seção.
- **Hero stagger:** headline → subheadline → CTAs entram com 80ms de delay entre si, cada um com `opacity 0→1` e `translateY 12px→0`.
- **CTA primário no `:active`:** translaca 8px para baixo e sombra colapsa — sensação tátil de botão apertado.
- **Marquee de logos:** scroll horizontal linear 40s infinito, sem pause-on-hover (passa, registra, segue).
- **Scroll reveal:** `IntersectionObserver` ativa fade-in (0→1) + translateY 8px→0 em blocos de seção. Threshold 0.15.
- **Performance:** animar **apenas** `transform` e `opacity`. Nunca `width`, `height`, `top`, `left`, `margin`.
- **`prefers-reduced-motion: reduce`:** marquee para na metade do caminho, stagger vira fade puro sem translate, CTA active vira mudança de cor em vez de translate.

---

## 9. Photo Direction

- **Hero:** foto P&B com persiana (Felipe), recorte vertical 3:4, overlay multiplicativo quente `rgba(242, 199, 68, 0.05)` para integrar ao papel quente.
- **Bloco autoridade dark:** foto de estúdio (Felipe camisa, fundo escuro), recorte 4:5, sem overlay (a foto já é dark).
- **Banido:** stock photos, ilustrações 3D, mockups de celular com print do WhatsApp colados, avatares genéricos.

---

## 10. Anti-Patterns (Banidos)

Esta lista é tão importante quanto as regras positivas. Stitch deve **nunca** gerar nenhum dos itens abaixo:

- ❌ **Inter como fonte de display** — Inter só serve para body/UI nesta página, headline é Anton.
- ❌ **Pure black `#000000`** — usar `#221E18` (Tinta Charcoal).
- ❌ **Pure white `#FFFFFF`** — usar `#FAF7F2` (Papel Quente).
- ❌ **Neon glow / outer box-shadow difusa em botão amarelo** — sombra é sólida e direcional, não difusa.
- ❌ **Gradiente em texto** (background-clip: text).
- ❌ **Glassmorphism / backdrop-blur decorativo**.
- ❌ **Custom mouse cursors**.
- ❌ **Emojis em qualquer lugar** — nem 🔥 nem ✅ nem 👇.
- ❌ **Em-dash** (`—`) em qualquer copy — usar `·` ou ponto final ou vírgula.
- ❌ **Border-left: Xpx solid** em cards (cliché de blog WordPress).
- ❌ **Countdown timer** falso piscando vermelho.
- ❌ **"Últimas 3 vagas!!!", "Garantia total!", stickers coloridos sobrepostos**.
- ❌ **Prints com setas amarelas tortas** ou screenshots de WhatsApp colados.
- ❌ **Modais** — FAQ é accordion inline.
- ❌ **Hero metric template** (4 números enormes em grid simétrico tipo "10K+ alunos · 98% aprovação").
- ❌ **3 cards iguais com ícone + heading + texto curto** (template SaaS pasteloso).
- ❌ **Filler UI text:** "Scroll to explore", "Swipe down", setas bouncing.
- ❌ **Nomes genéricos** em depoimentos ("John Doe", "Acme", "Cliente Satisfeita").
- ❌ **Números falsos arredondados** (`99.99%`, `50% off!!!`).
- ❌ **AI copywriting clichês:** "Eleve", "Destrave", "Unleash", "Transforme sua jornada", "Próximo nível", "Game-changer".
- ❌ **Imagens com link quebrado** — se a foto não existe, deixar bloco vazio com `aria-hidden`.
- ❌ **Centered hero simétrico** — usar split 5+7 ou left-aligned.
- ❌ **Pílulas "Novo!" / "Hot!"** no canto de cards.
- ❌ **Ilustrações 3D de personagens** estilo SaaS pasteloso.
- ❌ **Cream + gold + script font** (cliché de "beauty premium").

---

## Implementation Notes for Stitch

- Idioma: **pt-BR** (`<html lang="pt-BR">`).
- Acessibilidade: WCAG 2.1 AA mínimo. Contraste de texto ≥ 4.5:1 — atenção especial em blocos vermelhos e amarelos (texto sempre `#221E18` sobre amarelo, nunca branco).
- Fontes: Google Fonts com `<link rel="preload">` para Anton e Inter. `font-display: swap`.
- Imagens: 3 fotos do Felipe apenas. Sem stock. Sem ilustrações.
- Checkout: link único para Ticto `https://checkout.ticto.app/OCC46FBCB`.
- Sucesso da página = clique no CTA primário. Secundário = clique no WhatsApp `https://wa.me/5515981730591`.

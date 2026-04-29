# Protocolo Fecha-Tudo

Documento operacional do WhatsApp pra clínicas de estética premium. 13 scripts + Método M.I.A. (Mecanismo da Inversão de Autoridade).

**Preço**: R$ 47,00 (5× R$ 10,15) · **Audiência**: esteticistas, biomédicas estetas, donas de clínica, fisios dermatofuncionais · **Plataforma**: Ticto + Vercel

## Páginas (rebrand 2026-04)

7 landings com **mesma oferta** mas **ângulo de copy distinto** pra A/B test. Sistema de design unificado "estética premium" (off-white quente · wine · champagne).

| Rota | Ângulo | Hook |
|---|---|---|
| `/` | Manifesto/identidade | "Sua agenda não está vazia. Está sendo preenchida pela concorrente." |
| `/pagina1/` | Perda quantificada | "Sua clínica perdeu R$ 18.400 esse mês — e nem percebeu." |
| `/pagina2/` | Comparação social | "Mesma técnica. Mesma cidade. Por que a clínica dela lota?" |
| `/pagina3/` | Storytelling/cena | "19h47. A cliente leu sua mensagem. Nunca mais respondeu." |
| `/pagina4/` | Reframing/inimigo | "Não é tráfego pago. É a próxima conversa que vai morrer." |
| `/pagina5/` | Status/autoridade | "Clínicas que faturam 6 dígitos não improvisam. Têm script." |
| `/pagina6/` | Urgência | "Antes que a próxima vá pra concorrente — você tem 15 minutos." |

Cada página segue a estrutura canônica (Hero → Promessa → MIA → Público → Pilares → Benefícios → Prova Social → Oferta+Stack → Garantia → FAQ → Fechamento → Sticky CTA), variando copy e tratamento visual do hero.

## Capas (checkout Ticto)

`capas/capa1.html` ... `capa6.html` — 1080×720 pra checkout. Não tocadas no rebrand.

## Arquitetura

```
assets/css/
  tokens.css       paleta unificada · Playfair Display + Inter · espaços · raios · shadows
  base.css         reset · grain texture · helpers · reveal · acessibilidade
  components.css   header · hero · botões · cards · oferta/stack · garantia · FAQ accordion · sticky CTA · footer

assets/js/site.js  PRICE=47.00 · pixel helpers · scroll reveal (IntersectionObserver) ·
                   smooth scroll · header scroll state · sticky CTA (>600px) · FAQ accordion (auto-fechar)

vercel.json        redirects 301 + cache headers pra /assets
```

Cada página carrega `tokens → base → components` (nessa ordem) + Google Fonts (Playfair Display + Inter). Páginas têm CSS inline adicional pra elementos exclusivos do hero (calculadora de perda, comparação side-by-side, cena WhatsApp, reframing, credenciais, timer minuto-a-minuto).

## Identidade visual

- **Off-white quente** (`#FAF7F2`) com grain SVG sutil overlay
- **Wine** (`#C5345A`) como acento de CTA
- **Champagne gold** (`#B8860B`) pra preço e selos premium
- **Ink** (`#1F1B16`) pra typography forte
- **Playfair Display** (italic + bold) pros headlines
- **Inter** pro corpo
- Atmosfera: orbs gaussianos rosa/dourado, grain texture, gradiente warm

## Tracking

- Meta Pixel ID: `1624871735228400`
- Eventos: `PageView` (auto), `ViewContent` (clique CTA header), `InitiateCheckout` (auto via `data-event="cta_click"`)
- `data-position`: `header | hero | pilares | preco | fechamento | sticky` (segmentação por posição do CTA)
- Valor de todos os eventos: `BRL 47.00`
- Checkout Ticto: `https://checkout.ticto.app/OCC46FBCB`

## Deploy

Push pra `main` → Vercel deploy automático. Sem build step.

## Dev local

```bash
python -m http.server 8000
# abrir http://localhost:8000/
```

## Spec & Plano

- Spec: `docs/superpowers/specs/2026-04-28-rebrand-protocolo-fecha-tudo-design.md`
- Plano: `docs/superpowers/plans/2026-04-28-rebrand-protocolo-fecha-tudo.md`

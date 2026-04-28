# Protocolo Fecha-Tudo

Documento operacional do WhatsApp para clínicas de estética. 13 scripts + Método M.A.C.A.

**Preço**: R$ 14,99 · **Audiência**: dona/gerente/tomador de decisão de clínica · **Plataforma**: Ticto + Vercel

## Páginas

| Rota | Tema | Gatilho | Hook |
|---|---|---|---|
| `/` | 🖤 Boutique-Dark | Identidade premium / hub | "Sua clínica não tem problema de tráfego — tem conversa que morre" |
| `/pagina1/` | 🏥 Clínico-Autoridade | Dor + perda quantificada | "Sua clínica perdeu R$ 7.420 essa semana..." |
| `/pagina2/` | 📰 Editorial-Wellness | Comparação social | "Mesma cidade. Mesma técnica. Por que uma lota e a outra não?" |
| `/pagina3/` | 📰 Editorial-Wellness | Storytelling/cena | "A cliente perguntou o preço. Ela nunca mais voltou." |
| `/pagina4/` | 🏥 Clínico-Autoridade | Inimigo comum / reframing | "Não é tráfego. É a próxima conversa que sua atendente vai perder." |
| `/pagina5/` | 🖤 Boutique-Dark | Identidade + status | "Clínicas sérias não improvisam atendimento. Padronizam." |
| `/pagina6/` | 🖤 Boutique-Dark | Urgência + antes-depois | "Antes que a próxima cliente vá pra concorrência..." |

## Capas (checkout Ticto)

`capas/capa1.html` ... `capa6.html` — uma por página, match com tema da página de origem (1080×720).

## Arquitetura

```
assets/css/
  tokens.css         primitivos (escala tipo, sp, motion)
  base.css           reset + helpers (.reveal, .container, .eyebrow)
  components.css     btn, badge, card, header, hero, mecanismo, oferta…
  themes/
    clinical.css     🏥 azul-petróleo + Newsreader/Inter Tight/JetBrains Mono
    editorial.css    📰 creme/terracota + Fraunces/DM Sans/Instrument Serif
    boutique.css     🖤 preto/dourado + Italiana/Cormorant/Geist

assets/js/site.js    Pixel helpers (PRICE=14.99) + scroll reveal + smooth scroll + header
vercel.json          redirects 301 + cache headers
```

Cada página HTML importa: `tokens` → `theme-X` → `base` → `components` (nessa ordem). Tema é a única coisa que muda entre páginas do mesmo arquétipo visual.

## Tracking

- Meta Pixel ID: `1624871735228400`
- Eventos: `PageView` (auto), `ViewContent` (clique CTA header), `InitiateCheckout` (clique CTA oferta)
- Valor de todos os eventos: `BRL 14.99`
- Checkout Ticto: `https://checkout.ticto.app/OCC46FBCB`

## Deploy

Push para `main` → Vercel deploy automático. Sem build step.

Branch atual: `rebrand-2026-04` — Vercel cria preview deployment automático em cada push.

## Spec & Plano

- Spec: `docs/superpowers/specs/2026-04-28-rebrand-protocolo-fecha-tudo-design.md`
- Plano: `docs/superpowers/plans/2026-04-28-rebrand-protocolo-fecha-tudo.md`

## Dev local

```bash
python -m http.server 8000
# abrir http://localhost:8000/
```

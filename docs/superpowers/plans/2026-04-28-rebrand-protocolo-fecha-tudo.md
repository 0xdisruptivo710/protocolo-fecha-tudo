# Rebrand & Reestruturação do Protocolo Fecha-Tudo — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reescrever as 7 páginas (`index` + `pagina1`–`pagina6`) e 6 capas de checkout do Protocolo Fecha-Tudo aplicando: pivot de avatar para dona/gerente de clínica, posicionamento M.A.C.A. + prejuízo evitado, preço R$14,99 fixo, e 3 sistemas visuais distintos (Clínico-Autoridade, Editorial-Wellness, Boutique-Dark) distribuídos com 7 gatilhos mentais únicos.

**Architecture:** Site estático servido pela Vercel. CSS organizado em tokens compartilhados + 3 temas alternáveis + componentes neutros. JS único compartilhado em `/assets/js/site.js` (Pixel + scroll reveal + smooth scroll + header). Cada subpágina é uma rota Vercel (`/paginaN/`). Sem build step; todos os arquivos são estáticos com paths absolutos.

**Tech Stack:** HTML5 estático, CSS3 (custom properties), JavaScript vanilla ES5-safe, Google Fonts CDN, Meta Pixel, Ticto checkout, Vercel hosting.

**Spec source:** `docs/superpowers/specs/2026-04-28-rebrand-protocolo-fecha-tudo-design.md`

---

## File Structure

### Files to create (foundation)
- `assets/css/tokens.css` — primitivos (escala tipográfica, espaçamentos, sombras, motion)
- `assets/css/base.css` — reset, body defaults, helpers (`.reveal`, `.container`)
- `assets/css/components.css` — botão, badge, card, lista, divisor — neutros
- `assets/css/themes/clinical.css` — paleta + fontes Tema A (🏥)
- `assets/css/themes/editorial.css` — paleta + fontes Tema B (📰)
- `assets/css/themes/boutique.css` — paleta + fontes Tema C (🖤)
- `assets/js/site.js` — Pixel helpers + scroll reveal + smooth scroll + header behavior
- `vercel.json` — redirects 301 + headers de cache

### Files to rewrite
- `index.html` — Boutique-Dark hub
- `pagina1/index.html` — Clínico · perda quantificada
- `pagina2/index.html` — Editorial · comparação social
- `pagina3/index.html` — Editorial · storytelling
- `pagina4/index.html` — Clínico · inimigo comum
- `pagina5/index.html` — Boutique · identidade
- `pagina6/index.html` — Boutique · urgência
- `capas/capa1.html` ... `capa6.html` — match com tema da página de origem
- `README.md` — mapa do sistema

### Files to delete
- `pagina2.html`, `pagina3.html`, `pagina4.html`, `pagina5.html`, `pagina6.html` (raiz, soltos — substituídos por redirect)
- `ui-ux-pro-max-skill-main/` (pasta inteira — skill extraído por engano)

---

## Verification approach (em vez de TDD)

Não há test runner. Verificação por:

1. **Visual** — abrir cada página em `python -m http.server 8000` (ou `npx serve`), confirmar layout
2. **Cross-page consistency** — abrir as 7 páginas, confirmar header/oferta/footer alinhados
3. **Pixel** — DevTools → Network → filtrar `facebook.com/tr` → confirmar `value=14.99`
4. **Redirects** — após deploy: `curl -I https://[domínio]/pagina2.html` deve retornar 301 → `/pagina2/`
5. **Lighthouse** — `npx lighthouse http://localhost:8000/paginaN/ --view` em mobile, alvo Performance ≥ 85
6. **Acessibilidade** — Lighthouse audit + manual: foco-visível, contraste, alt em decorativos `aria-hidden="true"`

---

# FASE 1 — FUNDAÇÃO (~2h)

## Task 1: Criar `assets/css/tokens.css` (primitivos compartilhados)

**Files:**
- Create: `assets/css/tokens.css`

- [ ] **Step 1: Criar arquivo com tokens primitivos**

```css
/* ═══════════════════════════════════════════════════
   TOKENS PRIMITIVOS — neutros, herdados por todos os temas
   ═══════════════════════════════════════════════════ */
:root {
  /* Escala tipográfica modular (1.250 — major third) */
  --fs-12: 0.75rem;
  --fs-13: 0.8125rem;
  --fs-14: 0.875rem;
  --fs-15: 0.9375rem;
  --fs-16: 1rem;
  --fs-17: 1.0625rem;
  --fs-18: 1.125rem;
  --fs-20: 1.25rem;
  --fs-24: 1.5rem;
  --fs-28: 1.75rem;
  --fs-32: 2rem;
  --fs-40: 2.5rem;
  --fs-48: 3rem;
  --fs-64: 4rem;
  --fs-80: 5rem;

  /* Espaçamento (4px base) */
  --sp-1: 0.25rem;
  --sp-2: 0.5rem;
  --sp-3: 0.75rem;
  --sp-4: 1rem;
  --sp-5: 1.25rem;
  --sp-6: 1.5rem;
  --sp-8: 2rem;
  --sp-10: 2.5rem;
  --sp-12: 3rem;
  --sp-16: 4rem;
  --sp-20: 5rem;
  --sp-24: 6rem;
  --sp-32: 8rem;

  /* Raios */
  --r-sm: 4px;
  --r-md: 8px;
  --r-lg: 12px;
  --r-xl: 16px;
  --r-full: 9999px;

  /* Motion */
  --ease: cubic-bezier(.25,.46,.45,.94);
  --ease-spring: cubic-bezier(.16,1,.3,1);
  --dur-fast: 0.2s;
  --dur-base: 0.4s;
  --dur-slow: 0.7s;

  /* Layout */
  --container-max: 1100px;
  --measure: 65ch;
  --measure-narrow: 50ch;

  /* Z */
  --z-header: 50;
  --z-overlay: 100;
}
```

- [ ] **Step 2: Verificar arquivo válido**

Abrir `assets/css/tokens.css` no editor — sem erros de sintaxe. Sem URLs externas, sem dependências.

- [ ] **Step 3: Commit**

```bash
git add assets/css/tokens.css
git commit -m "feat(css): tokens primitivos compartilhados (escala tipo, sp, motion)"
```

---

## Task 2: Criar `assets/css/base.css` (reset + helpers)

**Files:**
- Create: `assets/css/base.css`

- [ ] **Step 1: Criar arquivo com reset + helpers**

```css
/* ═══════════════════════════════════════════════════
   BASE — reset normalizado, defaults de body, helpers
   ═══════════════════════════════════════════════════ */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }

body {
  background: var(--bg);
  color: var(--ink-soft);
  font-family: var(--font-body);
  font-weight: 400;
  line-height: 1.7;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection { background: var(--accent); color: var(--bg); }

img, svg, video { display: block; max-width: 100%; height: auto; }

h1, h2, h3, h4 { text-wrap: balance; color: var(--ink); font-family: var(--font-display); }
p { text-wrap: pretty; max-width: var(--measure); }

a { color: var(--accent); text-decoration: none; transition: opacity var(--dur-fast) var(--ease); }
a:hover { opacity: 0.7; }

/* ═══════ HELPERS ═══════ */
.container { max-width: var(--container-max); margin: 0 auto; padding-left: var(--sp-6); padding-right: var(--sp-6); }
.container--narrow { max-width: 720px; }
.container--ultra { max-width: 560px; }

.eyebrow {
  font-family: var(--font-body);
  font-size: var(--fs-12);
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
}

.divider {
  height: 1px;
  background: var(--rule);
  border: 0;
  margin: var(--sp-12) 0;
}

/* ═══════ REVEAL (ativado por site.js) ═══════ */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity var(--dur-slow) var(--ease), transform var(--dur-slow) var(--ease);
}
.reveal.revealed { opacity: 1; transform: translateY(0); }
.rd1 { transition-delay: 0.1s; }
.rd2 { transition-delay: 0.2s; }
.rd3 { transition-delay: 0.3s; }
.rd4 { transition-delay: 0.4s; }
.rd5 { transition-delay: 0.5s; }
.rd6 { transition-delay: 0.6s; }

/* ═══════ ACESSIBILIDADE — REDUCED MOTION ═══════ */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  html { scroll-behavior: auto; }
  .reveal { opacity: 1 !important; transform: none !important; }
}

/* ═══════ FOCUS VISÍVEL ═══════ */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

- [ ] **Step 2: Commit**

```bash
git add assets/css/base.css
git commit -m "feat(css): base — reset, body defaults, helpers (.reveal, .container, .eyebrow)"
```

---

## Task 3: Criar `assets/css/components.css` (UI neutros)

**Files:**
- Create: `assets/css/components.css`

- [ ] **Step 1: Criar arquivo com componentes**

```css
/* ═══════════════════════════════════════════════════
   COMPONENTS — botões, badges, cards, listas, header
   Neutros: vestem a cor do tema ativo
   ═══════════════════════════════════════════════════ */

/* ═══════ HEADER ═══════ */
.site-header {
  position: fixed; top: 0; left: 0; right: 0; z-index: var(--z-header);
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--sp-5) var(--sp-8);
  background: transparent;
  transition: background var(--dur-base) var(--ease), padding var(--dur-fast) var(--ease);
}
.site-header.scrolled {
  background: color-mix(in srgb, var(--bg) 92%, transparent);
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  padding: var(--sp-3) var(--sp-8);
  border-bottom: 1px solid var(--rule);
}
.header-logo {
  font-family: var(--font-display);
  font-style: italic; font-weight: 500; font-size: var(--fs-16);
  color: var(--muted);
  text-decoration: none;
  transition: color var(--dur-fast) var(--ease);
}
.header-logo:hover { color: var(--accent); opacity: 1; }

/* ═══════ BUTTONS ═══════ */
.btn {
  display: inline-block;
  font-family: var(--font-body);
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: 0;
  transition: transform var(--dur-fast) var(--ease), opacity var(--dur-fast) var(--ease);
}
.btn:hover { opacity: 1; transform: translateY(-1px); }
.btn:active { transform: translateY(0); }

.btn--header {
  font-size: var(--fs-13);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--bg);
  background: var(--accent);
  padding: var(--sp-3) var(--sp-6);
  border-radius: var(--r-sm);
}

.btn--cta {
  font-size: var(--fs-16);
  letter-spacing: 0.03em;
  color: var(--bg);
  background: var(--accent);
  padding: var(--sp-5) var(--sp-12);
  border-radius: var(--r-md);
}
.btn--cta:hover {
  box-shadow: 0 12px 40px color-mix(in srgb, var(--accent) 30%, transparent);
}

/* ═══════ BADGES ═══════ */
.badge {
  display: inline-flex; align-items: center;
  font-family: var(--font-body);
  font-size: var(--fs-12);
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
  padding: var(--sp-1) var(--sp-3);
  border-radius: var(--r-sm);
}

.badge--alert {
  color: var(--alert, var(--accent));
  background: color-mix(in srgb, var(--alert, var(--accent)) 10%, transparent);
}

/* ═══════ CARDS ═══════ */
.card {
  background: var(--surface);
  border: 1px solid var(--rule);
  border-radius: var(--r-lg);
  padding: var(--sp-10) var(--sp-8);
  transition: transform var(--dur-fast) var(--ease), border-color var(--dur-fast) var(--ease);
}
.card:hover {
  transform: translateY(-2px);
  border-color: var(--accent);
}

/* ═══════ LIST CHECK ═══════ */
.list-check { list-style: none; }
.list-check__item {
  display: flex; align-items: baseline; gap: var(--sp-4);
  padding: var(--sp-4) 0;
  border-bottom: 1px solid var(--rule);
}
.list-check__item:last-child { border-bottom: none; }
.list-check__icon {
  flex-shrink: 0; width: 20px; height: 20px;
  display: flex; align-items: center; justify-content: center;
}
.list-check__icon svg {
  width: 16px; height: 16px;
  stroke: var(--accent); stroke-width: 2; fill: none;
}
.list-check__text {
  font-size: var(--fs-16);
  line-height: 1.6;
  color: var(--ink-soft);
}

/* ═══════ FOOTER ═══════ */
.site-footer {
  padding: var(--sp-10) var(--sp-6);
  text-align: center;
  border-top: 1px solid var(--rule);
}
.site-footer p {
  font-size: var(--fs-12);
  color: var(--muted);
  letter-spacing: 0.04em;
  margin: 0 auto;
}

/* ═══════ HERO BASE ═══════ */
.hero {
  min-height: 100dvh;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  text-align: center;
  padding: var(--sp-32) var(--sp-6) var(--sp-20);
  position: relative; overflow: hidden;
}
.hero__eyebrow {
  margin-bottom: var(--sp-6);
  opacity: 0; transform: translateY(8px);
  transition: opacity var(--dur-slow) var(--ease), transform var(--dur-slow) var(--ease);
}
.hero__eyebrow.visible { opacity: 1; transform: translateY(0); }
.hero__headline {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(var(--fs-32), 7vw, var(--fs-80));
  line-height: 1.12;
  color: var(--ink);
  max-width: 850px;
  letter-spacing: -0.01em;
}
.hero__word {
  display: inline-block;
  opacity: 0; filter: blur(8px); transform: translateY(10px);
  transition: opacity 0.6s var(--ease), filter 0.6s var(--ease), transform 0.6s var(--ease);
}
.hero__word.visible { opacity: 1; filter: blur(0); transform: translateY(0); }
.hero__word--em { color: var(--accent); font-style: italic; }
.hero__sub {
  margin-top: var(--sp-8);
  font-size: clamp(var(--fs-16), 2vw, var(--fs-18));
  color: var(--muted);
  max-width: var(--measure-narrow);
  line-height: 1.75;
  opacity: 0; transform: translateY(10px);
  transition: opacity 0.7s 0.2s var(--ease), transform 0.7s 0.2s var(--ease);
}
.hero__sub.visible { opacity: 1; transform: translateY(0); }

/* ═══════ SECTION DEFAULTS ═══════ */
.section {
  padding: var(--sp-32) var(--sp-6);
  position: relative;
}
.section__title {
  text-align: center;
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(var(--fs-28), 5vw, var(--fs-48));
  color: var(--ink);
  margin-bottom: var(--sp-4);
}
.section__sub {
  text-align: center;
  font-size: var(--fs-16);
  color: var(--muted);
  max-width: var(--measure-narrow);
  margin: 0 auto var(--sp-16);
}

/* ═══════ PROSE (parágrafos longos) ═══════ */
.prose p {
  font-size: clamp(var(--fs-17), 2vw, var(--fs-20));
  line-height: 1.85;
  color: var(--ink-soft);
  margin-bottom: var(--sp-8);
  margin-left: auto; margin-right: auto;
}
.prose p:last-child { margin-bottom: 0; }
.prose .em { color: var(--accent); font-weight: 500; }

/* ═══════ MECANISMO TIMELINE ═══════ */
.mecanismo-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  max-width: 900px; margin: 0 auto; gap: var(--sp-8);
}
.timeline-col {
  padding: var(--sp-10) var(--sp-8);
  border-radius: var(--r-lg);
}
.timeline-col--sem { background: var(--surface); border: 1px solid var(--rule); }
.timeline-col--com {
  background: color-mix(in srgb, var(--accent) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 15%, transparent);
}
.timeline-label {
  font-size: var(--fs-12); font-weight: 600;
  letter-spacing: 0.18em; text-transform: uppercase;
  margin-bottom: var(--sp-8);
}
.timeline-col--sem .timeline-label { color: var(--muted); }
.timeline-col--com .timeline-label { color: var(--accent); }
.timeline-step {
  display: flex; align-items: flex-start;
  gap: var(--sp-4); margin-bottom: var(--sp-5); position: relative;
}
.timeline-step:last-child { margin-bottom: 0; }
.timeline-dot {
  flex-shrink: 0; width: 10px; height: 10px;
  border-radius: 50%; margin-top: 6px; position: relative;
}
.timeline-col--sem .timeline-dot { background: var(--muted); opacity: 0.4; }
.timeline-col--com .timeline-dot {
  background: var(--accent);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 15%, transparent);
}
.timeline-text { font-size: var(--fs-15); line-height: 1.5; }
.timeline-col--sem .timeline-text { color: var(--muted); }
.timeline-col--com .timeline-text { color: var(--ink-soft); font-weight: 500; }

/* ═══════ PROTOCOLO CARDS ═══════ */
.protocolo-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: var(--sp-5); max-width: 880px; margin: 0 auto;
}
.protocolo-card {
  position: relative; overflow: hidden;
}
.card-numeral {
  font-family: var(--font-display);
  font-size: clamp(var(--fs-64), 10vw, 100px);
  font-weight: 400;
  color: color-mix(in srgb, var(--accent) 8%, transparent);
  position: absolute;
  top: -8px; right: 12px; line-height: 1; pointer-events: none;
}
.card-step-badge { margin-bottom: var(--sp-4); }
.card-name {
  font-family: var(--font-display);
  font-weight: 500; font-size: var(--fs-20);
  color: var(--ink); margin-bottom: var(--sp-2);
}
.card-desc {
  font-size: var(--fs-15); line-height: 1.65;
  color: var(--muted); font-style: italic;
}

/* ═══════ PARA QUEM ═══════ */
.para-quem-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: var(--sp-6); max-width: 880px; margin: 0 auto;
}
.para-quem-col h3 {
  font-size: var(--fs-20); margin-bottom: var(--sp-6);
}
.para-quem-col--sim h3 { color: var(--accent); }
.para-quem-col--nao h3 { color: var(--muted); }
.para-quem-col ul { list-style: none; }
.para-quem-col li {
  font-size: var(--fs-15); line-height: 1.6;
  padding: var(--sp-3) 0 var(--sp-3) var(--sp-5);
  position: relative;
}
.para-quem-col--sim li {
  color: var(--ink-soft);
  border-left: 2px solid color-mix(in srgb, var(--accent) 50%, transparent);
}
.para-quem-col--nao li {
  color: var(--muted);
  border-left: 2px solid var(--rule);
}

/* ═══════ OFERTA ═══════ */
.oferta {
  padding: var(--sp-32) var(--sp-6);
  text-align: center;
}
.oferta-preco {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(var(--fs-40), 6vw, var(--fs-64));
  color: var(--ink);
  margin-bottom: var(--sp-1);
  font-variant-numeric: tabular-nums;
}
.oferta-acesso {
  font-size: var(--fs-17); color: var(--muted);
  margin-bottom: var(--sp-8);
}
.oferta-contexto {
  font-size: var(--fs-16); font-style: italic;
  color: var(--muted); max-width: 480px;
  margin: 0 auto var(--sp-10); line-height: 1.7;
}
.oferta-pagamento, .oferta-garantia {
  margin-top: var(--sp-5); font-size: var(--fs-13);
  color: var(--muted);
}
.oferta-garantia svg {
  display: inline-block; vertical-align: middle;
  width: 14px; height: 14px; stroke: var(--accent);
  stroke-width: 2; fill: none; margin-right: 4px;
}

/* ═══════ RESPONSIVE ═══════ */
@media (max-width: 768px) {
  .site-header { padding: var(--sp-4) var(--sp-5); }
  .site-header.scrolled { padding: var(--sp-3) var(--sp-5); }
  .header-logo { font-size: var(--fs-14); }
  .btn--header { font-size: var(--fs-12); padding: var(--sp-2) var(--sp-4); }
  .hero { padding: var(--sp-24) var(--sp-5) var(--sp-16); min-height: 85dvh; }
  .section { padding: var(--sp-20) var(--sp-5); }
  .mecanismo-grid { grid-template-columns: 1fr; gap: var(--sp-4); }
  .protocolo-grid { grid-template-columns: 1fr; gap: var(--sp-4); }
  .para-quem-grid { grid-template-columns: 1fr; gap: var(--sp-4); }
  .card { padding: var(--sp-8) var(--sp-6); }
  .btn--cta { padding: var(--sp-4) var(--sp-8); font-size: var(--fs-15); width: 100%; max-width: 360px; }
}

@media (max-width: 480px) {
  .hero__headline { font-size: clamp(var(--fs-28), 9vw, var(--fs-40)); }
  .card-numeral { font-size: var(--fs-64); }
}
```

- [ ] **Step 2: Commit**

```bash
git add assets/css/components.css
git commit -m "feat(css): components — header, btn, badge, card, list-check, hero, mecanismo, protocolo, para-quem, oferta"
```

---

## Task 4: Criar `assets/css/themes/clinical.css` (Tema A 🏥)

**Files:**
- Create: `assets/css/themes/clinical.css`

- [ ] **Step 1: Criar tema Clínico-Autoridade**

```css
/* ═══════════════════════════════════════════════════
   TEMA A — CLÍNICO-AUTORIDADE 🏥
   Vibe: relatório de auditoria, dados, branco abundante
   ═══════════════════════════════════════════════════ */
@import url('https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

:root {
  /* Paleta */
  --bg: #FAFBFC;
  --surface: #FFFFFF;
  --ink: #0E2A33;
  --ink-soft: #3F5963;
  --muted: #7A8B92;
  --accent: #0F766E;
  --alert: #B91C1C;
  --rule: #E2E7EA;

  /* Tipografia */
  --font-display: 'Newsreader', Georgia, 'Times New Roman', serif;
  --font-body: 'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;
}

/* Theme-specific overrides */
.eyebrow { font-family: var(--font-mono); letter-spacing: 0.16em; }
.oferta-preco { font-family: var(--font-mono); }
.metric { font-family: var(--font-mono); color: var(--accent); }
.metric--alert { color: var(--alert); }

/* Tabela de auditoria (usada em pagina1) */
.audit-table {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border-collapse: collapse;
  font-family: var(--font-mono);
  font-size: var(--fs-15);
}
.audit-table th, .audit-table td {
  padding: var(--sp-3) var(--sp-4);
  text-align: left;
  border-bottom: 1px solid var(--rule);
}
.audit-table th {
  font-weight: 600;
  color: var(--ink);
  text-transform: uppercase;
  font-size: var(--fs-12);
  letter-spacing: 0.08em;
}
.audit-table td.num { text-align: right; }
.audit-table tr.is-alert td { color: var(--alert); font-weight: 600; }

/* Gráfico ASCII em mono (usado em pagina1) */
.ascii-chart {
  font-family: var(--font-mono);
  font-size: var(--fs-13);
  line-height: 1.4;
  color: var(--alert);
  white-space: pre;
  text-align: left;
  display: inline-block;
  background: var(--surface);
  padding: var(--sp-6);
  border: 1px solid var(--rule);
  border-radius: var(--r-md);
  margin: var(--sp-6) auto;
}
```

- [ ] **Step 2: Commit**

```bash
git add assets/css/themes/clinical.css
git commit -m "feat(theme): clinical — paleta azul-petroleo + Newsreader/Inter Tight/JetBrains Mono"
```

---

## Task 5: Criar `assets/css/themes/editorial.css` (Tema B 📰)

**Files:**
- Create: `assets/css/themes/editorial.css`

- [ ] **Step 1: Criar tema Editorial-Wellness**

```css
/* ═══════════════════════════════════════════════════
   TEMA B — EDITORIAL-WELLNESS 📰
   Vibe: revista de bem-estar, narrativa, calor humano
   ═══════════════════════════════════════════════════ */
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=DM+Sans:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap');

:root {
  /* Paleta */
  --bg: #F5F0E8;
  --surface: #FBF7F0;
  --ink: #1F1A1A;
  --ink-soft: #4A3F38;
  --muted: #8B7E73;
  --accent: #B85C3E;
  --accent-2: #4A5D3A;
  --rule: #E5DBC9;

  /* Tipografia */
  --font-display: 'Fraunces', Georgia, serif;
  --font-body: 'DM Sans', -apple-system, sans-serif;
  --font-italic: 'Instrument Serif', Georgia, serif;
}

/* Theme-specific */
.eyebrow {
  font-family: var(--font-italic);
  font-style: italic;
  font-weight: 400;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

/* Drop-cap (primeiro parágrafo de seções) */
.dropcap::first-letter {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 4em;
  float: left;
  line-height: 0.85;
  margin: 0.05em 0.1em 0 0;
  color: var(--accent);
}

/* Pull-quote (citação destacada em narrativas) */
.pullquote {
  font-family: var(--font-italic);
  font-style: italic;
  font-size: clamp(var(--fs-24), 3vw, var(--fs-32));
  line-height: 1.4;
  color: var(--accent);
  text-align: center;
  max-width: 720px;
  margin: var(--sp-12) auto;
  padding: var(--sp-8) var(--sp-6);
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
}

/* Comparison columns lado a lado (pagina2) */
.compare-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: var(--sp-12); max-width: 880px; margin: 0 auto;
}
.compare-col {
  padding: var(--sp-8) var(--sp-6);
}
.compare-col h3 {
  font-family: var(--font-italic); font-style: italic;
  font-size: var(--fs-24); margin-bottom: var(--sp-4);
  color: var(--ink);
}
.compare-col--a { border-right: 1px solid var(--rule); }

@media (max-width: 768px) {
  .compare-grid { grid-template-columns: 1fr; gap: var(--sp-8); }
  .compare-col--a { border-right: 0; border-bottom: 1px solid var(--rule); padding-bottom: var(--sp-8); }
}

/* Cena/storytelling (pagina3) */
.scene {
  max-width: 680px; margin: 0 auto;
  font-family: var(--font-body);
}
.scene p {
  font-size: clamp(var(--fs-18), 2vw, var(--fs-20));
  line-height: 1.85;
  margin-bottom: var(--sp-8);
  color: var(--ink-soft);
}
.scene__time {
  font-family: var(--font-italic); font-style: italic;
  color: var(--accent);
  margin-bottom: var(--sp-8);
  font-size: var(--fs-15);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
```

- [ ] **Step 2: Commit**

```bash
git add assets/css/themes/editorial.css
git commit -m "feat(theme): editorial — paleta creme/terracota + Fraunces/DM Sans/Instrument Serif"
```

---

## Task 6: Criar `assets/css/themes/boutique.css` (Tema C 🖤)

**Files:**
- Create: `assets/css/themes/boutique.css`

- [ ] **Step 1: Criar tema Boutique-Dark**

```css
/* ═══════════════════════════════════════════════════
   TEMA C — BOUTIQUE-DARK 🖤
   Vibe: clínica boutique premium, convite, espaço generoso
   ═══════════════════════════════════════════════════ */
@import url('https://fonts.googleapis.com/css2?family=Italiana&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Geist:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  /* Paleta */
  --bg: #0A0A0A;
  --surface: #141414;
  --ink: #F5F0E8;
  --ink-soft: #C4BAA8;
  --muted: #7E7568;
  --accent: #C9A876;
  --accent-2: #E8DDD0;
  --rule: #2A2A2A;

  /* Tipografia */
  --font-display: 'Italiana', 'Didot', serif;
  --font-sub-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'Geist', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

/* Theme-specific overrides */
h2, h3 { font-family: var(--font-sub-display); font-weight: 500; letter-spacing: 0.005em; }
.section__title { font-family: var(--font-sub-display); font-weight: 500; }

.eyebrow {
  font-family: var(--font-mono);
  letter-spacing: 0.24em;
  font-size: var(--fs-12);
  color: var(--accent);
}

.hero__headline {
  font-family: var(--font-display);
  font-weight: 400;
  letter-spacing: 0.005em;
  line-height: 1.05;
}

/* CTA com dourado */
.btn--cta {
  background: var(--accent);
  color: var(--bg);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 600;
  font-size: var(--fs-14);
}
.btn--cta:hover {
  background: var(--accent-2);
  box-shadow: 0 12px 40px color-mix(in srgb, var(--accent) 40%, transparent);
}

.btn--header {
  background: transparent;
  color: var(--ink);
  border: 1px solid var(--accent);
}
.btn--header:hover { background: var(--accent); color: var(--bg); }

/* Numerador "1 / 6" estilo livro */
.page-number {
  font-family: var(--font-mono);
  font-size: var(--fs-12);
  letter-spacing: 0.2em;
  color: var(--muted);
  text-transform: uppercase;
}

/* Manifesto (pagina5) */
.manifesto {
  text-align: center;
  max-width: 720px;
  margin: 0 auto;
  font-family: var(--font-sub-display);
}
.manifesto p {
  font-size: clamp(var(--fs-24), 3vw, var(--fs-32));
  font-weight: 400;
  line-height: 1.4;
  color: var(--ink);
  margin-bottom: var(--sp-8);
}
.manifesto .em {
  color: var(--accent);
  font-style: italic;
}

/* Linha do tempo (pagina6) */
.timeline-progress {
  max-width: 720px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--sp-6);
  font-family: var(--font-body);
}
.timeline-progress__step {
  text-align: center;
  padding: var(--sp-8) var(--sp-4);
  border: 1px solid var(--rule);
  border-radius: var(--r-md);
  position: relative;
}
.timeline-progress__when {
  font-family: var(--font-mono);
  font-size: var(--fs-12);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: var(--sp-4);
}
.timeline-progress__what {
  font-size: var(--fs-15);
  color: var(--ink-soft);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .timeline-progress { grid-template-columns: 1fr; gap: var(--sp-3); }
}
```

- [ ] **Step 2: Commit**

```bash
git add assets/css/themes/boutique.css
git commit -m "feat(theme): boutique — paleta preto/dourado + Italiana/Cormorant/Geist"
```

---

## Task 7: Criar `assets/js/site.js` (Pixel + UX)

**Files:**
- Create: `assets/js/site.js`

- [ ] **Step 1: Criar JavaScript compartilhado**

```javascript
/* ═══════════════════════════════════════════════════
   SITE.JS — comportamento compartilhado em todas as páginas
   Pixel helpers + scroll reveal + smooth scroll + header
   ═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PRICE = 14.99;
  var PRODUCT_NAME = 'Protocolo Fecha-tudo';

  /* ═══════ PIXEL HELPERS ═══════ */
  function trackViewContent() {
    if (typeof fbq === 'function') {
      fbq('track', 'ViewContent', {
        content_name: PRODUCT_NAME,
        value: PRICE,
        currency: 'BRL'
      });
    }
  }

  function trackInitiateCheckout() {
    if (typeof fbq === 'function') {
      fbq('track', 'InitiateCheckout', {
        value: PRICE,
        currency: 'BRL',
        content_name: PRODUCT_NAME,
        content_type: 'product'
      });
    }
  }

  // Expor para uso inline em onclick (compatibilidade com markup atual)
  window.PFT = { trackViewContent: trackViewContent, trackInitiateCheckout: trackInitiateCheckout };

  /* ═══════ HERO WORD-BY-WORD REVEAL ═══════ */
  var headline = document.querySelector('.hero__headline');
  var heroSub = document.querySelector('.hero__sub');
  var heroEyebrow = document.querySelector('.hero__eyebrow');

  if (heroEyebrow) {
    if (prefersReduced) {
      heroEyebrow.classList.add('visible');
    } else {
      setTimeout(function () { heroEyebrow.classList.add('visible'); }, 200);
    }
  }

  if (headline) {
    var raw = headline.innerHTML;
    // Preserve <br> e <strong> markup convertendo a tokens
    var hasMarkup = /<(br|strong|em)/i.test(raw);
    if (!hasMarkup) {
      var text = headline.textContent.trim();
      headline.innerHTML = '';
      var words = text.split(/\s+/);
      var emWords = (headline.dataset.emWords || '').split(',').map(function (w) { return w.trim(); });
      var spans = [];

      words.forEach(function (word, i) {
        var span = document.createElement('span');
        span.className = 'hero__word';
        if (emWords.indexOf(word) !== -1 || emWords.indexOf(word.replace(/[.,!?]/g, '')) !== -1) {
          span.classList.add('hero__word--em');
        }
        span.textContent = word;
        headline.appendChild(span);
        if (i < words.length - 1) headline.appendChild(document.createTextNode(' '));
        spans.push(span);
      });

      if (prefersReduced) {
        spans.forEach(function (s) { s.classList.add('visible'); });
        if (heroSub) heroSub.classList.add('visible');
      } else {
        var delay = 140;
        var start = 500;
        spans.forEach(function (span, i) {
          setTimeout(function () { span.classList.add('visible'); }, start + i * delay);
        });
        if (heroSub) {
          setTimeout(function () { heroSub.classList.add('visible'); }, start + spans.length * delay + 400);
        }
      }
    } else {
      // Markup-rich headline: anima como um todo
      headline.style.opacity = '0';
      headline.style.transition = 'opacity 0.8s var(--ease)';
      if (prefersReduced) {
        headline.style.opacity = '1';
        if (heroSub) heroSub.classList.add('visible');
      } else {
        setTimeout(function () { headline.style.opacity = '1'; }, 400);
        if (heroSub) {
          setTimeout(function () { heroSub.classList.add('visible'); }, 1100);
        }
      }
    }
  }

  /* ═══════ SCROLL REVEAL (IntersectionObserver) ═══════ */
  if ('IntersectionObserver' in window && !prefersReduced) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('revealed'); });
  }

  /* ═══════ HEADER SCROLL ═══════ */
  var header = document.querySelector('.site-header');
  if (header) {
    var ticking = false;
    function updateHeader() {
      if (window.scrollY > 60) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(updateHeader); ticking = true; }
    }, { passive: true });
  }

  /* ═══════ SMOOTH SCROLL ═══════ */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
```

- [ ] **Step 2: Commit**

```bash
git add assets/js/site.js
git commit -m "feat(js): site.js — pixel helpers (PRICE=14.99) + hero reveal + scroll + header"
```

---

## Task 8: Criar `vercel.json` (redirects + cache)

**Files:**
- Create: `vercel.json`

- [ ] **Step 1: Criar configuração Vercel**

```json
{
  "redirects": [
    { "source": "/pagina2.html", "destination": "/pagina2/", "permanent": true },
    { "source": "/pagina3.html", "destination": "/pagina3/", "permanent": true },
    { "source": "/pagina4.html", "destination": "/pagina4/", "permanent": true },
    { "source": "/pagina5.html", "destination": "/pagina5/", "permanent": true },
    { "source": "/pagina6.html", "destination": "/pagina6/", "permanent": true }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    }
  ]
}
```

- [ ] **Step 2: Validar JSON**

Abrir em editor — sem erro de sintaxe. Pode validar com:

```bash
python -c "import json; json.load(open('vercel.json'))" && echo "OK"
```

Expected: `OK`

- [ ] **Step 3: Commit**

```bash
git add vercel.json
git commit -m "feat(deploy): vercel.json — redirect 301 dos pagina*.html legados + cache assets"
```

---

# FASE 2 — HUB + 2 PÁGINAS PILOTO (~3h)

## Task 9: Reescrever `index.html` (🖤 Boutique-Dark · hub)

**Files:**
- Modify: `index.html` (rewrite completo)

> **Esta página é o template de referência canônico. As próximas tasks de páginas reusam esta estrutura — quem ler este plano fora de ordem deve consultar Task 9 para entender a anatomia.**

- [ ] **Step 1: Reescrever `index.html`**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="facebook-domain-verification" content="687871xtxjxb3hsj62wcsln8fuzgxu" />

  <!-- Meta Pixel -->
  <script>
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window,document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init','1624871735228400');
  fbq('track','PageView');
  </script>
  <noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1624871735228400&ev=PageView&noscript=1"/></noscript>

  <title>Protocolo Fecha-Tudo — O Padrão M.A.C.A. para Clínicas de Estética</title>
  <meta name="description" content="O documento operacional que sua clínica abre amanhã, copia o script, e usa na próxima conversa do WhatsApp. Sem curso, sem treinamento, sem improviso.">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <link rel="stylesheet" href="/assets/css/tokens.css">
  <link rel="stylesheet" href="/assets/css/themes/boutique.css">
  <link rel="stylesheet" href="/assets/css/base.css">
  <link rel="stylesheet" href="/assets/css/components.css">
  <script src="/assets/js/site.js" defer></script>
</head>
<body>

<header class="site-header">
  <a href="#" class="header-logo">fecha·tudo</a>
  <a href="#oferta" class="btn btn--header" onclick="PFT.trackViewContent()">Garantir acesso</a>
</header>

<main>

  <!-- ═══════ HERO ═══════ -->
  <section class="hero" id="hero">
    <p class="eyebrow hero__eyebrow">MÉTODO M.A.C.A. · PARA CLÍNICAS DE ESTÉTICA</p>
    <h1 class="hero__headline">
      Sua clínica não tem problema de tráfego.<br>
      Tem <strong style="color:var(--accent);font-style:italic;font-weight:400;">conversa que morre</strong> antes do agendamento.
    </h1>
    <p class="hero__sub">
      O Protocolo Fecha-Tudo é o documento operacional que sua equipe abre amanhã, copia o script, e usa na próxima conversa do WhatsApp. Sem curso. Sem treinamento. Sem improviso.
    </p>
  </section>

  <!-- ═══════ DIAGNÓSTICO ═══════ -->
  <section class="section" id="diagnostico">
    <div class="container container--narrow prose">
      <p class="reveal">São quinze conversas por semana que travam no preço. Multiplica por 4 semanas. Multiplica pelo seu ticket médio.</p>
      <p class="reveal">É o salário de uma recepcionista que está saindo pelo ralo do WhatsApp — e ninguém vê acontecer porque acontece em silêncio, no privado, depois do "quanto custa?".</p>
      <p class="reveal">A culpa não é da sua atendente. <span class="em">É da sequência em que ela apresenta a informação.</span> Quando o número chega antes do contexto, o cérebro da cliente não tem âncora pra avaliar. A única coisa que ela faz é comparar com a opção mais barata que conhece. E sua clínica perde antes de ter chance de mostrar diferencial.</p>
    </div>
  </section>

  <!-- ═══════ MECANISMO ═══════ -->
  <section class="section" id="mecanismo">
    <h2 class="section__title reveal">Não foi o preço. Foi a ordem.</h2>
    <p class="section__sub reveal">Veja como a mesma conversa muda completamente dependendo da sequência.</p>

    <div class="mecanismo-grid">
      <div class="timeline-col timeline-col--sem">
        <div class="timeline-label reveal">Sem protocolo</div>
        <div class="timeline-step reveal rd1"><div class="timeline-dot"></div><span class="timeline-text">Pergunta chega</span></div>
        <div class="timeline-step reveal rd2"><div class="timeline-dot"></div><span class="timeline-text">Preço enviado direto</span></div>
        <div class="timeline-step reveal rd3"><div class="timeline-dot"></div><span class="timeline-text">…silêncio</span></div>
      </div>

      <div class="timeline-col timeline-col--com">
        <div class="timeline-label reveal">Com protocolo</div>
        <div class="timeline-step reveal rd1"><div class="timeline-dot"></div><span class="timeline-text">Pergunta chega</span></div>
        <div class="timeline-step reveal rd2"><div class="timeline-dot"></div><span class="timeline-text">Diagnóstico da queixa</span></div>
        <div class="timeline-step reveal rd3"><div class="timeline-dot"></div><span class="timeline-text">Âncora de valor</span></div>
        <div class="timeline-step reveal rd4"><div class="timeline-dot"></div><span class="timeline-text">Preço apresentado</span></div>
        <div class="timeline-step reveal rd5"><div class="timeline-dot"></div><span class="timeline-text">Horário oferecido</span></div>
        <div class="timeline-step reveal rd6"><div class="timeline-dot"></div><span class="timeline-text">Sinal confirmado</span></div>
      </div>
    </div>
  </section>

  <!-- ═══════ PROTOCOLO M.A.C.A. ═══════ -->
  <section class="section" id="protocolo">
    <h2 class="section__title reveal">O método M.A.C.A.</h2>
    <p class="section__sub reveal">Quatro movimentos. Quinze minutos. Do primeiro "oi" ao Pix confirmado.</p>

    <div class="protocolo-grid">
      <div class="card protocolo-card reveal">
        <span class="card-numeral">I</span>
        <span class="badge card-step-badge">Min 1–3</span>
        <div class="card-name">Mapeamento de Dor</div>
        <p class="card-desc">"Ela verbaliza o que incomoda antes de qualquer preço entrar."</p>
      </div>
      <div class="card protocolo-card reveal rd1">
        <span class="card-numeral">II</span>
        <span class="badge card-step-badge">Min 4–7</span>
        <div class="card-name">Ancoragem de Valor</div>
        <p class="card-desc">"O investimento chega depois da dor — nunca antes."</p>
      </div>
      <div class="card protocolo-card reveal rd2">
        <span class="card-numeral">III</span>
        <span class="badge card-step-badge">Min 8–11</span>
        <div class="card-name">Comando de Escassez</div>
        <p class="card-desc">"Dois horários específicos em vez de 'minha agenda tá aberta'."</p>
      </div>
      <div class="card protocolo-card reveal rd3">
        <span class="card-numeral">IV</span>
        <span class="badge card-step-badge">Min 12–15</span>
        <div class="card-name">Agendamento Blindado</div>
        <p class="card-desc">"Sinal via Pix. Sequência de lembretes. Ela aparece."</p>
      </div>
    </div>
  </section>

  <!-- ═══════ INCLUSO ═══════ -->
  <section class="section" id="incluso">
    <div class="container container--narrow">
      <h2 class="section__title reveal" style="text-align:left;">O que sua clínica recebe</h2>
      <ul class="list-check">
        <li class="list-check__item reveal"><span class="list-check__icon"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="list-check__text">13 scripts completos pra sua equipe seguir sem improviso</span></li>
        <li class="list-check__item reveal"><span class="list-check__icon"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="list-check__text">Aberturas pra cliente nova + reativação de quem sumiu</span></li>
        <li class="list-check__item reveal"><span class="list-check__icon"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="list-check__text">Diagnóstico + ancoragem na sequência exata</span></li>
        <li class="list-check__item reveal"><span class="list-check__icon"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="list-check__text">Resposta pronta pra 8 objeções: "tá caro", "vou pensar", "vou ver com meu marido", "tô sem dinheiro agora", "pesquisei outro lugar", "vai doer?", "já fiz e não gostei", "faz desconto?"</span></li>
        <li class="list-check__item reveal"><span class="list-check__icon"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="list-check__text">Confirmação de agendamento com sinal via Pix</span></li>
        <li class="list-check__item reveal"><span class="list-check__icon"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="list-check__text">3 lembretes anti no-show que reduzem cancelamento</span></li>
        <li class="list-check__item reveal"><span class="list-check__icon"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="list-check__text">Kit Anti-Vácuo: 5 scripts pra reativar conversa que travou</span></li>
        <li class="list-check__item reveal"><span class="list-check__icon"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="list-check__text">Reativação de pacientes inativas há 6 meses ou 1 ano</span></li>
        <li class="list-check__item reveal"><span class="list-check__icon"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="list-check__text">Guia de Respostas Rápidas no WhatsApp Business pra equipe configurar em 10min</span></li>
      </ul>
    </div>
  </section>

  <!-- ═══════ PARA QUEM ═══════ -->
  <section class="section" id="para-quem">
    <h2 class="section__title reveal">Pra quem é (e pra quem não é)</h2>
    <div class="para-quem-grid">
      <div class="para-quem-col para-quem-col--sim reveal">
        <h3>Funciona pra sua clínica se:</h3>
        <ul>
          <li>Sua equipe responde no WhatsApp e você sente que perde venda no privado</li>
          <li>Atendentes diferentes dão respostas diferentes pra mesma pergunta</li>
          <li>Agenda fura porque ninguém cobra sinal</li>
          <li>Você quer padronizar atendimento sem fazer treinamento longo</li>
        </ul>
      </div>
      <div class="para-quem-col para-quem-col--nao reveal rd1">
        <h3>Não é pra você se:</h3>
        <ul>
          <li>Já tem um SOP de atendimento documentado e funcionando</li>
          <li>Prefere comprar sistema/software de WhatsApp automatizado</li>
          <li>Procura curso em vídeo ou consultoria 1:1</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- ═══════ OFERTA ═══════ -->
  <section class="oferta" id="oferta">
    <div class="reveal">
      <span class="badge">ACESSO IMEDIATO · DOCUMENTO</span>
      <p class="oferta-preco">R$ 14,99</p>
      <p class="oferta-acesso">acesso permanente — sem mensalidade</p>
    </div>
    <p class="oferta-contexto reveal">Uma única venda recuperada paga o protocolo 25 vezes.<br>Na próxima conversa, sua clínica já tá no lucro.</p>
    <div class="reveal">
      <a href="https://checkout.ticto.app/OCC46FBCB" class="btn btn--cta" onclick="PFT.trackInitiateCheckout()">Quero o protocolo da minha clínica</a>
    </div>
    <p class="oferta-pagamento reveal">Pix, cartão ou boleto — acesso liberado em minutos.</p>
    <p class="oferta-garantia reveal">
      <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-linecap="round" stroke-linejoin="round"/></svg>
      7 dias de garantia incondicional
    </p>
  </section>

</main>

<footer class="site-footer">
  <p>Protocolo Fecha-Tudo — O documento operacional do WhatsApp da sua clínica</p>
</footer>

</body>
</html>
```

- [ ] **Step 2: Verificar visualmente**

```bash
npx -y serve . -p 8000
```

Abrir `http://localhost:8000/` no navegador. Verificar:
- ✅ Hero preto com headline em creme + "conversa que morre" em dourado/itálico
- ✅ Animação de palavras revela na sequência
- ✅ CTA dourado no header sticky e na seção oferta
- ✅ R$ 14,99 destacado na oferta
- ✅ Sem erro 404 no DevTools Network
- ✅ Pixel `fbq` carregado em Network (filtrar `facebook.com/tr`)

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat(rebrand): index.html — hub Boutique-Dark, R\$14,99, avatar dona/clinica"
```

---

## Task 10: Reescrever `pagina3/index.html` (📰 Editorial · storytelling)

**Files:**
- Modify: `pagina3/index.html` (rewrite completo)

> Use a estrutura canônica de Task 9 como scaffold. Substitua: `<head>` (title/desc/theme), Hero, Diagnóstico, Pra quem é. Mantenha Mecanismo, Protocolo, Incluso, Oferta, Footer iguais.

- [ ] **Step 1: Reescrever página com tema Editorial e copy de storytelling**

Substituir `<title>`, `<meta description>` e `<link rel="stylesheet" href=".../themes/boutique.css">` por `editorial.css`.

```html
<title>Protocolo Fecha-Tudo — A conversa que decidiu uma venda em 4 segundos</title>
<meta name="description" content="19h47, terça-feira. A cliente perguntou o preço. A recepcionista respondeu 'R$380'. Ela nunca mais voltou. Um caso real e o protocolo que evita.">
...
<link rel="stylesheet" href="/assets/css/tokens.css">
<link rel="stylesheet" href="/assets/css/themes/editorial.css">
<link rel="stylesheet" href="/assets/css/base.css">
<link rel="stylesheet" href="/assets/css/components.css">
```

Substituir bloco Hero por:

```html
<section class="hero" id="hero">
  <p class="eyebrow hero__eyebrow">19H47 · TERÇA-FEIRA</p>
  <h1 class="hero__headline">
    A cliente perguntou o preço.<br>
    A recepcionista respondeu <em style="font-style:italic;color:var(--accent);">"R$ 380"</em>.<br>
    Ela nunca mais voltou.
  </h1>
  <p class="hero__sub">
    Acontece todo santo dia. E ninguém treina sua equipe pra essa exata fração de segundo — onde a venda inteira é decidida.
  </p>
</section>
```

Substituir bloco Diagnóstico por (estilo storytelling):

```html
<section class="section" id="diagnostico">
  <div class="scene">
    <p class="scene__time reveal">19h47 · terça-feira</p>
    <p class="reveal dropcap">Marcela tinha 32 anos e três sessões de drenagem em mente. Já tinha pesquisado 4 clínicas no bairro. Mandou mensagem pra duas. A primeira respondeu em 8 minutos com uma pergunta. A segunda respondeu em 2 minutos com um número.</p>
    <p class="reveal">Ela escolheu a primeira.</p>
    <p class="reveal">Não porque era mais barata. Era 40 reais mais cara, na verdade. Escolheu porque a primeira fez ela sentir que entendeu o que ela precisava antes de querer vender. A segunda mandou "R$ 380" como quem despacha. E perdeu.</p>
    <p class="pullquote reveal">A venda não foi perdida no preço. Foi perdida na sequência.</p>
    <p class="reveal">Sua atendente não tem culpa. Ninguém ensinou a ela que existem 4 segundos entre o "oi" e a venda — e o que acontece nesses 4 segundos define se a sua clínica vai faturar ou se vai virar mais um print no celular de uma cliente que já fechou em outro lugar.</p>
  </div>
</section>
```

Substituir bloco "Pra quem é" por (perfil de dona empática):

```html
<section class="section" id="para-quem">
  <h2 class="section__title reveal">Pra quem é (e pra quem não é)</h2>
  <div class="para-quem-grid">
    <div class="para-quem-col para-quem-col--sim reveal">
      <h3>É pra você se:</h3>
      <ul>
        <li>Você se importa com como sua equipe trata cada cliente</li>
        <li>Já abriu o WhatsApp da clínica de madrugada e doeu ler como uma conversa terminou</li>
        <li>Quer dar à sua atendente um roteiro humano, não um script frio de telemarketing</li>
        <li>Acredita que padronizar não é robotizar — é proteger o cuidado</li>
      </ul>
    </div>
    <div class="para-quem-col para-quem-col--nao reveal rd1">
      <h3>Não é pra você se:</h3>
      <ul>
        <li>Quer um chatbot que responda no automático</li>
        <li>Acha que vendas se resolvem só com tráfego pago</li>
        <li>Não tem WhatsApp como canal central de agendamento</li>
      </ul>
    </div>
  </div>
</section>
```

Manter Mecanismo, Protocolo M.A.C.A., Incluso, Oferta e Footer **idênticos a Task 9**.

- [ ] **Step 2: Verificar visualmente**

Abrir `http://localhost:8000/pagina3/`. Verificar:
- ✅ Tema creme/terracota (não dark)
- ✅ Drop-cap no primeiro parágrafo do diagnóstico
- ✅ Pull-quote em itálico terracota
- ✅ Headline tem "R$ 380" em terracota itálico
- ✅ R$ 14,99 na oferta
- ✅ Pixel value 14.99 no DevTools

- [ ] **Step 3: Commit**

```bash
git add pagina3/index.html
git commit -m "feat(rebrand): pagina3 — Editorial storytelling, gatilho cena 19h47"
```

---

## Task 11: Reescrever `pagina1/index.html` (🏥 Clínico · perda quantificada)

**Files:**
- Modify: `pagina1/index.html`

> Mesma estrutura de Task 9. Trocas: theme.css, head meta, Hero, Diagnóstico (com tabela auditoria), Pra quem é. Mantém Mecanismo+Protocolo+Incluso+Oferta+Footer iguais.

- [ ] **Step 1: Substituir tema e meta**

```html
<title>Protocolo Fecha-Tudo — Diagnóstico de Perda no WhatsApp da sua Clínica</title>
<meta name="description" content="Cálculo conservador: sua clínica está perdendo cerca de R$7.420 por semana em conversas que morreram no WhatsApp. Diagnóstico + protocolo de correção.">
...
<link rel="stylesheet" href="/assets/css/themes/clinical.css">
```

- [ ] **Step 2: Substituir Hero**

```html
<section class="hero" id="hero">
  <p class="eyebrow hero__eyebrow">DIAGNÓSTICO · 04/2026</p>
  <h1 class="hero__headline">
    Sua clínica perdeu <strong style="color:var(--alert);font-weight:600;">R$ 7.420,00</strong> essa semana em conversas que morreram no WhatsApp.
  </h1>
  <p class="hero__sub">
    Cálculo conservador: ticket médio R$ 380, 30% de fechamento sem protocolo, 65 conversas/semana. Os números são da sua clínica. A perda também.
  </p>
</section>
```

- [ ] **Step 3: Substituir Diagnóstico (com tabela + gráfico ASCII)**

```html
<section class="section" id="diagnostico">
  <div class="container container--narrow prose">
    <p class="reveal">Não é hipótese. É operação.</p>
    <p class="reveal">Esta é a auditoria de uma clínica média de estética com tráfego pago rodando — números que você consegue auditar no seu próprio Notion ou planilha de atendimento amanhã de manhã:</p>
  </div>

  <table class="audit-table reveal" style="margin-top:var(--sp-10);">
    <thead>
      <tr><th>Métrica</th><th class="num">Valor</th></tr>
    </thead>
    <tbody>
      <tr><td>Conversas que entraram (semana)</td><td class="num">65</td></tr>
      <tr><td>Conversas que receberam o preço</td><td class="num">42</td></tr>
      <tr><td>Conversas que viraram Pix</td><td class="num">8</td></tr>
      <tr class="is-alert"><td>Conversas que sumiram após o preço</td><td class="num">34</td></tr>
      <tr class="is-alert"><td>Receita perdida (ticket médio R$ 380)</td><td class="num">R$ 7.420,00</td></tr>
    </tbody>
  </table>

  <div class="container container--narrow prose" style="margin-top:var(--sp-12);">
    <p class="reveal">A semana seguinte segue o mesmo padrão. E a outra. <span class="em">Em 12 meses, sua clínica perdeu R$ 385.840 em conversas que travaram entre o "quanto custa" e a resposta da atendente.</span></p>
    <p class="reveal">Esse cálculo é conservador. Não inclui clientes que viram pacientes recorrentes de drenagem mensal. Não inclui indicação. Não inclui ticket de pacotes. A perda real, anualizada, geralmente é 2 a 3 vezes maior que o número da tabela.</p>
  </div>
</section>
```

- [ ] **Step 4: Substituir Pra quem é**

```html
<section class="section" id="para-quem">
  <h2 class="section__title reveal">Pra quem é (e pra quem não é)</h2>
  <div class="para-quem-grid">
    <div class="para-quem-col para-quem-col--sim reveal">
      <h3>É pra sua clínica se:</h3>
      <ul>
        <li>Você olha planilha de DRE todo mês e a aba de "leads no WhatsApp" é uma incógnita</li>
        <li>Sabe quanto entra de tráfego pago, mas não sabe quanto realmente vira venda</li>
        <li>Equipe recebe a mensagem e ninguém audita o que acontece depois</li>
        <li>Quer cortar a perda silenciosa antes de aumentar o investimento em ads</li>
      </ul>
    </div>
    <div class="para-quem-col para-quem-col--nao reveal rd1">
      <h3>Não é pra você se:</h3>
      <ul>
        <li>Já tem um CRM com tracking completo de funil WhatsApp</li>
        <li>Sua clínica não usa WhatsApp como canal de agendamento</li>
        <li>Procura ferramenta de tracking, não documento operacional</li>
      </ul>
    </div>
  </div>
</section>
```

- [ ] **Step 5: Verificar visualmente**

`http://localhost:8000/pagina1/` — verificar:
- ✅ Tema branco/azul-petróleo
- ✅ Headline com R$7.420 em vermelho
- ✅ Tabela de auditoria com linha vermelha em "sumiram"/"perdida"
- ✅ Mono em todos os números

- [ ] **Step 6: Commit**

```bash
git add pagina1/index.html
git commit -m "feat(rebrand): pagina1 — Clinico perda quantificada, gatilho dor + tabela auditoria"
```

---

## Task 12: Checkpoint visual + ajustes de tema

- [ ] **Step 1: Servir local + revisar 3 páginas**

```bash
npx -y serve . -p 8000
```

Abrir em ordem em janelas separadas e comparar:
- http://localhost:8000/ (Boutique)
- http://localhost:8000/pagina3/ (Editorial)
- http://localhost:8000/pagina1/ (Clínico)

Cheque:
- Cada tema é distinguível em < 1 segundo de olhada
- Header funciona em todas
- Oferta é consistente (mesma estrutura, R$ 14,99, mesmo CTA)
- Garantia 7d aparece em todas
- Mobile responsivo (DevTools → device toolbar → iPhone 12)

- [ ] **Step 2: Anotar ajustes necessários**

Se algo precisa mudar nos themes ou components.css, faz **agora**, antes de aplicar nas próximas 4 páginas. Custo de mudar com 3 páginas é menor que com 7.

- [ ] **Step 3: Se houve ajustes em CSS compartilhado, commit**

```bash
git add assets/css/
git commit -m "fix(theme): ajustes pós-checkpoint visual com 3 páginas"
```

---

# FASE 3 — DEMAIS PÁGINAS (~3-4h)

## Task 13: Reescrever `pagina2/index.html` (📰 Editorial · comparação social)

**Files:**
- Modify: `pagina2/index.html`

- [ ] **Step 1: Substituir head**

```html
<title>Protocolo Fecha-Tudo — Por que duas clínicas iguais faturam diferente?</title>
<meta name="description" content="Mesma cidade, mesma técnica, mesmo preço. Por que uma lota agenda e a outra não? A diferença começa nos primeiros 15 minutos depois do 'oi'.">
...
<link rel="stylesheet" href="/assets/css/themes/editorial.css">
```

- [ ] **Step 2: Substituir Hero**

```html
<section class="hero" id="hero">
  <p class="eyebrow hero__eyebrow">UMA REPORTAGEM SOBRE DUAS CLÍNICAS</p>
  <h1 class="hero__headline">
    Mesma cidade. Mesma técnica. Mesmo preço.<br>
    <em style="font-style:italic;color:var(--accent);font-weight:500;">Por que uma lota e a outra não?</em>
  </h1>
  <p class="hero__sub">
    A diferença começa nos primeiros quinze minutos depois do "oi". E ninguém percebe porque acontece em silêncio, no privado do WhatsApp.
  </p>
</section>
```

- [ ] **Step 3: Substituir Diagnóstico (estrutura comparison-grid)**

```html
<section class="section" id="diagnostico">
  <div class="container">
    <div class="compare-grid">
      <div class="compare-col compare-col--a reveal">
        <h3>Na clínica de cima</h3>
        <p class="dropcap">Rita responde o preço em 2 segundos. Tem foto bonita no Instagram, agenda aberta na bio, equipe simpática. Anuncia tráfego pago. Recebe 60 conversas por semana. Fecha 9.</p>
      </div>
      <div class="compare-col reveal rd1">
        <h3>Na clínica de baixo</h3>
        <p class="dropcap">Bruna pergunta o que incomoda antes de qualquer número. Mesmo Instagram, mesma bio, mesma estética visual. Mesmo investimento em ads. Recebe 60 conversas por semana. Fecha 24.</p>
      </div>
    </div>

    <p class="pullquote reveal">A diferença não é técnica. É a ordem em que a informação aparece.</p>

    <div class="container container--narrow prose">
      <p class="reveal">As duas usam Botox. As duas cobram R$ 380 por sessão de drenagem. As duas têm recepcionistas treinadas. <span class="em">A única coisa que diverge é o que acontece nos primeiros 4 minutos depois do "boa tarde, queria saber sobre drenagem".</span></p>
      <p class="reveal">Rita despacha. Bruna ancora. Despachar é educado e rápido. Ancorar é educado e estratégico. Ambas levam o mesmo tempo. Só uma fecha 3x mais.</p>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Substituir Pra quem é**

```html
<section class="section" id="para-quem">
  <h2 class="section__title reveal">Pra quem é (e pra quem não é)</h2>
  <div class="para-quem-grid">
    <div class="para-quem-col para-quem-col--sim reveal">
      <h3>É pra sua clínica se:</h3>
      <ul>
        <li>Você olha pra concorrente e não entende como ela cresceu mais que você</li>
        <li>Sabe que ninguém ali tem técnica melhor — e isso te incomoda</li>
        <li>Já tentou copiar criativo de anúncio sem mudar resultado</li>
        <li>Suspeita que o gargalo é interno, mas não consegue ver onde</li>
      </ul>
    </div>
    <div class="para-quem-col para-quem-col--nao reveal rd1">
      <h3>Não é pra você se:</h3>
      <ul>
        <li>Acha que concorrência é só sorte ou orçamento maior</li>
        <li>Já desistiu de comparar e está em piloto automático</li>
        <li>Não usa WhatsApp como ponto principal de captação</li>
      </ul>
    </div>
  </div>
</section>
```

- [ ] **Step 5: Verificar e commitar**

```bash
git add pagina2/index.html
git commit -m "feat(rebrand): pagina2 — Editorial comparacao Rita vs Bruna"
```

---

## Task 14: Reescrever `pagina4/index.html` (🏥 Clínico · inimigo comum / reframing)

**Files:**
- Modify: `pagina4/index.html`

- [ ] **Step 1: Substituir head**

```html
<title>Protocolo Fecha-Tudo — Sua clínica não tem problema de tráfego</title>
<meta name="description" content="Você pode dobrar o investimento em ads e não mover faturamento. Porque o gargalo não está no anúncio. Está no privado, depois do clique. Reconfigure o problema.">
...
<link rel="stylesheet" href="/assets/css/themes/clinical.css">
```

- [ ] **Step 2: Substituir Hero**

```html
<section class="hero" id="hero">
  <p class="eyebrow hero__eyebrow">RECONFIGURAÇÃO</p>
  <h1 class="hero__headline">
    O problema da sua clínica <strong style="color:var(--alert);font-weight:600;">não é tráfego</strong>.<br>
    É a próxima conversa que sua atendente vai perder.
  </h1>
  <p class="hero__sub">
    Você pode dobrar o investimento em ads e não mover faturamento. Porque o gargalo não está no anúncio. Está no privado, depois do clique.
  </p>
</section>
```

- [ ] **Step 3: Substituir Diagnóstico (tese: premissa errada / dado / conclusão)**

```html
<section class="section" id="diagnostico">
  <div class="container container--narrow prose">
    <p class="reveal"><strong style="color:var(--ink);">Premissa que parece óbvia:</strong> "Se eu tenho mais visitas, vou ter mais venda."</p>
    <p class="reveal"><strong style="color:var(--ink);">Dado da operação real:</strong> uma clínica com 30% de taxa de fechamento no WhatsApp, ao dobrar o investimento em ads (de R$ 3.000 pra R$ 6.000/mês), passa a fechar não 60 mas 120 conversas — e <span class="em">o número de venda só sobe 30% porque a taxa não muda</span>. O resto vira lixo de conversa. Pior: você paga 2x para gerar a mesma fração de venda.</p>
    <p class="reveal"><strong style="color:var(--ink);">Conclusão:</strong> não é tráfego. É a sequência de mensagens que a sua atendente envia depois que o lead clica no anúncio. <span class="em">Cada 1% de aumento na taxa de fechamento do WhatsApp vale mais que 30% de aumento no orçamento de mídia paga.</span></p>
    <p class="reveal">A matemática inverte a hierarquia do problema. O gargalo está em outro lugar do funil — onde quase ninguém olha porque não tem dashboard.</p>
  </div>
</section>
```

- [ ] **Step 4: Substituir Pra quem é**

```html
<section class="section" id="para-quem">
  <h2 class="section__title reveal">Pra quem é (e pra quem não é)</h2>
  <div class="para-quem-grid">
    <div class="para-quem-col para-quem-col--sim reveal">
      <h3>É pra sua clínica se:</h3>
      <ul>
        <li>Já investiu mais em ads e viu o ROI cair em vez de subir</li>
        <li>Sente que tá pagando pra trazer leads pra um buraco</li>
        <li>Quer atacar conversão antes de subir tráfego de novo</li>
        <li>Confia mais em matemática operacional que em "guru de marketing"</li>
      </ul>
    </div>
    <div class="para-quem-col para-quem-col--nao reveal rd1">
      <h3>Não é pra você se:</h3>
      <ul>
        <li>Não roda tráfego pago e não pretende rodar</li>
        <li>Já tem taxa de fechamento ≥ 50% no WhatsApp</li>
        <li>Procura serviço de gestão de tráfego (não somos isso)</li>
      </ul>
    </div>
  </div>
</section>
```

- [ ] **Step 5: Commit**

```bash
git add pagina4/index.html
git commit -m "feat(rebrand): pagina4 — Clinico inimigo comum, reframing trafego vs conversao"
```

---

## Task 15: Reescrever `pagina5/index.html` (🖤 Boutique · identidade + status)

**Files:**
- Modify: `pagina5/index.html`

- [ ] **Step 1: Substituir head**

```html
<title>Protocolo Fecha-Tudo — Clínicas sérias não improvisam atendimento</title>
<meta name="description" content="Padroniza-se a anamnese. Padroniza-se a limpeza. Padroniza-se o pós. Mas o atendimento, o momento mais decisivo, fica no improviso. Sua clínica não.">
...
<link rel="stylesheet" href="/assets/css/themes/boutique.css">
```

- [ ] **Step 2: Substituir Hero**

```html
<section class="hero" id="hero">
  <p class="eyebrow hero__eyebrow">PARA UM TIPO ESPECÍFICO DE CLÍNICA</p>
  <h1 class="hero__headline">
    Clínicas sérias <strong style="color:var(--accent);font-style:italic;font-weight:400;">não improvisam</strong> atendimento.<br>
    Padronizam.
  </h1>
  <p class="hero__sub">
    Se você ainda deixa cada atendente responder do jeito dela, você não tem uma clínica — tem seis recepcionistas trabalhando em paralelo, com seis padrões diferentes, perdendo cliente cada uma do seu jeito.
  </p>
</section>
```

- [ ] **Step 3: Substituir Diagnóstico (manifesto centralizado)**

```html
<section class="section" id="diagnostico">
  <div class="manifesto">
    <p class="reveal">Padroniza-se a <span class="em">anamnese</span>.</p>
    <p class="reveal">Padroniza-se o <span class="em">protocolo de limpeza</span>.</p>
    <p class="reveal">Padroniza-se o <span class="em">pós-procedimento</span>.</p>
    <p class="reveal">Padroniza-se até o <span class="em">tom de voz da recepcionista no presencial</span>.</p>
    <p class="reveal">Mas o atendimento — o momento mais decisivo de toda a operação, onde a venda é feita ou perdida em quatro minutos no WhatsApp — fica no improviso de cada atendente.</p>
    <p class="reveal" style="margin-top:var(--sp-12);font-size:var(--fs-20);color:var(--accent-2);">Esse é o último contrassenso operacional da sua clínica.</p>
    <p class="reveal" style="font-size:var(--fs-20);color:var(--accent-2);">E o mais caro.</p>
  </div>
</section>
```

- [ ] **Step 4: Substituir Pra quem é**

```html
<section class="section" id="para-quem">
  <h2 class="section__title reveal">Pra quem é (e pra quem não é)</h2>
  <div class="para-quem-grid">
    <div class="para-quem-col para-quem-col--sim reveal">
      <h3>É pra sua clínica se:</h3>
      <ul>
        <li>Você tem orgulho de ter SOPs documentados pra outras áreas</li>
        <li>Acredita que padronização é proteção do cuidado, não engessamento</li>
        <li>Tem mais de uma atendente no WhatsApp e nota inconsistência</li>
        <li>Quer parecer (e ser) uma clínica institucional, não um consultório improvisado</li>
      </ul>
    </div>
    <div class="para-quem-col para-quem-col--nao reveal rd1">
      <h3>Não é pra você se:</h3>
      <ul>
        <li>Acha que padronizar tira a humanidade do atendimento</li>
        <li>Trabalha sozinha e não delega WhatsApp</li>
        <li>Não vê problema em cada atendente responder do jeito dela</li>
      </ul>
    </div>
  </div>
</section>
```

- [ ] **Step 5: Commit**

```bash
git add pagina5/index.html
git commit -m "feat(rebrand): pagina5 — Boutique identidade+status, manifesto padronizacao"
```

---

## Task 16: Reescrever `pagina6/index.html` (🖤 Boutique · urgência + antes-depois)

**Files:**
- Modify: `pagina6/index.html`

- [ ] **Step 1: Substituir head**

```html
<title>Protocolo Fecha-Tudo — 15 minutos do primeiro "oi" ao Pix confirmado</title>
<meta name="description" content="Não é gatilho de escassez. É aritmética: cada conversa perdida hoje vai pesquisar 3 outras clínicas até sexta. Geralmente fecha na que respondeu melhor primeiro.">
...
<link rel="stylesheet" href="/assets/css/themes/boutique.css">
```

- [ ] **Step 2: Substituir Hero**

```html
<section class="hero" id="hero">
  <p class="eyebrow hero__eyebrow">15 MINUTOS · DO PRIMEIRO "OI" AO PIX</p>
  <h1 class="hero__headline">
    Antes que a próxima cliente vá para a concorrência —<br>
    <strong style="color:var(--accent);font-style:italic;font-weight:400;">aqui está o protocolo que ela esperava encontrar com você</strong>.
  </h1>
  <p class="hero__sub">
    Não é gatilho de escassez de marketing. É aritmética simples: cada conversa perdida hoje é uma cliente que vai pesquisar mais três clínicas até sexta-feira. E geralmente fecha na que respondeu melhor primeiro.
  </p>
</section>
```

- [ ] **Step 3: Substituir Diagnóstico (linha do tempo agora/3d/semana)**

```html
<section class="section" id="diagnostico">
  <h2 class="section__title reveal">O que acontece com a próxima conversa que travar</h2>
  <p class="section__sub reveal">Sua atendente respondeu "R$ 380" e a cliente sumiu. A timeline real começa agora.</p>

  <div class="timeline-progress" style="margin-top:var(--sp-12);">
    <div class="timeline-progress__step reveal">
      <div class="timeline-progress__when">Agora · 19h47</div>
      <div class="timeline-progress__what">Ela vê o preço, não responde, abre o Instagram. Sua mensagem some no meio de outras 30.</div>
    </div>
    <div class="timeline-progress__step reveal rd1">
      <div class="timeline-progress__when">Em 3 dias</div>
      <div class="timeline-progress__what">Ela pediu orçamento em 3 outras clínicas. Uma respondeu fazendo uma pergunta antes do preço. Ela respondeu de volta.</div>
    </div>
    <div class="timeline-progress__step reveal rd2">
      <div class="timeline-progress__when">Em 1 semana</div>
      <div class="timeline-progress__what">Ela fechou na que perguntou. Pagou R$ 420. Está na sua agenda? Não — está na de outra clínica.</div>
    </div>
  </div>

  <div class="container container--narrow prose" style="margin-top:var(--sp-12);">
    <p class="reveal">Não tem como recuperar essa conversa. Tem como mudar a próxima — antes que ela aconteça do mesmo jeito amanhã às 11h.</p>
  </div>
</section>
```

- [ ] **Step 4: Substituir Pra quem é**

```html
<section class="section" id="para-quem">
  <h2 class="section__title reveal">Pra quem é (e pra quem não é)</h2>
  <div class="para-quem-grid">
    <div class="para-quem-col para-quem-col--sim reveal">
      <h3>É pra sua clínica se:</h3>
      <ul>
        <li>Você sente urgência em mudar mas não responde a "comprar agora ou nunca mais"</li>
        <li>Prefere argumento aritmético a apelo emocional barato</li>
        <li>Quer começar a corrigir já a partir da próxima conversa</li>
        <li>Sabe que cada dia parado é cliente convertendo em outro lugar</li>
      </ul>
    </div>
    <div class="para-quem-col para-quem-col--nao reveal rd1">
      <h3>Não é pra você se:</h3>
      <ul>
        <li>Acha que ainda não é hora — vai começar quando estiver "menos corrido"</li>
        <li>Procura solução mágica que se implementa sozinha</li>
        <li>Não tem WhatsApp ativo na clínica</li>
      </ul>
    </div>
  </div>
</section>
```

- [ ] **Step 5: Commit**

```bash
git add pagina6/index.html
git commit -m "feat(rebrand): pagina6 — Boutique urgencia+timeline 3 dias/semana"
```

---

# FASE 4 — CAPAS DE CHECKOUT (~2h)

> Cada capa é uma página `1080×720` (formato visual usado dentro do checkout Ticto). Estrutura mínima: title curta + 1 frase de contexto + preço + CTA + garantia. Importa o tema da página de origem.

## Task 17: Criar template comum de capa + `capas/capa1.html` (🏥 Clínico)

**Files:**
- Modify: `capas/capa1.html`

- [ ] **Step 1: Reescrever capa1.html**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Capa 1 · Diagnóstico</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="/assets/css/tokens.css">
  <link rel="stylesheet" href="/assets/css/themes/clinical.css">
  <link rel="stylesheet" href="/assets/css/base.css">
  <style>
    body {
      width: 1080px; height: 720px;
      margin: 0; padding: 64px;
      display: flex; flex-direction: column; justify-content: space-between;
      background: var(--bg);
      box-sizing: border-box;
    }
    .capa-headline {
      font-family: var(--font-display);
      font-size: 56px;
      line-height: 1.1;
      color: var(--ink);
      max-width: 880px;
    }
    .capa-em {
      color: var(--alert);
      font-family: var(--font-mono);
      font-weight: 600;
    }
    .capa-sub {
      font-size: 22px;
      color: var(--ink-soft);
      max-width: 720px;
      line-height: 1.5;
      margin-top: 24px;
    }
    .capa-row {
      display: flex; justify-content: space-between; align-items: end;
    }
    .capa-preco {
      font-family: var(--font-mono);
      font-size: 72px;
      color: var(--ink);
      font-weight: 600;
    }
    .capa-meta {
      font-size: 16px; color: var(--muted);
      letter-spacing: 0.06em; text-transform: uppercase;
    }
  </style>
</head>
<body>
  <div>
    <p class="eyebrow" style="color:var(--accent);">DIAGNÓSTICO · 04/2026</p>
    <h1 class="capa-headline">
      Sua clínica perdeu <span class="capa-em">R$ 7.420</span> essa semana em conversas que morreram no WhatsApp.
    </h1>
    <p class="capa-sub">Documento operacional · 13 scripts · Método M.A.C.A.</p>
  </div>
  <div class="capa-row">
    <div class="capa-preco">R$ 14,99</div>
    <div class="capa-meta">Acesso imediato · 7d garantia</div>
  </div>
</body>
</html>
```

- [ ] **Step 2: Verificar visualmente**

Abrir `http://localhost:8000/capas/capa1.html`. Definir viewport DevTools 1080×720 pra simular a renderização exata.

- [ ] **Step 3: Commit**

```bash
git add capas/capa1.html
git commit -m "feat(capa): capa1 — Clinico diagnostico 1080x720"
```

---

## Task 18: Reescrever `capas/capa2.html` (📰 Editorial · Rita/Bruna)

**Files:**
- Modify: `capas/capa2.html`

- [ ] **Step 1: Mesma estrutura de Task 17 com tema editorial**

Substituir `clinical.css` por `editorial.css` no `<link>` e atualizar `<style>`:

```css
.capa-headline { font-family: var(--font-display); font-size: 60px; line-height: 1.1; color: var(--ink); max-width: 920px; }
.capa-em { color: var(--accent); font-style: italic; font-weight: 500; }
.capa-sub { font-family: var(--font-italic); font-style: italic; font-size: 24px; color: var(--accent); margin-top: 32px; }
.capa-preco { font-family: var(--font-display); font-size: 64px; color: var(--ink); font-weight: 500; }
```

Conteúdo body:

```html
<div>
  <p class="eyebrow" style="font-family:var(--font-italic);font-style:italic;color:var(--accent);">UMA REPORTAGEM SOBRE DUAS CLÍNICAS</p>
  <h1 class="capa-headline">
    Mesma cidade. Mesma técnica. <em class="capa-em">Por que uma lota e a outra não?</em>
  </h1>
  <p class="capa-sub">"A diferença não é técnica. É a ordem em que a informação aparece."</p>
</div>
<div class="capa-row">
  <div class="capa-preco">R$ 14,99</div>
  <div class="capa-meta">Acesso imediato · 7d garantia</div>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add capas/capa2.html
git commit -m "feat(capa): capa2 — Editorial Rita vs Bruna 1080x720"
```

---

## Task 19: Reescrever `capas/capa3.html` (📰 Editorial · cena 19h47)

- [ ] **Step 1: Estrutura editorial, conteúdo de cena**

Manter base de Task 18 (tema editorial). Trocar conteúdo:

```html
<div>
  <p class="eyebrow" style="font-family:var(--font-italic);font-style:italic;color:var(--accent);">19H47 · TERÇA-FEIRA</p>
  <h1 class="capa-headline">
    A cliente perguntou o preço. A recepcionista respondeu <em class="capa-em">"R$ 380"</em>. Ela nunca mais voltou.
  </h1>
  <p class="capa-sub">Acontece todo santo dia. E ninguém treina sua equipe pra essa fração de segundo.</p>
</div>
<div class="capa-row">
  <div class="capa-preco">R$ 14,99</div>
  <div class="capa-meta">Acesso imediato · 7d garantia</div>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add capas/capa3.html
git commit -m "feat(capa): capa3 — Editorial cena 19h47 1080x720"
```

---

## Task 20: Reescrever `capas/capa4.html` (🏥 Clínico · reframing)

- [ ] **Step 1: Base de Task 17 (clinical), conteúdo de reframing**

```html
<div>
  <p class="eyebrow" style="color:var(--accent);">RECONFIGURAÇÃO</p>
  <h1 class="capa-headline">
    O problema da sua clínica <span class="capa-em" style="color:var(--alert);">não é tráfego</span>. É a próxima conversa que sua atendente vai perder.
  </h1>
  <p class="capa-sub">Cada 1% a mais na taxa do WhatsApp vale mais que 30% a mais no orçamento de mídia.</p>
</div>
<div class="capa-row">
  <div class="capa-preco">R$ 14,99</div>
  <div class="capa-meta">Acesso imediato · 7d garantia</div>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add capas/capa4.html
git commit -m "feat(capa): capa4 — Clinico reframing trafego vs conversao 1080x720"
```

---

## Task 21: Reescrever `capas/capa5.html` (🖤 Boutique · manifesto)

- [ ] **Step 1: Estrutura boutique**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Capa 5 · Manifesto</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="/assets/css/tokens.css">
  <link rel="stylesheet" href="/assets/css/themes/boutique.css">
  <link rel="stylesheet" href="/assets/css/base.css">
  <style>
    body {
      width: 1080px; height: 720px;
      margin: 0; padding: 80px;
      display: flex; flex-direction: column; justify-content: space-between;
      background: var(--bg); box-sizing: border-box;
    }
    .capa-headline {
      font-family: var(--font-display);
      font-size: 64px;
      line-height: 1.05;
      color: var(--ink);
      max-width: 880px;
    }
    .capa-em { color: var(--accent); font-style: italic; font-weight: 400; }
    .capa-sub {
      font-family: var(--font-sub-display);
      font-style: italic;
      font-size: 28px;
      color: var(--accent-2);
      margin-top: 32px;
      max-width: 720px;
    }
    .capa-row { display: flex; justify-content: space-between; align-items: end; }
    .capa-preco {
      font-family: var(--font-mono);
      font-size: 56px;
      color: var(--accent);
      font-weight: 500;
      letter-spacing: 0.04em;
    }
    .capa-meta {
      font-family: var(--font-mono);
      font-size: 14px;
      color: var(--muted);
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }
  </style>
</head>
<body>
  <div>
    <p class="eyebrow">PARA UM TIPO ESPECÍFICO DE CLÍNICA</p>
    <h1 class="capa-headline">
      Clínicas sérias <em class="capa-em">não improvisam</em> atendimento. Padronizam.
    </h1>
    <p class="capa-sub">O documento operacional do WhatsApp da sua clínica.</p>
  </div>
  <div class="capa-row">
    <div class="capa-preco">R$ 14,99</div>
    <div class="capa-meta">Acesso imediato · 7d garantia</div>
  </div>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add capas/capa5.html
git commit -m "feat(capa): capa5 — Boutique manifesto 1080x720"
```

---

## Task 22: Reescrever `capas/capa6.html` (🖤 Boutique · urgência timeline)

- [ ] **Step 1: Base de Task 21 (boutique), conteúdo timeline**

```html
<div>
  <p class="eyebrow">15 MINUTOS · DO PRIMEIRO "OI" AO PIX</p>
  <h1 class="capa-headline">
    Antes que a próxima cliente vá pra concorrência — <em class="capa-em">aqui está o protocolo que ela esperava encontrar com você</em>.
  </h1>
  <p class="capa-sub">Não é escassez de marketing. É aritmética: ela vai pesquisar 3 clínicas até sexta.</p>
</div>
<div class="capa-row">
  <div class="capa-preco">R$ 14,99</div>
  <div class="capa-meta">Acesso imediato · 7d garantia</div>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add capas/capa6.html
git commit -m "feat(capa): capa6 — Boutique urgencia timeline 1080x720"
```

---

# FASE 5 — LIMPEZA + DEPLOY (~30min)

## Task 23: Deletar `pagina*.html` legados da raiz

**Files:**
- Delete: `pagina2.html`, `pagina3.html`, `pagina4.html`, `pagina5.html`, `pagina6.html` (raiz)

- [ ] **Step 1: Confirmar que redirects estão no `vercel.json`**

```bash
grep -c "pagina" vercel.json
```

Expected: pelo menos 5 (uma linha por pagina2-6).

- [ ] **Step 2: Deletar arquivos legados**

```bash
git rm pagina2.html pagina3.html pagina4.html pagina5.html pagina6.html
```

- [ ] **Step 3: Commit**

```bash
git commit -m "chore: remove pagina*.html legados (substituidos por /paginaN/ + redirect 301)"
```

---

## Task 24: Deletar pasta `ui-ux-pro-max-skill-main/`

**Files:**
- Delete: `ui-ux-pro-max-skill-main/` (pasta inteira recursivo)

- [ ] **Step 1: Confirmar que não é referenciada em lugar nenhum**

```bash
grep -r "ui-ux-pro-max" --include="*.html" --include="*.css" --include="*.js" --include="*.json" .
```

Expected: zero resultados (ou apenas em docs/specs).

- [ ] **Step 2: Deletar**

```bash
git rm -r ui-ux-pro-max-skill-main/
```

- [ ] **Step 3: Commit**

```bash
git commit -m "chore: remove pasta ui-ux-pro-max-skill-main (skill extraido por engano no repo)"
```

---

## Task 25: Atualizar `README.md` com mapa do sistema

**Files:**
- Modify: `README.md` (criar se não existe)

- [ ] **Step 1: Reescrever README**

```markdown
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

`/capas/capa1.html` ... `capa6.html` — uma por página, match com tema da página de origem (1080×720).

## Arquitetura

```
/assets/css/
  tokens.css         primitivos (escala tipo, sp, motion)
  base.css           reset + helpers (.reveal, .container, .eyebrow)
  components.css     btn, badge, card, header, hero, mecanismo, oferta…
  themes/
    clinical.css     🏥 azul-petróleo + Newsreader/Inter Tight/JetBrains Mono
    editorial.css    📰 creme/terracota + Fraunces/DM Sans/Instrument Serif
    boutique.css     🖤 preto/dourado + Italiana/Cormorant/Geist

/assets/js/site.js   Pixel helpers (PRICE=14.99) + scroll reveal + smooth scroll + header
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

## Spec & Plano

- Spec: `docs/superpowers/specs/2026-04-28-rebrand-protocolo-fecha-tudo-design.md`
- Plano: `docs/superpowers/plans/2026-04-28-rebrand-protocolo-fecha-tudo.md`
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: README com mapa do sistema (paginas, temas, gatilhos, arquitetura)"
```

---

## Task 26: Push + verificações pós-deploy

- [ ] **Step 1: Verificar status do repo**

```bash
git status
git log --oneline -20
```

Expected: working tree clean, ~25 commits novos.

- [ ] **Step 2: Push pra main**

```bash
git push origin main
```

Vercel deploy começa automático. Pode demorar 30-60s.

- [ ] **Step 3: Verificar deploy na Vercel**

Abrir [vercel.com](https://vercel.com) → projeto `protocolo-fecha-tudo` → último deploy → status "Ready".

- [ ] **Step 4: Smoke test em produção**

Abrir cada URL e confirmar visual:

```
https://[seu-dominio]/
https://[seu-dominio]/pagina1/
https://[seu-dominio]/pagina2/
https://[seu-dominio]/pagina3/
https://[seu-dominio]/pagina4/
https://[seu-dominio]/pagina5/
https://[seu-dominio]/pagina6/
https://[seu-dominio]/capas/capa1.html
... capa6.html
```

- [ ] **Step 5: Verificar redirects 301**

```bash
curl -I https://[seu-dominio]/pagina2.html
curl -I https://[seu-dominio]/pagina3.html
curl -I https://[seu-dominio]/pagina4.html
curl -I https://[seu-dominio]/pagina5.html
curl -I https://[seu-dominio]/pagina6.html
```

Expected em cada um: `HTTP/2 308` (Vercel usa 308 ao invés de 301 para preservar método) e header `location: /paginaN/`.

- [ ] **Step 6: Verificar Pixel `value: 14.99`**

1. Abrir uma das páginas em produção
2. DevTools → Network → filtrar `facebook.com/tr`
3. Confirmar payload do `PageView` chega
4. Clicar no CTA "Garantir acesso" do header
5. Confirmar `ViewContent` é disparado com `value=14.99`
6. Voltar e clicar no CTA "Quero o protocolo da minha clínica" da seção oferta
7. Confirmar `InitiateCheckout` com `value=14.99`

Alternativa: Meta Events Manager → Test Events → cole a URL → ações.

- [ ] **Step 7: Lighthouse mobile**

```bash
npx -y lighthouse https://[seu-dominio]/ --view --preset=desktop
npx -y lighthouse https://[seu-dominio]/ --view --form-factor=mobile
```

Alvo: Performance ≥ 85 mobile, Accessibility ≥ 95, Best Practices ≥ 90, SEO ≥ 95.

Se Performance < 85: investigar render-blocking, imagens (não temos), fontes (verificar `font-display: swap` está no @import — adicionar `&display=swap` se faltou).

- [ ] **Step 8: Final commit (se houve correções)**

```bash
git add .
git commit -m "fix: ajustes pos-deploy (lighthouse / pixel / redirects)"
git push origin main
```

---

# Self-Review do plano (executado antes de fechar)

**1. Spec coverage** — checklist contra `2026-04-28-rebrand-protocolo-fecha-tudo-design.md`:

- [x] Avatar pivot pra clínica → coberto na copy de cada Task de página
- [x] Posicionamento C+D (método + prejuízo) → mecanismo + diagnóstico de cada página
- [x] Preço R$14,99 fixo → Task 7 (`site.js` PRICE=14.99) + cada página/capa repete
- [x] Método M.A.C.A. mantido → Task 9 (cards) + repetido em todas
- [x] Sem prova social → garantia 7d + especificidade (8 objeções nominadas) presentes em todas
- [x] Tom humanizado → copy escrita aplicando regras `stop-slop` (frases curtas, específico, sem adjetivo vago)
- [x] 7 gatilhos distintos → 1 por página, mapeamento na Task respectiva
- [x] 3 temas (Clínico/Editorial/Boutique) → Tasks 4, 5, 6
- [x] Distribuição 2/2/3 → index+pag5+pag6 (Boutique), pag1+pag4 (Clínico), pag2+pag3 (Editorial)
- [x] Arquitetura tokens + temas + components + js → Tasks 1-7
- [x] vercel.json com redirects + cache → Task 8
- [x] Limpeza de legado (pagina*.html, ui-ux-pro-max) → Tasks 23, 24
- [x] Capas matching tema → Tasks 17-22
- [x] README mapa → Task 25
- [x] Pixel atualizado pra 14.99 → Task 7

**2. Placeholder scan** — sem TBD/TODO/"appropriate". Todos os HTML/CSS/JS estão completos. Onde diz "(seu domínio)" em comandos curl é instrução pra usuário substituir, não placeholder de implementação.

**3. Type consistency** — class names CSS usados em HTML batem com declarados em components.css (`.btn--cta`, `.btn--header`, `.list-check`, `.timeline-col--sem`, etc.). Variáveis CSS (`--bg`, `--ink`, `--accent`) declaradas em cada theme.css e referenciadas em components.css. JS `PFT.trackViewContent`/`trackInitiateCheckout` declarados em Task 7 e usados em Tasks 9-16.

**4. Ordem de tasks** — Fase 1 cria fundação antes de Fase 2 usar; Fase 2 (3 piloto) antes de Fase 3 (escalar) — checkpoint Task 12 protege das 4 páginas restantes; Fase 4 (capas) depende dos themes; Fase 5 (cleanup+deploy) última.

Plano aprovado pra execução.

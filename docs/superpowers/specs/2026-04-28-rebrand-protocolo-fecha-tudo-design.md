# Rebrand & Reestruturação — Protocolo Fecha-Tudo

**Data**: 2026-04-28
**Status**: Aprovado — pronto pra plano de implementação
**Autores**: 0xdisruptivo (decisões), Claude (síntese)

---

## 1. Contexto & problema

O **Protocolo Fecha-Tudo** é um documento (PDF) com 13 scripts prontos de WhatsApp + Método M.A.C.A. (4 etapas: Mapeamento de Dor, Ancoragem de Valor, Comando de Escassez, Agendamento Blindado). Vendido no checkout Ticto.

**Problema observado**: muitos pageviews via tráfego pago (BIDCAP, lance público aberto), poucas vendas. Conversão baixa apesar de volume alto de impressão.

**Diagnóstico inicial (validado durante brainstorming)**:

1. **Avatar mismatch**: tráfego está sendo direcionado a **donas/gerentes/tomadores de decisão de clínicas de estética facial e corporal**, mas a copy atual fala na voz de **esteticista solo individual** ("você passou a semana inteira respondendo 'quanto custa'"). Decisor de clínica não se reconhece — bounce alto.
2. **Posicionamento fraco pro avatar correto**: oferta enquadrada como "13 scripts" parece tutorial barato. Decisor de clínica precisa enxergar **método + sistema operacional + prejuízo evitado**.
3. **Visual único pra um sistema de 7 páginas**: hoje todas as variantes têm a mesma vibe rosa-feminino-romântico, perdem efeito de teste cruzado quando o BIDCAP roda.
4. **Sem prova social externa**: nenhum depoimento, screenshot ou número real disponível. Credibilidade tem que vir de método, especificidade, garantia e mecanismo lógico.

## 2. Decisões estratégicas (todas aprovadas pelo dono do negócio)

| Decisão | Valor |
|---|---|
| **Avatar** | Pivot 100% para dona/gerente/tomador de decisão de clínica de estética. Esteticista solo sai de cena. |
| **Posicionamento** | Híbrido C+D — Método/Padrão de autoridade ("M.A.C.A. — como clínicas que lotam agenda atendem no WhatsApp") + Solução de dor/prejuízo evitado ("pare de perder R$X em conversa que morre") |
| **Preço** | **R$ 14,99 fixo em todas as 7 páginas e 6 capas** |
| **Método (nome)** | Mantém **M.A.C.A.** (já tem identidade no produto, não vale queimar) |
| **Prova social** | Não há. Credibilidade sustentada por: garantia 7d, método nomeado, especificidade dos scripts (8 objeções nominadas, etc.), mecanismo lógico (matemática da perda) |
| **Tom** | Humanizado (regras `stop-slop` aplicadas), específico, concreto, sem adjetivo vago |

## 3. Os 7 gatilhos mentais (1 por página)

| Página | Tema visual | Gatilho dominante | Hook (esboço) |
|---|---|---|---|
| `index` | 🖤 Boutique-Dark | Identidade premium / hub | "Sua clínica não tem problema de tráfego. Tem conversa que morre antes do agendamento." |
| `pagina1` | 🏥 Clínico-Autoridade | Dor + perda quantificada | "Sua clínica perdeu R$ 7.420 essa semana em conversas que morreram no WhatsApp." |
| `pagina2` | 📰 Editorial-Wellness | Comparação social | "Mesma cidade. Mesma técnica. Mesmo preço. Por que uma lota e a outra não?" |
| `pagina3` | 📰 Editorial-Wellness | Storytelling/cena | "A cliente perguntou o preço. A recepcionista respondeu 'R$380'. Ela nunca mais voltou." |
| `pagina4` | 🏥 Clínico-Autoridade | Inimigo comum / reframing | "O problema da sua clínica não é tráfego. É a próxima conversa que sua atendente vai perder." |
| `pagina5` | 🖤 Boutique-Dark | Identidade + status | "Clínicas sérias não improvisam atendimento. Padronizam." |
| `pagina6` | 🖤 Boutique-Dark | Urgência contínua + antes-depois | "Antes que a próxima cliente vá pra concorrência — aqui está o protocolo que ela esperava encontrar com você." |

**Distribuição de temas**: 2 Clínico (pag1, pag4) + 2 Editorial (pag2, pag3) + 3 Boutique (index, pag5, pag6).

## 4. Sistema de marca — 3 temas

### 4.1 Tema A — 🏥 Clínico-Autoridade

**Paleta** — relatório de auditoria, branco abundante, número grande

| Token | Hex |
|---|---|
| `--bg` | `#FAFBFC` |
| `--surface` | `#FFFFFF` |
| `--ink` | `#0E2A33` (azul-petróleo) |
| `--ink-soft` | `#3F5963` |
| `--muted` | `#7A8B92` |
| `--accent` | `#0F766E` (verde-petróleo, dado/destaque) |
| `--alert` | `#B91C1C` (vermelho, perda) |
| `--rule` | `#E2E7EA` |

**Tipografia**
- Display: **Newsreader** (serifa institucional)
- Body: **Inter Tight** (sans neutra)
- Mono: **JetBrains Mono** (números, R$, métricas)

### 4.2 Tema B — 📰 Editorial-Wellness

**Paleta** — revista de bem-estar, calor humano, narrativa

| Token | Hex |
|---|---|
| `--bg` | `#F5F0E8` (creme) |
| `--surface` | `#FBF7F0` |
| `--ink` | `#1F1A1A` (carvão quente) |
| `--ink-soft` | `#4A3F38` |
| `--muted` | `#8B7E73` |
| `--accent` | `#B85C3E` (terracota) |
| `--accent-2` | `#4A5D3A` (verde-musgo) |
| `--rule` | `#E5DBC9` |

**Tipografia**
- Display: **Fraunces** (serifa moderna opsz variable)
- Body: **DM Sans** (sans humanista)
- Italic: **Instrument Serif Italic** (citações, eyebrow)

### 4.3 Tema C — 🖤 Boutique-Dark

**Paleta** — boutique premium, convite mais que venda

| Token | Hex |
|---|---|
| `--bg` | `#0A0A0A` (preto profundo) |
| `--surface` | `#141414` (carvão) |
| `--ink` | `#F5F0E8` (creme) |
| `--ink-soft` | `#C4BAA8` |
| `--muted` | `#7E7568` |
| `--accent` | `#C9A876` (dourado quente) |
| `--accent-2` | `#E8DDD0` (bege-pele) |
| `--rule` | `#2A2A2A` |

**Tipografia**
- Display: **Italiana** (serifa display elegante) — h1 hero
- Sub-display: **Cormorant Garamond** (serifa fluida) — h2, h3
- Body: **Geist** (sans contemporânea)
- Detalhes: **JetBrains Mono** (números, badges)

### 4.4 Voz da marca (transversal)

**Manifesto curto** (rodapé/sobre):
> Não vendemos curso. Não vendemos vídeo. Vendemos o documento que sua clínica abre amanhã, copia o script, e usa na próxima conversa.

**Regras de voz** (auditadas via skill `stop-slop` em toda copy final):

- Frases curtas. Períodos secos. Zero "no entanto, é importante notar que".
- Específico > genérico. "R$380 perdidos terça às 19h" vence "muito dinheiro perdido".
- Você > a gente. Verbos > substantivos.
- Adjetivos vagos proibidos: incrível, transformador, revolucionário, único, inovador.
- Concreto sensorial: check cinza, Pix confirmado, agenda às 14h, recepcionista nova.
- Tom: amigo direto que entende do negócio (não palestrante, não guru, não professor).

## 5. Arquitetura de arquivos

```
/protocolo-fecha-tudo
├── index.html                    ← hub · Boutique-Dark
├── pagina1/index.html            ← Clínico · perda quantificada
├── pagina2/index.html            ← Editorial · comparação
├── pagina3/index.html            ← Editorial · storytelling
├── pagina4/index.html            ← Clínico · inimigo comum
├── pagina5/index.html            ← Boutique · identidade
├── pagina6/index.html            ← Boutique · urgência
│
├── capas/
│   ├── capa1.html                ← Clínico
│   ├── capa2.html                ← Editorial
│   ├── capa3.html                ← Editorial
│   ├── capa4.html                ← Clínico
│   ├── capa5.html                ← Boutique (link de pag5 + index)
│   └── capa6.html                ← Boutique
│
├── assets/
│   ├── css/
│   │   ├── tokens.css            ← primitivos (escala tipo, espaçamento, sombras, motion)
│   │   ├── base.css              ← reset, body defaults, helpers (.reveal, .container)
│   │   ├── components.css        ← btn, badge, card, list, divider — neutros
│   │   └── themes/
│   │       ├── clinical.css      ← paleta + fontes Tema A
│   │       ├── editorial.css     ← paleta + fontes Tema B
│   │       └── boutique.css      ← paleta + fontes Tema C
│   └── js/
│       └── site.js               ← Pixel helpers + scroll reveal + smooth scroll + header
│
├── vercel.json                   ← redirects + headers de cache
└── README.md                     ← mapa do sistema (qual tema/gatilho por página)
```

### 5.1 Como cada página carrega CSS

```html
<link rel="stylesheet" href="/assets/css/tokens.css">
<link rel="stylesheet" href="/assets/css/base.css">
<link rel="stylesheet" href="/assets/css/themes/editorial.css">  <!-- por página -->
<link rel="stylesheet" href="/assets/css/components.css">
<script src="/assets/js/site.js" defer></script>
```

### 5.2 vercel.json

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

### 5.3 Limpeza de legado

| Arquivo | Ação |
|---|---|
| `pagina2.html` ... `pagina6.html` (raiz, soltos) | Deletar após criar redirect |
| `ui-ux-pro-max-skill-main/` (pasta inteira) | Deletar |
| `index.html` atual | Reescrever (Boutique-Dark) |
| `pagina1/index.html` ... `pagina6/index.html` | Reescrever (cada um, seu tema+gatilho) |
| `capas/capa*.html` | Reescrever (match com tema da página de origem) |

## 6. Estrutura comum por página

Cada `index.html` (raiz e subpáginas) segue 9 blocos. Mecanismo, Protocolo M.A.C.A., O Que Recebe, Oferta e Footer compartilham copy com microajustes. **O que varia 100%**: Hero, Diagnóstico, Pra quem é.

```
1. Header        — logo + CTA sticky "Garantir acesso"
2. Hero          — eyebrow + headline + sub + scroll cue          ← varia 100%
3. Diagnóstico   — 3 parágrafos de dor concreta                   ← varia 100%
4. Mecanismo     — sem protocolo vs. com protocolo                ← varia framing
5. Protocolo     — 4 cards M.A.C.A.                               ← copy comum
6. Incluso       — 9 itens com checks                             ← copy comum
7. Pra quem é    — sim/não                                        ← varia público interno
8. Oferta        — R$14,99 + CTA + garantia 7d + pagamento        ← comum
9. Footer
```

### 6.1 Copy compartilhada — Protocolo M.A.C.A.

| Etapa | Min | Nome | Microcopy |
|---|---|---|---|
| I | 1–3 | Mapeamento de Dor | "Ela verbaliza o que incomoda antes de qualquer preço entrar." |
| II | 4–7 | Ancoragem de Valor | "O investimento chega depois da dor — nunca antes." |
| III | 8–11 | Comando de Escassez | "Dois horários específicos em vez de 'minha agenda tá aberta'." |
| IV | 12–15 | Agendamento Blindado | "Sinal via Pix. Sequência de lembretes. Ela aparece." |

### 6.2 Copy compartilhada — O que você recebe

- 13 scripts completos pra sua equipe seguir sem improviso
- Aberturas pra cliente nova + reativação de quem sumiu
- Diagnóstico + ancoragem na sequência exata
- Resposta pronta pra 8 objeções: "tá caro", "vou pensar", "vou ver com meu marido", "tô sem dinheiro agora", "pesquisei outro lugar", "vai doer?", "já fiz e não gostei", "faz desconto?"
- Confirmação de agendamento com sinal via Pix
- 3 lembretes anti no-show que reduzem cancelamento
- Kit Anti-Vácuo: 5 scripts pra reativar conversa que travou
- Reativação de pacientes inativas há 6 meses ou 1 ano
- Guia de Respostas Rápidas no WhatsApp Business pra equipe configurar em 10min

### 6.3 Copy compartilhada — Oferta

- Eyebrow: `ACESSO IMEDIATO · DOCUMENTO`
- Preço: **R$ 14,99**
- Sub-preço: "acesso permanente — sem mensalidade"
- Contexto: "Uma única venda recuperada paga o protocolo 25 vezes. Na próxima conversa, você já tá no lucro."
- CTA: **"Quero o protocolo da minha clínica"**
- Pagamento: "Pix, cartão ou boleto — acesso liberado em minutos"
- Garantia: "7 dias de garantia incondicional"

## 7. Blueprint por página (hero + diagnóstico + framing)

### 7.1 `index.html` — 🖤 Boutique · hub principal

- **Eyebrow**: `MÉTODO M.A.C.A. / PARA CLÍNICAS DE ESTÉTICA`
- **Headline**: *"Sua clínica não tem problema de tráfego.<br>Tem **conversa que morre** antes do agendamento."*
- **Sub**: "O Protocolo Fecha-Tudo é o documento operacional que sua equipe abre amanhã, copia o script, e usa na próxima conversa do WhatsApp. Sem curso. Sem treinamento. Sem improviso."
- **Diagnóstico** (3 parágrafos): foco em prejuízo silencioso da clínica como organização — "São quinze conversas por semana que travam no preço. Multiplica por 4 semanas, multiplica pelo seu ticket médio. É o salário de uma recepcionista que está saindo pelo ralo do WhatsApp."
- **Pra quem é**: dona/sócia/gerente que sente que perde dinheiro em conversa, mas não sabe onde

### 7.2 `pagina1/` — 🏥 Clínico · perda quantificada

- **Eyebrow**: `DIAGNÓSTICO · 03/2026`
- **Headline**: *"Sua clínica perdeu **R$ 7.420,00** essa semana em conversas que morreram no WhatsApp."*
- **Sub**: "Cálculo conservador, ticket médio de R$ 380, 30% de taxa de fechamento sem protocolo, 65 conversas/semana. Os números são da sua clínica. A perda também."
- **Diagnóstico**: tabela tipo relatório com 3 linhas — *Conversas que entraram / Conversas que viraram pix / Conversas que sumiram após o preço*. Em mono. Vermelho na linha de perda.
- **Hero visual**: gráfico de barras ASCII em mono mostrando erosão semana a semana
- **Mecanismo framing**: "Não é hipótese. É operação."
- **Pra quem é**: gestor financeiro, dono que olha planilha de DRE

### 7.3 `pagina2/` — 📰 Editorial · comparação social

- **Eyebrow**: `UMA REPORTAGEM SOBRE DUAS CLÍNICAS`
- **Headline**: *"Mesma cidade. Mesma técnica. Mesmo preço.<br>**Por que uma lota e a outra não?**"*
- **Sub**: "A diferença começa nos primeiros quinze minutos depois do 'oi'. E ninguém percebe porque acontece em silêncio, no privado do WhatsApp."
- **Diagnóstico**: estrutura de revista, dois parágrafos lado a lado: *"Na clínica de cima, Rita responde o preço em 2 segundos. Na clínica de baixo, Bruna pergunta o que incomoda antes de qualquer número."* — drop-cap
- **Mecanismo framing**: "A divergência" (com pull-quote)
- **Pra quem é**: dona que viu concorrente subir e não entende por quê

### 7.4 `pagina3/` — 📰 Editorial · storytelling/cena

- **Eyebrow**: `19H47 · TERÇA-FEIRA`
- **Headline**: *"A cliente perguntou o preço.<br>A recepcionista respondeu **'R$ 380'**.<br>Ela nunca mais voltou."*
- **Sub**: "Acontece todo santo dia. E ninguém treina sua equipe pra essa exata fração de segundo — onde a venda inteira é decidida."
- **Diagnóstico**: narrativa contínua em 3 parágrafos curtos, voz do narrador onisciente — *"Marcela tinha 32 anos e três sessões de drenagem em mente. Já tinha pesquisado 4 clínicas..."*
- **Mecanismo framing**: "O que deveria ter acontecido" (mesma cena, refeita com protocolo)
- **Pra quem é**: dona empática, que se importa com a equipe, valoriza humanização

### 7.5 `pagina4/` — 🏥 Clínico · inimigo comum / reframing

- **Eyebrow**: `RECONFIGURAÇÃO`
- **Headline**: *"O problema da sua clínica **não é tráfego**.<br>É a próxima conversa que sua atendente vai perder."*
- **Sub**: "Você pode dobrar o investimento em ads e não mover faturamento. Porque o gargalo não está no anúncio. Está no privado, depois do clique."
- **Diagnóstico**: estrutura de tese — premissa errada / dado / conclusão. Tom de coluna de opinião jornalística.
- **Mecanismo framing**: "Onde o dinheiro está, de verdade" (com diagrama de funil mostrando que conversão de WhatsApp tem mais alavanca que ads)
- **Pra quem é**: dona que está cansada de torrar em ads sem ver retorno

### 7.6 `pagina5/` — 🖤 Boutique · identidade + status

- **Eyebrow**: `PARA UM TIPO ESPECÍFICO DE CLÍNICA`
- **Headline**: *"Clínicas sérias **não improvisam** atendimento.<br>Padronizam."*
- **Sub**: "Se você ainda deixa cada atendente responder do jeito dela, você não tem uma clínica — tem seis recepcionistas trabalhando em paralelo, com seis padrões diferentes, perdendo cliente cada uma do seu jeito."
- **Diagnóstico**: tom de manifesto — afirmações em sequência, espaço generoso, dourado nos verbos-chave. *"Padroniza-se a anamnese. Padroniza-se o protocolo de limpeza. Padroniza-se o pós. Mas o atendimento, o momento mais decisivo, fica no improviso."*
- **Mecanismo framing**: "O que separa as duas categorias"
- **Pra quem é**: dona que se vê como profissional sério, valoriza padronização operacional

### 7.7 `pagina6/` — 🖤 Boutique · urgência + antes-depois

- **Eyebrow**: `15 MINUTOS · DO PRIMEIRO "OI" AO PIX`
- **Headline**: *"Antes que a próxima cliente vá para a concorrência —<br>**aqui está o protocolo que ela esperava encontrar com você**."*
- **Sub**: "Não é gatilho de escassez de marketing. É a aritmética simples: cada conversa perdida hoje é uma cliente que vai pesquisar mais três clínicas até sexta-feira. E geralmente fecha na que respondeu melhor primeiro."
- **Diagnóstico**: linha do tempo "agora / em 3 dias / em 1 semana" — o que acontece se nada mudar.
- **Mecanismo framing**: "O antes e o depois — ambos tomam 15 minutos da sua atendente"
- **Pra quem é**: dona que sente urgência mas não responde a barra de countdown vulgar

## 8. Capas de checkout

Cada capa = página `1080×720` (formato definido em commit anterior). Match 1:1 com tema da página de origem; importa o mesmo `theme-*.css`. Conteúdo enxuto: title curta + 1 linha de contexto + CTA + preço + garantia. Função: aparecer dentro do checkout Ticto pra reforçar identidade durante a finalização.

| Capa | Linka de | Tema | Hook |
|---|---|---|---|
| `capa1.html` | `pagina1` | 🏥 Clínico | Resumo numérico, R$14,99 em mono destacado |
| `capa2.html` | `pagina2` | 📰 Editorial | Pull-quote da headline + dois mini-perfis (Rita/Bruna) |
| `capa3.html` | `pagina3` | 📰 Editorial | Cena curta ("19h47 · terça") como abertura de capítulo |
| `capa4.html` | `pagina4` | 🏥 Clínico | Diagrama-funil + reframing em 1 frase |
| `capa5.html` | `pagina5` + `index` | 🖤 Boutique | Manifesto curto centralizado, dourado, espaço generoso |
| `capa6.html` | `pagina6` | 🖤 Boutique | Linha do tempo "agora → 3 dias → semana" |

## 9. Tracking — Pixel & Ticto

- Pixel ID `1624871735228400` (mantém — já validado pelo Facebook).
- **Atualizar todos os eventos pra `value: 14.99`** (hoje estão 28.00 ou 48.00).
- Eventos por página:
  - `PageView` (auto, no head)
  - `ViewContent` no clique do CTA do header
  - `InitiateCheckout` no clique do CTA da seção Oferta
- Link Ticto atual `https://checkout.ticto.app/OCC46FBCB` mantido como placeholder em todas. Substituir por links específicos por capa quando dono quiser rastreio granular A/B.
- `<noscript>` pixel mantido pra fallback.

## 10. Rollout (ordem de implementação)

**Fase 1 — Fundação (1-2h)**
1. Criar `/assets/css/{tokens,base,components}.css`
2. Criar `/assets/css/themes/{clinical,editorial,boutique}.css`
3. Criar `/assets/js/site.js` (Pixel helpers, reveal, smooth scroll)
4. Criar `vercel.json`

**Fase 2 — Hub + 2 páginas piloto (2-3h)**
5. Reescrever `index.html` (Boutique-Dark)
6. Reescrever `pagina3/index.html` (Editorial · storytelling)
7. Reescrever `pagina1/index.html` (Clínico · perda)

→ **Checkpoint visual + copy nessas 3** antes de seguir.

**Fase 3 — Demais páginas (3-4h)**
8. Reescrever `pagina2`, `pagina4`, `pagina5`, `pagina6/index.html`

**Fase 4 — Capas (2h)**
9. Reescrever `capas/capa1.html` ... `capa6.html`

**Fase 5 — Limpeza + deploy (30min)**
10. Deletar `pagina2.html`...`pagina6.html` soltos
11. Deletar `ui-ux-pro-max-skill-main/`
12. Atualizar `README.md` com mapa do sistema
13. Commit + push → Vercel deploy automático
14. Verificar redirects (`/pagina2.html` → `/pagina2/`)
15. Verificar Pixel disparando `value: 14.99` no Events Manager

**Total estimado**: 8-12h.

## 11. Riscos & mitigações

| Risco | Mitigação |
|---|---|
| Tensão entre R$14,99 e visual Boutique | Copy explicitamente reframa: "preço de entrada estratégico". CTA não trata como barganha. |
| Sem prova social → quedas de credibilidade | Ênfase máxima em garantia 7d, especificidade ("8 objeções nominadas"), método nomeado (M.A.C.A.) |
| Tráfego BIDCAP perdido em redirect | 301 permanentes preservam tudo |
| Avatar muda — Pixel desaprende | Mantém Pixel ID, só atualiza `value`. Lookalike re-treina em 7-14 dias |
| Fontes Google não carregam → FOUT | `font-display: swap` nos imports + fallback stack robusto em cada theme |
| Capa não aparece corretamente no Ticto | Verificar dimensões 1080×720 e formato de upload Ticto após primeira capa |

## 12. Critérios de sucesso

**Imediato (após deploy)**:
- Todas as 7 páginas + 6 capas no ar com paths corretos
- Lighthouse Performance ≥ 85 em mobile
- Pixel disparando `value: 14.99` corretamente
- Redirects 301 funcionando para os `pagina*.html` antigos
- Zero erros 404 nos asset paths

**Métrica de negócio (medida em 14-30 dias)**:
- Taxa de conversão (compra/pageview) **maior que a baseline atual** em pelo menos uma das 7 páginas
- BIDCAP identifica vencedor entre as 7 (CTR + CR combinados)

## 13. O que está fora de escopo desta spec

- Nova oferta/produto (continua sendo o mesmo PDF de 13 scripts + M.A.C.A.)
- Email/sequência pós-compra
- Order bumps / upsells no Ticto
- Tradução pra outros idiomas
- Versão app/PWA
- Captação de depoimentos reais (será iniciativa separada — quando vierem, copy será atualizada com `replace_all` direcionado)

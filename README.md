# Protocolo Fecha-Tudo

Duas landing pages para o **Protocolo Fecha-Tudo**, método MACA por Felipe. Mesmo produto, mesma oferta (R$ 24,90, pagamento único, checkout Ticto), dois registros estéticos opostos para testar A/B de criativo e página.

## Estrutura

```
/
├── assets/
│   ├── felipe-noir.jpg          retrato P&B com persiana
│   ├── felipe-portrait.jpg      close turtleneck
│   └── felipe-studio.jpg        camisa, fundo escuro
├── pagina1/
│   └── index.html               Hotmart Cinematográfico (DOR / URGÊNCIA)
├── pagina2/
│   └── index.html               Estúdio do Estrategista (ASPIRAÇÃO)
├── PRODUCT.md                   contexto estratégico (register, users, anti-refs)
├── DESIGN.md                    sistema visual de cada página
└── README.md
```

Cada `index.html` é autocontido: HTML + CSS + JS inline, sem build, sem dependências externas além das fontes do Google.

## Diferença entre as páginas

| Item       | pagina1 (Hotmart Cinematográfico)        | pagina2 (Estúdio do Estrategista)              |
| ---------- | ---------------------------------------- | ---------------------------------------------- |
| Registro   | Info-produto BR, executado com produção  | Editorial de revista de negócios               |
| Tipografia | Anton (display) + Inter (body)           | Playfair Display (display) + Inter (body)      |
| Paleta     | Papel quente + amarelo + alerta + dark   | Paper + charcoal + pigmento terra-bordô        |
| Foto hero  | felipe-noir (P&B persiana)               | felipe-portrait (turtleneck close-up)          |
| Vibe       | Direto, urgente, com prova de franquias  | Quieto, autoritativo, layout magazine          |

## Felipe (autoridade compartilhada)

- 10+ anos no mercado de estética
- Estrategista digital, agência atende 70+ clínicas
- Clientes: Face Doctor, Botoclinic, Studio Mines, Smile Skin
- Idealizador do Aios CRM
- Treinamentos comerciais: follow-up, atendimento, IA aplicada a vendas

## Método MACA

Quatro movimentos que cabem em 15 minutos de WhatsApp:

1. **M**, Mensagem de entrada
2. **A**, Ancoragem de valor
3. **C**, Condução firme
4. **A**, Agendamento real

## Como testar local

Abra cada `index.html` direto no browser, ou rode um servidor estático:

```bash
python -m http.server 8000
# http://localhost:8000/pagina1/
# http://localhost:8000/pagina2/
```

## Stack

- HTML/CSS/JS vanilla, zero build
- Google Fonts: Anton, Playfair Display, Inter
- Checkout: Ticto (`https://checkout.ticto.app/OCC46FBCB`)
- WhatsApp lead: `https://wa.me/5515981730591`

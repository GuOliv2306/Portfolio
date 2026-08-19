# Portfólio · Gustavo de Oliveira

App de produção (React + Vite) na raiz do repositório. O protótipo original do
Claude Design fica preservado em `project/` apenas como referência de design.

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # gera dist/
npm run preview  # serve o dist/ localmente
```

**Estrutura**

| Caminho | Conteúdo |
|---|---|
| `index.html` | shell da página, meta tags de SEO/Open Graph, fontes |
| `src/main.jsx` | ponto de entrada do React |
| `src/App.jsx` | composição das seções + smooth scroll |
| `src/data.js` | conteúdo editável: projetos, certificados, skills, contato |
| `src/styles.css` | design system completo (tokens, cursor, HUD, responsivo) |
| `src/components/` | uma seção por arquivo + `primitives.jsx` e `tech.jsx` |
| `public/assets/` | currículo e certificado em PDF |

**Publicar na Vercel** — a Vercel detecta o Vite automaticamente (build `npm run build`,
saída `dist`). Basta importar o repositório; nenhuma variável de ambiente é necessária.
Depois do primeiro deploy, troque o domínio provisório em `index.html`
(`<link rel="canonical">` e `og:url`) pelo domínio final.

**Para editar o conteúdo** — quase tudo vive em `src/data.js`. Textos longos de
seção (bio, depoimentos, frases da capa) ficam no componente correspondente.

---

# CODING AGENTS: READ THIS FIRST

This is a **handoff bundle** from Claude Design (claude.ai/design).

A user mocked up designs in HTML/CSS/JS using an AI design tool, then exported this bundle so a coding agent can implement the designs for real.

## What you should do — IMPORTANT

**Read the chat transcripts first.** There are 6 chat transcript(s) in `chats/`. The transcripts show the full back-and-forth between the user and the design assistant — they tell you **what the user actually wants** and **where they landed** after iterating. Don't skip them. The final HTML files are the output, but the chat is where the intent lives.

**Read `project/Portfolio.html` in full.** The user had this file open when they triggered the handoff, so it's almost certainly the primary design they want built. Read it top to bottom — don't skim. Then **follow its imports**: open every file it pulls in (shared components, CSS, scripts) so you understand how the pieces fit together before you start implementing.

**If anything is ambiguous, ask the user to confirm before you start implementing.** It's much cheaper to clarify scope up front than to build the wrong thing.

## About the design files

The design medium is **HTML/CSS/JS** — these are prototypes, not production code. Your job is to **recreate them pixel-perfectly** in whatever technology makes sense for the target codebase (React, Vue, native, whatever fits). Match the visual output; don't copy the prototype's internal structure unless it happens to fit.

**Don't render these files in a browser or take screenshots unless the user asks you to.** Everything you need — dimensions, colors, layout rules — is spelled out in the source. Read the HTML and CSS directly; a screenshot won't tell you anything they don't.

## Bundle contents

- `README.md` — this file
- `chats/` — conversation transcripts (read these!)
- `project/` — the `Portifolio_v2` project files (HTML prototypes, assets, components)

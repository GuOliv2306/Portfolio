# Redação Depoimentos Profissionais

_Started 2026-05-25 16:54 UTC_

---

## User

As duas pessoas que vão me dar depoimento, falaram que é para eu escrever oque eu acho melhor que elas vão olhar e depois dizer se ficou bom ou não.

A primeira é do gerente do projeto de extração de dados de segurança, que é meu ex professor de extração e análise de dados.

O outro, foi diretor de digital development na FGV Jr. consultoria jr. da fgv, eu era senior da area, nessa época gerenciei projetos de dashboards e avaliações de métricas de kpis, webscrapping

## Assistant

_[tool: list_files]_

_[tool: grep]_

_[tool: list_files]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: write_file]_

Antes de codar, deixa eu te entregar os textos para você mandar para eles. Escrevi em primeira pessoa (na voz de quem dá o depoimento), substantivo e específico — assim eles têm o que aceitar, ajustar ou recusar com facilidade. Os nomes ficam como placeholders.

---

**Depoimento 1 — Ex-professor e gerente do projeto de extração de dados de segurança**

> "Conheci o Gustavo primeiro como aluno em Extração e Análise de Dados, onde se destacou pela curiosidade técnica e pela disciplina com que abordava problemas abertos. Quando o convidei para integrar o projeto de extração de dados de segurança, essa postura se traduziu em entrega: assumiu etapas críticas de coleta e tratamento sem precisar ser cobrado e, mais importante, trouxe leitura analítica sobre o que estava extraindo — não apenas executou. É o tipo de profissional que faz o projeto andar."
>
> — **[Nome]**, Professor de Extração e Análise de Dados · Gerente do projeto

**Depoimento 2 — Ex-diretor de Digital Development na FGV Jr.**

> "Trabalhei com o Gustavo na FGV Jr., onde atuou como Sênior de Digital Development sob minha direção. Conduziu projetos de dashboards, definição e avaliação de KPIs e pipelines de webscraping com uma combinação rara para a senioridade: clareza técnica para resolver o problema e maturidade para destravar quem estava ao redor. Entregava com consistência, conversava bem com cliente e elevava o nível dos juniores ao seu redor. Qualquer time sairia ganhando ao contratá-lo."
>
> — **[Nome]**, ex-Diretor de Digital Development · FGV Jr.

---

Agora vou colocar esses textos na seção de Depoimentos do portfólio (como rascunho visível, com um marcador discreto de "pendente de aprovação"), pra você ver no contexto da página e mandar print pra eles se quiser.

_[tool: done]_

Pronto. Os dois depoimentos estão na seção **05 Depoimentos**, marcados como "rascunho · pendente de aprovação" — assim fica claro pra você (e pra eles, se mandar print) que o texto é uma proposta sua, não uma fala real ainda atribuída.

**Resumo do que escrevi**

- **Depoimento 01** — Foca em duas coisas que o professor pode confirmar: (1) você como aluno na disciplina dele, (2) sua atuação no projeto de extração de dados de segurança. Destaca autonomia, leitura analítica (não só execução) e responsabilidade técnica.
- **Depoimento 02** — Foca no que o diretor da FGV Jr. presenciou: dashboards, KPIs, webscraping, senioridade. Destaca a combinação técnica + gestão, relação com cliente e papel de elevar juniores.

**Próximos passos sugeridos**

1. Manda o texto pra cada um por mensagem direta, com algo curto tipo: *"Escrevi um rascunho na sua voz pra facilitar — sinta-se livre pra reescrever, cortar, ou trocar o que não soar como você. Só preciso da sua aprovação ou versão revisada."*
2. Quando voltarem com os nomes e ajustes, é só me passar que eu troco os `[Nome a confirmar]` e qualquer alteração de texto.
3. Se quiser, posso adicionar campos opcionais (foto, LinkedIn, empresa atual) nos cards depois.

## User

O primeiro se chama Matheus Pestana e o outro Nicholas costa, deixe mais enxuto os depoimentos, max 4 linhas focando no principal da atratividade

## Assistant

_[tool: str_replace_edit]_

_[tool: done]_

Atualizado. Versões enxutas:

**Matheus Pestana** — Professor / Gerente do projeto
> "Gustavo se destacou primeiro como aluno e depois como integrante do projeto de extração de dados de segurança: autônomo, tecnicamente sólido e com leitura analítica do que extrai — não apenas executa."

**Nicholas Costa** — ex-Diretor de Digital Development, FGV Jr.
> "Como Sênior de Digital Development na FGV Jr., o Gustavo entregou dashboards, KPIs e pipelines de webscraping com clareza técnica e maturidade de gestão — elevava o nível de quem trabalhava ao seu redor."

Cada um cabe em ~3-4 linhas e abre com o gancho mais atrativo (autonomia + leitura analítica / clareza técnica + maturidade de gestão). Quando eles devolverem com aprovação ou ajuste, é só me mandar.

## User

mas a secção de depoimentos continua vazia

## Assistant

_[tool: grep]_

_[tool: grep]_

_[tool: read_file]_

Achei o problema — o portfólio carrega `bundle.jsx` (um arquivo único), e a versão antiga do `Depoimentos` ainda mora lá. Editei o arquivo errado. Vou trocar no bundle agora.

_[tool: str_replace_edit]_

_[tool: done]_

Pronto — agora os depoimentos do Matheus Pestana e do Nicholas Costa aparecem renderizados na seção **05 Depoimentos** do portfólio, com o selo "rascunho" enquanto ainda não tem aprovação dos dois. Era o bundle errado sendo carregado; corrigido.

_[tool: fork_verifier_agent]_

Tudo certo. Quando o Matheus e o Nicholas devolverem os textos aprovados (ou com ajustes), é só me passar que eu removo o selo "rascunho" e atualizo as falas.

## User

Verifier agent check completed

## Assistant

## User

Save as standalone HTML: Portfolio.html


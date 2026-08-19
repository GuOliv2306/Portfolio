# Remover elemento de rascunho

_Started 2026-08-19 11:50 UTC_

---

## User

tire esse elemento de rascunho de ambos os depoimentos

## Assistant

_[tool: grep]_

_[tool: read_file]_

Removendo o marcador "rascunho" dos cards.

_[tool: run_script]_

_[tool: ready_for_verification]_

Removi o marcador "rascunho" dos dois cards de depoimento. O subtítulo "Rascunho · pendente de aprovação" no cabeçalho da seção continua lá — quer que eu tire também?

## User

sim

## Assistant

_[tool: run_script]_

_[tool: ready_for_verification]_

_[tool: get_webview_logs]_

_[tool: show_html]_

_[tool: show_html]_

_[tool: eval_js]_

A página monta normalmente (o aviso de #root vazio foi só timing do carregamento). Nenhuma menção a "rascunho" resta na seção de depoimentos.

## User

remove também

## Assistant

_[tool: grep]_

_[tool: read_file]_

_[tool: run_script]_

_[tool: ready_for_verification]_

Nota de rodapé removida.


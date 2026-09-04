# Limpeza de Piscina — Morumbi

Landing page de captação para serviço de limpeza e manutenção de piscinas
residenciais no Morumbi e região, em São Paulo.

**Demonstração:** https://savio13-desig.github.io/limpeza-piscina-morumbi/

---

## O que é

Página única, estática, sem back-end. O objetivo é um só: transformar quem
procura "limpeza de piscina no Morumbi" no Google em uma conversa no WhatsApp.

O formulário não envia nada para servidor nenhum — ele monta a mensagem e abre
o WhatsApp já com nome, telefone, bairro e situação preenchidos.

## Estrutura

```
index.html      página completa (HTML, CSS e JS num arquivo só)
img/            fotos dos trabalhos, otimizadas e sem metadados
```

## Direção de design

As casas atendidas são de alto padrão — pedra, vidro, paisagismo desenhado. A
página assume esse mundo em vez do visual genérico de serviço:

- Paleta tirada das próprias fotos: pedra quase preta, calcário claro, água em
  teal profundo.
- Tipografia **Instrument Serif** + **Instrument Sans**.
- Estrutura em faixas horizontais, arestas retas, sem cartão arredondado e sem
  gradiente.
- Serviços apresentados como índice tipográfico; planos como ficha técnica.
- No topo, **cáusticas de água** geradas em canvas — a luz que refrata no fundo
  da piscina. Não é vídeo nem GIF: é cerca de 40 linhas de matemática.

## Notas técnicas

- **Zero dependência externa** além da fonte do Google Fonts. Sem framework,
  sem biblioteca de animação, sem build step.
- As cáusticas rodam a ~30fps, param quando saem da tela ou a aba fica em
  segundo plano, e não iniciam se o sistema pedir movimento reduzido.
- Parallax na faixa de foto feito em JS puro, sem sequestrar o scroll.
- SEO básico: title, meta description, Open Graph e dados estruturados
  `LocalBusiness`.
- As fotos foram exportadas com todos os metadados removidos.

## Antes de publicar para o cliente

Estes pontos ainda são exemplo e precisam ser trocados:

| O quê | Onde |
| --- | --- |
| Nome da marca ("Nível Piscinas") | `index.html`, buscar por `Nível` |
| WhatsApp | constante `WHATS` no `<script>`, formato `55DDDNUMERO` |
| Telefone exibido | `(11) 99999-8888` |
| Valores dos planos | tabela da seção **Planos** |
| Par de foto antes/depois | seção **Trabalhos** — ainda não temos água verde |
| Depoimentos | ainda sendo colhidos; a seção não existe até haver material real |

## Como publicar

É um site estático. Basta subir `index.html` e a pasta `img/` para a raiz do
domínio (`public_html` no Hostinger, por exemplo). Não precisa de PHP, banco
nem configuração de servidor.

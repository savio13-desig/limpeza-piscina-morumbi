# Leads do formulário na planilha do Google

1. No Google Drive da conta que vai ser dona dos dados (a do Elton), crie uma planilha chamada **EL Piscinas — Leads**.
2. Na planilha: **Extensões > Apps Script**. Apague o código que vier e cole o conteúdo de `Code.gs`. Salve.
3. **Implantar > Nova implantação > App da Web**:
   - Executar como: **eu**
   - Quem pode acessar: **Qualquer pessoa**
   - Autorize quando o Google pedir (é a sua conta dando permissão ao próprio script).
4. Copie o endereço que termina em `/exec` e coloque em `LEADS_URL` no `index.html`.
5. Publique o site. Cada formulário enviado vira uma linha na aba **Leads**.

Colunas: Data/hora, Ref (o mesmo código da mensagem do WhatsApp), Nome, WhatsApp, Bairro, Tamanho, Situação, gclid, Página, Status, Observações. Use **Status** e **Observações** à mão (Novo, Contatado, Visita, Fechado, Perdido).

Cuidados: o endereço `/exec` fica visível no código do site, então qualquer pessoa pode mandar dados para ele. O script limita cada campo a 500 caracteres, bloqueia fórmulas e o formulário tem um campo-isca contra robôs. Se aparecer lixo na planilha, é só gerar uma nova implantação (novo endereço) e atualizar o `LEADS_URL`.

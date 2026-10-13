/**
 * EL Piscinas — grava os leads do formulário do site numa planilha do Google.
 * Cole este código em Extensões > Apps Script de uma planilha e publique como
 * "App da Web" (executar como: você; acesso: qualquer pessoa).
 */
var ABA = "Leads";
var COLUNAS = ["Data/hora", "Ref", "Nome", "WhatsApp", "Bairro", "Tamanho", "Situação", "gclid", "Página", "Status", "Observações"];

/* texto que começa com = + - @ vira fórmula na planilha; o apóstrofo impede isso */
function limpa_(v) {
  v = String(v == null ? "" : v).slice(0, 500);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    var d = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(ABA) || ss.insertSheet(ABA);
    if (sh.getLastRow() === 0) {
      sh.appendRow(COLUNAS);
      sh.getRange(1, 1, 1, COLUNAS.length).setFontWeight("bold");
      sh.setFrozenRows(1);
      sh.getRange("D:D").setNumberFormat("@");   /* telefone como texto */
    }
    sh.appendRow([
      new Date(), limpa_(d.ref), limpa_(d.nome), limpa_(d.fone), limpa_(d.bairro),
      limpa_(d.tam), limpa_(d.msg), limpa_(d.gclid), limpa_(d.pagina), "Novo", ""
    ]);
  } catch (err) {
    /* nunca devolve erro para o site: o WhatsApp abre de qualquer jeito */
  } finally {
    try { lock.releaseLock(); } catch (x) {}
  }
  return ContentService.createTextOutput("ok");
}

/* abra o endereço do app no navegador para conferir que está no ar */
function doGet() {
  return ContentService.createTextOutput("EL Piscinas leads: ok");
}

/**
 * EL Piscinas — grava os leads do formulário do site numa planilha do Google
 * e avisa por e-mail. Fica em Extensões > Apps Script da planilha, publicado como
 * "App da Web" (executar como: o dono; acesso: qualquer pessoa).
 */
var PLANILHA_ID = "COLE_AQUI_O_ID_DA_PLANILHA";   /* trecho entre /d/ e /edit no endereço da planilha */
var ABA = "Leads";
var EMAIL_AVISO = "COLE_AQUI_O_EMAIL_DE_AVISO";
var COLUNAS = ["Data/hora", "Ref", "Nome", "WhatsApp", "Bairro", "Tamanho", "Situação", "gclid", "Página", "Status", "Observações"];
var STATUS = ["Novo", "Contatado", "Visita", "Fechado", "Perdido"];

/* texto que começa com = + - @ vira fórmula na planilha; o apóstrofo impede isso */
function limpa_(v) {
  v = String(v == null ? "" : v).slice(0, 500);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  var aviso = null;
  try {
    lock.waitLock(10000);
    var d = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.openById(PLANILHA_ID);
    var sh = ss.getSheetByName(ABA) || ss.insertSheet(ABA);
    if (sh.getLastRow() === 0) {
      sh.appendRow(COLUNAS);
      sh.getRange(1, 1, 1, COLUNAS.length).setFontWeight("bold");
      sh.setFrozenRows(1);
      sh.getRange("D:D").setNumberFormat("@");   /* telefone como texto */
      var regra = SpreadsheetApp.newDataValidation().requireValueInList(STATUS, true).setAllowInvalid(false).build();
      sh.getRange("J2:J2000").setDataValidation(regra);
    }
    sh.appendRow([
      new Date(), limpa_(d.ref), limpa_(d.nome), limpa_(d.fone), limpa_(d.bairro),
      limpa_(d.tam), limpa_(d.msg), limpa_(d.gclid), limpa_(d.pagina), "Novo", ""
    ]);
    aviso = {
      assunto: "Novo lead do site: " + limpa_(d.nome) + " (" + limpa_(d.bairro) + ")",
      corpo: "Nome: " + limpa_(d.nome) + "\nWhatsApp: " + limpa_(d.fone) + "\nBairro: " + limpa_(d.bairro) +
             "\nTamanho: " + limpa_(d.tam) + "\nSituação: " + limpa_(d.msg || "—") + "\nRef: " + limpa_(d.ref) +
             "\n\nPlanilha: " + ss.getUrl()
    };
  } catch (err) {
    /* nunca devolve erro para o site: o WhatsApp abre de qualquer jeito */
  } finally {
    try { lock.releaseLock(); } catch (x) {}
  }
  if (aviso) {
    try { MailApp.sendEmail(EMAIL_AVISO, aviso.assunto, aviso.corpo); } catch (err2) {}
  }
  return ContentService.createTextOutput("ok");
}

/* abra o endereço do app no navegador para conferir que está no ar */
function doGet() {
  return ContentService.createTextOutput("EL Piscinas leads: ok");
}

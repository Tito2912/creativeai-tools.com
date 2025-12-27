/**
 * Google Apps Script - Newsletter → Google Sheets
 * Version améliorée avec validation et logging
 */
const SHEET_ID = 'REMPLACEZ_PAR_VOTRE_SHEET_ID';
const SHEET_NAME = 'Leads';

function doPost(e) {
  let response;
  
  try {
    // Validation de la requête
    if (!e || !e.postData || !e.postData.contents) {
      return output({ ok: false, error: 'INVALID_REQUEST' }, 400);
    }
    
    const body = JSON.parse(e.postData.contents);
    
    // Validation des données
    if (!body || !body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return output({ ok: false, error: 'INVALID_EMAIL' }, 400);
    }
    
    // Accès à la feuille
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    
    // En-têtes si feuille vide
    if (sh.getLastRow() === 0) {
      sh.appendRow(['Date', 'Email', 'Page', 'Consentement', 'IP', 'User Agent']);
    }
    
    // Ajout des données
    const ip = e.parameter && e.parameter.ip || 'N/A';
    const ua = e.parameter && e.parameter.ua || 'N/A';
    
    sh.appendRow([
      new Date(),
      body.email,
      body.page || '',
      body.consent === true ? 'Oui' : 'Non',
      ip,
      ua
    ]);
    
    // Réponse succès
    response = output({ ok: true, message: 'EMAIL_SAVED' }, 200);
    
  } catch (err) {
    // Log de l'erreur
    console.error('Error in doPost:', err);
    response = output({ 
      ok: false, 
      error: 'SERVER_ERROR',
      details: err.message 
    }, 500);
  }
  
  return response;
}

function output(obj, status = 200) {
  const out = ContentService.createTextOutput(JSON.stringify(obj));
  out.setMimeType(ContentService.MimeType.JSON);
  out.setStatusCode(status);
  return out;
}

// Méthode GET pour vérification (optionnelle)
function doGet() {
  return output({ 
    status: 'active',
    version: '1.1',
    lastUpdated: '2025-08-15'
  });
}
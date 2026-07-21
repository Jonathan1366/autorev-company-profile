const DEFAULT_SPREADSHEET_ID = "1mr1Ens0FquUOsJcLEG0w8Ekmzp7nlfMElwfE-6deD8I";
const MASTER_SHEET = "Semua Leads";

function configureInfrastructure(config) {
  if (!config || !config.webhookSecret) throw new Error("webhookSecret wajib diisi");
  const properties = PropertiesService.getScriptProperties();
  properties.setProperties({
    SPREADSHEET_ID: clean(config.spreadsheetId || DEFAULT_SPREADSHEET_ID),
    WEBHOOK_SECRET: clean(config.webhookSecret),
  }, false);
  return {
    ok: true,
    spreadsheetConfigured: Boolean(properties.getProperty("SPREADSHEET_ID")),
    webhookSecretConfigured: Boolean(properties.getProperty("WEBHOOK_SECRET")),
  };
}

function doPost(event) {
  try {
    const payload = JSON.parse((event && event.postData && event.postData.contents) || "{}");
    const properties = PropertiesService.getScriptProperties();
    const expectedSecret = properties.getProperty("WEBHOOK_SECRET");

    if (!expectedSecret || payload.webhookSecret !== expectedSecret) {
      return jsonResponse({ ok: false, error: "Unauthorized" });
    }

    validatePayload(payload);
    const sheet = getMasterSheet(properties);
    const rowNumber = appendLead(sheet, payload);
    const whatsapp = sendWhatsAppConfirmation(payload, properties);
    updateDelivery(sheet, rowNumber, whatsapp);

    return jsonResponse({ ok: true, leadId: payload.leadId, whatsapp: whatsapp });
  } catch (error) {
    console.error(error && error.stack ? error.stack : error);
    return jsonResponse({ ok: false, error: String(error && error.message ? error.message : error) });
  }
}

function getMasterSheet(properties) {
  const spreadsheetId = properties.getProperty("SPREADSHEET_ID") || DEFAULT_SPREADSHEET_ID;
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const sheet = spreadsheet.getSheetByName(MASTER_SHEET);
  if (!sheet) throw new Error("Tab Semua Leads tidak ditemukan");
  return sheet;
}

function validatePayload(payload) {
  const required = ["leadId", "businessLine", "name", "phone", "need", "details", "submittedAt", "followUpDue"];
  required.forEach(function (key) {
    if (!payload[key]) throw new Error("Field wajib tidak tersedia: " + key);
  });
}

function appendLead(sheet, payload) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    if (sheet.getRange("A2").getDisplayValue() === "CONTOH") {
      sheet.getRange(2, 1, 1, 25).clearContent();
    }

    const row = [
      safeCell(payload.leadId),
      new Date(payload.submittedAt),
      safeCell(payload.businessLine),
      "Baru",
      new Date(payload.followUpDue),
      "Menunggu Konfigurasi",
      "",
      safeCell(payload.name),
      normalizePhone(payload.phone),
      safeCell(payload.email),
      safeCell(payload.organization),
      safeCell(payload.city),
      safeCell(payload.vehicleCount),
      safeCell(payload.vehicleType),
      safeCell(payload.serviceDate),
      safeCell(payload.specialization),
      safeCell(payload.capacity),
      safeCell(payload.need),
      safeCell(payload.details),
      payload.locale === "en" ? "EN" : "ID",
      safeCell(payload.source || "autorev-website"),
      payload.consent === true ? "Ya" : "Tidak",
      "",
      "",
      new Date(),
    ];
    const rowNumber = firstAvailableLeadRow(sheet);
    sheet.getRange(rowNumber, 1, 1, row.length).setValues([row]);
    return rowNumber;
  } finally {
    lock.releaseLock();
  }
}

function firstAvailableLeadRow(sheet) {
  const maxRows = sheet.getMaxRows();
  const leadIds = sheet.getRange(2, 1, Math.max(maxRows - 1, 1), 1).getDisplayValues();
  const blankIndex = leadIds.findIndex(function (row) { return !row[0]; });
  if (blankIndex >= 0) return blankIndex + 2;
  sheet.insertRowsAfter(maxRows, 100);
  return maxRows + 1;
}

function sendWhatsAppConfirmation(payload, properties) {
  const token = properties.getProperty("WHATSAPP_ACCESS_TOKEN");
  const phoneNumberId = properties.getProperty("WHATSAPP_PHONE_NUMBER_ID");
  const templateId = properties.getProperty("WHATSAPP_TEMPLATE_ID") || "autorev_registration_received_id";
  const templateEn = properties.getProperty("WHATSAPP_TEMPLATE_EN") || "autorev_registration_received_en";
  const graphVersion = properties.getProperty("WHATSAPP_GRAPH_VERSION") || "v25.0";
  const phone = normalizePhone(payload.phone);

  if (!phone) return { status: "Tidak Ada Nomor" };
  if (!token || !phoneNumberId) return { status: "Menunggu Konfigurasi" };

  const requestBody = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: phone,
    type: "template",
    template: {
      name: payload.locale === "en" ? templateEn : templateId,
      language: { code: payload.locale === "en" ? "en_US" : "id" },
      components: [{
        type: "body",
        parameters: [
          { type: "text", text: clean(payload.name) },
          { type: "text", text: programLabel(payload.type, payload.locale) },
          { type: "text", text: clean(payload.leadId) },
        ],
      }],
    },
  };

  try {
    const response = UrlFetchApp.fetch("https://graph.facebook.com/" + graphVersion + "/" + phoneNumberId + "/messages", {
      method: "post",
      contentType: "application/json",
      headers: { Authorization: "Bearer " + token },
      payload: JSON.stringify(requestBody),
      muteHttpExceptions: true,
    });
    const code = response.getResponseCode();
    const data = JSON.parse(response.getContentText() || "{}");
    if (code < 200 || code >= 300) {
      console.error("WhatsApp error " + code + ": " + response.getContentText());
      return { status: "Gagal" };
    }
    return { status: "Terkirim", messageId: data.messages && data.messages[0] ? data.messages[0].id : "" };
  } catch (error) {
    console.error(error && error.stack ? error.stack : error);
    return { status: "Gagal" };
  }
}

function updateDelivery(sheet, rowNumber, whatsapp) {
  sheet.getRange(rowNumber, 6).setValue(whatsapp.status || "Gagal");
  sheet.getRange(rowNumber, 7).setValue(whatsapp.messageId || "");
  sheet.getRange(rowNumber, 25).setValue(new Date());
}

function normalizePhone(value) {
  let phone = String(value || "").replace(/[^0-9]/g, "");
  if (phone.indexOf("0") === 0) phone = "62" + phone.slice(1);
  else if (phone.indexOf("8") === 0) phone = "62" + phone;
  return phone;
}

function programLabel(type, locale) {
  const labels = {
    rental: ["Rental EV", "EV Rental"],
    driver: ["Founding Driver · Sewa Jadi Milik", "Founding Driver · Rent to Own"],
    business: ["AutoRev Business", "AutoRev Business"],
    system: ["Demo RevAuto", "RevAuto Demo"],
    partner: ["Mitra AutoRev", "AutoRev Partner"],
    strategic: ["Kemitraan Strategis", "Strategic Partnership"],
  };
  const pair = labels[type] || ["AutoRev", "AutoRev"];
  return locale === "en" ? pair[1] : pair[0];
}

function clean(value) {
  return value == null ? "" : String(value).trim();
}

function safeCell(value) {
  const text = clean(value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function jsonResponse(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}

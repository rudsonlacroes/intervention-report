// ==========================================
// TRANSLATIONS (EN / NL)
// ==========================================

const translations = {
    en: {
        title: "Service Visit Report",
        subTitle: "Digital report for on-site service interventions",
        tabCustomer: "1. Customer Report (Client View)",
        tabAdmin: "2. Internal & Admin Data (Back-office)",
        secGeneral: "General Information",
        lblCustSite: "Customer & Site Location",
        lblSO: "Service Order Number",
        lblInstGroup: "Installation Group",
        lblSFRef: "Salesforce Case / Ref",
        lblContact: "Contact Name Customer",
        lblPhone: "Phone Nr. Customer",
        lblDate: "Intervention Date",
        lblCallTime: "Inbound Call Time",
        lblAgreement: "Agreement Type",
        secIntervention: "Type of Intervention",
        secMalfunction: "Description of Malfunction",
        secScope: "Original Scope of Work",
        lblPlannedActivities: "Planned activities",
        lblPlannedDuration: "Planned duration",
        lblPlannedResources: "Planned resources",
        lblPlannedMaterials: "Planned materials",
        lblScopeValidation: "Can the original scope be executed as planned?",
        optYes: "Yes",
        optNo: "No",
        optPartly: "Partly",
        lblScopeReasons: "Reasons",
        reasonCustomerRequest: "Customer requested additional work",
        reasonAdditionalDefect: "Additional defect found",
        reasonPlanningSO: "Planning requested to work on additional Service Order nr",
        reasonWaitingTime: "Waiting time",
        reasonMaterialUnavailable: "Material unavailable",
        reasonSafetyIssue: "Safety issue",
        reasonOther: "Other, description",
        secWork: "Work Performed",
        secParts: "Used Spare Parts",
        secPhotos: "Photos",
        secCompletion: "Visit Completion & Follow-up",
        lblActivitiesCompleted: "Were all planned activities completed?",
        lblRemainingWork: "Describe remaining work",
        lblAdditionalWorkPerformed: "Was additional work performed?",
        lblAdditionalWorkDescYes: "What extra work did you do? Please describe:",
        lblAdditionalWorkDescNo: "What extra work needs to be done? Please describe:",
        lblFollowUpRequired: "Follow-up required",
        lblActionOwner: "Action Owner",
        ownerPlanning: "Planning",
        ownerJobPrep: "Job Prep",
        ownerCustomerSupport: "Customer Support",
        ownerSales: "Sales / Account Manager",
        ownerTechSupport: "Technical Support",
        ownerOther: "Other",
        lblPriority: "Priority",
        prioHigh: "High",
        prioNormal: "Normal",
        prioLow: "Low",
        lblCustomerDecision: "Customer decision",
        decApproved: "Approved",
        decQuotationFirst: "Quotation first (only applicable by follow-up)",
        decDeclined: "Declined",
        lblPOInstruction: "PO instruction",
        poExisting: "Existing PO",
        poRevised: "Revised PO",
        poAdditional: "Additional PO",
        poTBD: "To be determined",
        secSignatures: "Signatures & Approval",
        secEngineers: "Engineers & Hours Breakdown",
        secThirdParty: "Third Party Support & Subcontractors",
        secCosts: "Internal Costs & Expenses",
        secCustomerDoc: "Customer Document — What may the customer see?",
        lblCustomerDocHint: "Check which sections are included in the printout. This choice only affects the customer document — Power Automate/SharePoint always receives the full data, including all attachments.",
        chkPhotos: "Photos",
        chkEngineers: "Engineers & Hours",
        chkThirdParty: "Third Party Support",
        chkCosts: "Internal Costs",
        btnPrintCustomerPdf: "Print / Save Customer PDF"
    },
    nl: {
        title: "Service Bezoek Rapport",
        subTitle: "Digitaal rapport voor service-interventies op locatie",
        tabCustomer: "1. Klantrapport (Klantweergave)",
        tabAdmin: "2. Interne & Admin Data (Back-office)",
        secGeneral: "Algemene Informatie",
        lblCustSite: "Klant & Locatie",
        lblSO: "Service Order Nummer",
        lblInstGroup: "Installatiegroep",
        lblSFRef: "Salesforce Case / Ref",
        lblContact: "Naam Contactpersoon Klant",
        lblPhone: "Telefoonnr. Klant",
        lblDate: "Interventiedatum",
        lblCallTime: "Tijd Inkomend Gesprek",
        lblAgreement: "Contractvorm",
        secIntervention: "Soort Interventie",
        secMalfunction: "Beschrijving van de Storing",
        secScope: "Oorspronkelijke Scope van het Werk",
        lblPlannedActivities: "Geplande activiteiten",
        lblPlannedDuration: "Geplande duur",
        lblPlannedResources: "Geplande resources",
        lblPlannedMaterials: "Geplande materialen",
        lblScopeValidation: "Kan de oorspronkelijke scope worden uitgevoerd zoals gepland?",
        optYes: "Ja",
        optNo: "Nee",
        optPartly: "Gedeeltelijk",
        lblScopeReasons: "Redenen",
        reasonCustomerRequest: "Klant heeft extra werk aangevraagd",
        reasonAdditionalDefect: "Extra defect gevonden",
        reasonPlanningSO: "Planning verzocht om aan extra Service Order nr te werken",
        reasonWaitingTime: "Wachttijd",
        reasonMaterialUnavailable: "Materiaal niet beschikbaar",
        reasonSafetyIssue: "Veiligheidskwestie",
        reasonOther: "Overig, beschrijving",
        secWork: "Uitgevoerd Werk",
        secParts: "Gebruikte Reserveonderdelen",
        secPhotos: "Foto's",
        secCompletion: "Afronding Bezoek & Vervolgactie",
        lblActivitiesCompleted: "Zijn alle geplande activiteiten voltooid?",
        lblRemainingWork: "Beschrijf resterend werk",
        lblAdditionalWorkPerformed: "Is er extra werk uitgevoerd?",
        lblAdditionalWorkDescYes: "Welk extra werk heeft u gedaan? Beschrijf:",
        lblAdditionalWorkDescNo: "Welk extra werk moet nog gebeuren? Beschrijf:",
        lblFollowUpRequired: "Vervolgactie vereist",
        lblActionOwner: "Actie Eigenaar",
        ownerPlanning: "Planning",
        ownerJobPrep: "Werkvoorbereiding",
        ownerCustomerSupport: "Customer Support",
        ownerSales: "Sales / Account Manager",
        ownerTechSupport: "Technical Support",
        ownerOther: "Overig",
        lblPriority: "Prioriteit",
        prioHigh: "Hoog",
        prioNormal: "Normaal",
        prioLow: "Laag",
        lblCustomerDecision: "Klantbeslissing",
        decApproved: "Goedgekeurd",
        decQuotationFirst: "Eerst offerte (alleen van toepassing bij follow-up)",
        decDeclined: "Afgewezen",
        lblPOInstruction: "PO instructie",
        poExisting: "Bestaande PO",
        poRevised: "Herziene PO",
        poAdditional: "Aanvullende PO",
        poTBD: "Nog te bepalen",
        secSignatures: "Handtekeningen & Goedkeuring",
        secEngineers: "Engineers & Urenoverzicht",
        secThirdParty: "Externe Ondersteuning & Onderaannemers",
        secCosts: "Interne Kosten & Uitgaven",
        secCustomerDoc: "Klantdocument — Wat mag de klant zien?",
        lblCustomerDocHint: "Vink aan welke onderdelen worden meegeprint. Deze keuze bepaalt alleen het klantdocument — naar Power Automate/SharePoint gaat altijd de volledige data, inclusief alle bijlages.",
        chkPhotos: "Foto's",
        chkEngineers: "Engineers & Uren",
        chkThirdParty: "Externe Ondersteuning",
        chkCosts: "Interne Kosten",
        btnPrintCustomerPdf: "Print / Sla Klantrapport op als PDF"
    },
    de: {
        title: "Servicebesuchsbericht",
        subTitle: "Digitaler Bericht für Serviceeinsätze vor Ort",
        tabCustomer: "1. Kundenbericht (Kundenansicht)",
        tabAdmin: "2. Interne & Admin-Daten (Back-Office)",
        secGeneral: "Allgemeine Informationen",
        lblCustSite: "Kunde & Standort",
        lblSO: "Auftragsnummer",
        lblInstGroup: "Installationsgruppe",
        lblSFRef: "Salesforce-Fall / Ref.",
        lblContact: "Ansprechpartner Kunde",
        lblPhone: "Telefonnr. Kunde",
        lblDate: "Interventionsdatum",
        lblCallTime: "Zeit des Eingangsanrufs",
        lblAgreement: "Vertragsart",
        secIntervention: "Art der Intervention",
        secMalfunction: "Beschreibung der Störung",
        secScope: "Ursprünglicher Arbeitsumfang",
        lblPlannedActivities: "Geplante Tätigkeiten",
        lblPlannedDuration: "Geplante Dauer",
        lblPlannedResources: "Geplante Ressourcen",
        lblPlannedMaterials: "Geplante Materialien",
        lblScopeValidation: "Kann der ursprüngliche Umfang wie geplant ausgeführt werden?",
        optYes: "Ja",
        optNo: "Nein",
        optPartly: "Teilweise",
        lblScopeReasons: "Gründe",
        reasonCustomerRequest: "Kunde hat zusätzliche Arbeiten angefordert",
        reasonAdditionalDefect: "Zusätzlicher Defekt gefunden",
        reasonPlanningSO: "Planung hat um Arbeit an zusätzlicher Auftragsnr. gebeten",
        reasonWaitingTime: "Wartezeit",
        reasonMaterialUnavailable: "Material nicht verfügbar",
        reasonSafetyIssue: "Sicherheitsproblem",
        reasonOther: "Andere, Beschreibung",
        secWork: "Durchgeführte Arbeiten",
        secParts: "Verwendete Ersatzteile",
        secPhotos: "Fotos",
        secCompletion: "Abschluss des Besuchs & Folgemassnahme",
        lblActivitiesCompleted: "Wurden alle geplanten Tätigkeiten abgeschlossen?",
        lblRemainingWork: "Verbleibende Arbeit beschreiben",
        lblAdditionalWorkPerformed: "Wurden zusätzliche Arbeiten durchgeführt?",
        lblAdditionalWorkDescYes: "Welche zusätzliche Arbeit haben Sie durchgeführt? Bitte beschreiben:",
        lblAdditionalWorkDescNo: "Welche zusätzliche Arbeit muss noch erledigt werden? Bitte beschreiben:",
        lblFollowUpRequired: "Folgemassnahme erforderlich",
        lblActionOwner: "Verantwortlich",
        ownerPlanning: "Planung",
        ownerJobPrep: "Arbeitsvorbereitung",
        ownerCustomerSupport: "Kundensupport",
        ownerSales: "Vertrieb / Account Manager",
        ownerTechSupport: "Technischer Support",
        ownerOther: "Andere",
        lblPriority: "Priorität",
        prioHigh: "Hoch",
        prioNormal: "Normal",
        prioLow: "Niedrig",
        lblCustomerDecision: "Kundenentscheidung",
        decApproved: "Genehmigt",
        decQuotationFirst: "Erst Angebot (nur bei Folgemassnahme anwendbar)",
        decDeclined: "Abgelehnt",
        lblPOInstruction: "PO-Anweisung",
        poExisting: "Bestehende PO",
        poRevised: "Überarbeitete PO",
        poAdditional: "Zusätzliche PO",
        poTBD: "Noch zu bestimmen",
        secSignatures: "Unterschriften & Genehmigung",
        secEngineers: "Techniker & Stundenübersicht",
        secThirdParty: "Fremdunterstützung & Subunternehmer",
        secCosts: "Interne Kosten & Ausgaben",
        secCustomerDoc: "Kundendokument — Was darf der Kunde sehen?",
        lblCustomerDocHint: "Wählen Sie aus, welche Abschnitte gedruckt werden. Diese Auswahl betrifft nur das Kundendokument — an Power Automate/SharePoint werden immer alle Daten inklusive aller Anhänge übermittelt.",
        chkPhotos: "Fotos",
        chkEngineers: "Techniker & Stunden",
        chkThirdParty: "Fremdunterstützung",
        chkCosts: "Interne Kosten",
        btnPrintCustomerPdf: "Kundendokument drucken / als PDF speichern"
    },
    it: {
        title: "Rapporto di Visita di Servizio",
        subTitle: "Rapporto digitale per interventi di assistenza in loco",
        tabCustomer: "1. Rapporto Cliente (Vista Cliente)",
        tabAdmin: "2. Dati Interni & Admin (Back-office)",
        secGeneral: "Informazioni Generali",
        lblCustSite: "Cliente e Sede",
        lblSO: "Numero Ordine di Servizio",
        lblInstGroup: "Gruppo di Installazione",
        lblSFRef: "Caso Salesforce / Rif.",
        lblContact: "Nome Contatto Cliente",
        lblPhone: "Tel. Cliente",
        lblDate: "Data Intervento",
        lblCallTime: "Ora Chiamata in Entrata",
        lblAgreement: "Tipo di Contratto",
        secIntervention: "Tipo di Intervento",
        secMalfunction: "Descrizione del Guasto",
        secScope: "Ambito Originale del Lavoro",
        lblPlannedActivities: "Attività pianificate",
        lblPlannedDuration: "Durata pianificata",
        lblPlannedResources: "Risorse pianificate",
        lblPlannedMaterials: "Materiali pianificati",
        lblScopeValidation: "L'ambito originale può essere eseguito come pianificato?",
        optYes: "Sì",
        optNo: "No",
        optPartly: "Parzialmente",
        lblScopeReasons: "Motivi",
        reasonCustomerRequest: "Il cliente ha richiesto lavori aggiuntivi",
        reasonAdditionalDefect: "Trovato un ulteriore difetto",
        reasonPlanningSO: "La pianificazione ha richiesto di lavorare su un ulteriore Ordine di Servizio nr.",
        reasonWaitingTime: "Tempo di attesa",
        reasonMaterialUnavailable: "Materiale non disponibile",
        reasonSafetyIssue: "Problema di sicurezza",
        reasonOther: "Altro, descrizione",
        secWork: "Lavoro Svolto",
        secParts: "Parti di Ricambio Utilizzate",
        secPhotos: "Foto",
        secCompletion: "Completamento Visita & Azione Successiva",
        lblActivitiesCompleted: "Tutte le attività pianificate sono state completate?",
        lblRemainingWork: "Descrivere il lavoro rimanente",
        lblAdditionalWorkPerformed: "È stato svolto lavoro aggiuntivo?",
        lblAdditionalWorkDescYes: "Che lavoro extra hai svolto? Si prega di descrivere:",
        lblAdditionalWorkDescNo: "Che lavoro extra deve ancora essere svolto? Si prega di descrivere:",
        lblFollowUpRequired: "Azione successiva richiesta",
        lblActionOwner: "Responsabile Azione",
        ownerPlanning: "Pianificazione",
        ownerJobPrep: "Preparazione Lavoro",
        ownerCustomerSupport: "Assistenza Clienti",
        ownerSales: "Vendite / Account Manager",
        ownerTechSupport: "Supporto Tecnico",
        ownerOther: "Altro",
        lblPriority: "Priorità",
        prioHigh: "Alta",
        prioNormal: "Normale",
        prioLow: "Bassa",
        lblCustomerDecision: "Decisione del Cliente",
        decApproved: "Approvato",
        decQuotationFirst: "Prima preventivo (applicabile solo per azioni successive)",
        decDeclined: "Rifiutato",
        lblPOInstruction: "Istruzione PO",
        poExisting: "PO Esistente",
        poRevised: "PO Rivisto",
        poAdditional: "PO Aggiuntivo",
        poTBD: "Da determinare",
        secSignatures: "Firme & Approvazione",
        secEngineers: "Tecnici & Riepilogo Ore",
        secThirdParty: "Supporto di Terze Parti & Subappaltatori",
        secCosts: "Costi Interni & Spese",
        secCustomerDoc: "Documento Cliente — Cosa può vedere il cliente?",
        lblCustomerDocHint: "Seleziona quali sezioni includere nella stampa. Questa scelta riguarda solo il documento cliente — Power Automate/SharePoint riceve sempre tutti i dati, inclusi tutti gli allegati.",
        chkPhotos: "Foto",
        chkEngineers: "Tecnici & Ore",
        chkThirdParty: "Supporto di Terze Parti",
        chkCosts: "Costi Interni",
        btnPrintCustomerPdf: "Stampa / Salva PDF Cliente"
    },
    pl: {
        title: "Raport z Wizyty Serwisowej",
        subTitle: "Cyfrowy raport z interwencji serwisowych na miejscu",
        tabCustomer: "1. Raport Klienta (Widok Klienta)",
        tabAdmin: "2. Dane Wewnętrzne i Administracyjne (Back-office)",
        secGeneral: "Informacje Ogólne",
        lblCustSite: "Klient i Lokalizacja",
        lblSO: "Numer Zlecenia Serwisowego",
        lblInstGroup: "Grupa Instalacyjna",
        lblSFRef: "Sprawa Salesforce / Ref.",
        lblContact: "Osoba Kontaktowa Klienta",
        lblPhone: "Nr Tel. Klienta",
        lblDate: "Data Interwencji",
        lblCallTime: "Godzina Zgłoszenia",
        lblAgreement: "Rodzaj Umowy",
        secIntervention: "Rodzaj Interwencji",
        secMalfunction: "Opis Awarii",
        secScope: "Pierwotny Zakres Prac",
        lblPlannedActivities: "Planowane czynności",
        lblPlannedDuration: "Planowany czas trwania",
        lblPlannedResources: "Planowane zasoby",
        lblPlannedMaterials: "Planowane materiały",
        lblScopeValidation: "Czy pierwotny zakres można wykonać zgodnie z planem?",
        optYes: "Tak",
        optNo: "Nie",
        optPartly: "Częściowo",
        lblScopeReasons: "Powody",
        reasonCustomerRequest: "Klient poprosił o dodatkową pracę",
        reasonAdditionalDefect: "Znaleziono dodatkową usterkę",
        reasonPlanningSO: "Planowanie poprosiło o pracę nad dodatkowym zleceniem nr",
        reasonWaitingTime: "Czas oczekiwania",
        reasonMaterialUnavailable: "Materiał niedostępny",
        reasonSafetyIssue: "Kwestia bezpieczeństwa",
        reasonOther: "Inne, opis",
        secWork: "Wykonana Praca",
        secParts: "Użyte Części Zamienne",
        secPhotos: "Zdjęcia",
        secCompletion: "Zakończenie Wizyty i Dalsze Działania",
        lblActivitiesCompleted: "Czy wszystkie planowane czynności zostały ukończone?",
        lblRemainingWork: "Opisz pozostałą pracę",
        lblAdditionalWorkPerformed: "Czy wykonano dodatkową pracę?",
        lblAdditionalWorkDescYes: "Jaką dodatkową pracę wykonałeś? Proszę opisać:",
        lblAdditionalWorkDescNo: "Jaka dodatkowa praca musi zostać wykonana? Proszę opisać:",
        lblFollowUpRequired: "Wymagane dalsze działania",
        lblActionOwner: "Właściciel Działania",
        ownerPlanning: "Planowanie",
        ownerJobPrep: "Przygotowanie Pracy",
        ownerCustomerSupport: "Obsługa Klienta",
        ownerSales: "Sprzedaż / Account Manager",
        ownerTechSupport: "Wsparcie Techniczne",
        ownerOther: "Inne",
        lblPriority: "Priorytet",
        prioHigh: "Wysoki",
        prioNormal: "Normalny",
        prioLow: "Niski",
        lblCustomerDecision: "Decyzja Klienta",
        decApproved: "Zatwierdzone",
        decQuotationFirst: "Najpierw wycena (dotyczy tylko działań następczych)",
        decDeclined: "Odrzucone",
        lblPOInstruction: "Instrukcja PO",
        poExisting: "Istniejące PO",
        poRevised: "Zmienione PO",
        poAdditional: "Dodatkowe PO",
        poTBD: "Do ustalenia",
        secSignatures: "Podpisy i Zatwierdzenie",
        secEngineers: "Inżynierowie i Podsumowanie Godzin",
        secThirdParty: "Wsparcie Zewnętrzne i Podwykonawcy",
        secCosts: "Koszty Wewnętrzne i Wydatki",
        secCustomerDoc: "Dokument Klienta — Co może zobaczyć klient?",
        lblCustomerDocHint: "Zaznacz, które sekcje mają zostać wydrukowane. Ten wybór dotyczy tylko dokumentu klienta — do Power Automate/SharePoint zawsze trafiają wszystkie dane, łącznie z załącznikami.",
        chkPhotos: "Zdjęcia",
        chkEngineers: "Inżynierowie i Godziny",
        chkThirdParty: "Wsparcie Zewnętrzne",
        chkCosts: "Koszty Wewnętrzne",
        btnPrintCustomerPdf: "Drukuj / Zapisz PDF dla Klienta"
    }
};

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW fail:', err));
    });
}

window.addEventListener('online', () => {
    updateOnlineStatus();
    renderPendingQueueBadge();
    loadIgLookupData();
});
window.addEventListener('offline', updateOnlineStatus);

function updateOnlineStatus() {
    const badge = document.getElementById('offline-badge');
    if (badge) badge.classList.toggle('hidden', navigator.onLine);
}

function changeLanguage(lang) {
    if (!translations || !translations[lang]) return;
    localStorage.setItem('fortna_lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(elem => {
        const key = elem.getAttribute('data-i18n');
        if (translations[lang][key]) {
            if (elem.tagName === 'INPUT' || elem.tagName === 'TEXTAREA') elem.placeholder = translations[lang][key];
            else elem.textContent = translations[lang][key];
        }
    });
    checkAdditionalWorkVisibility();
    renderPendingQueueBadge();
}

let uploadedFiles = [];
// JOUW POWER AUTOMATE URL:
// LET OP: deze URL (incl. signature) staat zichtbaar in de client-side code.
// Voor productiegebruik met echte klantdata: beveilig de trigger met Azure AD-auth
// of laat de request via een tussenlaag (bv. Azure Function) lopen.
const POWER_AUTOMATE_URL = "https://defaultaf45b6ebfef340a8a4c7f197c92a86.33.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/04/workflows/2c700520555049929795fc4c1df7ebfd/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=qcnJS_lSp0z8v7g6oj9J9fpBElgbHcjzrUNyBFAL0z4";

// Read-only lookup-flow: haalt de Installation Group-lijst op uit SharePoint.
// Zelfde beveiligingskanttekening als hierboven geldt voor deze URL.
const IG_LOOKUP_URL = "https://defaultaf45b6ebfef340a8a4c7f197c92a86.33.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/23/workflows/b57329532d894f2ba2da48b76e317b39/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=TvcdrKza3xfiHK7dB5zZo0bBB5NipA1LvXV1PNkkf48";

// ==========================================
// INSTALLATION GROUP LOOKUP (SharePoint via Power Automate)
// ==========================================
let igLookupData = []; // [{ ig: 'IG0001002', child: 'CGI, Rotterdam (obsolete/retired)' }, ...]
const IG_CACHE_KEY = 'fortna_ig_lookup_cache';

function setIgLookupStatus(text) {
    const el = document.getElementById('ig-lookup-status');
    if (el) el.textContent = text;
}

// Power Automate/SharePoint kan de lijst in verschillende vormen teruggeven
// (rechtstreeks een array, of genest onder value/body/items, met kolomnamen
// die door SharePoint soms worden herschreven). Deze functie probeert de
// meest voorkomende vormen automatisch te herkennen.
function normalizeIgLookupResponse(raw) {
    let items = raw;
    if (!Array.isArray(items)) {
        items = raw?.value || raw?.body || raw?.items || raw?.Items || [];
    }
    if (!Array.isArray(items)) return [];

    return items.map(item => {
        const ig = item['Installation Group'] ?? item['Installation_x0020_Group'] ?? item['InstallationGroup'] ?? item['Title'] ?? item['IG'] ?? '';
        const child = item['Installation Group (child)'] ?? item['Installation_x0020_Group_x0020__x0028_child_x0029_'] ?? item['InstallationGroupChild'] ?? item['Child'] ?? item['field_1'] ?? '';
        return { ig: String(ig).trim(), child: String(child).trim() };
    }).filter(x => x.ig || x.child);
}

async function loadIgLookupData() {
    // 1. Toon meteen de laatst bekende (gecachte) lijst, zodat offline werken direct mogelijk is.
    try {
        const cached = localStorage.getItem(IG_CACHE_KEY);
        if (cached) {
            const parsed = JSON.parse(cached);
            igLookupData = parsed.data || [];
            if (igLookupData.length > 0) {
                setIgLookupStatus(`📋 ${igLookupData.length} klanten geladen (${parsed.savedAt})`);
            }
        }
    } catch (e) { /* corrupte cache negeren */ }

    // 2. Probeer op de achtergrond een verse lijst op te halen.
    if (!navigator.onLine) {
        if (igLookupData.length === 0) setIgLookupStatus('⚠️ Offline — geen klantenlijst beschikbaar');
        return;
    }

    try {
        const response = await fetch(IG_LOOKUP_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });
        if (!response.ok) throw new Error(`Status ${response.status}`);
        const raw = await response.json();

        // Handig voor het eerste testmoment: log de ruwe respons zodat je in de
        // browser-devtools (F12 > Console) precies kunt zien welke veldnamen
        // SharePoint teruggeeft, mocht de automatische herkenning niet kloppen.
        console.log('IG lookup — ruwe respons van Power Automate:', raw);

        const parsed = normalizeIgLookupResponse(raw);
        if (parsed.length > 0) {
            igLookupData = parsed;
            const savedAt = new Date().toLocaleString();
            localStorage.setItem(IG_CACHE_KEY, JSON.stringify({ data: parsed, savedAt }));
            setIgLookupStatus(`📋 ${parsed.length} klanten geladen (bijgewerkt)`);
        } else {
            console.warn('IG lookup: kon geen klantregels herkennen in de respons. Controleer de veldnamen — zie console.log hierboven.');
            if (igLookupData.length === 0) setIgLookupStatus('⚠️ Klantenlijst kon niet worden gelezen');
        }
    } catch (e) {
        console.error('IG lookup ophalen mislukt:', e);
        if (igLookupData.length === 0) setIgLookupStatus('⚠️ Klantenlijst kon niet worden opgehaald');
    }
}

// Kernfunctie: koppelt een tekstveld aan een dropdown-lijst via directe
// DOM-referenties (nodig voor dynamisch aangemaakte rijen zonder vaste ID's).
function attachTypeaheadEl(input, list, getMatches, onSelect) {
    if (!input || !list) return;

    function renderSuggestions() {
        const query = input.value.trim().toLowerCase();
        list.innerHTML = '';
        if (query.length < 1) { list.classList.add('hidden'); return; }

        const matches = getMatches(query).slice(0, 8);
        if (matches.length === 0) { list.classList.add('hidden'); return; }

        matches.forEach(match => {
            const li = document.createElement('li');
            li.className = 'px-3 py-2 hover:bg-indigo-50 cursor-pointer border-b border-gray-100 last:border-b-0';
            li.textContent = match.label;
            li.addEventListener('mousedown', (e) => {
                e.preventDefault();
                onSelect(match);
                list.classList.add('hidden');
            });
            list.appendChild(li);
        });
        list.classList.remove('hidden');
    }

    input.addEventListener('input', renderSuggestions);
    input.addEventListener('focus', renderSuggestions);
    input.addEventListener('blur', () => setTimeout(() => list.classList.add('hidden'), 100));
}

// Dunne wrapper op ID-basis, voor de statische velden (Customer Site / Installation Group).
function attachTypeahead(inputId, listId, getMatches, onSelect) {
    attachTypeaheadEl(document.getElementById(inputId), document.getElementById(listId), getMatches, onSelect);
}

// ==========================================
// LOKAAL ONTHOUDEN: ENGINEERS & THIRD PARTIES
// ==========================================
// Geen SharePoint-lijst nodig — de app onthoudt per apparaat wie/wat er
// eerder is ingevuld, zodat de monteur niet steeds opnieuw hoeft te typen.
const RECENT_ENGINEERS_KEY = 'fortna_recent_engineers';
const RECENT_THIRDPARTIES_KEY = 'fortna_recent_thirdparties';
const RECENT_MAX = 12;

function getRecentEngineers() {
    try { return JSON.parse(localStorage.getItem(RECENT_ENGINEERS_KEY)) || []; }
    catch (e) { return []; }
}

function saveRecentEngineer(name, type) {
    if (!name || !name.trim()) return;
    let list = getRecentEngineers();
    list = list.filter(e => e.name.toLowerCase() !== name.trim().toLowerCase());
    list.unshift({ name: name.trim(), type: type || 'Service Engineer' });
    list = list.slice(0, RECENT_MAX);
    localStorage.setItem(RECENT_ENGINEERS_KEY, JSON.stringify(list));
}

function getRecentThirdParties() {
    try { return JSON.parse(localStorage.getItem(RECENT_THIRDPARTIES_KEY)) || []; }
    catch (e) { return []; }
}

function saveRecentThirdParty(name, desc) {
    if (!name || !name.trim()) return;
    let list = getRecentThirdParties();
    list = list.filter(tp => tp.name.toLowerCase() !== name.trim().toLowerCase());
    list.unshift({ name: name.trim(), desc: desc || '' });
    list = list.slice(0, RECENT_MAX);
    localStorage.setItem(RECENT_THIRDPARTIES_KEY, JSON.stringify(list));
}

function setupIgTypeaheads() {
    // Typen in Customer & Site Location -> suggesties op klantnaam, vult IG automatisch in.
    attachTypeahead(
        'customer-site',
        'customer-site-suggestions',
        (query) => igLookupData
            .filter(x => x.child.toLowerCase().includes(query))
            .map(x => ({ label: x.child ? `${x.child} — ${x.ig}` : x.ig, child: x.child, ig: x.ig })),
        (match) => {
            document.getElementById('customer-site').value = match.child;
            const igField = document.getElementById('installation-group');
            if (igField && match.ig) igField.value = match.ig;
        }
    );

    // Typen in Installation Group -> suggesties op IG-nummer, vult klantnaam automatisch in.
    attachTypeahead(
        'installation-group',
        'installation-group-suggestions',
        (query) => igLookupData
            .filter(x => x.ig.toLowerCase().includes(query))
            .map(x => ({ label: x.child ? `${x.ig} — ${x.child}` : x.ig, child: x.child, ig: x.ig })),
        (match) => {
            document.getElementById('installation-group').value = match.ig;
            const siteField = document.getElementById('customer-site');
            if (siteField && match.child) siteField.value = match.child;
        }
    );
}

// ==========================================
// DATA PAYLOAD GENERATOR
// ==========================================
function getFormDataObject() {
    const data = { fields: {}, parts: [], engineers: [], thirdParties: [], costs: [], photos: [] };

    document.querySelectorAll('input, textarea, select').forEach(elem => {
        if (elem.id) {
            if (elem.type === 'checkbox' || elem.type === 'radio') data.fields[elem.id] = elem.checked;
            else data.fields[elem.id] = elem.value;
        }
    });

    document.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked').forEach(elem => {
        if (elem.name) data.fields[`name_${elem.name}_${elem.value}`] = true;
    });

    document.querySelectorAll('#parts-container > div').forEach(row => {
        const qty = row.querySelector('.part-qty')?.value || '';
        const artNo = row.querySelector('.part-artno')?.value || '';
        const desc = row.querySelector('.part-desc')?.value || '';
        if (qty || artNo || desc) data.parts.push({ qty, artNo, desc });
    });

    document.querySelectorAll('#engineers-container > div').forEach(row => {
        const date = row.querySelector('.eng-date')?.value || '';
        const name = row.querySelector('.eng-name')?.value || '';
        const type = row.querySelector('.eng-type')?.value || '';
        const cat = row.querySelector('.eng-category')?.value || 'Work Hours';
        const start = row.querySelector('.eng-start')?.value || '';
        const end = row.querySelector('.eng-end')?.value || '';
        const hours = row.querySelector('.eng-hours-val')?.textContent || '0.00 hrs';
        if (name || start || end || date) data.engineers.push({ date, name, type, cat, start, end, hours });
    });

    document.querySelectorAll('#third-party-container > div').forEach(row => {
        const name = row.querySelector('.tp-name')?.value || '';
        const desc = row.querySelector('.tp-desc')?.value || '';
        const cost = row.querySelector('.tp-cost')?.value || '';
        const receiptImg = row.querySelector('.tp-receipt-preview')?.src || '';
        if (name || desc || cost) data.thirdParties.push({ name, desc, cost, receiptImg });
    });

    document.querySelectorAll('#costs-container > div').forEach(row => {
        const type = row.querySelector('.cost-type')?.value || '';
        const amount = row.querySelector('.cost-amount')?.value || '';
        const receiptImg = row.querySelector('.cost-receipt-preview')?.src || '';
        if (type || amount) data.costs.push({ type, amount, receiptImg });
    });

    data.photos = uploadedFiles.filter(f => f.category === 'photo').map(f => f.data);
    data['_savedAt'] = new Date().toLocaleString();
    return data;
}

function buildSubmitPayload() {
    const rawCustomerSite = document.getElementById('customer-site')?.value?.trim() || 'Unknown_Site';
    const cleanCustomerSite = rawCustomerSite.replace(/[^a-zA-Z0-9]/g, '_');
    const agreementRadio = document.querySelector('input[name="agreement-type"]:checked');
    const soPrefix = agreementRadio ? agreementRadio.value : 'GLA';
    const rawSoNumber = document.getElementById('service-order')?.value?.trim();
    const formattedSo = rawSoNumber ? `${soPrefix}-${rawSoNumber}` : `${soPrefix}-PENDING`;
    const fullServiceOrder = `${cleanCustomerSite}_${formattedSo}`;

    const custCanvas = document.getElementById('customer-signature-canvas');
    const engCanvas = document.getElementById('engineer-signature-canvas');

    const dataObj = getFormDataObject();

    return {
        serviceOrder: fullServiceOrder,
        customerSite: rawCustomerSite,
        contactName: document.getElementById('contact-name')?.value || 'N/A',
        contactPhone: document.getElementById('contact-phone')?.value || 'N/A',
        customerEmail: document.getElementById('customer-email')?.value || '',
        interventionDate: document.getElementById('date')?.value || '',
        callTime: document.getElementById('call-time')?.value || '',
        installationGroup: document.getElementById('installation-group')?.value || '',
        salesforceRef: document.getElementById('salesforce-ref')?.value || '',
        agreementType: agreementRadio ? agreementRadio.value : '',

        malfunctionItemNo: document.getElementById('malfunction-item-no')?.value || '',
        malfunctionMsgNo: document.getElementById('malfunction-msg-no')?.value || '',
        malfunctionDesc: document.getElementById('malfunction-desc')?.value || '',

        // Original Scope of Work
        plannedActivities: document.getElementById('planned-activities')?.value || '',
        plannedDuration: document.getElementById('planned-duration')?.value || '',
        plannedResources: document.getElementById('planned-resources')?.value || '',
        plannedMaterials: document.getElementById('planned-materials')?.value || '',
        scopeAsPlanned: document.querySelector('input[name="scope-as-planned"]:checked')?.value || '',
        scopeReasons: Array.from(document.querySelectorAll('input[name="scope-reason"]:checked')).map(cb => cb.value),
        scopeReasonSoNumber: document.getElementById('scope-reason-so-number')?.value || '',
        scopeReasonOtherDesc: document.getElementById('scope-reason-other-desc')?.value || '',

        workPerformed: document.getElementById('work-performed-desc')?.value || 'N/A',

        // Visit Completion & Follow-up
        activitiesCompleted: document.querySelector('input[name="activities-completed"]:checked')?.value || '',
        remainingWorkDesc: document.getElementById('remaining-work-desc')?.value || '',
        additionalWorkPerformed: document.querySelector('input[name="additional-work"]:checked')?.value || '',
        additionalWorkDesc: document.getElementById('additional-work-desc')?.value || '',
        followUpOwner: document.querySelector('input[name="followup-owner"]:checked')?.value || '',
        followUpPriority: document.querySelector('input[name="followup-priority"]:checked')?.value || '',
        customerDecision: document.querySelector('input[name="customer-decision"]:checked')?.value || '',
        poInstruction: document.querySelector('input[name="po-instruction"]:checked')?.value || '',

        totalWorkHours: document.getElementById('total-work-hrs')?.textContent || '0.00 hrs',
        totalTravelHours: document.getElementById('total-travel-hrs')?.textContent || '0.00 hrs',

        customerSignature: custCanvas ? custCanvas.toDataURL('image/png') : '',
        engineerSignature: engCanvas ? engCanvas.toDataURL('image/png') : '',

        interventions: Array.from(document.querySelectorAll('input[name="intervention-type"]:checked')).map(cb => cb.value),

        parts: dataObj.parts,
        engineers: dataObj.engineers,
        thirdParties: dataObj.thirdParties,
        costs: dataObj.costs,

        photos: uploadedFiles.filter(f => f.category === 'photo').map(f => { return { name: f.name, data: f.data } }),
        receipts: uploadedFiles.filter(f => f.category === 'receipt').map(f => { return { name: f.name, data: f.data } })
    };
}

// ==========================================
// FORM SUBMISSION (NAAR POWER AUTOMATE) + OFFLINE WACHTRIJ
// ==========================================
function handleFormSubmit(event, btnElement) {
    if (event) event.preventDefault();

    let originalText = '';
    if (btnElement) {
        originalText = btnElement.innerHTML;
        btnElement.innerHTML = '⏳ Sending to System...';
        btnElement.disabled = true;
    }

    const payload = buildSubmitPayload();

    // Geen verbinding? Meteen in de wachtrij zetten, niet eens proberen te versturen.
    if (!navigator.onLine) {
        queuePendingReport(payload);
        if (btnElement) { btnElement.innerHTML = originalText; btnElement.disabled = false; }
        alert("📥 Geen internetverbinding. Rapport is lokaal opgeslagen en wordt verzonden zodra u weer online bent (of via 'Sync Now').");
        return;
    }

    fetch(POWER_AUTOMATE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (btnElement) {
            btnElement.innerHTML = originalText;
            btnElement.disabled = false;
        }
        if (response.ok || response.status === 202) {
            alert("✅ Rapport en bijlagen succesvol verstuurd naar Power Automate!");
            uploadedFiles = [];
            document.getElementById('photos-preview-container').innerHTML = '';
        } else {
            queuePendingReport(payload);
            alert(`⚠️ Power Automate statuscode: ${response.status}. Rapport is lokaal opgeslagen in de wachtrij, probeer later opnieuw te synchroniseren.`);
        }
    })
    .catch(error => {
        console.error("Error sending to SharePoint:", error);
        queuePendingReport(payload);
        alert("❌ Netwerkfout bij verbinden met Power Automate. Rapport is lokaal opgeslagen in de wachtrij en kan later opnieuw verstuurd worden.");
        if (btnElement) {
            btnElement.innerHTML = originalText;
            btnElement.disabled = false;
        }
    });
}

function queuePendingReport(payload) {
    try {
        const key = `fortna_pending_${Date.now()}`;
        const record = { payload, queuedAt: new Date().toLocaleString() };
        localStorage.setItem(key, JSON.stringify(record));
        renderPendingQueueBadge();
    } catch (e) {
        alert("⚠️ Opslagruimte overschreden — kon rapport niet lokaal in de wachtrij zetten. Probeer eerst enkele foto's te verwijderen of oude drafts op te ruimen.");
    }
}

function getPendingReportKeys() {
    return Object.keys(localStorage).filter(k => k.startsWith('fortna_pending_'));
}

function renderPendingQueueBadge() {
    const keys = getPendingReportKeys();
    const badge = document.getElementById('pending-sync-badge');
    const syncBtn = document.getElementById('sync-now-btn');
    if (badge) {
        if (keys.length > 0) {
            badge.textContent = `🔄 ${keys.length} rapport(en) wachten op synchronisatie`;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }
    if (syncBtn) syncBtn.classList.toggle('hidden', keys.length === 0);
}

function syncPendingReports() {
    const keys = getPendingReportKeys();
    if (keys.length === 0) {
        alert("Geen rapporten in de wachtrij.");
        return;
    }
    if (!navigator.onLine) {
        alert("❌ Nog geen internetverbinding. Probeer het later opnieuw.");
        return;
    }

    const syncBtn = document.getElementById('sync-now-btn');
    if (syncBtn) { syncBtn.disabled = true; syncBtn.textContent = '⏳ Synchroniseren...'; }

    let remaining = keys.length;
    let failed = 0;

    keys.forEach(key => {
        const record = JSON.parse(localStorage.getItem(key) || '{}');
        fetch(POWER_AUTOMATE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(record.payload)
        })
        .then(response => {
            if (response.ok || response.status === 202) {
                localStorage.removeItem(key);
            } else {
                failed++;
            }
        })
        .catch(() => { failed++; })
        .finally(() => {
            remaining--;
            if (remaining === 0) {
                if (syncBtn) { syncBtn.disabled = false; syncBtn.textContent = '🔄 Sync Now'; }
                renderPendingQueueBadge();
                if (failed > 0) alert(`⚠️ ${failed} rapport(en) konden nog niet verzonden worden. Ze blijven in de wachtrij staan.`);
                else alert("✅ Alle openstaande rapporten zijn gesynchroniseerd!");
            }
        });
    });
}

// ==========================================
// DRAFT BEHEER
// ==========================================
function renderDraftsDropdown() {
    const dropdown = document.getElementById('drafts-dropdown');
    if (!dropdown) return;

    dropdown.innerHTML = '<option value="">-- Load Saved Draft --</option>';

    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('fortna_draft_')) {
            try {
                const draft = JSON.parse(localStorage.getItem(key));
                const so = draft.fields?.['service-order'] || 'No SO';
                const site = draft.fields?.['customer-site'] || 'New Site';
                const time = draft['_savedAt'] || '';

                const opt = document.createElement('option');
                opt.value = key;
                opt.textContent = `${so} - ${site} (${time})`;
                dropdown.appendChild(opt);
            } catch (e) {}
        }
    });
}

function loadDraftByKey(key) {
    if (!key) return;
    const rawData = localStorage.getItem(key);
    if (!rawData) return;

    if (!confirm("Load this draft? Unsaved inputs will be replaced.")) {
        document.getElementById('drafts-dropdown').value = '';
        return;
    }

    const data = JSON.parse(rawData);

    if (data.fields) {
        Object.keys(data.fields).forEach(id => {
            if (id.startsWith('name_')) {
                const parts = id.replace('name_', '').split('_');
                const match = document.querySelector(`input[name="${parts[0]}"][value="${parts.slice(1).join('_')}"]`);
                if (match) match.checked = data.fields[id];
            } else {
                const elem = document.getElementById(id);
                if (elem) {
                    if (elem.type === 'checkbox' || elem.type === 'radio') elem.checked = data.fields[id];
                    else elem.value = data.fields[id];
                }
            }
        });
    }

    const partsContainer = document.getElementById('parts-container');
    if (partsContainer) partsContainer.innerHTML = '';
    if (data.parts && data.parts.length > 0) data.parts.forEach(p => addPartEntry(p.qty, p.artNo, p.desc));
    else addPartEntry();

    const engContainer = document.getElementById('engineers-container');
    if (engContainer) engContainer.innerHTML = '';
    if (data.engineers && data.engineers.length > 0) data.engineers.forEach(e => addEngineerEntry(e.date, e.name, e.type, e.cat, e.start, e.end));
    else addEngineerEntry();

    const tpContainer = document.getElementById('third-party-container');
    if (tpContainer) tpContainer.innerHTML = '';
    if (data.thirdParties && data.thirdParties.length > 0) data.thirdParties.forEach(tp => addThirdPartyEntry(tp.name, tp.desc, tp.cost, tp.receiptImg));
    else addThirdPartyEntry();

    const costContainer = document.getElementById('costs-container');
    if (costContainer) costContainer.innerHTML = '';
    if (data.costs && data.costs.length > 0) data.costs.forEach(c => addCostEntry(c.type, c.amount, c.receiptImg));
    else addCostEntry();

    const photoContainer = document.getElementById('photos-preview-container');
    if (photoContainer) photoContainer.innerHTML = '';
    uploadedFiles = [];
    if (data.photos && data.photos.length > 0) {
        data.photos.forEach(src => {
            uploadedFiles.push({ name: 'Draft_File', data: src, category: 'photo' });
            appendPhotoPreview(src, 'Draft_File');
        });
    }

    // Zorg dat receipt-bestanden uit third parties / costs ook terug in uploadedFiles komen,
    // anders ontbreken ze in de payload bij een submit na het laden van een oud concept.
    if (data.thirdParties) {
        data.thirdParties.forEach(tp => {
            if (tp.receiptImg) uploadedFiles.push({ name: 'Draft_Receipt', data: tp.receiptImg, category: 'receipt' });
        });
    }
    if (data.costs) {
        data.costs.forEach(c => {
            if (c.receiptImg) uploadedFiles.push({ name: 'Draft_Receipt', data: c.receiptImg, category: 'receipt' });
        });
    }

    checkMalfunctionVisibility();
    checkScopeVisibility();
    checkCompletionVisibility();
    checkAdditionalWorkVisibility();
    calculateGrandTotals();
    document.getElementById('auto-save-status').textContent = `Loaded draft from ${data['_savedAt']}`;
}

function saveDraft() {
    try {
        const serviceOrder = document.getElementById('service-order')?.value || 'NO-SO';
        const draftKey = `fortna_draft_${serviceOrder}_${Date.now()}`;
        const draftData = getFormDataObject();
        localStorage.setItem(draftKey, JSON.stringify(draftData));

        renderDraftsDropdown();
        document.getElementById('auto-save-status').textContent = `Saved draft at ${draftData['_savedAt']}`;
        alert(`Draft saved successfully!`);
    } catch (e) {
        alert("Opslagruimte overschreden!");
    }
}

function openDraftManagerModal() {
    const listContainer = document.getElementById('drafts-checkbox-list');
    if (!listContainer) return;

    listContainer.innerHTML = '';
    let count = 0;

    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('fortna_draft_')) {
            count++;
            try {
                const draft = JSON.parse(localStorage.getItem(key));
                const so = draft.fields?.['service-order'] || 'No SO';
                const site = draft.fields?.['customer-site'] || 'New Site';
                const time = draft['_savedAt'] || '';

                const row = document.createElement('div');
                row.className = 'flex items-center justify-between py-1.5 border-b border-gray-100';
                row.innerHTML = `
                    <label class="flex items-center space-x-2 cursor-pointer w-full">
                        <input type="checkbox" class="draft-delete-checkbox h-4 w-4 text-red-600 rounded border-gray-300" value="${key}">
                        <span class="text-xs text-gray-700 font-medium">${so} - ${site} <span class="text-gray-400">(${time})</span></span>
                    </label>
                </button>
                `;
                listContainer.appendChild(row);
            } catch (e) {}
        }
    });

    if (count === 0) {
        listContainer.innerHTML = '<p class="text-xs text-gray-500 py-4 text-center">Geen opgeslagen drafts gevonden.</p>';
    }

    document.getElementById('draft-manager-modal')?.classList.remove('hidden');
}

function closeDraftManagerModal() {
    document.getElementById('draft-manager-modal')?.classList.add('hidden');
}

function selectAllDrafts(status) {
    document.querySelectorAll('.draft-delete-checkbox').forEach(cb => cb.checked = status);
}

function deleteSelectedDraftsFromModal() {
    const checkedBoxes = document.querySelectorAll('.draft-delete-checkbox:checked');
    if (checkedBoxes.length === 0) {
        alert("Selecteer ten minste één draft om te verwijderen.");
        return;
    }

    if (confirm(`Weet je zeker dat je ${checkedBoxes.length} draft(s) wilt verwijderen?`)) {
        checkedBoxes.forEach(cb => {
            localStorage.removeItem(cb.value);
        });

        renderDraftsDropdown();
        closeDraftManagerModal();
        document.getElementById('auto-save-status').textContent = `${checkedBoxes.length} draft(s) verwijderd`;
    }
}

// ==========================================
// BESTANDSUPLOADS & PREVIEWS
// ==========================================

function handlePhotoUpload(event) {
    const files = event.target.files;
    if (!files) return;
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedFiles.push({ name: file.name, data: e.target.result, type: file.type, category: 'photo' });
            appendPhotoPreview(e.target.result, file.name);
        };
        reader.readAsDataURL(file);
    });
}

function appendPhotoPreview(src, fileName = 'Photo') {
    const previewContainer = document.getElementById('photos-preview-container');
    if (!previewContainer) return;
    const imgId = `photo-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;

    const imgDiv = document.createElement('div');
    imgDiv.className = 'relative border rounded-md p-1 bg-gray-50 shadow-sm group';
    imgDiv.id = imgId;
    imgDiv.innerHTML = `
        <img src="${src}" alt="${fileName}" class="w-full h-32 object-cover rounded">
        <button type="button" onclick="document.getElementById('${imgId}').remove()" class="absolute top-2 right-2 bg-red-600 text-white font-bold text-xs px-2 py-1 rounded-full shadow hover:bg-red-700 no-print" title="Remove photo">X</button>
        <p class="text-xs text-center text-gray-500 mt-1 truncate">${fileName}</p>
    `;
    previewContainer.appendChild(imgDiv);
}

function handleReceiptUpload(event, previewId) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const dataUrl = e.target.result;
        uploadedFiles.push({ name: file.name, data: dataUrl, type: file.type, category: 'receipt' });

        const imgElem = document.getElementById(previewId);
        if (imgElem) {
            if (file.type === 'application/pdf') {
                imgElem.src = 'https://cdn-icons-png.flaticon.com/512/337/337946.png';
            } else {
                imgElem.src = dataUrl;
            }
            imgElem.classList.remove('hidden');
        }
    };
    reader.readAsDataURL(file);
}

// ==========================================
// DYNAMISCHE RIJEN (PARTS, ENG, TP, COSTS)
// ==========================================

function addPartEntry(qty = '', artNo = '', desc = '') {
    const container = document.getElementById('parts-container');
    if (!container) return;
    const rowId = Date.now() + Math.floor(Math.random() * 1000);
    const div = document.createElement('div');
    div.className = 'grid grid-cols-1 md:grid-cols-12 gap-2 items-center bg-gray-50 p-2 rounded border';
    div.id = `part-row-${rowId}`;
    div.innerHTML = `
        <div class="md:col-span-2"><input type="number" placeholder="Qty" value="${qty}" class="part-qty text-xs p-1.5 border rounded w-full"></div>
        <div class="md:col-span-3"><input type="text" placeholder="Article No." value="${artNo}" class="part-artno text-xs p-1.5 border rounded w-full"></div>
        <div class="md:col-span-6"><input type="text" placeholder="Description" value="${desc}" class="part-desc text-xs p-1.5 border rounded w-full"></div>
        <div class="md:col-span-1 flex justify-end no-print"><button type="button" onclick="document.getElementById('part-row-${rowId}').remove()" class="text-red-600 font-bold px-2 text-xs">X</button></div>
    `;
    container.appendChild(div);
}

function addEngineerEntry(date = '', name = '', type = '', cat = 'Work Hours', start = '', end = '') {
    const container = document.getElementById('engineers-container');
    if (!container) return;

    // Nieuwe, lege rij? Vul dan automatisch de laatst gebruikte naam/rol in
    // van dit apparaat, zodat de monteur niet steeds opnieuw hoeft te typen.
    if (!name) {
        const recent = getRecentEngineers();
        if (recent.length > 0) {
            name = recent[0].name;
            type = type || recent[0].type;
        }
    }
    type = type || 'Service Engineer';

    const rowId = Date.now() + Math.floor(Math.random() * 1000);
    const div = document.createElement('div');
    div.className = 'bg-gray-50 p-3 rounded-md border space-y-3 relative shadow-xs';
    div.id = `eng-row-${rowId}`;
    div.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div class="md:col-span-3"><input type="date" value="${date}" class="eng-date text-xs p-1.5 border rounded w-full"></div>
            <div class="md:col-span-3 relative">
                <input type="text" value="${name}" placeholder="Name" autocomplete="off" class="eng-name text-xs p-1.5 border rounded w-full">
                <ul class="eng-name-suggestions hidden absolute z-20 left-0 right-0 mt-1 bg-white border border-indigo-200 rounded-lg shadow-lg max-h-48 overflow-y-auto text-xs"></ul>
            </div>
            <div class="md:col-span-3">
                <select class="eng-type text-xs p-1.5 border rounded w-full">
                    <option ${type === 'Service Engineer' ? 'selected' : ''}>Service Engineer</option>
                    <option ${type === 'Trouble Shooter' ? 'selected' : ''}>Trouble Shooter</option>
                    <option ${type === 'Maintenance Mechanic' ? 'selected' : ''}>Maintenance Mechanic</option>
                </select>
            </div>
            <div class="md:col-span-3">
                <select class="eng-category text-xs p-1.5 border rounded w-full font-semibold text-blue-600" onchange="calculateGrandTotals()">
                    <option value="Work Hours" ${cat === 'Work Hours' ? 'selected' : ''}>🛠️ Work Hours</option>
                    <option value="Travel Time" ${cat === 'Travel Time' ? 'selected' : ''}>🚗 Travel Time</option>
                </select>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-12 gap-3 items-end border-t pt-2 border-gray-200">
            <div class="md:col-span-3"><input type="time" value="${start}" class="eng-start text-xs p-1.5 border rounded w-full" onchange="calculateGrandTotals()"></div>
            <div class="md:col-span-3"><input type="time" value="${end}" class="eng-end text-xs p-1.5 border rounded w-full" onchange="calculateGrandTotals()"></div>
            <div class="md:col-span-4"><span class="text-xs font-bold text-blue-600 eng-hours-val" data-hours-num="0">0.00 hrs</span></div>
            <div class="md:col-span-2 flex justify-end no-print"><button type="button" onclick="document.getElementById('eng-row-${rowId}').remove(); calculateGrandTotals();" class="text-red-600 text-xs">Remove</button></div>
        </div>
    `;
    container.appendChild(div);

    const nameInput = div.querySelector('.eng-name');
    const typeSelect = div.querySelector('.eng-type');
    const suggestList = div.querySelector('.eng-name-suggestions');

    attachTypeaheadEl(
        nameInput,
        suggestList,
        (query) => getRecentEngineers()
            .filter(e => e.name.toLowerCase().includes(query))
            .map(e => ({ label: `${e.name} (${e.type})`, name: e.name, type: e.type })),
        (match) => {
            nameInput.value = match.name;
            typeSelect.value = match.type;
        }
    );
    nameInput.addEventListener('blur', () => saveRecentEngineer(nameInput.value, typeSelect.value));
}

function addThirdPartyEntry(name = '', desc = '', cost = '', receiptImg = '') {
    const container = document.getElementById('third-party-container');
    if (!container) return;
    const rowId = Date.now() + Math.floor(Math.random() * 1000);
    const div = document.createElement('div');
    div.className = 'bg-gray-50 p-3 rounded-md border space-y-2 relative';
    div.id = `tp-row-${rowId}`;
    div.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div class="md:col-span-4 relative">
                <input type="text" placeholder="Name" value="${name}" autocomplete="off" class="tp-name text-xs p-1.5 border rounded w-full">
                <ul class="tp-name-suggestions hidden absolute z-20 left-0 right-0 mt-1 bg-white border border-indigo-200 rounded-lg shadow-lg max-h-48 overflow-y-auto text-xs"></ul>
            </div>
            <div class="md:col-span-4"><input type="text" placeholder="Description" value="${desc}" class="tp-desc text-xs p-1.5 border rounded w-full"></div>
            <div class="md:col-span-3"><input type="text" placeholder="Cost" value="${cost}" class="tp-cost text-xs p-1.5 border rounded w-full"></div>
            <div class="md:col-span-1 flex justify-end no-print"><button type="button" onclick="document.getElementById('tp-row-${rowId}').remove()" class="text-red-600 font-bold text-xs">X</button></div>
        </div>
        <div class="flex items-center space-x-3 pt-2 border-t no-print">
            <label class="text-xs font-semibold text-gray-600">Attach Receipt/Invoice:</label>
            <input type="file" accept="image/*,application/pdf" onchange="handleReceiptUpload(event, 'tp-preview-${rowId}')" class="text-xs text-gray-500">
            <img id="tp-preview-${rowId}" src="${receiptImg}" class="tp-receipt-preview h-10 object-cover rounded ${receiptImg ? '' : 'hidden'}">
        </div>
    `;
    container.appendChild(div);

    const nameInput = div.querySelector('.tp-name');
    const descInput = div.querySelector('.tp-desc');
    const suggestList = div.querySelector('.tp-name-suggestions');

    attachTypeaheadEl(
        nameInput,
        suggestList,
        (query) => getRecentThirdParties()
            .filter(tp => tp.name.toLowerCase().includes(query))
            .map(tp => ({ label: tp.desc ? `${tp.name} — ${tp.desc}` : tp.name, name: tp.name, desc: tp.desc })),
        (match) => {
            nameInput.value = match.name;
            if (match.desc && !descInput.value) descInput.value = match.desc;
        }
    );
    nameInput.addEventListener('blur', () => saveRecentThirdParty(nameInput.value, descInput.value));
}

function addCostEntry(type = '', amount = '', receiptImg = '') {
    const container = document.getElementById('costs-container');
    if (!container) return;
    const rowId = Date.now() + Math.floor(Math.random() * 1000);
    const div = document.createElement('div');
    div.className = 'bg-gray-50 p-3 rounded-md border space-y-2 relative';
    div.id = `cost-row-${rowId}`;
    div.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div class="md:col-span-6"><input type="text" placeholder="Type" value="${type}" class="cost-type text-xs p-1.5 border rounded w-full"></div>
            <div class="md:col-span-5"><input type="number" placeholder="Amount" value="${amount}" class="cost-amount text-xs p-1.5 border rounded w-full"></div>
            <div class="md:col-span-1 flex justify-end no-print"><button type="button" onclick="document.getElementById('cost-row-${rowId}').remove()" class="text-red-600 font-bold text-xs">X</button></div>
        </div>
        <div class="flex items-center space-x-3 pt-2 border-t no-print">
            <label class="text-xs font-semibold text-gray-600">Attach Receipt/Invoice:</label>
            <input type="file" accept="image/*,application/pdf" onchange="handleReceiptUpload(event, 'cost-preview-${rowId}')" class="text-xs text-gray-500">
            <img id="cost-preview-${rowId}" src="${receiptImg}" class="cost-receipt-preview h-10 object-cover rounded ${receiptImg ? '' : 'hidden'}">
        </div>
    `;
    container.appendChild(div);
}

function calculateGrandTotals() {
    let totalWork = 0, totalTravel = 0;
    document.querySelectorAll('#engineers-container > div').forEach(row => {
        const cat = row.querySelector('.eng-category')?.value || 'Work Hours';
        const start = row.querySelector('.eng-start')?.value;
        const end = row.querySelector('.eng-end')?.value;
        if (start && end) {
            const s = new Date(`1970-01-01T${start}:00`);
            const e = new Date(`1970-01-01T${end}:00`);
            let diff = (e - s) / 3600000;
            if (diff < 0) diff += 24;
            row.querySelector('.eng-hours-val').textContent = `${diff.toFixed(2)} hrs`;
            if (cat === 'Travel Time') totalTravel += diff;
            else totalWork += diff;
        }
    });
    const elWork = document.getElementById('total-work-hrs');
    const elTravel = document.getElementById('total-travel-hrs');
    const elCombined = document.getElementById('total-combined-hrs');
    if (elWork) elWork.textContent = `${totalWork.toFixed(2)} hrs`;
    if (elTravel) elTravel.textContent = `${totalTravel.toFixed(2)} hrs`;
    if (elCombined) elCombined.textContent = `${(totalWork + totalTravel).toFixed(2)} hrs`;
}

function checkMalfunctionVisibility() {
    const checkboxes = document.querySelectorAll('input[name="intervention-type"]');
    let show = false;
    checkboxes.forEach(cb => { if ((cb.value === 'Malfunction' || cb.value === 'Technical Support 24/7') && cb.checked) show = true; });
    const sec = document.getElementById('malfunction-section');
    if (sec) sec.classList.toggle('hidden', !show);
}

// ==========================================
// CONDITIONELE LOGICA: SCOPE & COMPLETION
// ==========================================

function checkScopeVisibility() {
    const radio = document.querySelector('input[name="scope-as-planned"]:checked');
    const reasonsBlock = document.getElementById('scope-reasons-block');
    if (reasonsBlock) reasonsBlock.classList.toggle('hidden', !(radio && radio.value === 'No'));
}

function checkCompletionVisibility() {
    const completed = document.querySelector('input[name="activities-completed"]:checked')?.value;
    const remainingBlock = document.getElementById('remaining-work-block');
    if (remainingBlock) remainingBlock.classList.toggle('hidden', !(completed === 'Partly' || completed === 'No'));
}

function checkAdditionalWorkVisibility() {
    const addWork = document.querySelector('input[name="additional-work"]:checked')?.value;
    const block = document.getElementById('additional-work-desc-block');
    const label = document.getElementById('additional-work-desc-label');
    if (block) block.classList.toggle('hidden', !addWork);
    if (label && addWork) {
        const lang = localStorage.getItem('fortna_lang') || 'en';
        label.textContent = addWork === 'Yes'
            ? translations[lang].lblAdditionalWorkDescYes
            : translations[lang].lblAdditionalWorkDescNo;
    }
}

function setupSignaturePad(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let drawing = false;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    function getPos(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
        const clientY = e.clientY || (e.touches ? e.touches[0].clientY : 0);
        return { x: clientX - rect.left, y: clientY - rect.top };
    }

    canvas.addEventListener('mousedown', (e) => { drawing = true; ctx.beginPath(); const p = getPos(e); ctx.moveTo(p.x, p.y); });
    canvas.addEventListener('mousemove', (e) => { if (!drawing) return; const p = getPos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); });
    window.addEventListener('mouseup', () => drawing = false);

    canvas.addEventListener('touchstart', (e) => { drawing = true; ctx.beginPath(); const p = getPos(e); ctx.moveTo(p.x, p.y); e.preventDefault(); });
    canvas.addEventListener('touchmove', (e) => { if (!drawing) return; const p = getPos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); e.preventDefault(); });
    canvas.addEventListener('touchend', () => drawing = false);
}

function clearSignature(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function resetFormWithConfirmation() {
    if (!confirm("Formulier wissen?")) return;

    document.getElementById('service-report-form').reset();
    uploadedFiles = [];
    document.getElementById('photos-preview-container').innerHTML = '';
    clearSignature('customer-signature-canvas');
    clearSignature('engineer-signature-canvas');

    // Bugfix: form.reset() ruimt de dynamisch toegevoegde rijen niet op.
    ['parts-container', 'engineers-container', 'third-party-container', 'costs-container'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = '';
    });
    addPartEntry();
    addEngineerEntry();
    addThirdPartyEntry();
    addCostEntry();
    calculateGrandTotals();

    // Verberg conditionele blokken weer.
    document.getElementById('malfunction-section')?.classList.add('hidden');
    document.getElementById('scope-reasons-block')?.classList.add('hidden');
    document.getElementById('remaining-work-block')?.classList.add('hidden');
    document.getElementById('additional-work-desc-block')?.classList.add('hidden');

    document.getElementById('auto-save-status').textContent = 'Form ready';
}

// ==========================================
// SLIMME KLANT-PDF (SELECTIEF PRINTEN)
// ==========================================
function printCustomerReport() {
    const includePhotos = document.getElementById('print-include-photos')?.checked;
    const includeEngineers = document.getElementById('print-include-engineers')?.checked;
    const includeThirdParty = document.getElementById('print-include-thirdparty')?.checked;
    const includeCosts = document.getElementById('print-include-costs')?.checked;

    document.body.classList.toggle('print-hide-photos', !includePhotos);
    document.body.classList.toggle('print-hide-engineers', !includeEngineers);
    document.body.classList.toggle('print-hide-thirdparty', !includeThirdParty);
    document.body.classList.toggle('print-hide-costs', !includeCosts);
    document.body.classList.add('print-customer-mode');

    window.print();
}

// Zodra het printvenster sluit (geprint of geannuleerd), de opgeschoonde
// weergave weer uitzetten zodat het scherm er weer normaal uitziet.
window.addEventListener('afterprint', () => {
    document.body.classList.remove('print-customer-mode');
});

function switchTab(tab) {
    const customerContent = document.getElementById('tab-customer-content');
    const adminContent = document.getElementById('tab-admin-content');
    const customerBtn = document.getElementById('tab-btn-cust');
    const adminBtn = document.getElementById('tab-btn-adm');

    if (tab === 'customer') {
        if (customerContent) customerContent.classList.remove('hidden');
        if (adminContent) adminContent.classList.add('hidden');
        if (customerBtn) {
            customerBtn.classList.add('bg-blue-600', 'text-white');
            customerBtn.classList.remove('bg-gray-100', 'text-gray-600', 'hover:bg-blue-50', 'hover:text-blue-700');
        }
        if (adminBtn) {
            adminBtn.classList.remove('bg-blue-600', 'text-white');
            adminBtn.classList.add('bg-gray-100', 'text-gray-600', 'hover:bg-blue-50', 'hover:text-blue-700');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        if (adminContent) adminContent.classList.remove('hidden');
        if (customerContent) customerContent.classList.add('hidden');
        if (adminBtn) {
            adminBtn.classList.add('bg-blue-600', 'text-white');
            adminBtn.classList.remove('bg-gray-100', 'text-gray-600', 'hover:bg-blue-50', 'hover:text-blue-700');
        }
        if (customerBtn) {
            customerBtn.classList.remove('bg-blue-600', 'text-white');
            customerBtn.classList.add('bg-gray-100', 'text-gray-600', 'hover:bg-blue-50', 'hover:text-blue-700');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

window.addEventListener('load', () => {
    setupSignaturePad('customer-signature-canvas');
    setupSignaturePad('engineer-signature-canvas');
    addPartEntry();
    addEngineerEntry();
    addThirdPartyEntry();
    addCostEntry();
    renderDraftsDropdown();
    renderPendingQueueBadge();
    updateOnlineStatus();
    checkScopeVisibility();
    checkCompletionVisibility();
    checkAdditionalWorkVisibility();
    loadIgLookupData();
    setupIgTypeaheads();
    const savedLang = localStorage.getItem('fortna_lang') || 'en';
    changeLanguage(savedLang);
    const langSwitcher = document.getElementById('language-switcher');
    if (langSwitcher) langSwitcher.value = savedLang;
});
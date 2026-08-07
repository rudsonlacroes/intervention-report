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
const POWER_AUTOMATE_URL = "https://defaultaf45b6ebfef340a8a4c7f197c92a86.33.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/13/workflows/961984ed08f542518fe340685b97e011/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=9hI0BXppe1buSGpE0FPfOkS5gBu5cR87N2bAmwaCgQk";

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
                const lang = localStorage.getItem('fortna_lang') || 'en';
                setIgLookupStatus(translations[lang].msgIgLoaded.replace('{count}', igLookupData.length).replace('{date}', parsed.savedAt));
            }
        }
    } catch (e) { /* corrupte cache negeren */ }

    // 2. Probeer op de achtergrond een verse lijst op te halen.
    if (!navigator.onLine) {
        if (igLookupData.length === 0) {
            const lang = localStorage.getItem('fortna_lang') || 'en';
            setIgLookupStatus(translations[lang].msgIgOffline);
        }
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
        const lang = localStorage.getItem('fortna_lang') || 'en';
        if (parsed.length > 0) {
            igLookupData = parsed;
            const savedAt = new Date().toLocaleString();
            localStorage.setItem(IG_CACHE_KEY, JSON.stringify({ data: parsed, savedAt }));
            setIgLookupStatus(translations[lang].msgIgLoadedUpdated.replace('{count}', parsed.length));
        } else {
            console.warn('IG lookup: kon geen klantregels herkennen in de respons. Controleer de veldnamen — zie console.log hierboven.');
            if (igLookupData.length === 0) setIgLookupStatus(translations[lang].msgIgParseError);
        }
    } catch (e) {
        console.error('IG lookup ophalen mislukt:', e);
        if (igLookupData.length === 0) {
            const lang = localStorage.getItem('fortna_lang') || 'en';
            setIgLookupStatus(translations[lang].msgIgFetchError);
        }
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
        const travelFrom = cat === 'Travel Time' ? (row.querySelector('.eng-travel-from')?.value || '') : '';
        const hotelHr = row.querySelector('.eng-hotel-hr')?.value || '';
        const hotelKm = row.querySelector('.eng-hotel-km')?.value || '';
        const noTravelSo = row.querySelector('.eng-notravel-so')?.value || '';
        if (name || start || end || date) data.engineers.push({ date, name, type, cat, start, end, hours, travelFrom, hotelHr, hotelKm, noTravelSo });
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

// ==========================================
// SERVICE ORDER NUMMER = ALTIJD AGREEMENT TYPE + NUMMER
// ==========================================
// Bijv. Agreement Type "LTA" + nummer "0000104" -> veld toont "LTA0000104".
// Wordt aangeroepen bij het wisselen van Agreement Type en bij het
// verlaten (blur) van het Service Order-veld, zodat het altijd correct
// samengevoegd blijft, ook als de monteur het later nog aanpast.
const KNOWN_SO_PREFIXES = ['GLA', 'LTA', 'LAA', 'Other'];

function normalizeServiceOrderNumber() {
    const soInput = document.getElementById('service-order');
    if (!soInput) return;

    const agreementRadio = document.querySelector('input[name="agreement-type"]:checked');
    const prefix = agreementRadio ? agreementRadio.value : '';

    let raw = soInput.value.trim();

    // Verwijder een eventueel al aanwezig prefix (van een eerdere keuze),
    // zodat we niet dubbel combineren als de monteur van Agreement Type wisselt.
    for (const p of KNOWN_SO_PREFIXES) {
        if (raw.toUpperCase().startsWith(p.toUpperCase())) {
            raw = raw.slice(p.length);
            break;
        }
    }
    raw = raw.trim();

    if (!raw) { soInput.value = ''; return; }
    soInput.value = prefix ? `${prefix}${raw}` : raw;
}

function buildSubmitPayload() {
    normalizeServiceOrderNumber(); // zorg dat het veld gegarandeerd correct samengevoegd is vóór verzending

    const rawCustomerSite = document.getElementById('customer-site')?.value?.trim() || 'Unknown_Site';
    const agreementRadio = document.querySelector('input[name="agreement-type"]:checked');
    const fullServiceOrder = document.getElementById('service-order')?.value?.trim() || 'NO-SO';

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
// SPRAAK-NAAR-TEKST (WEB SPEECH API)
// ==========================================
const SPEECH_RECOGNITION_LANG_MAP = { en: 'en-US', nl: 'nl-NL', de: 'de-DE', it: 'it-IT', pl: 'pl-PL' };

// Voegt een microfoonknop toe direct onder de gegeven textarea. Herkende spraak wordt
// AANGEVULD aan de bestaande inhoud (niet overschreven) — de monteur kan gewoon blijven
// typen/corrigeren. Bestaat SpeechRecognition niet in deze browser, dan tonen we alleen
// een korte, niet-opdringerige melding i.p.v. de knop, zonder verder iets te breken.
function attachVoiceInput(textareaId) {
    const textarea = document.getElementById(textareaId);
    if (!textarea) return;

    const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) {
        const lang = localStorage.getItem('fortna_lang') || 'en';
        const hint = document.createElement('p');
        hint.className = 'text-[10px] text-gray-400 italic mt-1 no-print';
        hint.textContent = translations[lang]?.msgVoiceNotSupported || 'Speech recognition is not supported in this browser.';
        textarea.insertAdjacentElement('afterend', hint);
        return;
    }

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mt-1 text-[10px] bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-2 py-1 rounded no-print';
    btn.textContent = translations[localStorage.getItem('fortna_lang') || 'en'].btnDictate;
    textarea.insertAdjacentElement('afterend', btn);

    const recognition = new SpeechRecognitionCtor();
    recognition.continuous = true;
    recognition.interimResults = false;

    let recording = false;

    function setRecordingUi(isRecording) {
        recording = isRecording;
        const lang = localStorage.getItem('fortna_lang') || 'en';
        btn.textContent = isRecording ? translations[lang].btnRecording : translations[lang].btnDictate;
        btn.classList.toggle('animate-pulse', isRecording);
        btn.classList.toggle('bg-red-600', isRecording);
        btn.classList.toggle('hover:bg-red-700', isRecording);
        btn.classList.toggle('bg-indigo-600', !isRecording);
        btn.classList.toggle('hover:bg-indigo-700', !isRecording);
    }

    recognition.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) finalTranscript += event.results[i][0].transcript;
        }
        if (finalTranscript.trim()) {
            const needsSeparator = textarea.value && !/[\s\n]$/.test(textarea.value);
            textarea.value += (needsSeparator ? ' ' : '') + finalTranscript.trim();
        }
    };

    recognition.onerror = () => setRecordingUi(false);
    recognition.onend = () => setRecordingUi(false);

    btn.addEventListener('click', () => {
        if (recording) {
            recognition.stop();
        } else {
            recognition.lang = SPEECH_RECOGNITION_LANG_MAP[localStorage.getItem('fortna_lang') || 'en'] || 'en-US';
            try {
                recognition.start();
                setRecordingUi(true);
            } catch (e) { /* al bezig met opnemen of geen microfoon-toegang: negeren */ }
        }
    });
}

// ==========================================
// VALIDATIE VERPLICHTE VELDEN VÓÓR VERZENDEN
// ==========================================
const REQUIRED_SUBMIT_FIELDS = ['customer-site', 'service-order', 'contact-name', 'date', 'work-performed-desc'];

// Zet border-red-500 op elk leeg verplicht veld en geeft het eerste ongeldige element terug (of null als alles ok is).
function validateRequiredFields() {
    let firstInvalid = null;
    REQUIRED_SUBMIT_FIELDS.forEach(id => {
        const elem = document.getElementById(id);
        if (!elem) return;
        if (!elem.value || !elem.value.trim()) {
            elem.classList.add('border-red-500');
            if (!firstInvalid) firstInvalid = elem;
        }
    });
    return firstInvalid;
}

// Verwijdert de rode rand automatisch zodra een verplicht veld weer wordt ingevuld,
// en verbergt de waarschuwing zodra geen enkel verplicht veld meer ongeldig is.
function setupRequiredFieldValidationClearing() {
    REQUIRED_SUBMIT_FIELDS.forEach(id => {
        const elem = document.getElementById(id);
        if (!elem) return;
        const clear = () => {
            if (!elem.value || !elem.value.trim()) return;
            elem.classList.remove('border-red-500');
            const stillInvalid = REQUIRED_SUBMIT_FIELDS.some(fid => document.getElementById(fid)?.classList.contains('border-red-500'));
            if (!stillInvalid) {
                const msg = document.getElementById('submit-validation-msg');
                if (msg) msg.classList.add('hidden');
            }
        };
        elem.addEventListener('input', clear);
        elem.addEventListener('blur', clear);
    });
}

// ==========================================
// FORM SUBMISSION (NAAR POWER AUTOMATE) + OFFLINE WACHTRIJ
// ==========================================
function handleFormSubmit(event, btnElement) {
    if (event) event.preventDefault();

    const firstInvalidField = validateRequiredFields();
    if (firstInvalidField) {
        const msg = document.getElementById('submit-validation-msg');
        if (msg) {
            const lang = localStorage.getItem('fortna_lang') || 'en';
            msg.textContent = `⚠️ ${translations[lang].msgValidationRequired}`;
            msg.classList.remove('hidden');
        }
        firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }
    const msg = document.getElementById('submit-validation-msg');
    if (msg) msg.classList.add('hidden');

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
            localStorage.removeItem('fortna_autosave_current');
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
    const clearBtn = document.getElementById('clear-queue-btn');
    if (clearBtn) clearBtn.classList.toggle('hidden', keys.length === 0);
}

// Verwijdert ALLE openstaande wachtrij-rapporten (bijv. oude/kapotte pogingen
// die telkens blijven falen). Vraagt eerst bevestiging, want dit is onomkeerbaar.
function clearPendingQueue() {
    const keys = getPendingReportKeys();
    if (keys.length === 0) {
        alert("Geen rapporten in de wachtrij.");
        return;
    }
    const ok = confirm(`Weet u zeker dat u alle ${keys.length} wachtende rapport(en) wilt verwijderen? Dit kan niet ongedaan worden gemaakt.`);
    if (!ok) return;
    keys.forEach(key => localStorage.removeItem(key));
    renderPendingQueueBadge();
    alert("🗑️ Wachtrij geleegd.");
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
    if (data.engineers && data.engineers.length > 0) data.engineers.forEach(e => addEngineerEntry(e.date, e.name, e.type, e.cat, e.start, e.end, e.travelFrom, e.hotelHr, e.hotelKm, e.noTravelSo));
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
    normalizeServiceOrderNumber();
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

// ==========================================
// DUPLICEER LAATSTE BEZOEK KLANT
// ==========================================
// Een succesvol verstuurd rapport wordt nergens lokaal bewaard (zie handleFormSubmit),
// dus als bron voor "laatste bezoek" doorzoeken we de twee plekken die wél een volledige
// momentopname bevatten: handmatige/stille drafts (fortna_draft_*, fortna_autosave_current)
// en nog niet succesvol verzonden rapporten in de wachtrij (fortna_pending_*).
function cleanDuplicateVisitValue(v) {
    return (!v || v === 'N/A' || v === 'Unknown_Site') ? '' : v;
}

function findCustomerVisitRecords(query) {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const results = [];

    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('fortna_draft_') || key === AUTOSAVE_KEY) {
            try {
                const draft = JSON.parse(localStorage.getItem(key));
                const site = draft.fields?.['customer-site'] || '';
                if (!site.toLowerCase().includes(q)) return;

                const agreementKey = Object.keys(draft.fields || {}).find(k => k.startsWith('name_agreement-type_') && draft.fields[k]);

                results.push({
                    site,
                    timestamp: key === AUTOSAVE_KEY ? (draft['_savedAtEpoch'] || 0) : (Number(key.split('_').pop()) || 0),
                    installationGroup: draft.fields?.['installation-group'] || '',
                    contactName: draft.fields?.['contact-name'] || '',
                    contactPhone: draft.fields?.['contact-phone'] || '',
                    customerEmail: draft.fields?.['customer-email'] || '',
                    agreementType: agreementKey ? agreementKey.replace('name_agreement-type_', '') : ''
                });
            } catch (e) { /* corrupte/onleesbare entry overslaan */ }
        } else if (key.startsWith('fortna_pending_')) {
            try {
                const record = JSON.parse(localStorage.getItem(key));
                const site = record.payload?.customerSite || '';
                if (!site.toLowerCase().includes(q)) return;

                results.push({
                    site,
                    timestamp: Number(key.replace('fortna_pending_', '')) || 0,
                    installationGroup: record.payload?.installationGroup || '',
                    contactName: record.payload?.contactName || '',
                    contactPhone: record.payload?.contactPhone || '',
                    customerEmail: record.payload?.customerEmail || '',
                    agreementType: record.payload?.agreementType || ''
                });
            } catch (e) { /* corrupte/onleesbare entry overslaan */ }
        }
    });

    return results.sort((a, b) => b.timestamp - a.timestamp);
}

// Vult de datalist met alle bekende klantnamen uit drafts/pending, zodat de monteur kan kiezen i.p.v. exact typen.
function openDuplicateVisitModal() {
    const datalist = document.getElementById('duplicate-customer-options');
    if (datalist) {
        const sites = new Set();
        Object.keys(localStorage).forEach(key => {
            try {
                if (key.startsWith('fortna_draft_') || key === AUTOSAVE_KEY) {
                    const site = cleanDuplicateVisitValue(JSON.parse(localStorage.getItem(key)).fields?.['customer-site']);
                    if (site) sites.add(site);
                } else if (key.startsWith('fortna_pending_')) {
                    const site = cleanDuplicateVisitValue(JSON.parse(localStorage.getItem(key)).payload?.customerSite);
                    if (site) sites.add(site);
                }
            } catch (e) { /* corrupte/onleesbare entry overslaan */ }
        });
        datalist.innerHTML = Array.from(sites).sort().map(s => `<option value="${s}"></option>`).join('');
    }

    const input = document.getElementById('duplicate-visit-input');
    if (input) input.value = '';
    document.getElementById('duplicate-visit-modal')?.classList.remove('hidden');
}

function closeDuplicateVisitModal() {
    document.getElementById('duplicate-visit-modal')?.classList.add('hidden');
}

// Neemt alleen klant-/locatiegegevens over in het huidige (lege) formulier — de rest blijft ongewijzigd.
// Service-order zelf wordt bewust NIET overgenomen (elk bezoek krijgt een eigen nummer);
// alleen het Agreement Type (GLA/LTA/LAA/Other) wordt vooraf gezet.
function confirmDuplicateVisit() {
    const lang = localStorage.getItem('fortna_lang') || 'en';
    const query = document.getElementById('duplicate-visit-input')?.value || '';
    const matches = findCustomerVisitRecords(query);
    if (matches.length === 0) {
        alert(translations[lang].msgNoVisitFound.replace('{query}', query));
        return;
    }

    const record = matches[0];
    if (!confirm(translations[lang].msgConfirmTakeOver.replace('{site}', record.site))) return;

    const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.value = cleanDuplicateVisitValue(val);
    };
    setVal('customer-site', record.site);
    setVal('installation-group', record.installationGroup);
    setVal('contact-name', record.contactName);
    setVal('contact-phone', record.contactPhone);
    setVal('customer-email', record.customerEmail);

    if (record.agreementType) {
        const radio = document.querySelector(`input[name="agreement-type"][value="${record.agreementType}"]`);
        if (radio) radio.checked = true;
    }

    closeDuplicateVisitModal();
    document.getElementById('auto-save-status').textContent = translations[lang].msgVisitTakenOver.replace('{site}', record.site);
}

// ==========================================
// STILLE AUTO-SAVE (ACHTERGROND, ELKE 30 SEC.)
// ==========================================
const AUTOSAVE_KEY = 'fortna_autosave_current';

// Slaat het formulier stil op onder een vaste key (overschrijft steeds), zonder alert().
// Slaat niets op als het formulier nog leeg is (geen customer-site en geen service-order).
function autoSaveSilent() {
    const site = document.getElementById('customer-site')?.value?.trim();
    const so = document.getElementById('service-order')?.value?.trim();
    if (!site && !so) return;

    try {
        const draftData = getFormDataObject();
        draftData['_savedAtEpoch'] = Date.now();
        localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(draftData));

        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const status = document.getElementById('auto-save-status');
        const lang = localStorage.getItem('fortna_lang') || 'en';
        if (status) status.textContent = translations[lang].msgAutoSaved.replace('{time}', timeStr);
    } catch (e) {
        // Stil negeren: dit is een achtergrondproces, de gebruiker mag hier niet door gestoord worden.
    }
}

// Toont bij het laden van de pagina een niet-opdringerige banner als er een recent
// (< 2 uur oud) automatisch opgeslagen concept klaarstaat, met een knop om het te laden.
function checkAutoSaveRecovery() {
    const raw = localStorage.getItem(AUTOSAVE_KEY);
    if (!raw) return;

    try {
        const data = JSON.parse(raw);
        const twoHoursMs = 2 * 60 * 60 * 1000;
        if (Date.now() - (data['_savedAtEpoch'] || 0) > twoHoursMs) return;

        const banner = document.getElementById('autosave-recovery-banner');
        if (banner) banner.classList.remove('hidden');
    } catch (e) {}
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
            if (file.type.startsWith('image/')) {
                compressImage(e.target.result, 1600, 0.7).then(compressedDataUrl => {
                    uploadedFiles.push({ name: file.name, data: compressedDataUrl, type: 'image/jpeg', category: 'photo' });
                    appendPhotoPreview(compressedDataUrl, file.name);
                });
            } else {
                uploadedFiles.push({ name: file.name, data: e.target.result, type: file.type, category: 'photo' });
                appendPhotoPreview(e.target.result, file.name);
            }
        };
        reader.readAsDataURL(file);
    });
}

function compressImage(dataUrl, maxSize, quality) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            let { width, height } = img;
            if (width > maxSize || height > maxSize) {
                if (width > height) {
                    height = Math.round(height * (maxSize / width));
                    width = maxSize;
                } else {
                    width = Math.round(width * (maxSize / height));
                    height = maxSize;
                }
            }
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = () => resolve(dataUrl);
        img.src = dataUrl;
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

function addEngineerEntry(date = '', name = '', type = '', cat = 'Work Hours', start = '', end = '', travelFrom = '', hotelHr = '', hotelKm = '', noTravelSo = '') {
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
    const lang = localStorage.getItem('fortna_lang') || 'en';
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
                <select class="eng-category text-xs p-1.5 border rounded w-full font-semibold text-blue-600" onchange="calculateGrandTotals(); toggleEngineerTravelFields(this);">
                    <option value="Work Hours" ${cat === 'Work Hours' ? 'selected' : ''}>🛠️ Work Hours</option>
                    <option value="Travel Time" ${cat === 'Travel Time' ? 'selected' : ''}>🚗 Travel Time</option>
                </select>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-12 gap-3 items-end border-t pt-2 border-gray-200">
            <div class="md:col-span-3">
                <input type="time" value="${start}" class="eng-start text-xs p-1.5 border rounded w-full" onchange="calculateGrandTotals()">
                <button type="button" onclick="setEngineerTimeNow(this, 'start')" class="mt-1 w-full text-[10px] bg-blue-600 hover:bg-blue-700 text-white font-semibold px-2 py-1 rounded no-print">${translations[lang].btnStartNow}</button>
            </div>
            <div class="md:col-span-3">
                <input type="time" value="${end}" class="eng-end text-xs p-1.5 border rounded w-full" onchange="calculateGrandTotals()">
                <button type="button" onclick="setEngineerTimeNow(this, 'end')" class="mt-1 w-full text-[10px] bg-red-600 hover:bg-red-700 text-white font-semibold px-2 py-1 rounded no-print">${translations[lang].btnStopNow}</button>
            </div>
            <div class="md:col-span-4"><span class="text-xs font-bold text-blue-600 eng-hours-val" data-hours-num="0">0.00 hrs</span></div>
            <div class="md:col-span-2 flex justify-end no-print"><button type="button" onclick="document.getElementById('eng-row-${rowId}').remove(); calculateGrandTotals();" class="text-red-600 text-xs">Remove</button></div>
        </div>
        <div class="eng-travel-fields ${cat === 'Travel Time' ? '' : 'hidden'} grid grid-cols-1 md:grid-cols-12 gap-3 items-end border-t pt-2 border-gray-200">
            <div class="md:col-span-3">
                <label class="block text-[10px] text-gray-500 mb-0.5">Travel From</label>
                <select class="eng-travel-from text-xs p-1.5 border rounded w-full" onchange="toggleTravelFromDetails(this)">
                    <option value="Home" ${travelFrom === 'Home' ? 'selected' : ''}>Home</option>
                    <option value="Office" ${travelFrom === 'Office' ? 'selected' : ''}>Office</option>
                    <option value="Hotel" ${travelFrom === 'Hotel' ? 'selected' : ''}>Hotel</option>
                    <option value="Other Customer" ${travelFrom === 'Other Customer' ? 'selected' : ''}>Other Customer</option>
                    <option value="No Travel" ${travelFrom === 'No Travel' ? 'selected' : ''}>No Travel</option>
                </select>
            </div>
            <div class="md:col-span-5 eng-hotel-fields ${travelFrom === 'Hotel' ? '' : 'hidden'}">
                <label class="block text-[10px] text-gray-500 mb-0.5">Distance hotel — work location</label>
                <div class="flex gap-2">
                    <input type="number" step="0.1" min="0" placeholder="hr" value="${hotelHr}" class="eng-hotel-hr text-xs p-1.5 border rounded w-1/2">
                    <input type="number" step="0.1" min="0" placeholder="km" value="${hotelKm}" class="eng-hotel-km text-xs p-1.5 border rounded w-1/2">
                </div>
            </div>
            <div class="md:col-span-5 eng-notravel-fields ${travelFrom === 'No Travel' ? '' : 'hidden'}">
                <label class="block text-[10px] text-gray-500 mb-0.5">Combined with SO</label>
                <input type="text" placeholder="SO number" value="${noTravelSo}" class="eng-notravel-so text-xs p-1.5 border rounded w-full">
            </div>
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

// Toont/verbergt het Travel From-blok afhankelijk van Work Hours vs Travel Time.
function toggleEngineerTravelFields(categorySelectEl) {
    const row = categorySelectEl.closest('[id^="eng-row-"]');
    if (!row) return;
    const travelBlock = row.querySelector('.eng-travel-fields');
    if (travelBlock) travelBlock.classList.toggle('hidden', categorySelectEl.value !== 'Travel Time');
}

// Toont/verbergt de Hotel-afstand- of No Travel/gecombineerd-SO-velden
// afhankelijk van de gekozen Travel From-optie.
function toggleTravelFromDetails(travelFromSelectEl) {
    const row = travelFromSelectEl.closest('[id^="eng-row-"]');
    if (!row) return;
    const hotelFields = row.querySelector('.eng-hotel-fields');
    const noTravelFields = row.querySelector('.eng-notravel-fields');
    if (hotelFields) hotelFields.classList.toggle('hidden', travelFromSelectEl.value !== 'Hotel');
    if (noTravelFields) noTravelFields.classList.toggle('hidden', travelFromSelectEl.value !== 'No Travel');
}

// Vult het start- of eind-tijdveld van deze engineer-rij met de huidige tijd (HH:MM)
// en herberekent meteen de uren — handmatig corrigeren blijft daarna gewoon mogelijk.
function setEngineerTimeNow(buttonEl, which) {
    const row = buttonEl.closest('[id^="eng-row-"]');
    if (!row) return;
    const input = row.querySelector(which === 'start' ? '.eng-start' : '.eng-end');
    if (!input) return;

    const now = new Date();
    input.value = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    calculateGrandTotals();
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
            <div class="md:col-span-3 flex items-center gap-1">
                <span class="text-xs font-semibold text-gray-500 currency-symbol">€</span>
                <input type="text" placeholder="Cost" value="${cost}" class="tp-cost text-xs p-1.5 border rounded w-full">
            </div>
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
            <div class="md:col-span-5 flex items-center gap-1">
                <span class="text-xs font-semibold text-gray-500 currency-symbol">€</span>
                <input type="number" step="0.01" min="0" placeholder="Amount" value="${amount}" class="cost-amount text-xs p-1.5 border rounded w-full">
            </div>
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
const ORIGINAL_PAGE_TITLE = document.title;

function buildCustomerPdfFilename() {
    normalizeServiceOrderNumber();

    const date = document.getElementById('date')?.value || 'NoDate';
    const site = document.getElementById('customer-site')?.value || 'UnknownSite';
    const ig = document.getElementById('installation-group')?.value || 'NoIG';
    const so = document.getElementById('service-order')?.value || 'NoSO';

    // Verwijder tekens die niet in bestandsnamen mogen, en vervang spaties door underscores.
    const sanitize = (s) => s.trim().replace(/[\\/:*?"<>|]/g, '').replace(/\s+/g, '_');

    return `${sanitize(date)}_${sanitize(site)}_${sanitize(ig)}_${sanitize(so)}`;
}

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

    // De browser gebruikt de pagina-titel als standaard bestandsnaam bij
    // 'Opslaan als PDF' — daarom zetten we die hier tijdelijk om.
    document.title = buildCustomerPdfFilename();

    window.print();
}

// Zodra het printvenster sluit (geprint of geannuleerd), alles weer normaal zetten.
window.addEventListener('afterprint', () => {
    document.body.classList.remove('print-customer-mode');
    document.title = ORIGINAL_PAGE_TITLE;
});

// ==========================================
// EMAIL KLANT (mailto:)
// ==========================================
const ACTIVITIES_COMPLETED_I18N_KEY = { Yes: 'optYes', Partly: 'optPartly', No: 'optNo' };
const FOLLOWUP_OWNER_I18N_KEY = {
    'Planning': 'ownerPlanning', 'Job Prep': 'ownerJobPrep', 'Customer Support': 'ownerCustomerSupport',
    'Sales / Account Manager': 'ownerSales', 'Technical Support': 'ownerTechSupport', 'Other': 'ownerOther'
};
const FOLLOWUP_PRIORITY_I18N_KEY = { High: 'prioHigh', Normal: 'prioNormal', Low: 'prioLow' };

// Bouwt de {to, subject, body} voor de klant-e-mail op, los van mailto-specifieke encodering —
// zo is dit later herbruikbaar voor een ander verzendkanaal zonder deze logica te dupliceren.
function buildEmailSummary() {
    const lang = localStorage.getItem('fortna_lang') || 'en';
    const t = translations[lang];

    const to = document.getElementById('customer-email')?.value?.trim() || '';
    const site = document.getElementById('customer-site')?.value?.trim() || '';
    const so = document.getElementById('service-order')?.value?.trim() || '';
    const date = document.getElementById('date')?.value || '';

    const activitiesRaw = document.querySelector('input[name="activities-completed"]:checked')?.value || '';
    const ownerRaw = document.querySelector('input[name="followup-owner"]:checked')?.value || '';
    const priorityRaw = document.querySelector('input[name="followup-priority"]:checked')?.value || '';

    const activitiesLabel = ACTIVITIES_COMPLETED_I18N_KEY[activitiesRaw] ? t[ACTIVITIES_COMPLETED_I18N_KEY[activitiesRaw]] : '';
    const ownerLabel = FOLLOWUP_OWNER_I18N_KEY[ownerRaw] ? t[FOLLOWUP_OWNER_I18N_KEY[ownerRaw]] : '';
    const priorityLabel = FOLLOWUP_PRIORITY_I18N_KEY[priorityRaw] ? t[FOLLOWUP_PRIORITY_I18N_KEY[priorityRaw]] : '';

    const subject = t.emailSubjectTemplate.replace('{site}', site).replace('{so}', so);

    const lines = [
        t.emailGreeting, '',
        t.emailIntro.replace('{date}', date), '',
        `- ${t.emailLabelSite}: ${site}`,
        `- ${t.emailLabelSO}: ${so}`,
        `- ${t.emailLabelDate}: ${date}`
    ];
    if (activitiesLabel) lines.push(`- ${t.emailLabelActivitiesCompleted}: ${activitiesLabel}`);
    if (ownerLabel) lines.push(`- ${t.emailLabelFollowUpOwner}: ${ownerLabel}`);
    if (priorityLabel) lines.push(`- ${t.emailLabelFollowUpPriority}: ${priorityLabel}`);
    lines.push('', t.emailPdfReminder, '', t.emailClosing);

    return { to, subject, body: lines.join('\n') };
}

// Opent de mail-app van de monteur met een vooraf ingevulde samenvatting. Geen bijlage mogelijk
// via mailto: — de monteur voegt de zojuist opgeslagen PDF er zelf aan toe.
function emailCustomerSummary() {
    const lang = localStorage.getItem('fortna_lang') || 'en';
    const { to, subject, body } = buildEmailSummary();

    if (!to) {
        alert(translations[lang].msgEmailNoAddress);
        return;
    }

    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

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

    checkAutoSaveRecovery();
    setupRequiredFieldValidationClearing();
    setInterval(autoSaveSilent, 30000);

    attachVoiceInput('work-performed-desc');
    attachVoiceInput('malfunction-desc');
    attachVoiceInput('remaining-work-desc');
    attachVoiceInput('additional-work-desc');
});
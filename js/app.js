
document.addEventListener("DOMContentLoaded", function () {
    const step0 = document.getElementById("step0");
    const step1 = document.getElementById("step1");
    const step2 = document.getElementById("step2");
    const timerEl = document.getElementById("modal_timer_text");
    const progressBar = document.getElementById("progress-bar");
    const badge = document.querySelector(".badge");
    const sheet = document.getElementById("sheet"); 
    const backdrop = document.getElementById("backdrop");
    const okBtn = document.getElementById("okBtn");
    const dayName = document.getElementById("dayName");
    const dateText = document.getElementById("dateText");
    const isChromeIOS = /CriOS/.test(navigator.userAgent);
  
    if (!step0 || !step1 || !step2) return;

    let totalSeconds = 60;
    let timerStarted = false;
    let switched = false;
    let intervalId = null;

  const translations = {
    en: {
      iphone_security_title: "iPhone Security",
      scanning_in_progress_status: "Scanning in progress...",
      scan_result_label: "Result:",
      iphone_has_been_text_line: "iPhone has been",
      hacked_result_label: "HACKED",
      tap_to_protect_prompt: "Tap to Protect",
      top_title_apple: "Apple Security",
      bottom_title_alert: "Alert",
      warning_label: "Warning!",
      headline_text: "Your Apple iPhone\nhas been hacked.",
      text: "All activities on your device are being <strong>monitored by a hacker.</strong> Immediate action is necessary to protect your data and privacy.",
      text1: "<strong>Your phone is infected.</strong> Your personal data may be stolen. Tap OK to clean and secure your device immediately.",
      text2: "To fix the problem, you need to download app to activate Cleaner data protection.",
      sheet_title: "YOUR IPHONE HAS BEEN COMPROMISED",
      sheet_subtitle: "Immediate action is required!",
      okBtn: "OK",
    },
    fr: {
      iphone_security_title: "Sécurité iPhone",
      scanning_in_progress_status: "Analyse en cours...",
      scan_result_label: "Résultat :",
      iphone_has_been_text_line: "L’iPhone a été",
      hacked_result_label: "PIRATÉ",
      tap_to_protect_prompt: "Touchez pour protéger",
      top_title_apple: "Sécurité Apple",
      bottom_title_alert: "Alerte",
      warning_label: "Avertissement !",
      headline_text: "Votre Apple iPhone\na été piraté.",
      text: "Toutes les activités sur votre appareil sont <strong>surveillées par un hacker.</strong> Une action immédiate est nécessaire pour protéger vos données et votre vie privée.",
      text1: "<strong>Votre téléphone est infecté.</strong> Vos données personnelles peuvent être volées. Appuyez sur OK pour nettoyer et sécuriser votre appareil immédiatement.",
      text2: "Pour résoudre le problème, vous devez télécharger une application pour activer la protection des données Cleaner.",
      sheet_title: "VOTRE IPHONE A ÉTÉ COMPROMIS",
      sheet_subtitle: "Une action immédiate est requise !",
      okBtn: "OK",
    },
    "pt-PT": {
      iphone_security_title: "Segurança do iPhone",
      scanning_in_progress_status: "Verificação em curso...",
      scan_result_label: "Resultado:",
      iphone_has_been_text_line: "O iPhone foi",
      hacked_result_label: "COMPROMETIDO",
      tap_to_protect_prompt: "Toque para proteger",
      top_title_apple: "Segurança Apple",
      bottom_title_alert: "Alerta",
      warning_label: "Aviso!",
      headline_text: "O seu Apple iPhone\nfoi comprometido.",
      text: "Todas as atividades no seu dispositivo estão a ser <strong>monitorizadas por um hacker.</strong> É necessária uma ação imediata para proteger os seus dados e a sua privacidade.",
      text1: "<strong>O seu telefone está infetado.</strong> Os seus dados pessoais podem ser roubados. Toque em OK para limpar e proteger o seu dispositivo imediatamente.",
      text2: "Para resolver o problema, precisa de transferir uma aplicação para ativar a proteção de dados do Cleaner.",
      sheet_title: "O SEU IPHONE FOI COMPROMETIDO",
      sheet_subtitle: "É necessária uma ação imediata!",
      okBtn: "OK",
    },
    "pt-BR": {
      iphone_security_title: "Segurança do iPhone",
      scanning_in_progress_status: "Verificação em andamento...",
      scan_result_label: "Resultado:",
      iphone_has_been_text_line: "O iPhone foi",
      hacked_result_label: "INVADIDO",
      tap_to_protect_prompt: "Toque para proteger",
      top_title_apple: "Segurança Apple",
      bottom_title_alert: "Alerta",
      warning_label: "Aviso!",
      headline_text: "Seu Apple iPhone\nfoi invadido.",
      text: "Todas as atividades no seu dispositivo estão sendo <strong>monitoradas por um hacker.</strong> Ação imediata é necessária para proteger seus dados e privacidade.",
      text1: "<strong>Seu telefone está infectado.</strong> Seus dados pessoais podem ser roubados. Toque em OK para limpar e proteger seu dispositivo imediatamente.",
      text2: "Para corrigir o problema, você precisa baixar um aplicativo para ativar a proteção de dados do Cleaner.",
      sheet_title: "SEU IPHONE FOI COMPROMETIDO",
      sheet_subtitle: "Ação imediata é necessária!",
      okBtn: "OK",
    },
    es: {
      iphone_security_title: "Seguridad del iPhone",
      scanning_in_progress_status: "Escaneo en curso...",
      scan_result_label: "Resultado:",
      iphone_has_been_text_line: "El iPhone ha sido",
      hacked_result_label: "HACKEADO",
      tap_to_protect_prompt: "Toca para proteger",
      top_title_apple: "Seguridad de Apple",
      bottom_title_alert: "Alerta",
      warning_label: "¡Advertencia!",
      headline_text: "Tu Apple iPhone\nha sido hackeado.",
      text: "Todas las actividades en tu dispositivo están siendo <strong>monitoreadas por un hacker.</strong> Se requiere una acción inmediata para proteger tus datos y privacidad.",
      text1: "<strong>Tu teléfono está infectado.</strong> Tus datos personales pueden ser robados. Toca OK para limpiar y asegurar tu dispositivo de inmediato.",
      text2: "Para solucionar el problema, necesitas descargar una aplicación para activar la protección de datos de Cleaner.",
      sheet_title: "TU IPHONE HA SIDO COMPROMETIDO",
      sheet_subtitle: "¡Se requiere acción inmediata!",
      okBtn: "OK",
    },
    "es-419": {
      iphone_security_title: "Seguridad del iPhone",
      scanning_in_progress_status: "Escaneo en curso...",
      scan_result_label: "Resultado:",
      iphone_has_been_text_line: "El iPhone ha sido",
      hacked_result_label: "COMPROMETIDO",
      tap_to_protect_prompt: "Toca para proteger",
      top_title_apple: "Seguridad de Apple",
      bottom_title_alert: "Alerta",
      warning_label: "¡Advertencia!",
      headline_text: "Tu Apple iPhone\nha sido comprometido.",
      text: "Todas las actividades en tu dispositivo están siendo <strong>monitoreadas por un hacker.</strong> Se requiere acción inmediata para proteger tus datos y privacidad.",
      text1: "<strong>Tu teléfono está infectado.</strong> Tus datos personales pueden ser robados. Toca OK para limpiar y proteger tu dispositivo de inmediato.",
      text2: "Para solucionar el problema, necesitas descargar una app para activar la protección de datos de Cleaner.",
      sheet_title: "TU IPHONE HA SIDO COMPROMETIDO",
      sheet_subtitle: "¡Se requiere acción inmediata!",
      okBtn: "OK",
    },
    da: {
      iphone_security_title: "iPhone-sikkerhed",
      scanning_in_progress_status: "Scanning i gang...",
      scan_result_label: "Resultat:",
      iphone_has_been_text_line: "iPhone er blevet",
      hacked_result_label: "HACKET",
      tap_to_protect_prompt: "Tryk for at beskytte",
      top_title_apple: "Apple-sikkerhed",
      bottom_title_alert: "Advarsel",
      warning_label: "Advarsel!",
      headline_text: "Din Apple iPhone\ner blevet hacket.",
      text: "Alle aktiviteter på din enhed bliver <strong>overvåget af en hacker.</strong> Øjeblikkelig handling er nødvendig for at beskytte dine data og dit privatliv.",
      text1: "<strong>Din telefon er inficeret.</strong> Dine personlige data kan blive stjålet. Tryk på OK for straks at rense og sikre din enhed.",
      text2: "For at løse problemet skal du downloade en app for at aktivere Cleaner-databeskyttelse.",
      sheet_title: "DIN IPHONE ER BLEVET KOMPROMITTERET",
      sheet_subtitle: "Øjeblikkelig handling er påkrævet!",
      okBtn: "OK",
    },
    ja: {
      iphone_security_title: "iPhoneセキュリティ",
      scanning_in_progress_status: "スキャン中...",
      scan_result_label: "結果:",
      iphone_has_been_text_line: "iPhoneは",
      hacked_result_label: "ハッキングされました",
      tap_to_protect_prompt: "タップして保護",
      top_title_apple: "Appleセキュリティ",
      bottom_title_alert: "警告",
      warning_label: "警告!",
      headline_text: "あなたのApple iPhoneは\nハッキングされました。",
      text: "お使いのデバイス上のすべての活動は<strong>ハッカーによって監視されています。</strong> データとプライバシーを保護するために、直ちに対応が必要です。",
      text1: "<strong>あなたの電話は感染しています。</strong> 個人データが盗まれる可能性があります。OKをタップして、すぐにデバイスをクリーンアップし保護してください。",
      text2: "問題を解決するには、Cleanerデータ保護を有効にするためのアプリをダウンロードする必要があります。",
      sheet_title: "あなたのIPHONEは侵害されています",
      sheet_subtitle: "直ちに対応が必要です！",
      okBtn: "OK",
    },
    fil: {
      iphone_security_title: "Seguridad ng iPhone",
      scanning_in_progress_status: "Isinasagawa ang pag-scan...",
      scan_result_label: "Resulta:",
      iphone_has_been_text_line: "Ang iPhone ay",
      hacked_result_label: "NA-HACK",
      tap_to_protect_prompt: "I-tap para protektahan",
      top_title_apple: "Seguridad ng Apple",
      bottom_title_alert: "Babala",
      warning_label: "Babala!",
      headline_text: "Ang iyong Apple iPhone\nay na-hack.",
      text: "Lahat ng aktibidad sa iyong device ay <strong>mino-monitor ng isang hacker.</strong> Kailangan ng agarang aksyon upang maprotektahan ang iyong data at privacy.",
      text1: "<strong>Ang iyong telepono ay nahawahan.</strong> Maaaring manakaw ang iyong personal na data. I-tap ang OK upang linisin at protektahan agad ang iyong device.",
      text2: "Upang ayusin ang problema, kailangan mong mag-download ng app upang ma-activate ang proteksyon ng data ng Cleaner.",
      sheet_title: "NAKOMPROMISO ANG IYONG IPHONE",
      sheet_subtitle: "Kinakailangan ang agarang aksyon!",
      okBtn: "OK",
    },
    de: {
      iphone_security_title: "iPhone-Sicherheit",
      scanning_in_progress_status: "Scan läuft...",
      scan_result_label: "Ergebnis:",
      iphone_has_been_text_line: "Das iPhone wurde",
      hacked_result_label: "GEHACKT",
      tap_to_protect_prompt: "Tippen zum Schützen",
      top_title_apple: "Apple-Sicherheit",
      bottom_title_alert: "Warnung",
      warning_label: "Warnung!",
      headline_text: "Ihr Apple iPhone\nwurde gehackt.",
      text: "Alle Aktivitäten auf Ihrem Gerät werden <strong>von einem Hacker überwacht.</strong> Sofortiges Handeln ist erforderlich, um Ihre Daten und Ihre Privatsphäre zu schützen.",
      text1: "<strong>Ihr Telefon ist infiziert.</strong> Ihre persönlichen Daten könnten gestohlen werden. Tippen Sie auf OK, um Ihr Gerät sofort zu bereinigen und zu sichern.",
      text2: "Um das Problem zu beheben, müssen Sie eine App herunterladen, um den Cleaner-Datenschutz zu aktivieren.",
      sheet_title: "IHR IPHONE WURDE KOMPROMITTIERT",
      sheet_subtitle: "Sofortiges Handeln ist erforderlich!",
      okBtn: "OK",
    },
    nb: {
      iphone_security_title: "iPhone-sikkerhet",
      scanning_in_progress_status: "Skanning pågår...",
      scan_result_label: "Resultat:",
      iphone_has_been_text_line: "iPhone har blitt",
      hacked_result_label: "HACKET",
      tap_to_protect_prompt: "Trykk for å beskytte",
      top_title_apple: "Apple-sikkerhet",
      bottom_title_alert: "Varsel",
      warning_label: "Advarsel!",
      headline_text: "Din Apple iPhone\nhar blitt hacket.",
      text: "Alle aktiviteter på enheten din blir <strong>overvåket av en hacker.</strong> Umiddelbar handling er nødvendig for å beskytte dine data og ditt personvern.",
      text1: "<strong>Telefonen din er infisert.</strong> Dine personlige data kan bli stjålet. Trykk OK for å rense og sikre enheten din umiddelbart.",
      text2: "For å løse problemet må du laste ned en app for å aktivere Cleaner-databeskyttelse.",
      sheet_title: "DIN IPHONE ER KOMPROMITTERT",
      sheet_subtitle: "Umiddelbar handling er nødvendig!",
      okBtn: "OK",
    },
    sv: {
      iphone_security_title: "iPhone-säkerhet",
      scanning_in_progress_status: "Skanning pågår...",
      scan_result_label: "Resultat:",
      iphone_has_been_text_line: "iPhone har blivit",
      hacked_result_label: "HACKAD",
      tap_to_protect_prompt: "Tryck för att skydda",
      top_title_apple: "Apple-säkerhet",
      bottom_title_alert: "Varning",
      warning_label: "Varning!",
      headline_text: "Din Apple iPhone\nhar blivit hackad.",
      text: "Alla aktiviteter på din enhet <strong>övervakas av en hacker.</strong> Omedelbar åtgärd krävs för att skydda dina data och din integritet.",
      text1: "<strong>Din telefon är infekterad.</strong> Dina personuppgifter kan bli stulna. Tryck på OK för att omedelbart rensa och säkra din enhet.",
      text2: "För att åtgärda problemet måste du ladda ner en app för att aktivera Cleaner-dataskydd.",
      sheet_title: "DIN IPHONE HAR KOMPROMETTERATS",
      sheet_subtitle: "Omedelbar åtgärd krävs!",
      okBtn: "OK",
    },
    it: {
      iphone_security_title: "Sicurezza iPhone",
      scanning_in_progress_status: "Scansione in corso...",
      scan_result_label: "Risultato:",
      iphone_has_been_text_line: "L’iPhone è stato",
      hacked_result_label: "HACKERATO",
      tap_to_protect_prompt: "Tocca per proteggere",
      top_title_apple: "Sicurezza Apple",
      bottom_title_alert: "Avviso",
      warning_label: "Avviso!",
      headline_text: "Il tuo Apple iPhone\nè stato hackerato.",
      text: "Tutte le attività sul tuo dispositivo sono <strong>monitorate da un hacker.</strong> È necessaria un’azione immediata per proteggere i tuoi dati e la tua privacy.",
      text1: "<strong>Il tuo telefono è infetto.</strong> I tuoi dati personali potrebbero essere rubati. Tocca OK per pulire e proteggere immediatamente il tuo dispositivo.",
      text2: "Per risolvere il problema, devi scaricare un’app per attivare la protezione dei dati di Cleaner.",
      sheet_title: "IL TUO IPHONE È STATO COMPROMESSO",
      sheet_subtitle: "È necessaria un’azione immediata!",
      okBtn: "OK",
    },
    nl: {
      iphone_security_title: "iPhone-beveiliging",
      scanning_in_progress_status: "Scannen bezig...",
      scan_result_label: "Resultaat:",
      iphone_has_been_text_line: "De iPhone is",
      hacked_result_label: "GEHACKT",
      tap_to_protect_prompt: "Tik om te beschermen",
      top_title_apple: "Apple-beveiliging",
      bottom_title_alert: "Waarschuwing",
      warning_label: "Waarschuwing!",
      headline_text: "Je Apple iPhone\nis gehackt.",
      text: "Alle activiteiten op je apparaat worden <strong>gemonitord door een hacker.</strong> Directe actie is nodig om je gegevens en privacy te beschermen.",
      text1: "<strong>Je telefoon is geïnfecteerd.</strong> Je persoonlijke gegevens kunnen worden gestolen. Tik op OK om je apparaat onmiddellijk te reinigen en te beveiligen.",
      text2: "Om het probleem op te lossen, moet je een app downloaden om Cleaner-gegevensbescherming te activeren.",
      sheet_title: "JE IPHONE IS GECOMPROMITTEERD",
      sheet_subtitle: "Directe actie is vereist!",
      okBtn: "OK",
    },
    ro: {
      iphone_security_title: "Securitate iPhone",
      scanning_in_progress_status: "Scanare în curs...",
      scan_result_label: "Rezultat:",
      iphone_has_been_text_line: "iPhone-ul a fost",
      hacked_result_label: "HACKUIT",
      tap_to_protect_prompt: "Atinge pentru protecție",
      top_title_apple: "Securitate Apple",
      bottom_title_alert: "Alertă",
      warning_label: "Avertisment!",
      headline_text: "Apple iPhone-ul tău\na fost hackuit.",
      text: "Toate activitățile de pe dispozitivul tău sunt <strong>monitorizate de un hacker.</strong> Este necesară o acțiune imediată pentru a-ți proteja datele și confidențialitatea.",
      text1: "<strong>Telefonul tău este infectat.</strong> Datele tale personale pot fi furate. Atinge OK pentru a curăța și securiza imediat dispozitivul.",
      text2: "Pentru a rezolva problema, trebuie să descarci o aplicație pentru a activa protecția datelor Cleaner.",
      sheet_title: "IPHONE-UL TĂU A FOST COMPROMIS",
      sheet_subtitle: "Este necesară o acțiune imediată!",
      okBtn: "OK",
    },
  };


  const currentLocale = (navigator && navigator.language) || "en";

  const getLocale = () => {
    if (translations[currentLocale]) return currentLocale;

    const shortLocale = currentLocale.slice(0, 2);
    if (translations[shortLocale]) return shortLocale;

    return "en";
  };

  const locale = getLocale();
  const t = translations[locale] || translations.en;

  document.documentElement.lang = locale;

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function setHTML(id, value) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = value;
}

  setText("iphone_security_title", t.iphone_security_title);
  setText("scanning_in_progress_status", t.scanning_in_progress_status);
  setText("scan_result_label", t.scan_result_label);
  setText("iphone_has_been_text_line", t.iphone_has_been_text_line);
  setText("hacked_result_label", t.hacked_result_label);
  setText("tap_to_protect_prompt", t.tap_to_protect_prompt);
  setText("top_title_apple", t.top_title_apple);
  setText("bottom_title_alert", t.bottom_title_alert);
  setText("warning_label", t.warning_label);
  setText("headline_text", t.headline_text);
  setHTML("text", t.text);
  setHTML("text1", t.text1);
  setText("text2", t.text2);
  setText("sheet_title", t.sheet_title);
  setText("sheet_subtitle", t.sheet_subtitle);
  setText("okBtn", t.okBtn);

    function showStep(step) {
        step0.classList.remove("active");
        step1.classList.remove("active");
        step2.classList.remove("active");

        step.classList.add("active");
    }

    function initBadgeAnimation() {
  const badge = document.querySelector("#step1 .settings-badge, #step1 .badge");
  if (!badge) return;

  const targetNumber = 41;
  const startNumber = 35;

  const numberContainer = document.createElement("div");
  numberContainer.className = "badge-scroll-container";


  for (let i = targetNumber; i >= startNumber; i--) {
    const span = document.createElement("span");
    span.className = "badge-number";
    span.textContent = i;
    numberContainer.appendChild(span);
  }


  badge.innerHTML = "";
  badge.appendChild(numberContainer);


  const firstItem = numberContainer.querySelector(".badge-number");
  const numberHeight = firstItem.offsetHeight;

  const scrollDistance = (targetNumber - startNumber) * numberHeight;


  numberContainer.style.transform = `translateY(-${scrollDistance}px)`;
  numberContainer.style.transition = "none";


  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      numberContainer.style.transition =
        "transform 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)";
      numberContainer.style.transform = "translateY(0)";
    });
  });
}
    
function openStep1() {
  showStep(step1);

  setTimeout(() => {
    initBadgeAnimation();
  }, 50);

  if (progressBar) {
    progressBar.style.width = "0%";

    setTimeout(() => {
      progressBar.style.width = "100%";
    }, 50);
  }

  setTimeout(() => {
    showStep(step2);
  }, 1800);
}

    function renderTimer() {
        if (!timerEl) return;

        const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
        const seconds = String(totalSeconds % 60).padStart(2, "0");
        timerEl.textContent = `${minutes}:${seconds}`;
    }

function setCurrentDate() {
  if (!dayName || !dateText) return;

  const now = new Date();

  const weekday = now.toLocaleDateString(locale, {
    weekday: "long"
  });

  const fullDate = now.toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  dayName.textContent = weekday;
  dateText.textContent = fullDate;
}

function openSheet() {
  if (!sheet || !backdrop) return;

  sheet.classList.add("active");
  backdrop.classList.add("active");
  sheet.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeSheet() {
  if (!sheet || !backdrop) return;

  sheet.classList.remove("active");
  backdrop.classList.remove("active");
  sheet.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}


function handleOk() {
  closeSheet();
  openStep1();
}

if (isChromeIOS) {
  document.body.classList.add('chrome-ios');
}

if (okBtn) {
  okBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    handleOk();
  });
}

document.addEventListener("click", (e) => {
  if (!sheet || !sheet.classList.contains("active")) return;

  const clickedInsideSheet = sheet.contains(e.target);
  if (!clickedInsideSheet) {
    handleOk();
  }
});

window.addEventListener("load", () => {
  setCurrentDate();
  setTimeout(openSheet, 550);
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeSheet();
  }
});
});

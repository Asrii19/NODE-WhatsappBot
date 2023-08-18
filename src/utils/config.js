// READY
const msgChat = "Jordan de mierda deja de ser emo. Bot listo...";
const nombreChat = "Logia No a las Locas De Mierda";
// COMANDOS
const prefix="!";
const comandos={
  sticker:`${prefix}sticker`,
  audio:`${prefix}audio`,
  help:`${prefix}help`,
};
// STICKER
let banderaSticker = true;
const cfgSticker={
  sendMediaAsSticker: true,
  stickerAuthor: "Hecho por mi alterEgo, Asri",
  stickerName: "Ve nomás ya no somos duo imbecil",
};
// AUDIO
const LANGUAGES = {
  af: "Afrikaans",
  sq: "Albanian",
  ar: "Arabic",
  hy: "Armenian",
  ca: "Catalan",
  zh: "Chinese",
  hr: "Croatian",
  cs: "Czech",
  da: "Danish",
  nl: "Dutch",
  en: "English",
  eo: "Esperanto",
  fi: "Finnish",
  fr: "French",
  de: "German",
  el: "Greek",
  ht: "Haitian Creole",
  hi: "Hindi",
  hu: "Hungarian",
  is: "Icelandic",
  id: "Indonesian",
  it: "Italian",
  ja: "Japanese",
  ko: "Korean",
  la: "Latin",
  lv: "Latvian",
  mk: "Macedonian",
  no: "Norwegian",
  pl: "Polish",
  pt: "Portuguese",
  ro: "Romanian",
  ru: "Russian",
  sr: "Serbian",
  sk: "Slovak",
  es: "Spanish",
  sw: "Swahili",
  sv: "Swedish",
  ta: "Tamil",
  th: "Thai",
  tr: "Turkish",
  vi: "Vietnamese",
  cy: "Welsh",
};
module.exports = {
    LANGUAGES,
    cfgSticker,
    prefix,
    comandos,
    banderaSticker,
    msgChat,
    nombreChat,
};

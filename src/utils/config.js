import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// READY
const msgChat = "Chapa ogt, no saques tu Badang. Bot listo...";
const nombreChat = "Paltas de la Ley 🥑";
// COMANDOS
const prefix="$";
const comandos={
  sticker:`${prefix}sticker`,
  audio:`${prefix}audio`,
  help:`${prefix}help`,
  yt:`${prefix}yt`,
};
// MEDIA PATH
const mediaPath = resolve(__dirname, "../../download/");
// STICKER
let banderaSticker = true;
const cfgSticker={
  sendMediaAsSticker: true,
  stickerAuthor: "Hecho por mi alterEgo, Asri",
  stickerName: "Chapa puto",
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
export {
    LANGUAGES,
    cfgSticker,
    prefix,
    comandos,
    banderaSticker,
    msgChat,
    nombreChat,
    mediaPath,
};

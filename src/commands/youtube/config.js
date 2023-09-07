const config = require("../../utils/config");
const command = config.comandos.yt;
const mediaPath = config.mediaPath;

const Audio = require("./models/audio");
const Video = require("./models/video");

let yt_parameters = {
  a: new Audio(),
  audio: new Audio(),
  v: new Video(),
  video: new Video(),
};
const duracionMedia ={
  duracionMaximaSegundo:600,
}
const errores = {
  errorDuracion: `Duración límite excedido, el video no debe durar más de *${duracionMedia.duracionMaximaSegundo/60} minutos*.`,
  errorParameter: "Parámetro no encontrado, escriba *-v* antes del link para elegir el *modo video*.",
  errorCatch: "Oops, hubo un problema. Trataré de solucionarlo ahora^-^.",
}

module.exports = {
  yt_parameters,
  command,
  mediaPath,
  duracionMedia,
  errores,
}
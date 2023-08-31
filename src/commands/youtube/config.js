const converter = require("./converter");
const config = require("../../utils/config");
const command = config.comandos.yt;
const mediaPath = config.mediaPath;

const modelos = {
  audio: {
    name:"audio",
    filename: `audio_${Date.now()}`,
    extension: ".mp3",
    converter: converter.mp4tomp3,
  },
  video: {
    name:"video",
    filename: `video_${Date.now()}`,
    extension: ".mp4",
  },
};
let yt_parameters = {
  a: modelos.audio,
  audio: modelos.audio,
  v: modelos.video,
  video: modelos.video,
  errorParameter: "Parámetro no encontrado, escriba *-v* antes del link para elegir el *modo video*.",
};
const duracionMedia ={
  duracionMaximaSegundo:600,
  errorDuracion: `Duración límite excedido, el video no debe durar más de *${duracionMedia.duracionMaximaSegundo/60} minutos*.`,
}

module.exports = {
  yt_parameters,
  command,
  modelos,
  mediaPath,
  duracionMedia,
}
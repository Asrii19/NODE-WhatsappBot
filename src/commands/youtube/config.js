const converter = require("./downloader/converter");
const config = require("../../utils/config");
const command = config.comandos.yt;
const mediaPath = config.mediaPath;

const caracteristicas = {
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
  a: caracteristicas.audio,
  audio: caracteristicas.audio,
  v: caracteristicas.video,
  video: caracteristicas.video,
  errorParameter: "Parámetro no encontrado, escriba *-v* antes del link para elegir el *modo video*.",
};
const caracteristicasMedia ={
  duracionMaximaSegundo:540,
  errorDuracion:"Duración límite excedido, el video *no debe durar más de 10 minutos*.",
}
module.exports = {
  yt_parameters,
  command,
  caracteristicas,
  mediaPath,
  caracteristicasMedia,
}
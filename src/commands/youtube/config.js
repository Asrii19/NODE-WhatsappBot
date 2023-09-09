const config = require("../../utils/config");
const command = config.comandos.yt;

const Audio = require("./models/audio");
const Video = require("./models/video");

const yt_parameters = (parameter)=>{
  switch (parameter){
    case "a": return new Audio();
    case "audio": return new Audio();
    case "v": return new Video();
    case "video": return new Video();
    default: throw new Error("errorParameter");
  }
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
  duracionMedia,
  errores,
}
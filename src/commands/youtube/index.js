const ytdl = require("ytdl-core");
const { MessageMedia } = require("whatsapp-web.js");
const fs = require("fs");
const config = require("./config");
const gmethods = require("../../utils/global_methods");
const path = require("path");
const downloader = require("./downloader");
const searcher = require("./searcher");

const obtenerModel = (parameter) => {
  let model;
  !parameter
    ? (parameter = "video")
    : null;
  parameter in config.yt_parameters
    ? (model = config.yt_parameters[parameter])
    : (model = config.yt_parameters.errorParameter);
  return model;
};
const verificarDuracionVideo = async (url)=>{
  try {
    const info = await ytdl.getInfo(url);
    const duracionVideoSegundos = info.videoDetails.lengthSeconds;
    if (duracionVideoSegundos <= config.duracionMedia.duracionMaximaSegundo) return true; else return false;
  }catch(err){
    console.log(err);
  }
}
const obtenerMedia = async (msg) => {
  // Obtener información del comando (parametros y url)
  const comando = config.command;
  const contentWithoutCommand = msg.body.slice(comando.length).trim();
  const { parameter, contenido } = gmethods.extractSingleParameter(contentWithoutCommand);
  let model, msgMedia, media, url, fullPath;

  // Obtengo el modelo de media pedido
  try {
    model = obtenerModel(parameter); //se obtiene el model dependiendo si es video u otro
    fullPath = path.join(config.mediaPath, `/${model.filename}.mp4`); //primero se descarga el mp4
    if (model===config.yt_parameters.errorParameter) throw model;
  } catch (err) {
    return err;
  }

  // Se obtiene el id del video pedido
  try {
    if (gmethods.esEnlace(contenido)) url=contenido.trim(); 
    else url = await searcher.obtenerEnlacePrimerVideo(contenido);
  } catch (err) {
    return err;
  }
  
  // Se verifica la disponibilidad en cuanto duracion
  const disponibilidad = await verificarDuracionVideo(url);
  if (!disponibilidad) return config.duracionMedia.errorDuracion;
  
  // Se descarga el media
  [media,fullPath] = await downloader.download(url,model,fullPath);
  
  msgMedia = MessageMedia.fromFilePath(media);
  fs.unlinkSync(fullPath);
  return msgMedia;
};

module.exports = {
  obtenerMedia,
};

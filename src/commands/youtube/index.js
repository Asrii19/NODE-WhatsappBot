const ytdl = require("ytdl-core");
const { MessageMedia } = require("whatsapp-web.js");
const fs = require("fs");
const config = require("./config");
const gmethods = require("../../utils/global_methods");
const downloader = require("./downloader");
const searcher = require("./searcher");

const obtenerModel = (parameter) => {
  let model;
  parameter = parameter || "video";
  model = config.yt_parameters(parameter); // Crear el model dependiendo del parametro que tenga
  return model;
};
const obtenerUrl = async (contenido) =>{
  if (gmethods.esEnlace(contenido)) return contenido.trim(); 
  else return await searcher.obtenerEnlacePrimerVideo(contenido);
}
const verificarDuracionVideo = async (url)=>{
  const info = await ytdl.getInfo(url);
  const duracionVideoSegundos = info.videoDetails.lengthSeconds;
  if (!(duracionVideoSegundos <= config.duracionMedia.duracionMaximaSegundo)) throw new Error("errorDuracion");
}
const obtenerMedia = async (msg) => {
  // Obtener información del comando (parametros y url)
  const comando = config.command;
  const contentWithoutCommand = msg.body.slice(comando.length).trim();
  const { parameter, contenido } = gmethods.extractSingleParameter(contentWithoutCommand);
  let model, msgMedia, media, url;

  try{
    model = obtenerModel(parameter); //se obtiene el model dependiendo si es video u otro
    url = await obtenerUrl(contenido); // Se obtiene el url del video pedido
    await verificarDuracionVideo(url); // Se verifica la disponibilidad en cuanto duracion
    
    [media,model.fullPath] = await downloader.download(url,model,model.fullPath); // Se descarga el media
    msgMedia = MessageMedia.fromFilePath(media);
    fs.unlinkSync(model.fullPath);
    return msgMedia;
  }catch(err){
    if(config.errores[err.message]){
      return config.errores[err.message];
    } else {
      console.log(err);
      return config.errores.errorCatch; // Mensaje por defecto
    }
  }
};

module.exports = {
  obtenerMedia,
};
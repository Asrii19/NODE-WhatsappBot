import whatsapp from "whatsapp-web.js";
const { MessageMedia } = whatsapp;
import ytdl from '@distube/ytdl-core';
const { getInfo } = ytdl;
import { unlinkSync } from "fs";
import { yt_parameters, duracionMedia, command, errores } from "./config.js";
import { esEnlace, extractSingleParameter } from "../../utils/global_methods.js";
import { download } from "./downloader/index.js";
import { obtenerEnlacePrimerVideo } from "./searcher.js";

const obtenerModel = (parameter) => {
  let model;
  parameter = parameter || "video";
  model = yt_parameters(parameter); // Crear el model dependiendo del parametro que tenga
  return model;
};
const obtenerUrl = async (contenido) =>{
  if (esEnlace(contenido)) return contenido.trim(); 
  else return await obtenerEnlacePrimerVideo(contenido);
}
const verificarDuracionVideo = async (url)=>{
  const info = await getInfo(url);
  const duracionVideoSegundos = info.videoDetails.lengthSeconds;
  if (!(duracionVideoSegundos <= duracionMedia.duracionMaximaSegundo)) throw new Error("errorDuracion");
}
const obtenerMedia = async (msg) => {
  // Obtener información del comando (parametros y url)
  const comando = command;
  const contentWithoutCommand = msg.body.slice(comando.length).trim();
  const { parameter, contenido } = extractSingleParameter(contentWithoutCommand);
  let model, msgMedia, media, url;

  try{
    model = obtenerModel(parameter); //se obtiene el model dependiendo si es video u otro
    url = await obtenerUrl(contenido); // Se obtiene el url del video pedido
    await verificarDuracionVideo(url); // Se verifica la disponibilidad en cuanto duracion
    
    [media,model.fullPath] = await download(url,model,model.fullPath); // Se descarga el media
    msgMedia = MessageMedia.fromFilePath(media);
    unlinkSync(model.fullPath);
    return msgMedia;
  }catch(err){
    if(errores[err.message]){
      return errores[err.message];
    } else {
      console.log(err);
      return errores.errorCatch; // Mensaje por defecto
    }
  }
};

export {
  obtenerMedia,
};
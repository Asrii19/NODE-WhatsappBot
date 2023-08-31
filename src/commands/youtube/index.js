const ytdl = require("ytdl-core");
const { MessageMedia } = require("whatsapp-web.js");
const fs = require("fs");
const config = require("./config");
const gmethods = require("../../utils/global_methods");
const path = require("path");
const { Console } = require("console");

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
    if (duracionVideoSegundos <= config.caracteristicasMedia.duracionMaximaSegundo) return true; else return false;
  }catch(err){
    console.log(err);
  }
}
const obtenerMedia = async (msg) => {
  // Obtener información del comando (parametros y url)
  const comando = config.command;
  const contentWithoutCommand = msg.body.slice(comando.length).trim();
  const { parameter, contenido } = gmethods.extractSingleParameter(contentWithoutCommand);
  let model, msgMedia, media, url;

  try {
    model = obtenerModel(parameter); //se obtiene el model dependiendo si es video u otro
    if (model===config.yt_parameters.errorParameter) throw model;
  } catch (err) {
    return err;
  }

  try {
    url = contenido.trim(); //se obtiene el id
  } catch (err) {
    console.log(err);
  }
  let fullPath = path.join(config.mediaPath, `/${model.filename}.mp4`); //primero se descarga el mp47
  
  const disponibilidad = await verificarDuracionVideo(url);
  if (!disponibilidad) return config.caracteristicasMedia.errorDuracion;
  
  
  try {
    const stream = ytdl(url, { filter: "audioandvideo" });
    const downloadEnd = new Promise((resolve, reject) => {
      stream
        .pipe(fs.createWriteStream(fullPath))
        .on("finish", () => resolve())
        .on("error", (error) => reject(error));
    });
    await downloadEnd;

    if (!downloadEnd) {
      // oh no i can't download this shit
    }
    if (model.name != "video") {
      [media, fullPath] = await model.converter(fullPath);
      console.log(fullPath);
    } else {
      media = fullPath;
    }
  } catch (err) {
    console.error("An error occurred:", err.message);
  }
  msgMedia = MessageMedia.fromFilePath(media);
  fs.unlinkSync(fullPath);
  return msgMedia;
};

module.exports = {
  obtenerMedia,
};

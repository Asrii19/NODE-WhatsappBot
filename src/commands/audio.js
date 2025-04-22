import whatsapp from "whatsapp-web.js";
const { MessageMedia } = whatsapp;
import { resolve as _resolve } from "path";
import gtts from "node-gtts";
import { unlinkSync } from "fs";
import { comandos, LANGUAGES, mediaPath } from "../utils/config.js";

const obtenerAudio = async (msg) => {
  try {
    const comando = comandos.audio;
    const contenido = msg.body.slice(comando.length).trim();
    let lan = "es";
    let texto;
    // si nos brinda idioma lo separa en 3
    if(contenido.startsWith("-")){
      lan = contenido.slice(1, 3).trim(); //guarda el idioma
      if(lan in LANGUAGES){
        texto = contenido.slice(3).trim(); //guarda el texto
      }else{
        return "Idioma *no* encontrado!";
      }
    }else{ // caso contrario en 2
      texto = contenido;
      if(!texto){
        return "Usa el comando con el formato *!audio <mensaje>* o *!audio -<idioma> <mensaje>*, ejemplo: *!audio -es Hola mundo*";
      }
    }
    const fullPath = _resolve(mediaPath,`audio_${Date.now()}.mp3`);
    let tts = gtts(lan);
    return new Promise((resolve, reject) => {
      // Crear una nueva instancia de Promise y proporcionar dos funciones de control: resolve y reject.
      tts.save(fullPath, texto, (err) => {
        // Llamar al método save de la instancia tts (que representa gtts) para generar el archivo de audio.
        // El tercer argumento es una función de devolución de llamada que se ejecutará cuando se complete o falle la generación.
        if (err) {
          // Si hay un error al generar el audio...
          console.error("Error al generar el audio:", err);
          reject("Error al generar el audio.");
          return;
          // Utilizar reject para rechazar la promesa con un mensaje de error.
        }
        // Si no hay errores...
        const msgMedia = MessageMedia.fromFilePath(fullPath);
        // Crear un objeto MessageMedia a partir del archivo de audio generado.
        unlinkSync(fullPath);
        // Eliminar el archivo de audio, ya que no se necesita después de ser enviado.
        resolve(msgMedia);
        // Utilizar resolve para resolver la promesa con el objeto MessageMedia generado.
      });
    });
  } catch (err) {
    console.error("Error en la función obtenerAudio:", err);
    throw err;
  }
};

export {
  obtenerAudio,
};

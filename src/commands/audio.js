const path = require("path");
const gtts = require("node-gtts");
const fs = require("fs");
const config = require("../utils/config");
const { MessageMedia } = require("whatsapp-web.js");

const obtenerAudio = async (msg) => {
  try {
    const comando = config.comandos.audio;
    const aux = msg.body.slice(comando.length).trim();
    const lan = aux.slice(0, 2).trim();
    let contenido = aux.slice(2).trim();

    if (!lan || !contenido) {
      return "Usa el comando con el formato **!audio <idioma> <mensaje>**, ejemplo: **!audio es Hola mundo**";
    }

    const mediaPath = path.resolve(__dirname,`../download/audio_${Date.now()}.mp3`);
    let tts;
    try {
      tts = gtts(lan);
    } catch (err) {
      tts = gtts("es");
      contenido=aux;
    }

    return new Promise((resolve, reject) => {
      // Crear una nueva instancia de Promise y proporcionar dos funciones de control: resolve y reject.
      tts.save(mediaPath, contenido, (err) => {
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
        const msgMedia = MessageMedia.fromFilePath(mediaPath);
        // Crear un objeto MessageMedia a partir del archivo de audio generado.
        fs.unlinkSync(mediaPath);
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

module.exports = {
  obtenerAudio,
};

import whatsapp from "whatsapp-web.js";
const { Client, LocalAuth } = whatsapp;
import qr from "qrcode-terminal";
const { generate } = qr;
import { comandos, banderaSticker, cfgSticker, prefix } from "./utils/config.js";
import ready from "./utils/ready.js";
import { obtenerMedia as getSticker } from "./commands/sticker.js";
import { obtenerAudio } from "./commands/audio.js";
import { obtenerMedia as getMediaYT } from "./commands/youtube/index.js";

const session = () => {
  const client = new Client({
    authStrategy: new LocalAuth({
      clientId: "client-one",
    }),
    puppeteer: {
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // Ruta de Chrome
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-sync',
        '--ignore-certificate-errors'],
      }
  });
  client.on("qr", (qr) => {
    generate(qr, { small: true });
  });

  client.on("authenticated", (session) => {
    console.log("Autenticado!");
  });

  client.on("auth_failure", (msg) => {
    console.log("auth_failure", msg);
  });
  client.on("message", async (msg) => {
    console.log(msg.body);
    if (msg.body.trim() === comandos.sticker) {
      let msgMedia = await getSticker(msg);
      banderaSticker ? client.sendMessage(msg.from, msgMedia, cfgSticker): null;
    } else if (msg.body.trim().startsWith(comandos.audio)) {
      let msgAudio = await obtenerAudio(msg);
      await client.sendMessage(msg.from, msgAudio,{
        sendAudioAsVoice: true,
      });
    } else if (msg.body.trim().startsWith(comandos.yt)) {
      let msgYt = await getMediaYT(msg);
      client.sendMessage(msg.from,msgYt); 
    } else if (
      !(msg.body.trim() in comandos) &&
      msg.body.trim().startsWith(prefix)
    ) {
      client.sendMessage(
        msg.from,
        `Comando no encontrado, prueba **${comandos.help}** (en proceso...)`
      );
    }
  });
  client.on("ready", () => {
    // ready.mensajeReady(client);
    console.log("ready");
  });
  client.on("disconnected", (reason) => {
    console.log("disconnected", reason);
  });
  return client;
};

export {
  session,
};

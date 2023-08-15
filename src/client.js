const { Client, LocalAuth } = require("whatsapp-web.js");
const config = require("./config");
const cSticker = require("./commands/sticker");
const cAudio = require("./commands/audio");
const qrcode = require("qrcode-terminal");

const session = ()=>{
  const client = new Client({
    authStrategy: new LocalAuth({
      clientId: "client-one",
    }),
  });
  client.initialize();
  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });

  client.on("authenticated", (session) => {
    console.log("Autenticado!");
  });

  client.on("auth_failure", (msg) => {
    console.log("auth_failure", msg);
  });

  client.on("ready", () => {
    console.log("ready");
  });

  client.on("message", async (msg) => {
    console.log(msg.body);
    if (msg.body.trim() === config.comandos.sticker) {
      let msgMedia = await cSticker.obtenerMedia(msg);
      client.sendMessage(msg.from,msgMedia,config.cfgSticker);
    }else if(msg.body.trim().startsWith(config.comandos.audio)){
      let msgAudio = await cAudio.obtenerAudio(msg);
      client.sendMessage(msg.from,msgAudio);
    }else{
      client.sendMessage(msg.from,`Comando no encontrado, prueba **${config.comandos.help}** (en proceso...)`)
    }
  });

  client.on("disconnected", (reason) => {
    console.log("disconnected", reason);
  });
  return client;
};

module.exports = {
  session,
};

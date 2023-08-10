const { Client, LocalAuth } = require("whatsapp-web.js");
const commands = require("./commands/sticker");
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
    console.log("message", msg.body);
    if (msg.body === "!sticker") {
      let msgMedia = await commands.obtenerMedia(msg);
      client.sendMessage(
        msg.from,
        msgMedia,
        {
          sendMediaAsSticker: true,
          stickerAuthor: "Created By Shiro",
          stickerName: "Ve nomás ya no somos duo imbecil",
        }
      );
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

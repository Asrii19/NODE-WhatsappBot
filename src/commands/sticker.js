const { MessageMedia } = require("whatsapp-web.js");
const config = require("../utils/config");
const fs = require("fs");
const mime = require("mime-types");
const path = require("path");

const obtenerMedia = async (message) => {
  if (message.hasMedia) {
    try {
      const media = await message.downloadMedia();
      if (media) {
        const mediaPath = config.mediaPath;

        if (!fs.existsSync(mediaPath)) {
          fs.mkdirSync(mediaPath);
        }

        const extension = mime.extension(media.mimetype);
        const filename = Date.now();
        const fullPath = path.join(mediaPath, `${filename}.${extension}`);

        // Guarda el archivo
        fs.writeFileSync(fullPath, media.data, {
          encoding: "base64",
        });

        console.log("File downloaded successfully!", fullPath);

        const msgMedia = MessageMedia.fromFilePath(fullPath);
        
        fs.unlinkSync(fullPath);
        return msgMedia;
      }
    } catch (err) {
      console.log("Failed to save the file:", err);
      config.banderaSticker=false;
    }
  } else {
    message.reply("Envía una imagen con el comando *!sticker*");
  }
};

module.exports = {
  obtenerMedia,
};

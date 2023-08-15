const { MessageMedia } = require("whatsapp-web.js");
const fs = require("fs");
const mime = require("mime-types");
const path = require("path");

const obtenerMedia = async (message) => {
  if (message.hasMedia) {
    try {
      const media = await message.downloadMedia();
      if (media) {
        const mediaPath = path.resolve(__dirname, "../download/");

        if (!fs.existsSync(mediaPath)) {
          fs.mkdirSync(mediaPath);
        }

        const extension = mime.extension(media.mimetype);
        const filename = new Date().getTime();
        const fullFilename = path.join(mediaPath, `${filename}.${extension}`);

        // Guarda el archivo
        fs.writeFileSync(fullFilename, media.data, {
          encoding: "base64",
        });

        console.log("File downloaded successfully!", fullFilename);

        const msgMedia = MessageMedia.fromFilePath(fullFilename);
        
        fs.unlinkSync(fullFilename);
        return msgMedia;
      }
    } catch (err) {
      console.log("Failed to save the file:", err);
      console.log("File Deleted successfully!");
    }
  } else {
    message.reply("Envía una imagen con el comando *!sticker*");
  }
};

module.exports = {
  obtenerMedia,
};

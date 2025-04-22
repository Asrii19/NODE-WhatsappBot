import whatsapp from "whatsapp-web.js";
const { MessageMedia } = whatsapp;
import { mediaPath, banderaSticker } from "../utils/config.js";
import { existsSync, mkdirSync, writeFileSync, unlinkSync } from "fs";
import { extension as _extension } from "mime-types";
import { join } from "path";

const obtenerMedia = async (message) => {
  if (message.hasMedia) {
    try {
      const media = await message.downloadMedia();
      if (media) {

        if (!existsSync(mediaPath)) {
          mkdirSync(mediaPath);
        }

        const extension = _extension(media.mimetype);
        const filename = Date.now();
        const fullPath = join(mediaPath, `${filename}.${extension}`);

        // Guarda el archivo
        writeFileSync(fullPath, media.data, {
          encoding: "base64",
        });

        console.log("File downloaded successfully!", fullPath);

        const msgMedia = MessageMedia.fromFilePath(fullPath);
        
        unlinkSync(fullPath);
        return msgMedia;
      }
    } catch (err) {
      console.log("Failed to save the file:", err);
      banderaSticker=false;
    }
  } else {
    message.reply("Envía una imagen con el comando *!sticker*");
  }
};

export {
  obtenerMedia,
};

import converter from "../converter/index.js";
import Media from "./media.js";
import { join } from "path";
import { mediaPath } from "../../../utils/config.js";

class Audio extends Media {
    constructor(name = 'audio', filename = `audio_${Date.now()}`, extension = '.mp3') {
      super(name, filename, extension);
      this.fullPath = join(mediaPath, `/${this.filename}.mp4`);
    }
    converter = converter.mp4tomp3;
  }
export default Audio;
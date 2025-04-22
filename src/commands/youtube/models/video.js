import Media from "./media.js";
import { join } from "path";
import { mediaPath } from "../../../utils/config.js";
class Video extends Media {
    constructor(name = 'video', filename = `video_${Date.now()}`, extension = '.mp4') {
      super(name, filename, extension);
      this.fullPath = join(mediaPath, `/${this.filename}${this.extension}`);
    }
  }
export default Video;
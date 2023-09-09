const Media = require("./media");
const path = require("path");
const {mediaPath} = require("../../../utils/config");
class Video extends Media {
    constructor(name = 'video', filename = `video_${Date.now()}`, extension = '.mp4') {
      super(name, filename, extension);
      this.fullPath = path.join(mediaPath, `/${this.filename}${this.extension}`);
    }
  }
module.exports = Video;
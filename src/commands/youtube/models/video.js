const Media = require("./media");
class Video extends Media {
    constructor(name = 'video', filename = `video_${Date.now()}`, extension = '.mp4') {
      super(name, filename, extension);
    }
  }
module.exports = Video;
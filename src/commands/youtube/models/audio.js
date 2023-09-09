const converter = require("../converter");
const Media = require("./media");
const path = require("path");
const {mediaPath} = require("../../../utils/config");

class Audio extends Media {
    constructor(name = 'audio', filename = `audio_${Date.now()}`, extension = '.mp3') {
      super(name, filename, extension);
      this.fullPath = path.join(mediaPath, `/${this.filename}.mp4`);
    }
    converter = converter.mp4tomp3;
  }
module.exports = Audio;
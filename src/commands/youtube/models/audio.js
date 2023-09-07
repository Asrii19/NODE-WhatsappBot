const converter = require("../converter");
const Media = require("./media");

class Audio extends Media {
    constructor(name = 'audio', filename = `audio_${Date.now()}`, extension = '.mp3') {
      super(name, filename, extension);
    }
  
    converter = converter.mp4tomp3;
  }
module.exports = Audio;
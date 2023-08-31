const FFMPEG = require("ffmpeg");
const fs = require("fs");

const mp4tomp3 = async (videoPath)=>{
    let audioPath = videoPath.split('.')[0];
    const video = await new FFMPEG(videoPath);
    const result = await video.fnExtractSoundToMP3(`${audioPath}.mp3`);

    fs.unlinkSync(`${audioPath}.mp4`);
    audioPath = audioPath+".mp3";
    return [result, audioPath];
}

module.exports = {
    mp4tomp3,
}
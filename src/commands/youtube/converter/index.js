import FFMPEG from "ffmpeg";
import { unlinkSync } from "fs";

const mp4tomp3 = async (videoPath)=>{
    let audioPath = videoPath.split('.')[0];
    const video = await new FFMPEG(videoPath);
    const result = await video.fnExtractSoundToMP3(`${audioPath}.mp3`);

    unlinkSync(`${audioPath}.mp4`);
    audioPath = audioPath+".mp3";
    return [result, audioPath];
}

export default {
    mp4tomp3,
}
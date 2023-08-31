const fs = require("fs");
const ytdl = require("ytdl-core");

const download = async (url,model,fullPath) => {
  try {
    let media, mediaPath=fullPath;
    const stream = ytdl(url, { filter: "audioandvideo" });
    const downloadEnd = new Promise((resolve, reject) => {
      stream
        .pipe(fs.createWriteStream(fullPath))
        .on("finish", () => resolve())
        .on("error", (error) => reject(error));
    });
    await downloadEnd;

    if (model.name != "video") {
      [media, mediaPath] = await model.converter(fullPath);
      return [media, mediaPath];
    } else {
      media = fullPath;
      return [media, mediaPath];
    }
  } catch (err) {
    console.error("An error occurred:", err.message);
  }
};

module.exports = {
  download,
};

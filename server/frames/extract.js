const Fs = require('fs');
const Path = require('path');
const RimRaf = require('rimraf');
const extractFrames = require('ffmpeg-extract-frames');

const getAllVideos = () =>
   Fs.readdirSync(Path.resolve(__dirname, 'videos')).filter(
      (file) => file.substr(-3) === 'mp4'
   );

const createFramesFolder = (video) => {
   const videoFolderPath = Path.resolve(
      'server/frames/frames',
      video.slice(0, -4)
   );

   try {
      RimRaf.sync(videoFolderPath);
   } catch (error) {}

   Fs.mkdirSync(videoFolderPath);

   return videoFolderPath;
};
const extractVideoFrames = async () => {
   const videos = getAllVideos();

   for (let index = 0; index < videos.length; index++) {
      const video = videos[index];

      const videoFolderPath = createFramesFolder(video);

      await extractFrames({
         input: Path.resolve(__dirname, `./videos/${video}`),
         output: Path.resolve(
            __dirname,
            Path.resolve(videoFolderPath, 'frames_%d.png')
         ),
         fps: 10,
      });
   }
};

extractVideoFrames();

module.exports = {
   getAllVideos,
};

const Fs = require('fs');
const Path = require('path');

const { getAllVideos } = require('../../frames/extract');

class VideosHandler {
   getAllVideos() {
      return getAllVideos()
         .map((video) => video.slice(0, -4))
         .map((fileName) => ({
            framesCount: Fs.readdirSync(
               Path.resolve(__dirname, '..', '..', 'frames', 'frames', fileName)
            ).length,
            fileName,
         }));
   }

   getSingleVideo(args) {
      return this.getAllVideos().find((video) => video.fileName == args.id);
   }
}

module.exports = new VideosHandler();

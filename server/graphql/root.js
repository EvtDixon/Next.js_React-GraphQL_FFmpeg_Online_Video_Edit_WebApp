const VideosHandler = require('./handlers/videos');

module.exports = {
   videos: VideosHandler.getAllVideos,
   video: VideosHandler.getSingleVideo,
};

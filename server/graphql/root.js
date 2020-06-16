const VideosHandler = require('./handlers/videos')

/**
 *
 * Define the resolvers for each query.
 * This will be required by the
 * server.js file.
 *
 */
module.exports = {
    videos: VideosHandler.getAllVideos,
    video: VideosHandler.getSingleVideo,
}

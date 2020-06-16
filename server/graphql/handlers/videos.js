const Fs = require('fs')
const Path = require('path')
const { getAllVideos } = require('../../frames/extract')

class VideosHandler {
    /**
     *
     * This method fetches all videos listed in the
     * videos folder and returns them
     */
    getAllVideos = () => {
        return getAllVideos()
            .map((video) => video.slice(0, -4))
            .map((fileName) => ({
                framesCount: Fs.readdirSync(
                    Path.resolve(
                        __dirname,
                        '..',
                        '..',
                        'frames',
                        'frames',
                        fileName
                    )
                ).length,
                fileName,
            }))
    }

    /**
     *
     * This method resolves with a single video
     * from the video folder
     */
    getSingleVideo = (args) => {
        return this.getAllVideos().find((video) => video.fileName == args.id)
    }
}

module.exports = new VideosHandler()

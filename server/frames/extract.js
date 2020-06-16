const Fs = require('fs')
const Path = require('path')
const RimRaf = require('rimraf')
const extractFrames = require('ffmpeg-extract-frames')

/**
 *
 * This method reads the videos folder, and fetches all the video
 * files in this folder. It then maps, filters out all non-video
 * files. Returns a string path of all video files.
 */
const getAllVideos = () =>
    Fs.readdirSync(Path.resolve(__dirname, 'videos')).filter(
        (file) => file.substr(-3) === 'mp4'
    )

/**
 *
 * This method checks if the frames folder for a video exists,
 * if it does not, it creates the folder. It deletes the
 * folder and creates it fresh.
 */
const createFramesFolder = (video) => {
    const videoFolderPath = Path.resolve(
        'server/frames/frames',
        video.slice(0, -4)
    )

    try {
        RimRaf.sync(videoFolderPath)
    } catch (error) {}

    Fs.mkdirSync(videoFolderPath)

    return videoFolderPath
}

/**
 *
 * This method loops through all video files, then it
 * calls the extractFrames method to extract all
 * frames, and save into the frames folder.
 */
const extractVideoFrames = async () => {
    const videos = getAllVideos()

    for (let index = 0; index < videos.length; index++) {
        const video = videos[index]

        const videoFolderPath = createFramesFolder(video)

        await extractFrames({
            input: Path.resolve(__dirname, `./videos/${video}`),
            output: Path.resolve(
                __dirname,
                Path.resolve(videoFolderPath, 'frames_%d.png')
            ),
            fps: 10,
        })
    }
}

extractVideoFrames()

module.exports = {
    getAllVideos,
}

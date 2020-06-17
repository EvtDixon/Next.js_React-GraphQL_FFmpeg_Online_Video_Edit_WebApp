# Video editing platform

## Extracting video frames
- All videos are saved in a folder server/frames/videos. Add new `.mp4` videos.
- The `server/frames/extract.js` file reads the `server/frames/videos` folder, and generates the frames into the `server/frames/frames` folder. In this folder, the frames would be saved in the `<name-of-video-file>/frames_%d.png` format. 
- Run the `yarn extract:frames` command to generate frames for videos.

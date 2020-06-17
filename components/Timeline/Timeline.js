import { useState, useEffect, Fragment } from 'react'

import LineCursor from '../LineCursor'
import RenderVideoOnTimeline from '../RenderVideoOnTimeline'

const timelineStep = 1;

const Timeline = ({
    videos,
    handleSetImagePreview,
    setPreviewByLinePosition,
    frameSize,
    setFrameSize,
    togglePlayVideo,
    duration,
    timelineVideos,
    videoPlayer,
}) => {
    const [playing, setPlaying] = useState(false)
    const [framesPerSecond, setFramesPerSecond] = useState(24)
    const [timelineSeconds, setTimelineSeconds] = useState(360)
    const [lineCursorPosition, setLineCursorPosition] = useState(0)
    const [timelineZoom, setTimelineZoom] = useState(1000);

    useEffect(() => {
        setPreviewByLinePosition(lineCursorPosition);
    }, [lineCursorPosition]);

    useEffect(() => {
        setFrameSize((framesPerSecond * (timelineZoom / 100)) / framesPerSecond);
    }, [timelineZoom]);

    useEffect(() => {
        togglePlayVideo(playing);
    }, [playing]);

    useEffect(() => {
        if (duration > 0) {
            setFramesPerSecond(Math.floor(timelineVideos[0].framesCount / duration));
        }
    }, [timelineVideos, duration]);

    const handleChangeZoom = (event) => {
        setTimelineZoom(event.target.value);
    };

    const buildTimelineDigits = () => {
        const digits = [];
        // for (let i = 0; i <= timelineSeconds; i += timelineStep) {
        //     digits.push(
        //       <span key={i}>{i}s</span>
        //     )
        // }
        return digits;
    };

    const timelineWidth = (framesPerSecond * timelineSeconds) * (timelineZoom / 100);
    return (
      <div className="w-full h-full">
          <div className="h-12 w-full border-b border-gray-200 flex justify-between items-center px-4">
                <span
                  onClick={() => setPlaying(!playing)}
                  className="cursor-pointer text-brown-500 font-bold uppercase text-sm play-button"
                >
                    {playing ? 'pause' : 'play'}
                </span>

              <span className="rounded-full bg-gray-300 text-gray-900 font-bold text-sm px-3 py-1">
                    00:00:00:00
                </span>

              <div
                style={{
                    display: 'flex',
                    alignItems: 'center'
                }}
              >
                  <input
                    type='range'
                    value={timelineZoom}
                    onChange={handleChangeZoom}
                    min={1000}
                    max={5000}
                    style={{
                        width: 60,
                      marginRight: 15
                    }}
                  />
                  <svg
                    className="cursor-pointer"
                    style={{ transform: 'rotate(180deg)' }}
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 448 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                      <path d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z" />
                  </svg>
              </div>
          </div>

          <div
            style={{ height: 'calc(100% - 4rem)' }}
            className="relative w-full mt-4 overflow-scroll"
          >
              <LineCursor
                timelineVideos={timelineVideos}
                frameSize={frameSize}
                position={lineCursorPosition}
                setPosition={setLineCursorPosition}
                videoPlayer={videoPlayer}
                playing={playing}
              />
              <div
                  className="bg-gray-200 h-6 rounded-lg flex justify-between"
                  style={{ width: timelineWidth }}
              >
                  { buildTimelineDigits() }
              </div>
              <div
                className="bg-gray-100 h-12 rounded-lg flex"
                style={{ width: timelineWidth }}
              >
                  {videos.map((video) => (
                    <Fragment key={video.fileName}>
                        <RenderVideoOnTimeline
                          frameSize={(framesPerSecond * (timelineZoom / 100)) / framesPerSecond}
                          handleSetImagePreview={handleSetImagePreview}
                          video={video}
                        />

                        <span className="video-separator-marker"></span>
                    </Fragment>
                  ))}
              </div>
          </div>
      </div>
    )
}

export default Timeline

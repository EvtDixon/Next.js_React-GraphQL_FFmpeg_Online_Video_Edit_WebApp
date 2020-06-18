import { useState, useEffect, useRef, Fragment } from 'react'
import { isEmpty } from 'lodash';

import LineCursor from '../LineCursor'
import RenderVideoOnTimeline from '../RenderVideoOnTimeline'

const timelineStep = 1;

const Timeline = ({
    videos,
    setPreviewByLinePosition,
    frameSize,
    setFrameSize,
    togglePlayVideo,
    duration,
    timelineVideos,
    videoPlayer,
    videoIsEnd,
    setVideoIsEnd,
    toggleShowTimeline,
    showTimeline,
}) => {
    const [playing, setPlaying] = useState(false)
    const [framesPerSecond, setFramesPerSecond] = useState(24)
    const [timelineSeconds, setTimelineSeconds] = useState(360)
    const [lineCursorPosition, setLineCursorPosition] = useState(0)
    const [timelineZoom, setTimelineZoom] = useState(1000);
    const [clickedFrame, setClickedFrame] = useState(0);
    const [time, setTime] = useState({
        humanTime: '',
        seconds: '',
    });

    const timelineWrapper = useRef(null);

    useEffect(() => {
        if (videoIsEnd) {
            setTime({
                humanTime: secondsToTime(0),
                seconds: 0,
            });
            setPlaying(false);
            videoPlayer.current.currentTime = 0;
            timelineWrapper.current.scrollLeft = 0;
        }
    }, [videoIsEnd])

    useEffect(() => {
        setPreviewByLinePosition(lineCursorPosition);
        setTime({
            humanTime: secondsToTime(lineCursorPosition),
            seconds: lineCursorPosition,
        });
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

    useEffect(() => {
        if (showTimeline) {
            setPlaying(false);
        }
    }, [showTimeline]);

    useEffect(() => {
        if (playing) {
            const interval = setInterval(() => {
                const time = secondsToTime(videoPlayer.current.currentTime);
                setTime({
                    humanTime: time,
                    seconds: videoPlayer.current.currentTime,
                });
            }, 50);
            return (() => {
                clearInterval(interval);
            });
        }
    }, [videoPlayer, playing]);

    const handleSetImagePreview = (event, index) => {
        if (!playing) {
            videoPlayer.current.currentTime = (index) / framesPerSecond;
            setTime({
                humanTime: secondsToTime((index - 1) / framesPerSecond),
                seconds: (index - 1) / framesPerSecond,
            });
            setClickedFrame(index);
        }
    };

    const handlePlaying = () => {
        setPlaying(!playing);
        setVideoIsEnd(false);
    };

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

    const secondsToTime = (secs) => {
        const secInt = parseInt(secs);
        const secFloat = Math.round((secs % 1) * 100).toString().padStart(2, '0');
        const hours = Math.floor(secInt / (60 * 60)).toString().padStart(2, '0');

        const divisor_for_minutes = secInt % (60 * 60);
        const minutes = Math.floor(divisor_for_minutes / 60).toString().padStart(2, '0');

        const divisor_for_seconds = divisor_for_minutes % 60;
        const seconds = Math.ceil(divisor_for_seconds).toString().padStart(2, '0');

        return hours + ':' + minutes + ':' + seconds + ':' + secFloat;
    }

    const handleScrollWrapper = (linePosition) => {
        if (linePosition > 600) {
            const firstDigit = parseInt(linePosition.toString()[0], 10);
            if (firstDigit % 2 === 0) {
                timelineWrapper.current.scrollLeft = timelineWrapper.current.scrollLeft + 200;
            }
        }
    };

    const timelineWidth = (framesPerSecond * timelineSeconds) * (timelineZoom / 100);
    return (
      <div className="w-full h-full">
          <div className="h-12 w-full border-b border-gray-200 flex justify-between items-center px-4">
                <span
                  onClick={handlePlaying}
                  className="cursor-pointer text-brown-500 font-bold uppercase text-sm play-button"
                >
                    {playing ? 'pause' : 'play'}
                </span>

              <span className="rounded-full bg-gray-300 text-gray-900 font-bold text-sm px-3 py-1">
                  { isEmpty(time.humanTime) ? '00:00:00:00' : time.humanTime }
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
                    onClick={toggleShowTimeline}
                    className="cursor-pointer"
                    style={{
                      transform: showTimeline ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
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
            ref={timelineWrapper}
            style={{
              height: 'calc(100% - 4rem)',
              display: showTimeline ? 'block' : 'none',
            }}
            className="relative w-full mt-4 overflow-scroll"
          >
              <LineCursor
                  videoIsEnd={videoIsEnd}
                  zoom={timelineZoom / 100}
                  framesPerSecond={framesPerSecond}
                  timelineVideos={timelineVideos}
                  frameSize={frameSize}
                  position={lineCursorPosition}
                  setPosition={setLineCursorPosition}
                  videoPlayer={videoPlayer}
                  playing={playing}
                  clickedFrame={clickedFrame}
                  showTimeline={showTimeline}
                  time={time}
                  handleScrollWrapper={handleScrollWrapper}
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
                              framesPerSecond={framesPerSecond}
                              videoPlayer={videoPlayer}
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

import { useState, useEffect, Fragment } from 'react';

import LineCursor from '../LineCursor';
import RenderVideoOnTimeline from '../RenderVideoOnTimeline';
import { useInterval } from '../../hooks/useInterval';
import { msToTime } from '../../helpers/millisecondsToTime';

const Timeline = ({ videos, handleSetImagePreview, setPreviewByLinePosition, imagePreviewId, frameSize }) => {
  const [playing, setPlaying] = useState(false);
  const [timeline, setTimeline] = useState(0);
  const [lineCursorPosition, setLineCursorPosition] = useState(0);

  const tick = 85;

  useEffect(() => {
    setPreviewByLinePosition(lineCursorPosition);
    setTimeline(Math.floor(lineCursorPosition/ frameSize) * tick);
  }, [lineCursorPosition]);

  useEffect(() => {
    setLineCursorPosition(imagePreviewId === null ? 0 :(imagePreviewId - 1) * frameSize);
    setTimeline(imagePreviewId * tick);
  }, [imagePreviewId]);

  useEffect(() => {

    setPreviewByLinePosition(0);
    setTimeline(0);
    setLineCursorPosition(0);
    // setPlaying(false);
  }, [videos]);

  const timerOn = videos.length && playing;

  useInterval(
    () => {
      if (imagePreviewId === videos[0].framesCount) {
        setPlaying(false);
        handleSetImagePreview(null, 1);
      } else {
        setTimeline(timeline + tick);
        handleSetImagePreview(null, imagePreviewId + 1);
      }
    },
    timerOn ? tick : null
  );

  const timelineWidth = 10 * frameSize; // 60 (default) frames per second, multiplied by 360 (default) seconds.

  const handlePlayClick = () => {
    if (videos.length) {
      setPlaying(!playing);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="h-12 w-full border-b border-gray-200 flex justify-between items-center px-4">
        <span
          onClick={handlePlayClick}
          className="cursor-pointer text-brown-500 font-bold uppercase text-sm"
        >
          {playing ? 'pause' : 'play'}
        </span>

        <span className="rounded-full bg-gray-300 text-gray-900 font-bold text-sm px-3 py-1">
          {msToTime(timeline)}
        </span>

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
          <path
            d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"/>
        </svg>
      </div>

      <div
        style={{ height: 'calc(100% - 4rem)' }}
        className="relative w-full px-4 mt-4 overflow-scroll"
      >
        <LineCursor
          frameSize={frameSize}
          position={lineCursorPosition}
          setPosition={setLineCursorPosition}
          setTimeline={setTimeline}
        />
        <div
          className="bg-gray-100 h-12 rounded-lg flex"
          style={{ width: timelineWidth }}
        >
          {videos.map((video) => (
            <Fragment key={video.fileName}>
              <RenderVideoOnTimeline
                handleSetImagePreview={handleSetImagePreview}
                video={video}
              />

              <span className="video-separator-marker"/>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;

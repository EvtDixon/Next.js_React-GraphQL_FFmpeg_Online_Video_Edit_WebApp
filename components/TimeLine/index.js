import { useState, useEffect, Fragment } from 'react';

import LineCursor from '../LineCursor';
import VideoRenderer from '../VideoRenderer';
import { useInterval } from '../../handlers/useInterval';
import { timeTrack } from '../../handlers/timeTracker';

const Timeline = ({
   videos,
   frameChangeCandler,
   updateFrameByPosition,
   frameId,
   frameSize,
}) => {
   const [playing, setPlaying] = useState(false);
   const [timeline, setTimeline] = useState(0);
   const [linePosition, setLinePosition] = useState(0);

   const change = 85;

   useEffect(() => {
      updateFrameByPosition(linePosition);
      setTimeline(Math.floor(linePosition / frameSize) * change);
   }, [linePosition]);

   useEffect(() => {
      setLinePosition(frameId === null ? 0 : (frameId - 1) * frameSize);
      setTimeline(frameId * change);
   }, [frameId]);

   useEffect(() => {
      updateFrameByPosition(0);
      setTimeline(0);
      setLinePosition(0);
   }, [videos]);

   const timerOn = videos.length && playing;

   useInterval(
      () => {
         if (frameId === videos[0].framesCount) {
            setPlaying(false);
            frameChangeCandler(null, 1);
         } else {
            setTimeline(timeline + change);
            frameChangeCandler(null, frameId + 1);
         }
      },
      timerOn ? change : null
   );

   const timelineWidth = 10 * frameSize; 

   const handlePlayClick = () => {
      if (videos.length) {
         setPlaying(!playing);
      }
   };

   return (
      <div className='w-full h-full'>
         <div className='h-12 w-full border-b border-gray-200 flex justify-between items-center px-4'>
            <span
               onClick={handlePlayClick}
               className='cursor-pointer text-brown-500 font-bold uppercase text-sm'
            >
               {playing ? 'pause' : 'play'}
            </span>

            <span className='rounded-full bg-gray-300 text-gray-900 font-bold text-sm px-3 py-1'>
               {timeTrack(timeline)}
            </span>

            <svg
               className='cursor-pointer'
               style={{ transform: 'rotate(180deg)' }}
               stroke='currentColor'
               fill='currentColor'
               strokeWidth={0}
               viewBox='0 0 448 512'
               height='1em'
               width='1em'
               xmlns='http://www.w3.org/2000/svg'
            >
               <path d='M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z' />
            </svg>
         </div>

         <div
            style={{ height: 'calc(100% - 4rem)' }}
            className='relative w-full px-4 mt-4 overflow-scroll'
         >
            <LineCursor
               frameSize={frameSize}
               position={linePosition}
               setPosition={setLinePosition}
               setTimeline={setTimeline}
            />
            <div
               className='bg-gray-100 h-12 rounded-lg flex'
               style={{ width: timelineWidth }}
            >
               {videos.map((video) => (
                  <Fragment key={video.fileName}>
                     <VideoRenderer
                        frameChangeCandler={frameChangeCandler}
                        video={video}
                     />

                     <span className='video-separator-marker' />
                  </Fragment>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Timeline;

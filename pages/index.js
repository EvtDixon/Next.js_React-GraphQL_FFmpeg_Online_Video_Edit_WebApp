import { useState } from 'react';
import Display from '../components/Display';
import Timeline from '../components/TimeLine';
import { videosQuery } from '../graphql/client/data/videos';

const frameSize = 120;

const Main = ({ videos }) => {
   const [videoState, setVideoState] = useState([]);
   const [frame, setFrame] = useState('');
   const [frameId, setFrameId] = useState(null);

   const videoChangehandler = (video) => {
      if (!videoState.find((myVideo) => myVideo.fileName === video.fileName)) {
         setFrame(`/${video.fileName}/frames_1.png`);
         setVideoState([...videoState, video]);
      }
   };

   const frameChangeCandler = (e, index) => {
      setFrameId(index);
      setFrame(`/${videoState[0].fileName}/frames_${index}.png`);
   };

   const updateFrameByPosition = (position) => {
      if (videoState[0]) {
         const index = Math.floor(position / frameSize) + 1;
         setFrame(`/${videoState[0].fileName}/frames_${index}.png`);
      }
   };

   return (
      <React.Fragment>
         <div className='font-sans w-full h-screen flex'>
            <div className='w-20 hidden md:block h-full bg-white border-r border-gray-200 shadow'>
               <div className='w-full flex flex-col items-center justify-center py-3 text-gray-700 hover:text-blue-500 font-bold cursor-pointer mt-12'>
                  <svg
                     stroke='currentColor'
                     fill='none'
                     strokeWidth={2}
                     viewBox='0 0 24 24'
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     className='stroke-current w-5 mb-2'
                     xmlns='http://www.w3.org/2000/svg'
                  >
                     <polygon points='23 7 16 12 23 17 23 7' />
                     <rect x={1} y={5} width={15} height={14} rx={2} ry={2} />
                  </svg>
                  <span className='text-sm'>Videos</span>
               </div>
               <div className='w-full flex flex-col items-center justify-center py-3 text-gray-700 hover:text-blue-500 font-bold cursor-pointer mt-12'>
                  <svg
                     stroke='currentColor'
                     fill='none'
                     strokeWidth={2}
                     viewBox='0 0 24 24'
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     className='stroke-current w-5 mb-2'
                     xmlns='http://www.w3.org/2000/svg'
                  >
                     <polygon points='23 7 16 12 23 17 23 7' />
                     <rect x={1} y={5} width={15} height={14} rx={2} ry={2} />
                  </svg>
                  <span className='text-sm'>Images</span>
               </div>
               <div className='w-full flex flex-col items-center justify-center py-3 text-gray-700 hover:text-blue-500 font-bold cursor-pointer mt-12'>
                  <svg
                     stroke='currentColor'
                     fill='none'
                     strokeWidth={2}
                     viewBox='0 0 24 24'
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     className='stroke-current w-5 mb-2'
                     xmlns='http://www.w3.org/2000/svg'
                  >
                     <polygon points='23 7 16 12 23 17 23 7' />
                     <rect x={1} y={5} width={15} height={14} rx={2} ry={2} />
                  </svg>
                  <span className='text-sm'>Texts</span>
               </div>
               <div className='w-full flex flex-col items-center justify-center py-3 text-gray-700 hover:text-blue-500 font-bold cursor-pointer mt-12'>
                  <svg
                     stroke='currentColor'
                     fill='none'
                     strokeWidth={2}
                     viewBox='0 0 24 24'
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     className='stroke-current w-5 mb-2'
                     xmlns='http://www.w3.org/2000/svg'
                  >
                     <polygon points='23 7 16 12 23 17 23 7' />
                     <rect x={1} y={5} width={15} height={14} rx={2} ry={2} />
                  </svg>
                  <span className='text-sm'>Templates</span>
               </div>
            </div>
            <div
               className='flex-grow bg-gray-100'
               style={{ width: 'calc(100% - 5rem)' }}
            >
               <div className='flex flex-wrap w-full h-auto md:h-6/10'>
                  <div className='w-full md:w-2/12 h-full px-5 py-6 bg-white border-r border-gray-200 overflow-scroll'>
                     {videos.map((video) => (
                        <img
                           onClick={() => videoChangehandler(video)}
                           key={video.fileName}
                           alt={video.fileName}
                           src={`/${video.fileName}/frames_1.png`}
                           className='w-full cursor-pointer rounded-lg shadow mt-5'
                        />
                     ))}
                  </div>

                  <div className='w-full md:w-8/12 px-5 py-12'>
                     <Display preview={frame} />
                  </div>

                  <div className='w-full md:w-2/12 px-5 py-12 bg-white border-l border-gray-200'></div>
               </div>

               <div className='w-full bg-white h-full md:h-4/10 border-t border-gray-200 shadow'>
                  <Timeline
                     frameSize={frameSize}
                     frameId={frameId}
                     frameChangeCandler={frameChangeCandler}
                     videos={videoState}
                     updateFrameByPosition={updateFrameByPosition}
                  />
               </div>
            </div>
         </div>
      </React.Fragment>
   );
};

Main.getInitialProps = async ({ urqlClient }) => {
   const res = await urqlClient.query(videosQuery()).toPromise();
   return {
      videos: res.data.videos,
   };
};

export default Main;

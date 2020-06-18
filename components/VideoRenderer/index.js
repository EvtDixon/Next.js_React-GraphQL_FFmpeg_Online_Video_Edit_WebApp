import { Fragment } from 'react';

const VideoRenderer = ({ video, frameChangeCandler }) => {
   const previewImages = Array(video.framesCount)
      .fill(0)
      .map((_, index) => `/${video.fileName}/frames_${index + 1}.png`);

   return (
      <Fragment>
         {previewImages.map((previewImage, index) => (
            <img
               onClick={(event) => frameChangeCandler(event, index + 1)}
               key={previewImage}
               src={previewImage}
               style={{ width: '120px', flexShrink: 0 }}
               className='w-full border-r border-gray-200'
            />
         ))}
      </Fragment>
   );
};

export default VideoRenderer;

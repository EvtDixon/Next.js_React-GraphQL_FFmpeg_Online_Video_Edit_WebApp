const Video = (props) => {
   const { videoChangehandler, videos } = props.props;
   return videos.map((video) => (
      <img
         onClick={() => videoChangehandler(video)}
         key={video.fileName}
         alt={video.fileName}
         src={`/${video.fileName}/frames_1.png`}
         className='w-full cursor-pointer rounded-lg shadow mt-5'
      />
   ));
};

export default Video;

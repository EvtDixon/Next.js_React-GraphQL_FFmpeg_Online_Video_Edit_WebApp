import { useEffect } from 'react';
import Draggable from 'react-draggable'
import { isEmpty } from 'lodash'

const LineCursor = ({ position, setPosition, frameSize, timelineVideos, videoPlayer, playing }) => {
    useEffect(() => {
      if (playing) {

      }
    }, [playing]);

    return (
        // <Draggable axis='x' bounds={{
        //     left: 0
        // }} onDrag={(event, draggableData) => {
        //     setPosition(draggableData.x)
        // }}
        //            // position={{x: position > frameSize ? position - frameSize : 0, y: 0}}
        // >
            <div
                style={{
                    width: '15px',
                    zIndex: 1,
                    left: 0,
                    transform: `translate(${playing ? timelineVideos[0].framesCount * frameSize : 0}px)`,
                    transition: videoPlayer.current !== undefined ? `all ${videoPlayer.current.duration - videoPlayer.current.currentTime}s linear 0s` : '',
                }}
                className="line-cursor absolute bg-red-500 h-full cursor-pointer"
            />
        // </Draggable>
    )
}

export default LineCursor

import { useEffect, useState, useRef } from 'react';
import Draggable from 'react-draggable'

const LineCursor = ({
    videoPlayer,
    playing,
    framesPerSecond,
    zoom,
    videoIsEnd,
    setPosition,
    clickedFrame,
    showTimeline,
    time,
}) => {
    const [lineStyle, setLineStyle] = useState({
        width: '15px',
        zIndex: 1,
        left: 0,
    });
    const [translate, setTranslate] = useState(0);
    const [leftPosition, setLeftPosition] = useState(0);
    const line = useRef(null);

    useEffect(() => {
        if (videoIsEnd) {
            setLeftPosition(0);
            setTranslate(0);
        }
    }, [videoIsEnd]);

    useEffect(() => {
        setTranslate(((zoom * framesPerSecond) * (clickedFrame / framesPerSecond)) - zoom);
    }, [clickedFrame]);

    useEffect(() => {
        if (!playing) {
            setTranslate(leftPosition);
            setLineStyle({
                width: '15px',
                zIndex: 1,
                transition: 'none',
            });
        } else {
            const defaultStyle = {
                ...lineStyle,
            }
            setTranslate(zoom * framesPerSecond * videoPlayer.current.duration);
            setLineStyle({
                ...defaultStyle,
                transition: videoPlayer.current ? `transform ${videoPlayer.current.duration - videoPlayer.current.currentTime}s linear 0s` : '',
            });
        }
    }, [playing]);

    useEffect(() => {
        if (line !== null) {
            const interval = setInterval(() => {
                setLeftPosition(line.current.getBoundingClientRect().left - 80);
            }, 50);
            return (() => {
                clearInterval(interval);
            });
        }
    }, []);

    useEffect(() => {
        if (showTimeline) {
            setTranslate(((zoom * framesPerSecond) * time.seconds));
        }
    }, [showTimeline]);

    const handleDraggable = (position) => {
        setTranslate(position);
    };

    return (
        <Draggable axis='x' bounds={{
            left: 0
        }} onDrag={(event, draggableData) => {
            const xPosition = draggableData.x;
            handleDraggable(xPosition);
            setPosition((xPosition / zoom) / framesPerSecond);
        }}
            position={{x: translate, y: 0}}
        >
            <div
                ref={line}
                style={(!videoIsEnd && playing) ? {
                    ...lineStyle,
                } : {
                    ...lineStyle,
                }}
                className="line-cursor absolute bg-red-500 h-full cursor-pointer"
            />
        </Draggable>
    )
}

export default LineCursor

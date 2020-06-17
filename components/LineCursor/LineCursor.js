import Draggable from 'react-draggable'

const LineCursor = ({ position, setPosition, frameSize }) => {
  const posX = position % frameSize !== 0 ? Math.floor(position / frameSize) * frameSize : position;

  return (
    <Draggable
      axis='x'
      bounds={{ left: 0 }}
      onDrag={(event, draggableData) => setPosition(draggableData.x)}
      position={{ x: posX, y: 0 }}
    >
      <div
        style={{ width: '15px', transform: `translate(50px, 0px)` }}
        className="line-cursor absolute bg-red-500 h-full cursor-pointer"
      />
    </Draggable>
  )
};

export default LineCursor

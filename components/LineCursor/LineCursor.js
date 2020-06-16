import Draggable from 'react-draggable'

const LineCursor = ({ position, setPosition }) => {
    return (
        <Draggable axis='x' bounds={{
            left: 0
        }} onStop={(event, draggableData) => {
            setPosition(draggableData.x)
        }}>
            <div
                style={{ width: '15px', transform: 'translate(50px, 0px)' }}
                className="line-cursor absolute bg-red-500 h-full cursor-pointer"
            ></div>
        </Draggable>
    )
}

export default LineCursor

const Canvas = ({ width = '1280', height = '720', preview }) => {
    return (
        <div
            style={{
              width,
              height,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
            className="rounded-lg shadow-lg bg-white h-full mx-auto"
        >
            <img src={preview}/>
        </div>
    )
}

export default Canvas

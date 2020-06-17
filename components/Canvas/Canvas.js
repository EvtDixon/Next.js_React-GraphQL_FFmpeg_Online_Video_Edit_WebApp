const Canvas = ({ width = '1280', height = '720', preview, setDuration, videoPlayer }) => {
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
            <video onLoadedMetadata={e => {
              setDuration(e.target.duration)
            }} ref={videoPlayer} src={preview[0] ? `/videos/${preview[0].fileName }.mp4` : ''}/>
        </div>
    )
}

export default Canvas

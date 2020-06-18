const Canvas = ({ width = '1280', height = '315px', preview, setDuration, videoPlayer, setVideoIsEnd, showTimeline }) => {
    return (
        <div
            style={{
                width,
                height,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}
            className="rounded-lg shadow-lg bg-white mx-auto"
        >
            <video onLoadedMetadata={e => {
                setDuration(e.target.duration)
            }} onEnded={() => {
                setVideoIsEnd(true);
            }} ref={videoPlayer} src={preview[0] ? `/videos/${preview[0].fileName }.mp4` : ''}/>
        </div>
    )
}

export default Canvas

const Canvas = ({ width = '1280', height = '720' }) => {
    return (
        <div
            style={{ width, height }}
            className="rounded-lg shadow-lg bg-white h-full mx-auto"
        ></div>
    )
}

export default Canvas

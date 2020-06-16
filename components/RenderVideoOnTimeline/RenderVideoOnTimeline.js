import { Fragment } from 'react'

const RenderVideoOnTimeline = ({ video }) => {
    const previewImages = Array(video.framesCount)
        .fill(0)
        .map((_, index) => `/${video.fileName}/preview-${index + 1}.png`)

    return (
        <Fragment>
            {previewImages.map((previewImage) => (
                <img
                    key={previewImage}
                    src={previewImage}
                    style={{ width: '120px' }}
                    className="w-full border-r border-gray-200"
                />
            ))}
        </Fragment>
    )
}

export default RenderVideoOnTimeline

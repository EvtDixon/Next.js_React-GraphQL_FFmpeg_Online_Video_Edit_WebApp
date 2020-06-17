import { Fragment } from 'react'

const RenderVideoOnTimeline = ({ video, handleSetImagePreview }) => {
    const previewImages = Array(video.framesCount)
        .fill(0)
        .map((_, index) => `/${video.fileName}/preview-${index + 1}.png`)

    return (
        <Fragment>
            {previewImages.map((previewImage, index) => (
                <img
                    onClick={event => handleSetImagePreview(event, index + 1)}
                    key={previewImage}
                    src={previewImage}
                    style={{ width: '120px', flexShrink: 0 }}
                    className="w-full border-r border-gray-200"
                />
            ))}
        </Fragment>
    )
}

export default RenderVideoOnTimeline

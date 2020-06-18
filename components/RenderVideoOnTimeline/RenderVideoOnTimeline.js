import { Fragment } from 'react'

const RenderVideoOnTimeline = ({ video, handleSetImagePreview, frameSize, videoPlayer, framesPerSecond }) => {
    const previewImages = Array(video.framesCount)
        .fill(0)
        .map((_, index) => `/frames/${video.fileName}/preview-${index + 1}.png`)

    return (
        <Fragment>
            {previewImages.map((previewImage, index) => (
              <div className='timeline-frame' key={previewImage} style={{ position: 'relative' }}>
                  {
                      index === 0 && <span style={timeLabels}>0s</span>
                  }
                  {
                      (index + 1) % 10 === 0 && <span style={timeLabels}>{(index + 1) / 10}s</span>
                  }
                  {
                      index < (videoPlayer.current.duration * framesPerSecond)
                      && (
                        <img
                          onClick={event => handleSetImagePreview(event, index + 1)}
                          src={previewImage}
                          style={{ width: frameSize, flexShrink: 0, height: '100%', cursor: 'pointer' }}
                          className="w-full border-r border-gray-200"
                        />
                      )
                  }
              </div>
            ))}
        </Fragment>
    )
}

const timeLabels = {
    position: 'absolute',
    top: -24,
}

export default RenderVideoOnTimeline

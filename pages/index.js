import { useState } from "react"

import Canvas from "../components/Canvas"
import Timeline from "../components/Timeline"
import { getAllVideosQuery } from "../graphql/client/queries/videos"

const frameSize = 120

const Home = ({ videos }) => {
  const [timelineVideos, setTimelineVideos] = useState([])
  const [imagePreview, setImagePreview] = useState("")
  const [imagePreviewId, setImagePreviewId] = useState(null)

  const addToTimeline = (video) => {
    if (
      timelineVideos.find(
        (timelineVideo) => timelineVideo.fileName === video.fileName
      )
    ) {
      return
    }

    setFirstScene(video)
    setTimelineVideos([...timelineVideos, video])
  }

  const setFirstScene = (video) => {
    setImagePreview(`/${video.fileName}/frames_1.png`)
  }

  const handleSetImagePreview = (event, index) => {
    setImagePreviewId(index)
    setImagePreview(`/${timelineVideos[0].fileName}/frames_${index}.png`)
  }

  const setPreviewByLinePosition = (position) => {
    if (timelineVideos[0]) {
      const index = Math.floor(position / frameSize) + 1
      setImagePreview(`/${timelineVideos[0].fileName}/frames_${index}.png`)
    }
  }

  return (
    <React.Fragment>
      <div className="font-sans w-full h-screen flex">
        <div className="w-20 hidden md:block h-full bg-white border-r border-gray-200 shadow">
          <div className="w-full flex flex-col items-center justify-center py-3 text-gray-700 hover:text-blue-500 font-bold cursor-pointer mt-12">
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth={2}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-current w-5 mb-2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x={1} y={5} width={15} height={14} rx={2} ry={2} />
            </svg>
            <span className="text-sm">Videos</span>
          </div>
          <div className="w-full flex flex-col items-center justify-center py-3 text-gray-700 hover:text-blue-500 font-bold cursor-pointer mt-12">
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth={2}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-current w-5 mb-2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x={1} y={5} width={15} height={14} rx={2} ry={2} />
            </svg>
            <span className="text-sm">Images</span>
          </div>
          <div className="w-full flex flex-col items-center justify-center py-3 text-gray-700 hover:text-blue-500 font-bold cursor-pointer mt-12">
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth={2}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-current w-5 mb-2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x={1} y={5} width={15} height={14} rx={2} ry={2} />
            </svg>
            <span className="text-sm">Texts</span>
          </div>
          <div className="w-full flex flex-col items-center justify-center py-3 text-gray-700 hover:text-blue-500 font-bold cursor-pointer mt-12">
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth={2}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-current w-5 mb-2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x={1} y={5} width={15} height={14} rx={2} ry={2} />
            </svg>
            <span className="text-sm">Templates</span>
          </div>
        </div>

        <div
          className="flex-grow bg-gray-100"
          style={{ width: "calc(100% - 5rem)" }}
        >
          <div className="flex flex-wrap w-full h-auto md:h-6/10">
            <div className="w-full md:w-2/12 h-full px-5 py-6 bg-white border-r border-gray-200 overflow-scroll">
              {videos &&
                videos.map((video) => (
                  <img
                    onClick={() => addToTimeline(video)}
                    key={video.fileName}
                    alt={video.fileName}
                    src={`/${video.fileName}/frames_1.png`}
                    className="w-full cursor-pointer rounded-lg shadow mt-5"
                  />
                ))}
            </div>

            <div className="w-full md:w-8/12 px-5 py-12">
              <Canvas preview={imagePreview} />
            </div>

            <div className="w-full md:w-2/12 px-5 py-12 bg-white border-l border-gray-200"></div>
          </div>

          <div className="w-full bg-white h-full md:h-4/10 border-t border-gray-200 shadow">
            <Timeline
              frameSize={frameSize}
              imagePreviewId={imagePreviewId}
              handleSetImagePreview={handleSetImagePreview}
              videos={timelineVideos}
              setPreviewByLinePosition={setPreviewByLinePosition}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

Home.getInitialProps = async ({ urqlClient }) => {
  const response = await urqlClient.query(getAllVideosQuery()).toPromise()
  return {
    videos: response.data.videos,
  }
}

export default Home

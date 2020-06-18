import { useState, useRef } from 'react'
import Canvas from '../components/Canvas'
import Timeline from '../components/Timeline'
import { getAllVideosQuery } from '../graphql/client/queries/videos'
import { isEmpty } from 'lodash';

const Home = ({ videos }) => {
    const [timelineVideos, setTimelineVideos] = useState([]);
    const [imagePreviewId, setImagePreviewId] = useState(null);
    const [frameSize, setFrameSize] = useState(60);
    const [duration, setDuration] = useState(0);
    const [videoIsEnd, setVideoIsEnd] = useState(true);
    const [showTimeline, setShowTimeline] = useState(true);
    const videoPlayer = useRef(undefined);

    const addToTimeline = (video) => {
        timelineVideos.splice(0, timelineVideos.length);
        if (
            timelineVideos.find(
                (timelineVideo) => timelineVideo.fileName === video.fileName
            )
        ) {
            return
        }

        setTimelineVideos([...timelineVideos, video]);
    }

    const setPreviewByLinePosition = (position) => {
        if (videoPlayer.current) {
            videoPlayer.current.currentTime = position;
        }
    };

    const togglePlayVideo = (enable) => {
        if (!isEmpty(timelineVideos)) {
            if (enable) {
                videoPlayer.current.play();
            } else {
                videoPlayer.current.pause();
            }
        }
    };

    const toggleShowTimeline = () => {
        setShowTimeline(!showTimeline);
    };

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
                            <rect
                                x={1}
                                y={5}
                                width={15}
                                height={14}
                                rx={2}
                                ry={2}
                            />
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
                            <rect
                                x={1}
                                y={5}
                                width={15}
                                height={14}
                                rx={2}
                                ry={2}
                            />
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
                            <rect
                                x={1}
                                y={5}
                                width={15}
                                height={14}
                                rx={2}
                                ry={2}
                            />
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
                            <rect
                                x={1}
                                y={5}
                                width={15}
                                height={14}
                                rx={2}
                                ry={2}
                            />
                        </svg>
                        <span className="text-sm">Templates</span>
                    </div>                
                </div>

                <div
                    className="flex-grow bg-gray-100 flex flex-col"
                    style={{ width: 'calc(100% - 5rem)' }}
                >
                    <div className="flex flex-wrap w-full h-auto md:h-6/10"
                        style={{
                            flex: 1
                        }}
                    >
                        <div className="w-full md:w-2/12 h-full px-5 py-6 bg-white border-r border-gray-200 overflow-scroll">
                            {videos.map((video) => (
                                <img
                                    onClick={() => addToTimeline(video)}
                                    key={video.fileName}
                                    alt={video.fileName}
                                    src={`/frames/${video.fileName}/preview-1.png`}
                                    className="w-full cursor-pointer rounded-lg shadow mt-5"
                                />
                            ))}
                        </div>

                        <div className="w-full md:w-8/12 px-5 py-12">
                            <Canvas
                              showTimeline={showTimeline}
                              setVideoIsEnd={setVideoIsEnd}
                              videoPlayer={videoPlayer}
                              setDuration={setDuration}
                              preview={timelineVideos}
                            />
                        </div>

                        <div className="w-full md:w-2/12 px-5 py-12 bg-white border-l border-gray-200"></div>
                    </div>

                    <div className="w-full bg-white border-t border-gray-200 shadow"
                         style={{
                             flex: showTimeline ? 1 : 0
                         }}
                    >
                        <Timeline
                          setVideoIsEnd={setVideoIsEnd}
                          videoIsEnd={videoIsEnd}
                          duration={duration}
                          videoPlayer={videoPlayer}
                          frameSize={frameSize}
                          imagePreviewId={imagePreviewId}
                          videos={timelineVideos}
                          setPreviewByLinePosition={setPreviewByLinePosition}
                          setFrameSize={setFrameSize}
                          togglePlayVideo={togglePlayVideo}
                          timelineVideos={timelineVideos}
                          toggleShowTimeline={toggleShowTimeline}
                          showTimeline={showTimeline}
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

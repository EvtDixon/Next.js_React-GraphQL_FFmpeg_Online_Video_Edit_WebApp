import React from "react";
import Slider from "@material-ui/core/Slider";

function ScaleBar({ setTimelineZoom, timelineZoom }) {
    const handleChange = (event, value) => {
        setTimelineZoom(value);
    };

    return (
        <div style={{ width: 200 }} className="flex">
            <span className="mx-3">Zoom</span>
            <Slider
                value={timelineZoom}
                onChange={handleChange}
                valueLabelDisplay="auto"
                step={10}
                min={50}
                max={200}
            />
        </div>
    );
}

export default ScaleBar;

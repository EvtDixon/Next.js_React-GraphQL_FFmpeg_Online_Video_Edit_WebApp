import { Fragment, useEffect, useState } from "react"

import LineCursor from "../LineCursor"
import RenderVideoOnTimeline from "../RenderVideoOnTimeline"

const Timeline = ({ lineCursorPosition }) => {
  // get formated value
  const formatValue = (counter) => (div) => {
    const num = Math.round(counter / div)
    return num < 10 ? `0${num}` : num
  }
  const getTime = (cursor) => {
    if (!cursor) {
      return "00:00:00"
    }
    return `${formatValue(cursor)(100000)}:${formatValue(cursor)(
      10000
    )}:${formatValue(cursor)(1000)}`
  }

  return (
    <span className="rounded-full bg-gray-300 text-gray-900 font-bold text-sm px-3 py-1">
      {getTime(lineCursorPosition)}
    </span>
  )
}

export default Timeline

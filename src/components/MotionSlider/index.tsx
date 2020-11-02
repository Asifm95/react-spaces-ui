import React from "react"
import { ContextProvider } from "./Context"
import Track from "./Track"

const MotionSlider = ({ children }) => {
  return (
    <ContextProvider>
      <Track>{children}</Track>
    </ContextProvider>
  )
}

export default MotionSlider

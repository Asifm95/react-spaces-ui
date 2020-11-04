import { motion, useAnimation, useInvertedScale } from "framer-motion"
import React, { useContext, useEffect } from "react"
import { openSpring } from "utils/animation"
import { flicktyVariants } from "utils/variants"
import { sliderContext } from "./Context"

const Track = ({ children }) => {
  const { state, dispatch } = useContext(sliderContext)
  const controls = useAnimation()
  const inverted = useInvertedScale()
  // console.log(state.items)
  const negativeItems = state.items.map((item) => item * -1)

  const calcSliderMargin = () => {
    const appContainerWidth =
      document.querySelector(".App-container")?.clientWidth ?? 560
    const sliderCardWidth = 300
    return (appContainerWidth - sliderCardWidth) / 2
  }
  useEffect(() => {
    controls.start("visible")
  }, [controls])

  const onComplete = () => {
    dispatch({ type: "SET_ANIMATION_STATE", doneAnimation: true })
  }

  function onDragEnd(event, info) {
    const endPosition = info.point.x
    const closestPosition = negativeItems.reduce((prev, curr) =>
      Math.abs(curr - endPosition) < Math.abs(prev - endPosition) ? curr : prev
    )
    const activeSlide = negativeItems.indexOf(closestPosition)
    dispatch({ type: "SET_ACTIVE_ITEM", activeItem: activeSlide })
    controls.start({
      x: closestPosition,
      transition: openSpring,
    })
  }
  return (
    <motion.div
      className="Flickity-container"
      variants={flicktyVariants}
      drag={"x"}
      onDragEnd={onDragEnd}
      dragConstraints={{
        left: -(1000 / 1.5),
        right: 0,
      }}
      style={{ ...inverted, marginLeft: calcSliderMargin() }}
      initial={"hidden"}
      animate={controls}
      exit={"hidden"}
      transition={openSpring}
      onAnimationComplete={onComplete}
    >
      {children}
    </motion.div>
  )
}

export default Track

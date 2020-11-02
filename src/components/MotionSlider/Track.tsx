import { motion, useAnimation, useInvertedScale } from "framer-motion"
import React, { useContext, useEffect } from "react"
import { openSpring } from "utils/animation"
import { flicktyVariants } from "utils/variants"
import { sliderContext } from "./Context"

const Track = ({ children }) => {
  const { state, dispatch } = useContext(sliderContext)
  const controls = useAnimation()
  const inverted = useInvertedScale()
  console.log(state.items)
  const negativeItems = state.items.map((item) => item * -1)

  useEffect(() => {
    controls.start("visible")
  }, [controls])

  const onComplete = () => {
    dispatch({ type: "SET_ANIMATION_STATE", doneAnimation: true })
  }

  function onDragEnd(event, info) {
    // console.log(info)
    const offset = info.offset.x
    const correctedVelocity = info.velocity.x * 0.3

    const direction = correctedVelocity < 0 || offset < 0 ? 1 : -1
    const startPosition = info.point.x - offset

    const endOffset = offset
    direction === 1
      ? Math.min(correctedVelocity, offset)
      : Math.max(correctedVelocity, offset)
    const endPosition = startPosition + endOffset

    const closestPosition = negativeItems.reduce((prev, curr) =>
      Math.abs(curr - endPosition) < Math.abs(prev - endPosition) ? curr : prev
    )

    console.log(closestPosition)

    const activeSlide = negativeItems.indexOf(closestPosition)

    dispatch({ type: "SET_ACTIVE_ITEM", activeItem: activeSlide })

    controls.start({
      x: closestPosition + 112,
      transition: openSpring,
    })
  }
  return (
    <motion.div
      className="Flickity-container"
      variants={flicktyVariants}
      drag={"x"}
      //   onDragEnd={onDragEnd}
      dragConstraints={{
        left: -(1000 / 1.5),
        right: 0,
      }}
      style={{ ...inverted }}
      initial={"hidden"}
      animate={"visible"}
      exit={"hidden"}
      transition={openSpring}
      onAnimationComplete={onComplete}
    >
      {children}
    </motion.div>
  )
}

export default Track

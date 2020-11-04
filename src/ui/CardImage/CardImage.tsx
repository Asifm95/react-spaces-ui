import React from "react"
import { motion, useInvertedScale } from "framer-motion"
import { ImageVariants } from "utils/variants"
import { closeSpring, openSpring } from "utils/animation"
import { CardImageType } from "model/interface"
import "./CardImage.scss"

const CardImage: React.FC<Partial<CardImageType>> = ({
  bgImage,
  imgRef,
  isSelected = false,
  animate = false,
  clipImg = false,
}) => {
  const inverted = useInvertedScale()

  return (
    <motion.div
      className="Card-image"
      style={{
        ...inverted,
        originX: 0,
        originY: 0,
        clip: clipImg ? "rect(50px, 250px, 306px, 50px)" : "",
      }}
      variants={ImageVariants}
      animate={animate ? "visible" : isSelected ? "hidden" : "visible"}
      transition={isSelected ? openSpring : closeSpring}
    >
      <motion.img
        // data-flickity-lazyload={bgImage}
        src={bgImage}
        alt=""
        ref={imgRef}
        initial={false}
        transition={closeSpring}
        draggable="false"
      />
    </motion.div>
  )
}

export default CardImage

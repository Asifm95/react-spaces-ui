import React, { useEffect, useRef } from "react"
import {
  motion,
  useInvertedScale,
  AnimatePresence,
  useMotionValue,
} from "framer-motion"
import { Link } from "react-router-dom"
import "./Card.scss"
import { openSpring, closeSpring } from "utils/animation"

const Card: React.FC<{
  space
  isSelected: boolean
  onScroll: Function
  translateX: number
}> = ({ space, isSelected, onScroll, translateX = 20.71 }) => {
  const imgRef = useRef(null)
  const scaleX = useMotionValue(1)
  const scaleY = useMotionValue(1)
  // const inverted = useInvertedBorderRadius(0)
  // let { scaleX, scaleY } = inverted
  const invertedImg = useInvertedScale({ scaleX, scaleY })

  useEffect(() => {
    onScroll(imgRef.current)
  }, [onScroll])

  return (
    <AnimatePresence>
      <div className="Card-container">
        <motion.div
          className={`Card ${isSelected && "open"}`}
          style={{ scaleX, scaleY }}
          animate={isSelected ? { x: `${-1 * translateX}%` } : { x: 0 }}
          transition={isSelected ? openSpring : closeSpring}
        >
          <motion.div
            className="Card-content"
            layoutTransition={isSelected ? openSpring : closeSpring}
          >
            <motion.div className="Card-image" style={{ ...invertedImg }}>
              <motion.img
                data-flickity-lazyload={space?.bg_image}
                alt=""
                ref={imgRef}
                initial={false}
                animate={isSelected ? { scale: 3.5 } : { scale: 1.3 }}
                transition={isSelected ? openSpring : closeSpring}
              />
              {/* <div className=""></div> */}
            </motion.div>
            <motion.div
              className="Card-info-wrapper"
              animate={!isSelected ? { height: 34 } : { height: 350 }}
              transition={isSelected ? openSpring : closeSpring}
            >
              {!isSelected && (
                <motion.div
                  className="Card-info"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.3 } }}
                  exit={{ opacity: 0 }}
                >
                  <h2 className="Card-title">{space.title}</h2>
                  <div className="Card-sub">
                    {space.description.count +
                      " " +
                      space.description.type +
                      (space.description.count > 1 && "s")}
                  </div>
                  {space.face_thumbs.map(
                    (thumb, i) =>
                      i < 3 && (
                        <span className={"Card-thumb Card-thumb__" + i} key={i}>
                          <img src={thumb.image} alt={thumb.name} />
                        </span>
                      )
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
        {!isSelected && <Link to={space.id} className={`Card-open-link`} />}
      </div>
    </AnimatePresence>
  )
}

export default Card

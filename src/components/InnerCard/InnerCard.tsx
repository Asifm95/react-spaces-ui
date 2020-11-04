import React, { useContext, useEffect, useRef } from "react"
import CardImage from "ui/CardImage/CardImage"
import Info from "ui/CardInfo/Info"
import { Slide } from "model/interface"
import "./InnerCard.scss"
import { sliderContext } from "components/MotionSlider/Context"

const InnerCard: React.FC<{ slide: Slide }> = ({ slide }) => {
  const { state, dispatch } = useContext(sliderContext)
  const animationState = state.doneAnimation
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref && ref.current && animationState) {
      // console.log(ref.current)
      const containerRef = document.querySelector(".Flickity-container")
      if (containerRef) {
        const x = ref.current.getBoundingClientRect().x
        const containerOffset = containerRef?.getBoundingClientRect().x
        dispatch({ type: "ADD_ITEM", item: x - containerOffset })
      }
    }
  }, [animationState, dispatch])
  return (
    <div className="Card-container" ref={ref}>
      <div className="Inner-card">
        <div className="Card-content">
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "#e6e6e6",
            }}
          >
            <CardImage
              bgImage={slide?.bg_image}
              animate={true}
              clipImg={true}
            />
          </div>
          <Info
            title={slide.title}
            description={slide.description}
            showStar={true}
            style={{}}
          />
        </div>
      </div>
    </div>
  )
}

export default InnerCard

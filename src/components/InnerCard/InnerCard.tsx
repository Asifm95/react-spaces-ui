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
      console.log(ref.current)
      const x = ref.current.getBoundingClientRect().x
      dispatch({ type: "ADD_ITEM", item: x - 112 })
    }
  }, [animationState, dispatch])
  return (
    <div className="Card-container" ref={ref}>
      <div className="Card">
        <div className="Card-content">
          <CardImage bgImage={slide?.bg_image} animate={true} />
          <Info
            title={slide.title}
            description={slide.description}
            style={{}}
          />
        </div>
      </div>
    </div>
  )
}

export default InnerCard

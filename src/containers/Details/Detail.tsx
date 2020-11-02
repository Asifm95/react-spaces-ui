import React, { useContext } from "react"
import "./Detail.scss"
import spaces from "model/spaceItem.json"
import Info from "ui/CardInfo/Info"
import { store } from "store/store"
import CloseBtn from "ui/CloseBtn/CloseBtn"
import { InfoType, Slide } from "model/interface"
import InnerCard from "components/InnerCard/InnerCard"
import MotionSlider from "components/MotionSlider"
import { infoVariants } from "utils/variants"
import { closeInertial } from "utils/animation"

const Detail = ({ close }) => {
  const { route } = useContext(store).state
  const id = route.path?.params.id ?? 0
  const space = spaces[id]

  return (
    <>
      <CloseBtn close={close} />
      <Info
        title={space?.title}
        description={space?.description}
        {...infoProps}
      />
      <MotionSlider>
        {spaces[id].slides.map((slide: Slide, i) => (
          <InnerCard slide={space.slides[i]} key={i} />
        ))}
      </MotionSlider>
    </>
  )
}

export default Detail

const infoProps: Partial<InfoType> = {
  style: {
    title: {
      fontSize: 24,
      letterSpacing: 0.8,
      color: "#c0c0c0",
    },
    sub: {
      fontSize: 13,
      opacity: 0.8,
    },
  },
  isDescTitle: true,
  animation: {
    variants: infoVariants,
    initial: "hidden",
    animate: "visible",
    exit: "hidden",
    transition: closeInertial,
  },
}

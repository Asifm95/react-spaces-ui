import React, { useContext } from "react"
import "./TabBar.scss"
import Diamonds from "icons/Diamonds"
import Folder from "icons/Folder"
import Inbox from "icons/Inbox"
import User from "icons/User"
import { motion } from "framer-motion"
import { store } from "store/store"
import { openSpring, closeSpring } from "utils/animation"
import { tabBarVariants } from "utils/variants"

const TabBar = () => {
  const { state } = useContext(store)
  const { showNavBar } = state
  return (
    <footer style={{ overflow: "hidden" }}>
      <motion.div
        className="Footer-contianer"
        animate={showNavBar ? "visible" : "hidden"}
        transition={showNavBar ? openSpring : closeSpring}
        variants={tabBarVariants}
      >
        <Diamonds />
        <Folder />
        <Inbox />
        <User />
      </motion.div>
    </footer>
  )
}

export default TabBar

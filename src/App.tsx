import React from "react"
import { FloatingBubble, MessageFill } from 'antd-mobile'

interface IProps {
  name?: string
}

const App: React.FC<IProps> = () => {
  const bubbleClickHandler = () => {

  }
  return (
      <FloatingBubble
          style={{
            '--initial-position-bottom': '24px',
            '--initial-position-right': '24px',
            '--edge-distance': '24px',
          }}
          onClick={bubbleClickHandler}
      >
        <MessageFill fontSize={32} />
      </FloatingBubble>
  )
}
export default App

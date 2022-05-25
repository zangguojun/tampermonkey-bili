import React from "react"

interface IProps {
  name?: string
}

const App: React.FC<IProps> = () => {
  return (
    <div
      style={{ position: "fixed", left: 10, bottom: 100, zIndex: 1000 }}
    ></div>
  )
}
export default App

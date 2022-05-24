import React, { useState } from "react"
import { Button, Modal } from "antd"
import { StarTwoTone } from "@ant-design/icons"
import SelectUp from "@/components/select-up"

interface IProps {
  name?: string
}

const App: React.FC<IProps> = () => {
  const [visible, setVisible] = useState(false)

  return (
    <div style={{ position: "fixed", left: 10, bottom: 100 }}>
      <Button
        shape="round"
        icon={<StarTwoTone twoToneColor="#fb7299" />}
        onClick={() => {
          setVisible(!visible)
        }}
      >
        Up主分类
      </Button>
      <Modal
        visible={visible}
        title="请选择"
        footer={null}
        afterClose={() => {
          setVisible(false)
        }}
      >
        <SelectUp />
      </Modal>
    </div>
  )
}
export default App

import React, { useState, useEffect } from "react"
import { Row, Col, Avatar, Card, Space, Checkbox, Button } from "antd"
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons"
import { axiosRequest } from "@/lib/request"
import qs from "qs"
import "./index.less"

interface IFollow {}

const SelectUp = () => {
  const [cur, setCur] = useState<number>(0)
  const [following, setFollowing] = useState()
  const [curRelationTagsList, setcurRelationTagsList] = useState([])
  const [relationTags, setRelationTags] = useState([])

  useEffect(() => {
    axiosRequest
      .get("/relation/tags")
      .then((res) => {
        const { data } = res
        console.log(
          "%c [ data ]-21",
          "font-size:13px; background:pink; color:#bf2c9f;",
          data
        )
        // setRelationTags(
        //   rst.map((item) => ({ label: item.name, value: item.tagid }))
        // )
      })
      .catch((error) => {
        console.error("~", error)
      })
  }, [])

  return (
    <Row className="select-up" justify="center" align="middle">
      <Col className="arrow-icon-box" span={4}>
        <LeftCircleOutlined
          className="arrow-icon"
          onClick={() => setCur(cur - 1)}
        />
      </Col>
      {/* <Col span={16}>
        <Card
          title={
            <div>
              <Avatar
                src={following?.face}
                shape="circle"
                size="large"
                alt={following?.uname}
              />
              <span>{following?.uname}</span>
            </div>
          }
          extra={
            <a
              href={`https://space.bilibili.com/${following?.mid}`}
              target="_blank"
              rel="noreferrer"
            >
              更多信息
            </a>
          }
        >
          <Space direction="vertical">
            {following?.sign && <span>{following?.sign}</span>}
            {curRelationTagsList.length === 0 && (
              <span>你并未将该UP放置到任何分组</span>
            )}
            {curRelationTagsList.length !== 0 && (
              <span>你将该UP放置到：{curRelationTagsList.join()} 分组</span>
            )}
            <Checkbox.Group
              className="checkbox"
              options={relationTags}
              value={
                curRelationTagsList?.length === 0 ? [0] : curRelationTagsList
              }
              onChange={(val) => setcurRelationTagsList(val)}
            />
            <Button onClick={editRelationTags}>确定</Button>
          </Space>
        </Card>
      </Col> */}
      <Col className="arrow-icon-box" span={4}>
        <RightCircleOutlined
          className="arrow-icon"
          onClick={() => setCur(cur + 1)}
        />
      </Col>
    </Row>
  )
}

export default SelectUp

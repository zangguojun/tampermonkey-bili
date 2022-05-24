import React, { useState, useEffect } from "react"
import { Row, Col, Avatar, Card, Space, Checkbox, Button } from "antd"
import axios from "axios"
import qs from "qs"
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons"
import service from "@/service"

import "./index.less"

export default () => {
  const [cur, setCur] = useState(0)
  const [following, setFollowing] = useState()
  const [curRelationTagsList, setcurRelationTagsList] = useState([])

  const [relationTags, setRelationTags] = useState([])

  useEffect(() => {
    axios
      .get("https://api.bilibili.com/x/relation/tags")
      .then((res) => {
        console.log("🚀 ~ file: index.js ~ line 23 ~ .then ~ res", res)
        const rst = res?.data?.data
        setRelationTags(
          rst.map((item) => ({ label: item.name, value: item.tagid }))
        )
      })
      .catch((error) => {
        console.error("~", error)
      })
  }, [])

  useEffect(() => {
    service.axios
      .get("https://api.bilibili.com/x/relation/followings", {
        params: {
          vmid: "384426747",
          ps: 1,
          pn: cur + 1,
        },
      })
      .then((res) => {
        console.log("🚀 ~ file: index.js ~ line 31 ~ .then ~ rst", rst)
        const rst = res?.data?.data
        setFollowing(rst.list[0])
        return rst.list[0]
      })
      .then((res) => {
        axios
          .get("https://api.bilibili.com/x/relation/tag/user", {
            params: { fid: res.mid },
          })
          .then((res) => {
            const rst = res?.data?.data
            setcurRelationTagsList(
              Object.keys(rst).map((item) => parseInt(item, 10))
            )
          })
          .catch((error) => {
            console.error("~", "/relation/tag/user", error)
          })
      })
      .catch((error) => {
        console.error("~", "/relation/tag/user", error)
      })
  }, [cur])``

  const editRelationTags = () => {
    axios
      .post(
        "http://api.bilibili.com/x/",
        qs.stringify({
          fids: following?.mid,
          tagids: curRelationTagsList.join(),
          csrf: document.cookie.match(/bili_jct=(.*?);/)[1],
        }),
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        console.log("🚀 ~ file: index.js ~ line 78 ~ .then ~ 11111res", res)
        const rst = res?.data?.data
        setFollowing(rst.list[0])
        return rst.list[0]
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: index.js ~ line 84 ~1111 editRelationTags ~ error",
          error
        )
        console.error(error)
      })

    fetch("http://api.bilibili.com/x/relation/tag/create", {
      method: "post",
      body: qs.stringify({
        tag: "健身",
        csrf: document.cookie.match(/bili_jct=(.*?);/)[1],
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res) => {
        console.log("🚀 ~ file: Options.tsx ~ line 132 ~ .then ~ res)", res)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <Row className="select-up" justify="center" align="middle">
      <Col className="arrow-icon-box" span={4}>
        <LeftCircleOutlined
          className="arrow-icon"
          onClick={() => setCur(cur - 1)}
        />
      </Col>
      <Col span={16}>
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
      </Col>
      <Col className="arrow-icon-box" span={4}>
        <RightCircleOutlined
          className="arrow-icon"
          onClick={() => setCur(cur + 1)}
        />
      </Col>
    </Row>
  )
}

import axios from "axios"
import { notification } from "antd"

function GMRequest(detail: XHRDetails) {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      onload: function (response: XHRResponse) {
        if (response.status >= 200 && response.status < 400) {
          resolve(response.response)
        } else {
          notification.warning({
            message: "状态码异常",
            description: `异常状态码为：${response.status}`,
          })
          reject(response)
        }
      },
      onerror: function (error) {
        notification.error({
          message: "请求异常",
        })
        reject(error)
      },
      ontimeout: () => {
        notification.error({
          message: "请求超时",
        })
        reject("timeout")
      },
      ...detail,
    })
  })
}

const axiosRequest = axios.create({
  baseURL: "https://api.bilibili.com/x/",
  timeout: 5 * 1000,
})
axiosRequest.interceptors.response.use(
  (response) => {
    if (response.status >= 200 && response.status < 400) {
      return response?.data
    }
    notification.warning({
      message: "状态码异常",
      description: `异常状态码为：${response.status}`,
    })
  },
  (error) => {
    notification.error({
      message: "请求异常",
    })
    return error?.response?.data || Promise.reject(error)
  }
)

export { GMRequest, axiosRequest }

import { notification } from "antd"

function request(detail: XHRDetails) {
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

export { request }

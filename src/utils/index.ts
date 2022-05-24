import { GenericObject } from "@/commonType"

// POST返回 xml数据类型转换成 字符串或html 模块
function turnCdata(xmlRepo: XMLDocument) {
  const data = xmlRepo.getElementsByTagName("root")[0].childNodes[0].nodeValue
  if (!data) return ""
  if (replaceHtml(data)) {
    // 如果判断去掉html是否还有文字，否则返回html
    return replaceHtml(data) // 去掉html内容，返回文字
  } else {
    const domParser = new DOMParser()
    const htmlData = domParser.parseFromString(data, "text/html")
    return htmlData
  }
}

// 过滤html标签、前后空格、特殊符号
function replaceHtml(txt: string) {
  const reg3 = /[\r|\n|\b|\f|\t|\v]+/g //去掉特殊符号
  const reg = /<.+>/g //去掉所有<>内内容
  // 先reg3,\n特殊符号会影响reg的匹配
  return txt.replace(reg3, "").replace(reg, "").trim()
}

export { turnCdata, replaceHtml, GenericObject }

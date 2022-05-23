const commonMeta = {
  "name:en": "Bilibili Classify Helper",
  "name:zh-TW": "Bilibili UP整理助手",
  namespace: "https://github.com/zangguojun/bilibili-classify-up",
  version: "0.1.1",
  description: "哔哩哔哩整理关注Up组",
  "description:en": "bilibili-classify-up",
  author: "zangguojun",
  copyright: "zangguojun",
  license: "MIT",
  match: ["*://*.bilibili.com/*"],
  "run-at": "document-idle",
  supportURL: "https://github.com/zangguojun/bilibili-classify-up/issues",
  homepage: "https://github.com/zangguojun/bilibili-classify-up",
  grant: [
    "GM_getValue",
    "GM_setValue",
    "GM_deleteValue",
    "GM_info",
    "GM_xmlhttpRequest",
    "GM_openInTab",
    "GM_registerMenuCommand",
    "GM_addElement",
    "GM_addStyle",
    "GM_notification",
  ],
  connect: [
    "mymypic.net",
    "aip.baidubce.com",
    "cdn.jsdelivr.net",
    "raw.githubusercontent.com",
    "github.com",
    "www.bing.com",
    "translate.google.cn",
    "translate.google.com",
    "greasyfork.org",
    "localhost",
  ],
  require: [],
  icon: "https://avatars.githubusercontent.com/u/49148972?s=400&u=b2781dee2ef51edc64d769c125da0ed060203815&v=4",
}

const getBanner = (isProduction) => `// ==UserScript==\n${Object.entries(
  Object.assign(
    {
      name: isProduction ? "bili助手" : "bili助手-dev",
    },
    commonMeta
  )
)
  .map(([key, value]) => {
    if (Array.isArray(value)) {
      return value.map((item) => `// @${key.padEnd(20, " ")}${item}`).join("\n")
    }
    return `// @${key.padEnd(20, " ")}${value.replace(
      /\[year\]/g,
      new Date().getFullYear()
    )}`
  })
  .join("\n")}
// ==/UserScript==
/* eslint-disable */ /* spell-checker: disable */
// @[ You can find all source codes in GitHub repo ]`

module.exports = {
  commonMeta,
  getBanner,
}

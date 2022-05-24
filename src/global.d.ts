declare enum XHRResponseType {
  arraybuffer = "arraybuffer",
  blob = "blob",
  json = "json",
  text = "text",
  document = "document",
  form = "application/x-www-form-urlencoded",
}

declare enum XHRRequestMethod {
  GET = "GET",
  POST = "POST",
  HEAD = "HEAD",
}

declare interface XHRBasicDetails {
  url: string
  method?: XHRRequestMethod
  headers?: { [name: string]: string }
  data?: string
  binary?: boolean
  timeout?: number
  context?: any
  responseType?: XHRResponseType
  overrideMimeType?: string
  anonymous?: boolean
  fetch?: boolean
  username?: string
  password?: string
}

declare interface XHRResponse {
  finalUrl: string
  readyState: number
  status: number
  statusText: string
  responseHeaders: any
  response: any
  responseXML: Document
  responseText: string
}

declare interface XHRDetails extends XHRBasicDetails {
  onabort?: (response: XHRResponse) => void
  onerror?: (response: XHRResponse) => void
  onloadstart?: (response: XHRResponse) => void
  onprogress?: (response: XHRResponse) => void
  onreadystatechange?: (response: XHRResponse) => void
  ontimeout?: (response: XHRResponse) => void
  onload?: (response: XHRResponse) => void
}

declare function GM_xmlhttpRequest(details: XHRDetails): { abort: () => void }

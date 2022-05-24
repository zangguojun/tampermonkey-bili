const enum XhrMethod {
  POST = "POST",
  GET = "GET",
}

const enum XhrResponseType {
  arraybuffer = "arraybuffer",
  blob = "blob",
  json = "json",
  text = "text",
  document = "document",
  form = "application/x-www-form-urlencoded",
}

type XhrOptions = {
  responseType: XhrResponseType
  usermethod: XhrMethod
  contentType: XhrResponseType
}

const enum ReplyOrThank {
  reply = "reply",
  thank = "thk",
}

type Thread = {
  tid: string
  touseruid: string
  touser: string
  replyIndex: number
  replyLen: number
  randomTime: number
}

type ForumThreads = {
  fid: string
  fidTime: number
  fidRepIndex: number
  fidThkIndex: number
  fidthreads: Thread[]
}

type ReplyParams = {
  message: string
  posttime: string
  formhash: string
  usesig: number
  subject: string
}

interface GenericObject {
  [key: string]: any
}

export {
  XhrMethod,
  XhrResponseType,
  XhrOptions,
  ReplyOrThank,
  Thread,
  ForumThreads,
  ReplyParams,
  GenericObject,
}

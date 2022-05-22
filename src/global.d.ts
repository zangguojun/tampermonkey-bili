declare global {
  interface MonkeyXhrDetails extends MonkeyXhrBasicDetails {
    onabort?: (response: MonkeyXhrResponse) => void
    onerror?: (response: MonkeyXhrResponse) => void
    onloadstart?: (response: MonkeyXhrResponse) => void
    onprogress?: (response: MonkeyXhrResponse) => void
    onreadystatechange?: (response: MonkeyXhrResponse) => void
    ontimeout?: (response: MonkeyXhrResponse) => void
    onload?: (response: MonkeyXhrResponse) => void
  }

  function GM_xmlhttpRequest(details: MonkeyXhrDetails): { abort: () => void }
  function GM_setValue<T>(name: string, value: T): void
  function GM_getValue<T>(name: string, defaultValue?: T): T
  function GM_deleteValue(name: string): void
  function GM_getResourceText(name: string): string
  function GM_getResourceURL(name: string): string
  function GM_addStyle(name: string): string
  function GM_addElement(name: string): string
  function GM_notification(name: string): string
  function GM_openInTab(name: string): string
}

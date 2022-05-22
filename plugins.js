const { RawSource } = require("webpack").sources
const pluginName = "tampermonkey-write-plugin"

class TampermonkeyWritePlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    const { banner } = this.options
    compiler.hooks.emit.tap(pluginName, (compilation) => {
      compilation.assets["index.js"] = new RawSource(`
${banner}
;(function () {
  'use strict'
  if (location.href === 'http://localhost:8080/') return
  var script = document.createElement('script')
  script.src = 'http://localhost:8080/app.bundle.js'
  document.body.appendChild(script)
})()
`)
    })
  }
}

module.exports = {
  TampermonkeyWritePlugin,
}

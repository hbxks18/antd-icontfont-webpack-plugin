// const http = require("http")
import { get } from "http"

class AntdIcontfontWebpackPlugin {
  constructor(options = {}) {
    if (!options.url) {
      throw new Error(
        `url 参数是必填的，请填入iconfont生成的地址，例如:http://at.alicdn.com/t/font_1813645_sssetskfq0x.js`
      )
    }
    this.url = options.url
    this.scriptUrl = options.scriptUrl
      ? options.scriptUrl.startsWith("/")
        ? options.scriptUrl.slice(1)
        : options.scriptUrl
      : "static/js/iconfont.js"
    this.isCache = options.isCache || true
    this.backup = ""
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      "antd-icontfont-webpack-plugin",
      (compilation, callback) => {
        if (this.isCache && this.backup) {
          compilation.assets[this.scriptUrl] = {
            source: function () {
              return this.backup
            },
            size: function () {
              return this.backup.length
            },
          }
          callback()
          return
        }
        this.getIconfontFile()
          .then(body => {
            this.isCache && (this.backup = body)
            compilation.assets[this.scriptUrl] = {
              source: function () {
                return body
              },
              size: function () {
                return body.length
              },
            }
            callback()
          })
          .catch(err => {
            throw new Error(err)
          })
      }
    )
  }
  getIconfontFile() {
    return new Promise((resolve, reject) => {
      get(this.url).on("response", response => {
        let body = ""
        response
          .on("data", chunk => {
            body += chunk
          })
          .on("end", () => {
            resolve(body)
          })
          .on("error", err => {
            reject(err)
          })
      })
    })
  }
}

export default AntdIcontfontWebpackPlugin

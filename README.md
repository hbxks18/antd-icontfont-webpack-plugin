# Antd Iconfont plugin for webpack

一个用于处理 Antd 的 Icon 图标在使用外链 iconfont.cn 的图标库时将外链内容自动转换为本地资源的 webpack 插件

> NOTE: 支持 webpack v4+

## About

因为使用 iconfont.cn 的外链来生成图标在开发上有很多便利，但部分用户因为网络的原因可能无法访问对应的网络资源，所以该插件可以在编译时将 iconfont 的外链资源转换为本地资源，从而解决这个问题。

## Installation

`npm install --save-dev antd-icontfont-webpack-plugin`

## Usage

```js
// Icon 组件
import { createFromIconfontCN } from "@ant-design/icons"

const IconFont = createFromIconfontCN({
  // 注意，此处的scriptUrl需要与插件配置中的scriptUrl一致，既转为本地资源后文件的所在位置
  scriptUrl: "/static/js/iconfont.js",
})

export default IconFont
```

```js
// 插件配置
const AntdIcontfontWebpackPlugin = require("antd-icontfont-webpack-plugin")

const webpackConfig = {
  plugins: [
    new AntdIcontfontWebpackPlugin({
      // url 必填参数，是在iconfont生成的外链地址
      url: "http://at.alicdn.com/t/font_1813645_sssetskfq0x.js",
      // scriptUrl 必填参数， Icon组件使用的外链地址，两边保持一致即可
      scriptUrl: "/static/js/iconfont.js",
      // isCache 非必填，默认是true，会缓存外链资源，在每次重启webpack 的时候才会重新加载新的
      isCache: true,
    }),
  ],
}

module.exports = webpackConfig
```

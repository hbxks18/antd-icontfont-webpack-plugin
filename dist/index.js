'use strict';

var http = require('http');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var AntdIcontfontWebpackPlugin = /*#__PURE__*/function () {
  function AntdIcontfontWebpackPlugin() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, AntdIcontfontWebpackPlugin);

    if (!options.url) {
      throw new Error("url \u53C2\u6570\u662F\u5FC5\u586B\u7684\uFF0C\u8BF7\u586B\u5165iconfont\u751F\u6210\u7684\u5730\u5740\uFF0C\u4F8B\u5982:http://at.alicdn.com/t/font_1813645_sssetskfq0x.js");
    }

    this.url = options.url;
    this.scriptUrl = options.scriptUrl ? options.scriptUrl.startsWith("/") ? options.scriptUrl.slice(1) : options.scriptUrl : "static/js/iconfont.js";
    this.isCache = options.isCache || true;
    this.backup = "";
  }

  _createClass(AntdIcontfontWebpackPlugin, [{
    key: "apply",
    value: function apply(compiler) {
      var _this = this;

      compiler.hooks.emit.tapAsync("antd-icontfont-webpack-plugin", function (compilation, callback) {
        if (_this.isCache && _this.backup) {
          compilation.assets[_this.scriptUrl] = {
            source: function source() {
              return this.backup;
            },
            size: function size() {
              return this.backup.length;
            }
          };
          callback();
          return;
        }

        _this.getIconfontFile().then(function (body) {
          _this.isCache && (_this.backup = body);
          compilation.assets[_this.scriptUrl] = {
            source: function source() {
              return body;
            },
            size: function size() {
              return body.length;
            }
          };
          callback();
        })["catch"](function (err) {
          throw new Error(err);
        });
      });
    }
  }, {
    key: "getIconfontFile",
    value: function getIconfontFile() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        http.get(_this2.url).on("response", function (response) {
          var body = "";
          response.on("data", function (chunk) {
            body += chunk;
          }).on("end", function () {
            resolve(body);
          }).on("error", function (err) {
            reject(err);
          });
        });
      });
    }
  }]);

  return AntdIcontfontWebpackPlugin;
}();

module.exports = AntdIcontfontWebpackPlugin;

! function (t, e) {
    "object" == typeof exports &&
      "object" == typeof module ? module.exports =
      e() : "function" == typeof define &&
      define.amd ? define([], e) :
      "object" == typeof exports ?
      exports.tableExport = e() : t.tableExport =
      e()
}(this, function () {
    return function (t) {
        function e(r) {
            if (n[r]) return n[r].exports;
            var o = n[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return t[r].call(o.exports, o,
                o.exports, e), o.l = !0,
              o.exports
        }
        var n = {};
        return e.m = t, e.c = n, e.d =
          function (t, n, r) {
              e.o(t, n) || Object.defineProperty(
                t, n, {
                    configurable: !1,
                    enumerable: !0,
                    get: r
                })
          }, e.n = function (t) {
              var n = t && t.__esModule ?
                function () {
                    return t.default
                } : function () {
                    return t
                };
              return e.d(n, "a", n), n
          }, e.o = function (t, e) {
              return Object.prototype.hasOwnProperty
                .call(t, e)
          }, e.p = "", e(e.s = 5)
    }([function (t, e) {
        e.getText = function (t) {
            var e = t.textContent ||
              t.innerText;
            return null == e ? "" :
              e.replace(
                /^\s*(.*?)\s+$/,
                "$1")
        }, e.template = function (
          t, e) {
            return t.replace(
              /{{(\w+)}}/g,
              function (t, n) {
                  return e[n]
              })
        }
    }, function (t, e, n) {
        var r, o = o || function (t) {
            "use strict";
            if (!(void 0 === t ||
                "undefined" !=
                typeof navigator &&
                /MSIE [1-9]\./.test(
                  navigator.userAgent
                ))) {
                var e = t.document,
                  n = function () {
                      return t.URL || t
                        .webkitURL || t
                  },
                  r = e.createElementNS(
                    "http://www.w3.org/1999/xhtml",
                    "a"),
                  o = "download" in r,
                  i = function (t) {
                      var e = new MouseEvent(
                        "click");
                      t.dispatchEvent(e)
                  },
                  a = /constructor/i.test(
                    t.HTMLElement) ||
                  t.safari,
                  s = /CriOS\/[\d]+/.test(
                    navigator.userAgent
                  ),
                  c = function (e) {
                      (t.setImmediate ||
                        t.setTimeout)(
                        function () {
                            throw e
                        }, 0)
                  },
                  u = function (t) {
                      var e = function () {
                          "string" ==
                          typeof t ? n()
                            .revokeObjectURL(
                              t) : t.remove()
                      };
                      setTimeout(e, 4e4)
                  },
                  l = function (t, e,
                    n) {
                      e = [].concat(e);
                      for (var r = e.length; r--;) {
                          var o = t["on" +
                            e[r]];
                          if ("function" ==
                            typeof o) try {
                                o.call(t, n ||
                                  t)
                            } catch (t) {
                                c(t)
                            }
                      }
                  },
                  f = function (t) {
                      return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i
                        .test(t.type) ?
                        new Blob([
                          String.fromCharCode(
                            65279), t
                        ], {
                            type: t.type
                        }) : t
                  },
                  d = function (e, c,
                    d) {
                      d || (e = f(e));
                      var h, p = this,
                        g = e.type,
                        m =
                        "application/octet-stream" ===
                        g,
                        b = function () {
                            l(p,
                              "writestart progress write writeend"
                              .split(
                                " "))
                        };
                      if (p.readyState =
                        p.INIT, o)
                          return h = n().createObjectURL(
                            e), void setTimeout(
                            function () {
                                r.href =
                                  h, r.download =
                                  c, i(r),
                                  b(), u(
                                    h), p
                                  .readyState =
                                  p.DONE
                            });
                      ! function () {
                          if ((s || m &&
                              a) && t.FileReader) {
                              var r = new FileReader;
                              return r.onloadend =
                                function () {
                                    var e = s ?
                                      r.result :
                                      r.result
                                      .replace(
                                        /^data:[^;]*;/,
                                        "data:attachment/file;"
                                      );
                                    t.open(e,
                                        "_blank"
                                      ) || (t
                                        .location
                                        .href =
                                        e), e =
                                      void 0,
                                      p.readyState =
                                      p.DONE,
                                      b()
                                }, r.readAsDataURL(
                                  e), void (
                                  p.readyState =
                                  p.INIT)
                          }
                          if (h || (h = n()
                              .createObjectURL(
                                e)), m) t
                            .location.href =
                            h;
                          else {
                              t.open(h,
                                  "_blank") ||
                                (t.location
                                  .href = h
                                )
                          }
                          p.readyState =
                            p.DONE, b(),
                            u(h)
                      }()
                  },
                  h = d.prototype,
                  p = function (t, e,
                    n) {
                      return new d(t, e ||
                        t.name ||
                        "download", n
                      )
                  };
                return "undefined" !=
                  typeof navigator &&
                  navigator.msSaveOrOpenBlob ?
                  function (t, e, n) {
                      return e = e || t
                        .name ||
                        "download", n ||
                        (t = f(t)),
                        navigator.msSaveOrOpenBlob(
                          t, e)
                  } : (h.abort =
                    function () { }, h.readyState =
                    h.INIT = 0, h.WRITING =
                    1, h.DONE = 2, h.error =
                    h.onwritestart =
                    h.onprogress = h.onwrite =
                    h.onabort = h.onerror =
                    h.onwriteend =
                    null, p)
            }
        }("undefined" != typeof self &&
          self || "undefined" !=
          typeof window && window ||
          this.content);
        void 0 !== t && t.exports ?
          t.exports.saveAs = o :
          null !== n(8) && null !==
          n(9) && void 0 !== (r =
            function () {
                return o
            }.call(e, n, e, t)) &&
          (t.exports = r)
    }, function (t, e, n) {
        var r = n(0),
          o = function (t) {
              return '\t"' + t.replace(
                /"/g, '""') + '"'
          };
        t.exports = function (t) {
            for (var e, n =
                "\ufeff", i = 0; e =
              t.rows[i]; i++) {
                for (var a, s = 0; a =
                  e.cells[s]; s++) n =
                  n + (s ? "," : "") +
                  o(r.getText(a));
                n += "\r\n"
            }
            return n
        }
    }, function (t, e, n) {
        var r = n(0);
        t.exports = function (t, e,
          n) {
            var o =
              '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:{{type}}" xmlns="http://www.w3.org/TR/REC-html40">';
            o +=
              '<head><meta charset="{{charset}}" />\x3c!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>',
              o +=
              "??????1</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--\x3e",
              o +=
              "</head><body><table>{{table}}</table></body></html>";
            for (var i, a = "", s = [
                  ["<thead><tr>",
                    "</tr></thead>"
            ],
                  ["<tbody><tr>",
                    "</tr></tbody>"
            ],
                  ["<tr>", "</tr>"]
            ], c = [
                  ["<th>", "</th>"],
                  [
                    '<td style="vnd.ms-excel.numberformat:@">',
                    "</td>"
            ]
            ], u = +!t.tHead, l =
                1 - u, f = 0; i = t
              .rows[f]; f++) {
                u = f > l ? 2 : u, a +=
                  s[u][0];
                for (var d, h = 0; d =
                  i.cells[h]; h++) a +=
                  c[+!!u][0] + r.getText(
                    d) + c[+!!u][1];
                a += s[u][1], u++
            }
            return r.template(o, {
                charset: e,
                type: n,
                table: a
            })
        }
    }, function (t, e, n) {
        var r = n(0),
          o = function (t) {
              function e(t) {
                  return ("0" +
                    parseInt(t).toString(
                      16)).slice(-2)
              }
              return "transparent" ===
                t.toLowerCase() ||
                "rgba(0, 0, 0, 0)" ===
                t ? "#fff" : -1 ===
                t.search("rgb") ? t :
                (t = t.match(
                    /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/
                  ), "#" + e(t[1]) +
                  e(t[2]) + e(t[3]))
          },
          i = function (t, e) {
              var n = new Image,
                r =
                "data:image/svg+xml;utf8," +
                encodeURIComponent(t),
                o = function () {
                    n.onload = null, n.onerror =
                      null
                };
              n.onload = function () {
                  o(), e(n)
              }, n.src = r
          };
        t.exports = function (t, e,
          n) {
            var a = t.offsetWidth,
              s = t.offsetHeight +
              8,
              c = document.createElement(
                "canvas"),
              u = c.getContext("2d");
            c.width = a, c.height =
              s;
            var l = new DOMParser,
              f = l.parseFromString(
                t.outerHTML,
                "text/html"),
              d = (new XMLSerializer)
              .serializeToString(f),
              h = r.template(
                '<svg xmlns="http://www.w3.org/2000/svg" width="{{width}}" height="{{height}}"><style scoped="">html::-webkit-scrollbar { display: none; }</style><foreignObject x="0" y="0" width="{{width}}" height="{{height}}" style="float: left;" externalResourcesRequired="true">{{xhtml}}</foreignObject></svg>', {
                    width: a,
                    height: s,
                    xhtml: d
                });
            "function" == typeof e
              && (n = e, e = null),
              i(h, function (r) {
                  e && "png" !== e.format &&
                    (u.fillStyle =
                      o(t.style.backgroundColor ||
                        getComputedStyle(
                          t, null).getPropertyValue(
                          "background-color"
                        )), u.fillRect(
                        0, 0, r.width,
                        r.height)),
                    u.drawImage(r,
                      0, 0), n(c)
              })
        }
    }, function (t, e, n) {
        t.exports = function (t, e,
          r) {
            var o = document,
              i = o.getElementById(
                t),
              a = o.characterSet,
              s = {
                  json: "application/json;charset=" +
                    a,
                  txt: "csv/txt;charset=" +
                    a,
                  csv: "csv/txt;charset=" +
                    a,
                  xml: "application/xml",
                  doc: "application/msword",
                  xls: "application/vnd.ms-excel",
                  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              },
              c = {
                  txt: n(2),
                  csv: n(2),
                  xml: n(6),
                  doc: n(3),
                  xls: n(3),
                  image: n(7),
                  pdf: n(11),
                  docx: ""
              },
              u = c[r];
            if ("function" !=
              typeof u) throw new Error(
              "the supported types are: json, txt, csv, xml, doc, xls, image, pdf"
            );
            if ("image" === r ||
              "pdf" === r) u(i, e);
            else {
                var l = u(i, a, r);
                n(1).saveAs(new Blob(
                  [l], {
                      type: s[r]
                  }), e + "." + r)
            }
        }
    }, function (t, e, n) {
        var r = n(0);
        t.exports = function (t) {
            for (var e, n =
                '<?xml version="1.0" encoding="utf-8"?><table>',
                o = 0; e = t.rows[o]; o++) {
                n += '<row id="' + o +
                  '">';
                for (var i, a = 0; i =
                  e.cells[a]; a++) n +=
                  "<column>" + r.getText(
                    i) + "</column>";
                n += "</row>"
            }
            return n += "</table>"
        }
    }, function (t, e, n) {
        var r = n(1).saveAs;
        n(10);
        var o = n(4);
        t.exports = function (t, e) {
            o(t, function (t) {
                t.toBlob(function (
                  t) {
                    r(t, e +
                      ".png")
                })
            })
        }
    }, function (t, e) {
        t.exports = function () {
            throw new Error(
              "define cannot be used indirect"
            )
        }
    }, function (t, e) {
        (function (e) {
            t.exports = e
        }).call(e, {})
    }, function (t, e, n) {
        var r;
        ! function (o) {
            "use strict";
            var i = o.HTMLCanvasElement &&
              o.HTMLCanvasElement.prototype,
              a = o.Blob && function () {
                  try {
                      return Boolean(new Blob)
                  } catch (t) {
                      return !1
                  }
              }(),
              s = a && o.Uint8Array &&
              function () {
                  try {
                      return 100 === new Blob(
                        [new Uint8Array(
                          100)]).size
                  } catch (t) {
                      return !1
                  }
              }(),
              c = o.BlobBuilder || o.WebKitBlobBuilder ||
              o.MozBlobBuilder || o.MSBlobBuilder,
              u =
              /^data:((.*?)(;charset=.*?)?)(;base64)?,/,
              l = (a || c) && o.atob &&
              o.ArrayBuffer && o.Uint8Array &&
              function (t) {
                  var e, n, r, o, i, l,
                    f, d, h;
                  if (!(e = t.match(u)))
                      throw new Error(
                        "invalid data URI"
                      );
                  for (n = e[2] ? e[1] :
                    "text/plain" + (e[3] ||
                      ";charset=US-ASCII"
                    ), r = !!e[4], o =
                    t.slice(e[0].length),
                    i = r ? atob(o) :
                    decodeURIComponent(
                      o), l = new ArrayBuffer(
                      i.length), f =
                    new Uint8Array(l),
                    d = 0; d < i.length; d +=
                    1) f[d] = i.charCodeAt(
                    d);
                  return a ? new Blob([
                    s ? f : l
                  ], {
                      type: n
                  }) : (h = new c, h.append(
                    l), h.getBlob(n))
              };
            o.HTMLCanvasElement && !i
              .toBlob && (i.mozGetAsFile ?
                i.toBlob = function (t,
                  e, n) {
                    t(n && i.toDataURL &&
                      l ? l(this.toDataURL(
                        e, n)) : this
                      .mozGetAsFile(
                        "blob", e))
                } : i.toDataURL && l &&
                (i.toBlob = function (
                  t, e, n) {
                    t(l(this.toDataURL(
                      e, n)))
                })), void 0 !== (r =
                function () {
                    return l
                }.call(e, n, e, t)) &&
              (t.exports = r)
        }(window)
    }, function (t, e, n) {
        var r = n(1).saveAs,
          o = n(0),
          i = n(12);
        t.exports = function (t, e) {
            var n = new i("p", "pt",
                "a4", !1),
              a = 20,
              s = 0,
              c = 0,
              u = 1,
              l = function (t) {
                  r(t.output("blob"),
                    e + ".pdf")
              };
            if (n.setFontSize(14),
              /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi
              .test(o.getText(t))) n
              .addDOM(t, a, 20,
                function () {
                    l(n)
                });
            else {
                for (var f, d = 0, h = [],
                    p = 0; f = t.rows[
                    p]; p++) {
                    0 === p && (d = f.clientHeight),
                      (p + 1) % 26 == 0 &&
                      (n.addPage(), u++,
                        a += 10), c = a +
                      p * d - 280 * (u -
                        1);
                    for (var g, m = 0; g =
                      f.cells[m]; m++) {
                        0 === p && (h[m] =
                          g.clientWidth
                        ), s = 20;
                        for (var b = 0; b <
                          m; b++) s += h[
                          b];
                        n.text(o.getText(
                          g), s, c)
                    }
                }
                l(n)
            }
        }
    }, function (t, e, n) {
        var r = window.jsPDF = n(13);
        n(14),
          function (t) {
              "use strict";
              t.addDOM = function (t,
                e, r, o, i) {
                  var a = n(4);
                  "number" != typeof e
                    && (o = e, i = r),
                    "function" ==
                    typeof o && (i =
                      o, o = null);
                  var s = this.internal,
                    c = s.scaleFactor,
                    u = s.pageSize.width,
                    l = s.pageSize.height;
                  o = o || {}, o.onrendered =
                    function (t) {
                        e = parseInt(e) ||
                          0, r =
                          parseInt(r) ||
                          0;
                        var n = o.dim ||
                          {},
                          a = n.h || 0,
                          s = n.w ||
                          Math.min(u, t
                            .width / c) -
                          e,
                          f = "JPEG";
                        if (o.format &&
                          (f = o.format),
                          t.height > l &&
                          o.pagesplit) {
                            var d =
                              function () {
                                  for (var n =
                                      0; ;) {
                                      var o =
                                        document
                                        .createElement(
                                          "canvas"
                                        );
                                      o.width =
                                        Math.min(
                                          u *
                                          c,
                                          t.width
                                        ), o.height =
                                        Math.min(
                                          l *
                                          c,
                                          t.height -
                                          n);
                                      o.getContext(
                                        "2d"
                                      ).drawImage(
                                        t,
                                        0,
                                        n,
                                        t.width,
                                        o.height,
                                        0,
                                        0,
                                        o.width,
                                        o.height
                                      );
                                      var a = [
                                        o,
                                        e,
                                        n ?
                                        0 :
                                        r,
                                        o.width /
                                        c,
                                        o.height /
                                        c,
                                        f,
                                        null,
                                        "SLOW"
                                      ];
                                      if (
                                        this.addImage
                                        .apply(
                                          this,
                                          a),
                                        (n +=
                                          o.height
                                        ) >=
                                        t.height
                                      ) break;
                                      this.addPage()
                                  }
                                  i(s, n,
                                    null,
                                    a)
                              }.bind(this);
                            if ("CANVAS" ===
                              t.nodeName) {
                                var h = new Image;
                                h.onload =
                                  d, h.src =
                                  t.toDataURL(
                                    "image/png"
                                  ), t = h
                            } else d()
                        } else {
                            var p = Math.random()
                              .toString(
                                35),
                              g = [t, e,
                                r, s, a,
                                f, p,
                                "SLOW"
                              ];
                            this.addImage
                              .apply(this,
                                g), i(s,
                                a, p, g)
                        }
                    }.bind(this), a(t, {
                        format: "jpg"
                    }, function (t) {
                        o.onrendered(
                          t)
                    })
              }
          }(r.API), t.exports = r
    }, function (t, e, n) {
        var r;
        ! function (o) {
            "use strict";

            function i(t) {
                var e = {};
                this.subscribe =
                  function (t, n, r) {
                      if ("function" !=
                        typeof n) return !
                        1;
                      e.hasOwnProperty(t) ||
                        (e[t] = {});
                      var o = Math.random()
                        .toString(35);
                      return e[t][o] = [n, !
                        !r
                      ], o
                  }, this.unsubscribe =
                  function (t) {
                      for (var n in e)
                          if (e[n][t])
                              return delete e[
                                n][t], !0;
                      return !1
                  }, this.publish =
                  function (n) {
                      if (e.hasOwnProperty(
                          n)) {
                          var r = Array.prototype
                            .slice.call(
                              arguments, 1),
                            i = [];
                          for (var a in e[n]) {
                              var s = e[n][a];
                              try {
                                  s[0].apply(t,
                                    r)
                              } catch (t) {
                                  o.console &&
                                    console.error(
                                      "jsPDF PubSub Error",
                                      t.message,
                                      t)
                              }
                              s[1] && i.push(
                                a)
                          }
                          i.length && i.forEach(
                            this.unsubscribe
                          )
                      }
                  }
            }

            function a(t, e, n, r) {
                var u = {};
                "object" == typeof t &&
                  (u = t, t = u.orientation,
                    e = u.unit || e, n =
                    u.format || n, r =
                    u.compress || u.compressPdf ||
                    r), e = e || "mm",
                  n = n || "a4", t = (
                    "" + (t || "P")).toLowerCase();
                var l, f, d, h, p, g, m,
                  b, v, y = (("" + n).toLowerCase(), !
                    !r && "function" ==
                    typeof Uint8Array),
                  w = u.textColor ||
                  "0 g",
                  C = u.drawColor ||
                  "0 G",
                  A = u.fontSize || 16,
                  x = u.lineHeight ||
                  1.15,
                  E = u.lineWidth ||
                  .200025,
                  I = 2,
                  S = !1,
                  j = [],
                  D = {},
                  P = {},
                  O = 0,
                  T = [],
                  B = [],
                  R = [],
                  F = [],
                  U = [],
                  L = 0,
                  k = 0,
                  M = 0,
                  N = {
                      title: "",
                      subject: "",
                      author: "",
                      keywords: "",
                      creator: ""
                  },
                  _ = {},
                  G = new i(_),
                  W = u.hotfixes || [],
                  z = function (t) {
                      return t.toFixed(2)
                  },
                  H = function (t) {
                      return t.toFixed(3)
                  },
                  J = function (t) {
                      return ("0" +
                        parseInt(t)).slice(-
                        2)
                  },
                  V = function (t) {
                      S ? T[h].push(t) :
                        (M += t.length +
                          1, F.push(t))
                  },
                  X = function () {
                      return I++, j[I] =
                        M, V(I + " 0 obj"),
                        I
                  },
                  Y = function () {
                      var t = 2 * T.length +
                        1;
                      t += U.length;
                      var e = {
                          objId: t,
                          content: ""
                      };
                      return U.push(e), e
                  },
                  q = function () {
                      return I++, j[I] =
                        function () {
                            return M
                        }, I
                  },
                  K = function (t) {
                      j[t] = M
                  },
                  Z = function (t) {
                      V("stream"), V(t),
                        V("endstream")
                  },
                  $ = function () {
                      var t, e, n, r, i,
                        s, c, u, l, d = [];
                      for (c = o.adler32cs ||
                        a.adler32cs, y &&
                        void 0 === c && (
                          y = !1), t = 1; t <=
                        O; t++) {
                          if (d.push(X()),
                            u = (p = R[t].width) *
                            f, l = (g = R[t]
                              .height) * f,
                            V(
                              "<</Type /Page"
                            ), V(
                              "/Parent 1 0 R"
                            ), V(
                              "/Resources 2 0 R"
                            ), V(
                              "/MediaBox [0 0 " +
                              z(u) + " " +
                              z(l) + "]"),
                            G.publish(
                              "putPage", {
                              pageNumber: t,
                              page: T[t]
                          }), V(
                              "/Contents " +
                              (I + 1) +
                              " 0 R"), V(
                              ">>"), V(
                              "endobj"), e =
                            T[t].join("\n"),
                            X(), y) {
                              for (n = [], r =
                                e.length; r--;
                              ) n[r] = e.charCodeAt(
                                r);
                              s = c.from(e),
                                i = new Deflater(
                                  6), i.append(
                                  new Uint8Array(
                                    n)), e =
                                i.flush(), n =
                                new Uint8Array(
                                  e.length +
                                  6), n.set(
                                  new Uint8Array(
                                    [120, 156]
                                  )), n.set(e,
                                  2), n.set(
                                  new Uint8Array(
                                    [255 & s,
                                      s >> 8 &
                                      255, s >>
                                      16 &
                                      255, s >>
                                      24 &
                                      255
                                    ]), e.length +
                                  2), e =
                                String.fromCharCode
                                .apply(null,
                                  n), V(
                                  "<</Length " +
                                  e.length +
                                  " /Filter [/FlateDecode]>>"
                                )
                          } else V(
                            "<</Length " +
                            e.length +
                            ">>");
                          Z(e), V("endobj")
                      }
                      j[1] = M, V(
                        "1 0 obj"), V(
                        "<</Type /Pages"
                      );
                      var h = "/Kids [";
                      for (r = 0; r < O; r++)
                          h += d[r] +
                          " 0 R ";
                      V(h + "]"), V(
                          "/Count " + O),
                        V(">>"), V(
                          "endobj"), G.publish(
                          "postPutPages")
                  },
                  Q = function (t) {
                      t.objectNumber = X(),
                        V("<</BaseFont/" +
                          t.PostScriptName +
                          "/Type/Font"),
                        "string" ==
                        typeof t.encoding &&
                        V("/Encoding/" +
                          t.encoding), V(
                          "/Subtype/Type1>>"
                        ), V("endobj")
                  },
                  tt = function () {
                      for (var t in D) D.hasOwnProperty(
                        t) && Q(D[t])
                  },
                  et = function () {
                      G.publish(
                        "putXobjectDict"
                      )
                  },
                  nt = function () {
                      V(
                        "/ProcSet [/PDF /Text /ImageB /ImageC /ImageI]"
                      ), V("/Font <<");
                      for (var t in D) D.hasOwnProperty(
                        t) && V("/" + t +
                        " " + D[t].objectNumber +
                        " 0 R");
                      V(">>"), V(
                          "/XObject <<"),
                        et(), V(">>")
                  },
                  rt = function () {
                      tt(), G.publish(
                          "putResources"),
                        j[2] = M, V(
                          "2 0 obj"), V(
                          "<<"), nt(), V(
                          ">>"), V(
                          "endobj"), G.publish(
                          "postPutResources"
                        )
                  },
                  ot = function () {
                      G.publish(
                        "putAdditionalObjects"
                      );
                      for (var t = 0; t <
                        U.length; t++) {
                          var e = U[t];
                          j[e.objId] = M, V(
                            e.objId +
                            " 0 obj"), V(
                            e.content), V(
                            "endobj")
                      }
                      I += U.length, G.publish(
                        "postPutAdditionalObjects"
                      )
                  },
                  it = function (t, e, n) {
                      P.hasOwnProperty(e) ||
                        (P[e] = {}), P[e]
                        [n] = t
                  },
                  at = function (t, e, n,
                    r) {
                      var o = "F" + (
                          Object.keys(D).length +
                          1).toString(10),
                        i = D[o] = {
                            id: o,
                            PostScriptName: t,
                            fontName: e,
                            fontStyle: n,
                            encoding: r,
                            metadata: {}
                        };
                      return it(o, e, n),
                        G.publish(
                          "addFont", i),
                        o
                  },
                  st = function (t, e) {
                      var n, r, o, i, a,
                        s, c, u, f;
                      if (e = e || {}, o =
                        e.sourceEncoding ||
                        "Unicode", a = e.outputEncoding,
                        (e.autoencode ||
                          a) && D[l].metadata &&
                        D[l].metadata[o] &&
                        D[l].metadata[o].encoding &&
                        (i = D[l].metadata[
                            o].encoding, !
                          a && D[l].encoding &&
                          (a = D[l].encoding), !
                          a && i.codePages &&
                          (a = i.codePages[
                            0]), "string" ==
                          typeof a && (a =
                            i[a]), a)) {
                          for (c = !1, s = [],
                            n = 0, r = t.length; n <
                            r; n++) u = a[t
                            .charCodeAt(n)
                            ], u ? s.push(
                            String.fromCharCode(
                              u)) : s.push(
                            t[n]), s[n].charCodeAt(
                            0) >> 8 && (c = !
                            0);
                          t = s.join("")
                      }
                      for (n = t.length; void 0 ===
                        c && 0 !== n;) t.charCodeAt(
                          n - 1) >> 8 &&
                        (c = !0), n--;
                      if (!c) return t;
                      for (s = e.noBOM ? [] :
                        [254, 255], n = 0,
                        r = t.length; n <
                        r; n++) {
                          if (u = t.charCodeAt(
                              n), (f = u >>
                              8) >> 8) throw new Error(
                            "Character at position " +
                            n +
                            " of string '" +
                            t +
                            "' exceeds 16bits. Cannot be encoded into UCS-2 BE"
                          );
                          s.push(f), s.push(
                            u - (f << 8))
                      }
                      return String.fromCharCode
                        .apply(void 0, s)
                  },
                  ct = function (t, e) {
                      return st(t, e).replace(
                        /\\/g, "\\\\").replace(
                        /\(/g, "\\(").replace(
                        /\)/g, "\\)")
                  },
                  ut = function () {
                      V(
                        "/Producer (jsPDF " +
                        a.version + ")"
                      );
                      for (var t in N) N.hasOwnProperty(
                        t) && N[t] && V(
                        "/" + t.substr(
                          0, 1).toUpperCase() +
                        t.substr(1) +
                        " (" + ct(N[t]) +
                        ")");
                      var e = new Date,
                        n = e.getTimezoneOffset(),
                        r = n < 0 ? "+" :
                        "-",
                        o = Math.floor(
                          Math.abs(n / 60)
                        ),
                        i = Math.abs(n %
                          60),
                        s = [r, J(o), "'",
                          J(i), "'"
                        ].join("");
                      V([
                        "/CreationDate (D:",
                        e.getFullYear(),
                        J(e.getMonth() +
                          1), J(e.getDate()),
                        J(e.getHours()),
                        J(e.getMinutes()),
                        J(e.getSeconds()),
                        s, ")"
                      ].join(""))
                  },
                  lt = function () {
                      switch (V(
                          "/Type /Catalog"
                        ), V(
                          "/Pages 1 0 R"),
                        b || (b =
                          "fullwidth"), b
                      ) {
                          case "fullwidth":
                              V(
                                "/OpenAction [3 0 R /FitH null]"
                              );
                              break;
                          case "fullheight":
                              V(
                                "/OpenAction [3 0 R /FitV null]"
                              );
                              break;
                          case "fullpage":
                              V(
                                "/OpenAction [3 0 R /Fit]"
                              );
                              break;
                          case "original":
                              V(
                                "/OpenAction [3 0 R /XYZ null null 1]"
                              );
                              break;
                          default:
                              var t = "" + b;
                              "%" === t.substr(
                                  t.length -
                                  1) && (b =
                                  parseInt(b) /
                                  100),
                                "number" ==
                                typeof b && V(
                                  "/OpenAction [3 0 R /XYZ null null " +
                                  z(b) + "]")
                      }
                      switch (v || (v =
                          "continuous"),
                        v) {
                          case "continuous":
                              V(
                                "/PageLayout /OneColumn"
                              );
                              break;
                          case "single":
                              V(
                                "/PageLayout /SinglePage"
                              );
                              break;
                          case "two":
                          case "twoleft":
                              V(
                                "/PageLayout /TwoColumnLeft"
                              );
                              break;
                          case "tworight":
                              V(
                                "/PageLayout /TwoColumnRight"
                              )
                      }
                      m && V(
                        "/PageMode /" +
                        m), G.publish(
                        "putCatalog")
                  },
                  ft = function () {
                      V("/Size " + (I + 1)),
                        V("/Root " + I +
                          " 0 R"), V(
                          "/Info " + (I -
                            1) + " 0 R")
                  },
                  dt = function (t, e) {
                      var n = "string" ==
                        typeof e && e.toLowerCase();
                      if ("string" ==
                        typeof t) {
                          var r = t.toLowerCase();
                          c.hasOwnProperty(
                            r) && (t = c[
                              r][0] / f,
                            e = c[r][1] /
                            f)
                      }
                      if (Array.isArray(t) &&
                        (e = t[1], t = t[
                          0]), n) {
                          switch (n.substr(
                            0, 1)) {
                              case "l":
                                  e > t && (n =
                                    "s");
                                  break;
                              case "p":
                                  t > e && (n =
                                    "s")
                          }
                          "s" === n && (d =
                            t, t = e, e =
                            d)
                      }
                      S = !0, T[++O] = [],
                        R[O] = {
                            width: Number(t) ||
                              p,
                            height: Number(
                              e) || g
                        }, B[O] = {}, gt(
                          O)
                  },
                  ht = function () {
                      dt.apply(this,
                          arguments), V(z(
                          E * f) + " w"),
                        V(C), 0 !== L &&
                        V(L + " J"), 0 !==
                        k && V(k + " j"),
                        G.publish(
                          "addPage", {
                              pageNumber: O
                          })
                  },
                  pt = function (t) {
                      t > 0 && t <= O &&
                        (T.splice(t, 1),
                          R.splice(t, 1),
                          O--, h > O && (
                            h = O), this.setPage(
                            h))
                  },
                  gt = function (t) {
                      t > 0 && t <= O &&
                        (h = t, p = R[t].width,
                          g = R[t].height
                        )
                  },
                  mt = function (t, e) {
                      var n;
                      switch (t = void 0 !==
                        t ? t : D[l].fontName,
                        e = void 0 !== e ?
                          e : D[l].fontStyle,
                        void 0 !== t && (
                          t = t.toLowerCase()
                        ), t) {
                          case "sans-serif":
                          case "verdana":
                          case "arial":
                          case "helvetica":
                              t = "helvetica";
                              break;
                          case "fixed":
                          case "monospace":
                          case "terminal":
                          case "courier":
                              t = "courier";
                              break;
                          case "serif":
                          case "cursive":
                          case "fantasy":
                          default:
                              t = "times"
                      }
                      try {
                          n = P[t][e]
                      } catch (t) { }
                      return n || null ==
                        (n = P.times[e]) &&
                        (n = P.times.normal),
                        n
                  },
                  bt = function () {
                      S = !1, I = 2, M =
                        0, F = [], j = [],
                        U = [], G.publish(
                          "buildDocument"
                        ), V("%PDF-" + s),
                        $(), ot(), rt(),
                        X(), V("<<"), ut(),
                        V(">>"), V(
                          "endobj"), X(),
                        V("<<"), lt(), V(
                          ">>"), V(
                          "endobj");
                      var t, e = M,
                        n = "0000000000";
                      for (V("xref"), V(
                          "0 " + (I + 1)),
                        V(n + " 65535 f "),
                        t = 1; t <= I; t++
                      ) {
                          var r = j[t];
                          V("function" ==
                            typeof r ? (n +
                              j[t]()).slice(-
                              10) +
                            " 00000 n " :
                            (n + j[t]).slice(-
                              10) +
                            " 00000 n ")
                      }
                      return V("trailer"),
                        V("<<"), ft(), V(
                          ">>"), V(
                          "startxref"), V(
                          "" + e), V(
                          "%%EOF"), S = !
                        0, F.join("\n")
                  },
                  vt = function (t) {
                      var e = "S";
                      return "F" === t ?
                        e = "f" : "FD" ===
                        t || "DF" === t ?
                        e = "B" : "f" !==
                        t && "f*" !== t &&
                        "B" !== t && "B*" !==
                        t || (e = t), e
                  },
                  yt = function () {
                      for (var t = bt(),
                          e = t.length, n =
                          new ArrayBuffer(
                            e), r = new Uint8Array(
                            n) ; e--;) r[e] =
                        t.charCodeAt(e);
                      return n
                  },
                  wt = function () {
                      return new Blob([yt()], {
                          type: "application/pdf"
                      })
                  },
                  Ct = function (t) {
                      return t.foo =
                        function () {
                            try {
                                return t.apply(
                                  this,
                                  arguments
                                )
                            } catch (t) {
                                var e = t.stack ||
                                  "";
                                ~e.indexOf(
                                    " at ") &&
                                  (e = e.split(
                                    " at ")[
                                    1]);
                                var n =
                                  "Error in function " +
                                  e.split(
                                    "\n")[0].split(
                                    "<")[0] +
                                  ": " + t.message;
                                if (!o.console)
                                    throw new Error(
                                      n);
                                o.console.error(
                                    n, t), o.alert &&
                                  alert(n)
                            }
                        }, t.foo.bar = t,
                        t.foo
                  }(function (t, e) {
                      var n = "dataur" ===
                        ("" + t).substr(
                          0, 6) ?
                        "data:application/pdf;base64," +
                        btoa(bt()) : 0;
                      switch (t) {
                          case void 0:
                              return bt();
                          case "save":
                              if (navigator
                                .getUserMedia &&
                                (void 0 ===
                                  o.URL ||
                                  void 0 ===
                                  o.URL.createObjectURL
                                )) return _
                                .output(
                                  "dataurlnewwindow"
                                );
                              saveAs(wt(),
                                  e),
                                "function" ==
                                typeof saveAs
                                .unload &&
                                o.setTimeout &&
                                setTimeout(
                                  saveAs.unload,
                                  911);
                              break;
                          case "arraybuffer":
                              return yt();
                          case "blob":
                              return wt();
                          case "bloburi":
                          case "bloburl":
                              return o.URL &&
                                o.URL.createObjectURL(
                                  wt()) ||
                                void 0;
                          case "datauristring":
                          case "dataurlstring":
                              return n;
                          case "dataurlnewwindow":
                              var r = o.open(
                                n);
                              if (r ||
                                "undefined" ==
                                typeof safari
                              ) return r;
                          case "datauri":
                          case "dataurl":
                              return o.document
                                .location.href =
                                n;
                          default:
                              throw new Error(
                                'Output type "' +
                                t +
                                '" is not supported.'
                              )
                      }
                  }),
                  At = function (t) {
                      return !0 === Array
                        .isArray(W) && W.indexOf(
                          t) > -1
                  };
                switch (e) {
                    case "pt":
                        f = 1;
                        break;
                    case "mm":
                        f = 72 / 25.4000508;
                        break;
                    case "cm":
                        f = 72 / 2.54000508;
                        break;
                    case "in":
                        f = 72;
                        break;
                    case "px":
                        f = 1 == At(
                            "px_scaling") ?
                          .75 : 96 / 72;
                        break;
                    case "pc":
                    case "em":
                        f = 12;
                        break;
                    case "ex":
                        f = 6;
                        break;
                    default:
                        throw "Invalid unit: " +
                          e
                }
                _.internal = {
                    pdfEscape: ct,
                    getStyle: vt,
                    getFont: function () {
                        return D[mt.apply(
                          _,
                          arguments
                        )]
                    },
                    getFontSize: function () {
                        return A
                    },
                    getLineHeight: function () {
                        return A * x
                    },
                    write: function (t) {
                        V(1 ===
                          arguments.length ?
                            t : Array.prototype
                          .join.call(
                            arguments,
                            " "))
                    },
                    getCoordinateString: function (
                      t) {
                        return z(t * f)
                    },
                    getVerticalCoordinateString: function (
                      t) {
                        return z((g - t) *
                          f)
                    },
                    collections: {},
                    newObject: X,
                    newAdditionalObject: Y,
                    newObjectDeferred: q,
                    newObjectDeferredBegin: K,
                    putStream: Z,
                    events: G,
                    scaleFactor: f,
                    pageSize: {
                        get width() {
                            return p
                        },
                        get height() {
                            return g
                        }
                    },
                    output: function (t,
                      e) {
                        return Ct(t, e)
                    },
                    getNumberOfPages: function () {
                        return T.length -
                          1
                    },
                    pages: T,
                    out: V,
                    f2: z,
                    getPageInfo: function (
                      t) {
                        return {
                            objId: 2 * (t -
                              1) + 3,
                            pageNumber: t,
                            pageContext: B[
                              t]
                        }
                    },
                    getCurrentPageInfo: function () {
                        return {
                            objId: 2 * (h -
                              1) + 3,
                            pageNumber: h,
                            pageContext: B[
                              h]
                        }
                    },
                    getPDFVersion: function () {
                        return s
                    },
                    hasHotfix: At
                }, _.addPage =
                  function () {
                      return ht.apply(
                        this, arguments
                      ), this
                  }, _.setPage =
                  function () {
                      return gt.apply(
                        this, arguments
                      ), this
                  }, _.insertPage =
                  function (t) {
                      return this.addPage(),
                        this.movePage(h,
                          t), this
                  }, _.movePage =
                  function (t, e) {
                      if (t > e) {
                          for (var n = T[t],
                              r = R[t], o =
                              B[t], i = t; i >
                            e; i--) T[i] =
                            T[i - 1], R[i] =
                            R[i - 1], B[i] =
                            B[i - 1];
                          T[e] = n, R[e] =
                            r, B[e] = o,
                            this.setPage(e)
                      } else if (t < e) {
                          for (var n = T[t],
                              r = R[t], o =
                              B[t], i = t; i <
                            e; i++) T[i] =
                            T[i + 1], R[i] =
                            R[i + 1], B[i] =
                            B[i + 1];
                          T[e] = n, R[e] =
                            r, B[e] = o,
                            this.setPage(e)
                      }
                      return this
                  }, _.deletePage =
                  function () {
                      return pt.apply(
                        this, arguments
                      ), this
                  }, _.setDisplayMode =
                  function (t, e, n) {
                      if (b = t, v = e, m =
                        n, -1 == [void 0,
                          null, "UseNone",
                          "UseOutlines",
                          "UseThumbs",
                          "FullScreen"
                      ].indexOf(n))
                          throw new Error(
                            'Page mode must be one of UseNone, UseOutlines, UseThumbs, or FullScreen. "' +
                            n +
                            '" is not recognized.'
                          );
                      return this
                  }, _.text = function (
                    t, e, n, r, o, i) {
                      function a(t) {
                          return t = t.split(
                            "\t").join(
                            Array(u.TabLen ||
                              9).join(" ")
                          ), ct(t, r)
                      }
                      "number" == typeof t
                        && (d = n, n = e,
                          e = t, t = d),
                        "string" ==
                        typeof t && (t =
                          t.match(
                            /[\n\r]/) ? t
                          .split(
                            /\r\n|\r|\n/g
                          ) : [t]),
                        "string" ==
                        typeof o && (i =
                          o, o = null),
                        "string" ==
                        typeof r && (i =
                          r, r = null),
                        "number" ==
                        typeof r && (o =
                          r, r = null);
                      var s = "",
                        c = "Td";
                      if (o) {
                          o *= Math.PI /
                            180;
                          var h = Math.cos(
                              o),
                            p = Math.sin(o);
                          s = [z(h), z(p),
                              z(-1 * p), z(
                                h), ""
                          ].join(" "), c =
                            "Tm"
                      }
                      r = r || {},
                        "noBOM" in r || (
                          r.noBOM = !0),
                        "autoencode" in r ||
                        (r.autoencode = !
                          0);
                      var m = "",
                        b = this.internal
                        .getCurrentPageInfo()
                        .pageContext;
                      if (!0 === r.stroke ?
                        !0 !== b.lastTextWasStroke &&
                        (m = "1 Tr\n", b.lastTextWasStroke = !
                          0) : (b.lastTextWasStroke &&
                          (m = "0 Tr\n"),
                          b.lastTextWasStroke = !
                          1), void 0 ===
                        this._runningPageHeight &&
                        (this._runningPageHeight =
                          0), "string" ==
                        typeof t) t = a(t);
                      else {
                          if (
                            "[object Array]" !==
                            Object.prototype
                            .toString.call(
                              t)) throw new Error(
                            'Type of text must be string or Array. "' +
                            t +
                            '" is not recognized.'
                          );
                          for (var v = t.concat(),
                              y = [], C = v
                              .length; C--;)
                              y.push(a(v.shift()));
                          var E = Math.ceil(
                            (g - n - this
                              ._runningPageHeight
                            ) * f / (A *
                              x));
                          if (0 <= E && y.length,
                            i) {
                              var I, S, j, D =
                                A * x,
                                P = t.map(
                                  function (t) {
                                      return this
                                        .getStringUnitWidth(
                                          t) *
                                        A / f
                                  }, this);
                              if (j = Math.max
                                .apply(Math,
                                  P),
                                "center" ===
                                i) I = e - j /
                                2, e -= P[0] /
                                2;
                              else {
                                  if ("right" !==
                                    i) throw new Error(
                                    'Unrecognized alignment option, use "center" or "right".'
                                  );
                                  I = e - j, e -=
                                    P[0]
                              }
                              S = e, t = y[0];
                              for (var O = 1,
                                  C = y.length; O <
                                C; O++) {
                                  var T = j - P[
                                    O];
                                  "center" ===
                                  i && (T /= 2),
                                    t +=
                                    ") Tj\n" +
                                    (I - S + T) +
                                    " -" + D +
                                    " Td (" + y[
                                      O], S = I +
                                    T
                              }
                          } else t = y.join(
                            ") Tj\nT* (")
                      }
                      var B;
                      return B = z((g - n) *
                          f), V("BT\n/" +
                          l + " " + A +
                          " Tf\n" + A * x +
                          " TL\n" + m + w +
                          "\n" + s + z(e *
                            f) + " " + B +
                          " " + c + "\n(" +
                          t + ") Tj\nET"),
                        this
                  }, _.lstext =
                  function (t, e, n, r) {
                      console.warn(
                        "jsPDF.lstext is deprecated"
                      );
                      for (var o = 0, i =
                          t.length; o < i; o++,
                        e += r) this.text(
                        t[o], e, n);
                      return this
                  }, _.line = function (
                    t, e, n, r) {
                      return this.lines([
                        [n - t, r - e]
                      ], t, e)
                  }, _.clip = function () {
                      V("W"), V("S")
                  }, _.clip_fixed =
                  function (t) {
                      V("evenodd" === t ?
                        "W*" : "W"), V(
                        "n")
                  }, _.lines = function (
                    t, e, n, r, o, i) {
                      var a, s, c, u, l,
                        h, p, m, b, v, y;
                      for ("number" ==
                        typeof t && (d =
                          n, n = e, e = t,
                          t = d), r = r ||
                        [1, 1], V(H(e * f) +
                          " " + H((g - n) *
                            f) + " m "),
                        a = r[0], s = r[1],
                        u = t.length, v =
                        e, y = n, c = 0; c <
                        u; c++) l = t[c],
                        2 === l.length ?
                        (v = l[0] * a + v,
                          y = l[1] * s +
                          y, V(H(v * f) +
                            " " + H((g -
                              y) * f) +
                            " l")) : (h =
                          l[0] * a + v, p =
                          l[1] * s + y, m =
                          l[2] * a + v, b =
                          l[3] * s + y, v =
                          l[4] * a + v, y =
                          l[5] * s + y, V(
                            H(h * f) +
                            " " + H((g -
                              p) * f) +
                            " " + H(m * f) +
                            " " + H((g -
                              b) * f) +
                            " " + H(v * f) +
                            " " + H((g -
                              y) * f) +
                            " c"));
                      return i && V(" h"),
                        null !== o && V(
                          vt(o)), this
                  }, _.rect = function (
                    t, e, n, r, o) {
                      vt(o);
                      return V([z(t * f),
                          z((g - e) * f),
                          z(n * f), z(-
                            r * f),
                          "re"
                      ].join(" ")),
                        null !== o && V(
                          vt(o)), this
                  }, _.triangle =
                  function (t, e, n, r,
                    o, i, a) {
                      return this.lines([
                          [n - t, r - e],
                          [o - n, i - r],
                          [t - o, e - i]
                      ], t, e, [1, 1],
                        a, !0), this
                  }, _.roundedRect =
                  function (t, e, n, r,
                    o, i, a) {
                      var s = 4 / 3 * (
                        Math.SQRT2 - 1);
                      return this.lines([
                        [n - 2 * o, 0],
                        [o * s, 0, o,
                          i - i * s,
                          o, i
                        ],
                        [0, r - 2 * i],
                        [0, i * s, -o *
                          s, i, -o, i
                        ],
                        [2 * o - n, 0],
                        [-o * s, 0, -
                          o, -i * s, -
                          o, -i
                        ],
                        [0, 2 * i - r],
                        [0, -i * s, o *
                          s, -i, o, -
                          i
                        ]
                      ], t + o, e, [1,
                        1
                      ], a), this
                  }, _.ellipse =
                  function (t, e, n, r,
                    o) {
                      var i = 4 / 3 * (
                          Math.SQRT2 - 1) *
                        n,
                        a = 4 / 3 * (Math
                          .SQRT2 - 1) * r;
                      return V([z((t + n) *
                            f), z((g -
                            e) * f),
                          "m", z((t + n) *
                            f), z((g -
                              (e - a)) *
                            f), z((t +
                            i) * f), z(
                            (g - (e - r)) *
                            f), z(t * f),
                          z((g - (e - r)) *
                            f), "c"
                      ].join(" ")), V([
                          z((t - i) * f),
                          z((g - (e - r)) *
                            f), z((t -
                            n) * f), z(
                            (g - (e - a)) *
                            f), z((t -
                            n) * f), z(
                            (g - e) * f
                          ), "c"
                      ].join(" ")), V([
                          z((t - n) * f),
                          z((g - (e + a)) *
                            f), z((t -
                            i) * f), z(
                            (g - (e + r)) *
                            f), z(t * f),
                          z((g - (e + r)) *
                            f), "c"
                      ].join(" ")), V([
                          z((t + i) * f),
                          z((g - (e + r)) *
                            f), z((t +
                            n) * f), z(
                            (g - (e + a)) *
                            f), z((t +
                            n) * f), z(
                            (g - e) * f
                          ), "c"
                      ].join(" ")),
                        null !== o && V(
                          vt(o)), this
                  }, _.circle =
                  function (t, e, n, r) {
                      return this.ellipse(
                        t, e, n, n, r)
                  }, _.setProperties =
                  function (t) {
                      for (var e in N) N.hasOwnProperty(
                        e) && t[e] && (
                        N[e] = t[e]);
                      return this
                  }, _.setFontSize =
                  function (t) {
                      return A = t, this
                  }, _.setFont =
                  function (t, e) {
                      return l = mt(t, e),
                        this
                  }, _.setFontStyle = _
                  .setFontType =
                  function (t) {
                      return l = mt(void 0,
                        t), this
                  }, _.getFontList =
                  function () {
                      var t, e, n, r = {};
                      for (t in P)
                          if (P.hasOwnProperty(
                              t)) {
                              r[t] = n = [];
                              for (e in P[t])
                                  P[t].hasOwnProperty(
                                    e) && n.push(
                                    e)
                          }
                      return r
                  }, _.addFont =
                  function (t, e, n) {
                      at(t, e, n,
                        "StandardEncoding"
                      )
                  }, _.setLineWidth =
                  function (t) {
                      return V((t * f).toFixed(
                          2) + " w"),
                        this
                  }, _.setDrawColor =
                  function (t, e, n, r) {
                      var o;
                      return o = void 0 ===
                        e || void 0 ===
                        r && t === e ===
                        n ? "string" ==
                        typeof t ? t +
                        " G" : z(t / 255) +
                        " G" : void 0 ===
                        r ? "string" ==
                        typeof t ? [t, e,
                          n, "RG"
                        ].join(" ") : [z(
                          t / 255), z(e /
                          255), z(n /
                          255), "RG"].join(
                          " ") : "string" ==
                        typeof t ? [t, e,
                          n, r, "K"
                        ].join(" ") : [z(
                            t), z(e), z(n),
                          z(r), "K"
                        ].join(" "), V(o),
                        this
                  }, _.setFillColor =
                  function (t, e, n, r) {
                      var o;
                      return void 0 ===
                        e || void 0 ===
                        r && t === e ===
                        n ? o = "string" ==
                        typeof t ? t +
                        " g" : z(t / 255) +
                        " g" : void 0 ===
                        r || "object" ==
                        typeof r ? (o =
                          "string" ==
                          typeof t ? [t,
                            e, n, "rg"
                          ].join(" ") : [
                            z(t / 255), z(
                              e / 255), z(
                              n / 255),
                            "rg"
                          ].join(" "), r &&
                          0 === r.a && (o = [
                            "255",
                            "255",
                            "255", "rg"
                          ].join(" "))) :
                        o = "string" ==
                        typeof t ? [t, e,
                          n, r, "k"
                        ].join(" ") : [z(
                            t), z(e), z(n),
                          z(r), "k"
                        ].join(" "), V(o),
                        this
                  }, _.setTextColor =
                  function (t, e, n) {
                      if ("string" ==
                        typeof t &&
                        /^#[0-9A-Fa-f]{6}$/
                        .test(t)) {
                          var r = parseInt(
                            t.substr(1),
                            16);
                          t = r >> 16 & 255,
                            e = r >> 8 &
                            255, n = 255 &
                            r
                      }
                      return w = 0 === t &&
                        0 === e && 0 ===
                        n || void 0 ===
                        e ? H(t / 255) +
                        " g" : [H(t / 255),
                          H(e / 255), H(n /
                            255), "rg"
                        ].join(" "), this
                  }, _.CapJoinStyles = {
                      0: 0,
                      butt: 0,
                      but: 0,
                      miter: 0,
                      1: 1,
                      round: 1,
                      rounded: 1,
                      circle: 1,
                      2: 2,
                      projecting: 2,
                      project: 2,
                      square: 2,
                      bevel: 2
                  }, _.setLineCap =
                  function (t) {
                      var e = this.CapJoinStyles[
                        t];
                      if (void 0 === e)
                          throw new Error(
                            "Line cap style of '" +
                            t +
                            "' is not recognized. See or extend .CapJoinStyles property for valid styles"
                          );
                      return L = e, V(e +
                        " J"), this
                  }, _.setLineJoin =
                  function (t) {
                      var e = this.CapJoinStyles[
                        t];
                      if (void 0 === e)
                          throw new Error(
                            "Line join style of '" +
                            t +
                            "' is not recognized. See or extend .CapJoinStyles property for valid styles"
                          );
                      return k = e, V(e +
                        " j"), this
                  }, _.output = Ct, _.save =
                  function (t) {
                      _.output("save", t)
                  };
                for (var xt in a.API) a
                  .API.hasOwnProperty(
                    xt) && ("events" ===
                    xt && a.API.events.length ?
                    function (t, e) {
                        var n, r, o;
                        for (o = e.length -
                          1; -1 !== o; o--
                        ) n = e[o][0], r =
                          e[o][1], t.subscribe
                          .apply(t, [n].concat(
                            "function" ==
                            typeof r ? [
                              r
                            ] : r))
                    }(G, a.API.events) :
                    _[xt] = a.API[xt]);
                return function () {
                    for (var t = [
                          ["Helvetica",
                            "helvetica",
                            "normal"
                    ],
                          [
                            "Helvetica-Bold",
                            "helvetica",
                            "bold"
                    ],
                          [
                            "Helvetica-Oblique",
                            "helvetica",
                            "italic"
                    ],
                          [
                            "Helvetica-BoldOblique",
                            "helvetica",
                            "bolditalic"
                    ],
                          ["Courier",
                            "courier",
                            "normal"
                    ],
                          [
                            "Courier-Bold",
                            "courier",
                            "bold"
                    ],
                          [
                            "Courier-Oblique",
                            "courier",
                            "italic"
                    ],
                          [
                            "Courier-BoldOblique",
                            "courier",
                            "bolditalic"
                    ],
                          [
                            "Times-Roman",
                            "times",
                            "normal"
                    ],
                          ["Times-Bold",
                            "times",
                            "bold"
                    ],
                          [
                            "Times-Italic",
                            "times",
                            "italic"
                    ],
                          [
                            "Times-BoldItalic",
                            "times",
                            "bolditalic"
                    ],
                          [
                            "ZapfDingbats",
                            "zapfdingbats"
                    ]
                    ], e = 0, n = t
                        .length; e < n; e++) {
                        var r = at(t[e][0],
                            t[e][1], t[e]
                            [2],
                            "StandardEncoding"
                          ),
                          o = t[e][0].split(
                            "-");
                        it(r, o[0], o[1] ||
                          "")
                    }
                    G.publish(
                      "addFonts", {
                          fonts: D,
                          dictionary: P
                      })
                }(), l = "F1", ht(n,
                  t), G.publish(
                  "initialized"), _
            }
            var s = "1.3",
              c = {
                  a0: [2383.94, 3370.39],
                  a1: [1683.78, 2383.94],
                  a2: [1190.55, 1683.78],
                  a3: [841.89, 1190.55],
                  a4: [595.28, 841.89],
                  a5: [419.53, 595.28],
                  a6: [297.64, 419.53],
                  a7: [209.76, 297.64],
                  a8: [147.4, 209.76],
                  a9: [104.88, 147.4],
                  a10: [73.7, 104.88],
                  b0: [2834.65, 4008.19],
                  b1: [2004.09, 2834.65],
                  b2: [1417.32, 2004.09],
                  b3: [1000.63, 1417.32],
                  b4: [708.66, 1000.63],
                  b5: [498.9, 708.66],
                  b6: [354.33, 498.9],
                  b7: [249.45, 354.33],
                  b8: [175.75, 249.45],
                  b9: [124.72, 175.75],
                  b10: [87.87, 124.72],
                  c0: [2599.37, 3676.54],
                  c1: [1836.85, 2599.37],
                  c2: [1298.27, 1836.85],
                  c3: [918.43, 1298.27],
                  c4: [649.13, 918.43],
                  c5: [459.21, 649.13],
                  c6: [323.15, 459.21],
                  c7: [229.61, 323.15],
                  c8: [161.57, 229.61],
                  c9: [113.39, 161.57],
                  c10: [79.37, 113.39],
                  dl: [311.81, 623.62],
                  letter: [612, 792],
                  "government-letter": [
                    576, 756
                  ],
                  legal: [612, 1008],
                  "junior-legal": [576,
                    360
                  ],
                  ledger: [1224, 792],
                  tabloid: [792, 1224],
                  "credit-card": [153,
                    243
                  ]
              };
            a.API = {
                events: []
            }, a.version =
              "1.x-master", void 0 !==
              (r = function () {
                  return a
              }.call(e, n, e, t)) &&
              (t.exports = r)
        }("undefined" != typeof self &&
          self || "undefined" !=
          typeof window && window ||
          this)
    }, function (t, e) {
        ! function (t) {
            "use strict";
            var e = ["jpeg", "jpg",
                "png"
            ],
              n = function (t) {
                  var e = this.internal
                    .newObject(),
                    r = this.internal.write,
                    o = this.internal.putStream;
                  if (t.n = e, r(
                      "<</Type /XObject"
                    ), r(
                      "/Subtype /Image"
                    ), r("/Width " + t.w),
                    r("/Height " + t.h),
                    t.cs === this.color_spaces
                    .INDEXED ? r(
                      "/ColorSpace [/Indexed /DeviceRGB " +
                      (t.pal.length / 3 -
                        1) + " " + (
                        "smask" in t ?
                        e + 2 : e + 1) +
                      " 0 R]") : (r(
                        "/ColorSpace /" +
                        t.cs), t.cs ===
                      this.color_spaces
                      .DEVICE_CMYK && r(
                        "/Decode [1 0 1 0 1 0 1 0]"
                      )), r(
                      "/BitsPerComponent " +
                      t.bpc), "f" in t &&
                    r("/Filter /" + t.f),
                    "dp" in t && r(
                      "/DecodeParms <<" +
                      t.dp + ">>"),
                    "trns" in t && t.trns
                    .constructor ==
                    Array) {
                      for (var i = "", a =
                          0, s = t.trns.length; a <
                        s; a++) i += t.trns[
                        a] + " " + t.trns[
                        a] + " ";
                      r("/Mask [" + i +
                        "]")
                  }
                  if ("smask" in t && r(
                      "/SMask " + (e +
                        1) + " 0 R"), r(
                      "/Length " + t.data
                      .length + ">>"),
                    o(t.data), r(
                      "endobj"),
                    "smask" in t) {
                      var c =
                        "/Predictor " + t
                        .p +
                        " /Colors 1 /BitsPerComponent " +
                        t.bpc +
                        " /Columns " + t.w,
                        u = {
                            w: t.w,
                            h: t.h,
                            cs: "DeviceGray",
                            bpc: t.bpc,
                            dp: c,
                            data: t.smask
                        };
                      "f" in t && (u.f =
                        t.f), n.call(
                        this, u)
                  }
                  t.cs === this.color_spaces
                    .INDEXED && (this.internal
                      .newObject(), r(
                        "<< /Length " +
                        t.pal.length +
                        ">>"), o(this.arrayBufferToBinaryString(
                        new Uint8Array(
                          t.pal))), r(
                        "endobj"))
              },
              r = function () {
                  var t = this.internal
                    .collections.addImage_images;
                  for (var e in t) n.call(
                    this, t[e])
              },
              o = function () {
                  var t, e = this.internal
                    .collections.addImage_images,
                    n = this.internal.write;
                  for (var r in e) t =
                    e[r], n("/I" + t.i,
                      t.n, "0", "R")
              },
              i = function (e) {
                  return e && "string" ==
                    typeof e && (e = e.toUpperCase()),
                    e in t.image_compression ?
                      e : t.image_compression
                    .NONE
              },
              a = function () {
                  var t = this.internal
                    .collections.addImage_images;
                  return t || (this.internal
                    .collections.addImage_images =
                    t = {}, this.internal
                    .events.subscribe(
                      "putResources",
                      r), this.internal
                    .events.subscribe(
                      "putXobjectDict",
                      o)), t
              },
              s = function (t) {
                  var e = 0;
                  return t && (e =
                    Object.keys ?
                    Object.keys(t).length :
                    function (t) {
                        var e = 0;
                        for (var n in t)
                            t.hasOwnProperty(
                              n) && e++;
                        return e
                    }(t)), e
              },
              c = function (t) {
                  return void 0 === t ||
                    null === t
              },
              u = function (e) {
                  return "string" ==
                    typeof e && t.sHashCode(
                      e)
              },
              l = function (t) {
                  return -1 === e.indexOf(
                    t)
              },
              f = function (e) {
                  return "function" !=
                    typeof t["process" +
                      e.toUpperCase()]
              },
              d = function (t) {
                  return "object" ==
                    typeof t && 1 ===
                    t.nodeType
              },
              h = function (t, e, n) {
                  if ("IMG" === t.nodeName &&
                    t.hasAttribute(
                      "src")) {
                      var r = "" + t.getAttribute(
                        "src");
                      if (!n && 0 === r.indexOf(
                          "data:image/"))
                          return r;
                      !e &&
                        /\.png(?:[?#].*)?$/i
                        .test(r) && (e =
                          "png")
                  }
                  if ("CANVAS" === t.nodeName)
                      var o = t;
                  else {
                      var o = document.createElement(
                        "canvas");
                      o.width = t.clientWidth ||
                        t.width, o.height =
                        t.clientHeight ||
                        t.height;
                      var i = o.getContext(
                        "2d");
                      if (!i) throw "addImage requires canvas to be supported by browser.";
                      if (n) {
                          var a, s, c, u, l,
                            f, d, h, p =
                            Math.PI / 180;
                          "object" ==
                          typeof n && (a =
                              n.x, s = n.y,
                              c = n.bg, n =
                              n.angle), h =
                            n * p, u = Math
                            .abs(Math.cos(h)),
                            l = Math.abs(
                              Math.sin(h)),
                            f = o.width, d =
                            o.height, o.width =
                            d * l + f * u,
                            o.height = d *
                            u + f * l,
                            isNaN(a) && (a =
                              o.width / 2),
                            isNaN(s) && (s =
                              o.height / 2),
                            i.clearRect(0,
                              0, o.width, o
                              .height), i.fillStyle =
                            c || "white", i
                            .fillRect(0, 0,
                              o.width, o.height
                            ), i.save(), i.translate(
                              a, s), i.rotate(
                              h), i.drawImage(
                              t, -f / 2, -d /
                              2), i.rotate(-
                              h), i.translate(-
                              a, -s), i.restore()
                      } else i.drawImage(
                        t, 0, 0, o.width,
                        o.height)
                  }
                  return o.toDataURL(
                    "png" == ("" + e)
                    .toLowerCase() ?
                    "image/png" :
                    "image/jpeg")
              },
              p = function (t, e) {
                  var n;
                  if (e)
                      for (var r in e)
                          if (t === e[r].alias) {
                              n = e[r];
                              break
                          }
                  return n
              },
              g = function (t, e, n) {
                  return t || e || (t = -
                      96, e = -96), t <
                    0 && (t = -1 * n.w *
                      72 / t / this.internal
                      .scaleFactor), e <
                    0 && (e = -1 * n.h *
                      72 / e / this.internal
                      .scaleFactor), 0 ===
                    t && (t = e * n.w /
                      n.h), 0 === e &&
                    (e = t * n.h / n.w), [
                      t, e
                    ]
              },
              m = function (t, e, n, r,
                o, i, a) {
                  var s = g.call(this,
                      n, r, o),
                    c = this.internal.getCoordinateString,
                    u = this.internal.getVerticalCoordinateString;
                  n = s[0], r = s[1], a[
                      i] = o, this.internal
                    .write("q", c(n),
                      "0 0", c(r), c(t),
                      u(e + r), "cm /I" +
                      o.i, "Do Q")
              };
            t.color_spaces = {
                DEVICE_RGB: "DeviceRGB",
                DEVICE_GRAY: "DeviceGray",
                DEVICE_CMYK: "DeviceCMYK",
                CAL_GREY: "CalGray",
                CAL_RGB: "CalRGB",
                LAB: "Lab",
                ICC_BASED: "ICCBased",
                INDEXED: "Indexed",
                PATTERN: "Pattern",
                SEPARATION: "Separation",
                DEVICE_N: "DeviceN"
            }, t.decode = {
                DCT_DECODE: "DCTDecode",
                FLATE_DECODE: "FlateDecode",
                LZW_DECODE: "LZWDecode",
                JPX_DECODE: "JPXDecode",
                JBIG2_DECODE: "JBIG2Decode",
                ASCII85_DECODE: "ASCII85Decode",
                ASCII_HEX_DECODE: "ASCIIHexDecode",
                RUN_LENGTH_DECODE: "RunLengthDecode",
                CCITT_FAX_DECODE: "CCITTFaxDecode"
            }, t.image_compression = {
                NONE: "NONE",
                FAST: "FAST",
                MEDIUM: "MEDIUM",
                SLOW: "SLOW"
            }, t.sHashCode =
              function (t) {
                  return Array.prototype
                    .reduce && t.split(
                      "").reduce(
                      function (t, e) {
                          return (t = (t <<
                              5) - t +
                            e.charCodeAt(
                              0)) & t
                      }, 0)
              }, t.isString =
              function (t) {
                  return "string" ==
                    typeof t
              }, t.extractInfoFromBase64DataURI =
              function (t) {
                  return /^data:([\w]+?\/([\w]+?));base64,(.+?)$/g
                    .exec(t)
              }, t.supportsArrayBuffer =
              function () {
                  return "undefined" !=
                    typeof ArrayBuffer &&
                    "undefined" !=
                    typeof Uint8Array
              }, t.isArrayBuffer =
              function (t) {
                  return !!this.supportsArrayBuffer() &&
                    t instanceof ArrayBuffer
              }, t.isArrayBufferView =
              function (t) {
                  return !!this.supportsArrayBuffer() &&
                    ("undefined" !=
                      typeof Uint32Array &&
                      (t instanceof Int8Array ||
                        t instanceof Uint8Array ||
                        "undefined" !=
                        typeof Uint8ClampedArray &&
                        t instanceof Uint8ClampedArray ||
                        t instanceof Int16Array ||
                        t instanceof Uint16Array ||
                        t instanceof Int32Array ||
                        t instanceof Uint32Array ||
                        t instanceof Float32Array ||
                        t instanceof Float64Array
                      ))
              }, t.binaryStringToUint8Array =
              function (t) {
                  for (var e = t.length,
                      n = new Uint8Array(
                        e), r = 0; r <
                    e; r++) n[r] = t.charCodeAt(
                    r);
                  return n
              }, t.arrayBufferToBinaryString =
              function (t) {
                  this.isArrayBuffer(t) &&
                    (t = new Uint8Array(
                      t));
                  for (var e = "", n =
                      t.byteLength, r =
                      0; r < n; r++) e +=
                    String.fromCharCode(
                      t[r]);
                  return e
              }, t.arrayBufferToBase64 =
              function (t) {
                  for (var e, n, r, o,
                      i, a = "", s =
                      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                      c = new Uint8Array(
                        t), u = c.byteLength,
                      l = u % 3, f = u -
                      l, d = 0; d < f; d +=
                    3) i = c[d] << 16 |
                    c[d + 1] << 8 | c[d +
                      2], e = (16515072 &
                      i) >> 18, n = (
                      258048 & i) >> 12,
                    r = (4032 & i) >> 6,
                    o = 63 & i, a += s[
                      e] + s[n] + s[r] +
                    s[o];
                  return 1 == l ? (i =
                      c[f], e = (252 &
                        i) >> 2, n = (3 &
                        i) << 4, a += s[
                        e] + s[n] +
                      "==") : 2 == l &&
                    (i = c[f] << 8 | c[
                        f + 1], e = (
                        64512 & i) >>
                      10, n = (1008 & i) >>
                      4, r = (15 & i) <<
                      2, a += s[e] + s[
                        n] + s[r] + "="
                    ), a
              }, t.createImageInfo =
              function (t, e, n, r, o,
                i, a, s, c, u, l, f,
                d) {
                  var h = {
                      alias: s,
                      w: e,
                      h: n,
                      cs: r,
                      bpc: o,
                      i: a,
                      data: t
                  };
                  return i && (h.f = i),
                    c && (h.dp = c), u &&
                    (h.trns = u), l &&
                    (h.pal = l), f && (
                      h.smask = f), d &&
                    (h.p = d), h
              }, t.addImage =
              function (t, n, r, o, g,
                b, v, y, w) {
                  if ("string" !=
                    typeof n) {
                      var C = b;
                      b = g, g = o, o = r,
                        r = n, n = C
                  }
                  if ("object" ==
                    typeof t && !d(t) &&
                    "imageData" in t) {
                      var A = t;
                      t = A.imageData, n =
                        A.format || n, r =
                        A.x || r || 0, o =
                        A.y || o || 0, g =
                        A.w || g, b = A.h ||
                        b, v = A.alias ||
                        v, y = A.compression ||
                        y, w = A.rotation ||
                        A.angle || w
                  }
                  if (isNaN(r) || isNaN(
                      o)) throw console
                    .error(
                      "jsPDF.addImage: Invalid coordinates",
                      arguments), new Error(
                      "Invalid coordinates passed to jsPDF.addImage"
                    );
                  var x, E = a.call(
                    this);
                  if (!(x = p(t, E))) {
                      var I;
                      if (d(t) && (t = h(
                          t, n, w)), c(v) &&
                        (v = u(t)), !(x =
                          p(v, E))) {
                          if (this.isString(
                              t)) {
                              var S = this.extractInfoFromBase64DataURI(
                                t);
                              S ? (n = S[2],
                                  t = atob(S[
                                    3])) :
                                137 === t.charCodeAt(
                                  0) && 80 ===
                                t.charCodeAt(
                                  1) && 78 ===
                                t.charCodeAt(
                                  2) && 71 ===
                                t.charCodeAt(
                                  3) && (n =
                                  "png")
                          }
                          if (n = (n ||
                              "JPEG").toLowerCase(),
                            l(n)) throw new Error(
                            "addImage currently only supports formats " +
                            e +
                            ", not '" +
                            n + "'");
                          if (f(n)) throw new Error(
                            "please ensure that the plugin for '" +
                            n +
                            "' support is added"
                          );
                          if (this.supportsArrayBuffer() &&
                            (t instanceof Uint8Array ||
                              (I = t, t =
                                this.binaryStringToUint8Array(
                                  t))), !(x =
                              this[
                                "process" +
                                n.toUpperCase()
                          ](t, s(E), v,
                                i(y), I)))
                              throw new Error(
                                "An unkwown error occurred whilst processing the image"
                              )
                      }
                  }
                  return m.call(this, r,
                    o, g, b, x, x.i,
                    E), this
              };
            var b = function (t) {
                var e, n, r;
                if (255 === !t.charCodeAt(
                    0) || 216 === !t.charCodeAt(
                    1) || 255 === !t.charCodeAt(
                    2) || 224 === !t.charCodeAt(
                    3) || !t.charCodeAt(
                    6) === "J".charCodeAt(
                    0) || !t.charCodeAt(
                    7) === "F".charCodeAt(
                    0) || !t.charCodeAt(
                    8) === "I".charCodeAt(
                    0) || !t.charCodeAt(
                    9) === "F".charCodeAt(
                    0) || 0 === !t.charCodeAt(
                    10)) throw new Error(
                  "getJpegSize requires a binary string jpeg file"
                );
                for (var o = 256 * t.charCodeAt(
                      4) + t.charCodeAt(
                      5), i = 4, a =
                    t.length; i < a;) {
                    if (i += o, 255 !==
                      t.charCodeAt(i))
                        throw new Error(
                          "getJpegSize could not find the size of the image"
                        );
                    if (192 === t.charCodeAt(
                        i + 1) || 193 ===
                      t.charCodeAt(i +
                        1) || 194 ===
                      t.charCodeAt(i +
                        1) || 195 ===
                      t.charCodeAt(i +
                        1) || 196 ===
                      t.charCodeAt(i +
                        1) || 197 ===
                      t.charCodeAt(i +
                        1) || 198 ===
                      t.charCodeAt(i +
                        1) || 199 ===
                      t.charCodeAt(i +
                        1)) return n =
                      256 * t.charCodeAt(
                        i + 5) + t.charCodeAt(
                        i + 6), e =
                      256 * t.charCodeAt(
                        i + 7) + t.charCodeAt(
                        i + 8), r = t
                      .charCodeAt(i +
                        9), [e, n, r];
                    i += 2, o = 256 * t
                      .charCodeAt(i) +
                      t.charCodeAt(i +
                        1)
                }
            },
              v = function (t) {
                  if (65496 != (t[0] <<
                      8 | t[1])) throw new Error(
                    "Supplied data is not a JPEG"
                  );
                  for (var e, n, r, o,
                      i = t.length, a =
                      (t[4] << 8) + t[5],
                      s = 4; s < i;) {
                      if (s += a, e = y(t,
                          s), a = (e[2] <<
                          8) + e[3], (192 ===
                          e[1] || 194 ===
                          e[1]) && 255 ===
                        e[0] && a > 7)
                          return e = y(t, s +
                              5), n = (e[2] <<
                              8) + e[3], r =
                            (e[0] << 8) + e[
                              1], o = e[4], {
                                  width: n,
                                  height: r,
                                  numcomponents: o
                              };
                      s += 2
                  }
                  throw new Error(
                    "getJpegSizeFromBytes could not find the size of the image"
                  )
              },
              y = function (t, e) {
                  return t.subarray(e,
                    e + 5)
              };
            t.processJPEG = function (
                t, e, n, r, o) {
                var i, a = this.color_spaces
                  .DEVICE_RGB,
                  s = this.decode.DCT_DECODE;
                return this.isString(
                    t) ? (i = b(t),
                    this.createImageInfo(
                      t, i[0], i[1],
                      1 == i[3] ?
                      this.color_spaces
                      .DEVICE_GRAY :
                      a, 8, s, e, n)) :
                  (this.isArrayBuffer(
                    t) && (t = new Uint8Array(
                    t)), this.isArrayBufferView(
                    t) ? (i = v(t),
                    t = o || this.arrayBufferToBinaryString(
                      t), this.createImageInfo(
                      t, i.width, i
                      .height, 1 ==
                      i.numcomponents ?
                      this.color_spaces
                      .DEVICE_GRAY :
                      a, 8, s, e, n
                    )) : null)
            }, t.processJPG =
              function () {
                  return this.processJPEG
                    .apply(this,
                      arguments)
              }
        }(jsPDF.API)
    }])
});
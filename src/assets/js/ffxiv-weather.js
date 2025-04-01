!
    function() {
        "use strict";
        var t, r, e, n, a, u, o = {
                icons: {
                    "阴云": 60203,
                    "碧空": 60201,
                    "晴朗": 60202,
                    "薄雾": 60204,
                    "小雨": 60207,
                    "微风": 60205,
                    "暴雨": 60208,
                    "强风": 60206,
                    "打雷": 60209,
                    "雷雨": 60210,
                    "扬沙": 60211,
                    "热浪": 60214,
                    "暴雪": 60216,
                    "小雪": 60215,
                    "妖雾": 60218,
                    "灵电": 60220,
                    "灵风": 60219,
                    "月尘": 60222,
                    "磁暴": 60223
                },
                rates: {
                    "利姆萨·罗敏萨上层甲板": ["阴云", 20, "碧空", 50, "晴朗", 80, "薄雾", 90, "小雨"],
                    "利姆萨·罗敏萨下层甲板": ["阴云", 20, "碧空", 50, "晴朗", 80, "薄雾", 90, "小雨"],
                    "乌尔达哈现世回廊": ["碧空", 40, "晴朗", 60, "阴云", 85, "薄雾", 95, "小雨"],
                    "乌尔达哈来生回廊": ["碧空", 40, "晴朗", 60, "阴云", 85, "薄雾", 95, "小雨"],
                    "格里达尼亚新街": ["小雨", 5, "小雨", 20, "薄雾", 30, "阴云", 40, "晴朗", 55, "碧空", 85, "晴朗"],
                    "格里达尼亚旧街": ["小雨", 5, "小雨", 20, "薄雾", 30, "阴云", 40, "晴朗", 55, "碧空", 85, "晴朗"],
                    "中拉诺西亚": ["阴云", 20, "碧空", 50, "晴朗", 70, "微风", 80, "薄雾", 90, "小雨"],
                    "拉诺西亚低地": ["阴云", 20, "碧空", 50, "晴朗", 70, "微风", 80, "薄雾", 90, "小雨"],
                    "海雾村": ["阴云", 20, "碧空", 50, "晴朗", 70, "晴朗", 80, "薄雾", 90, "小雨"],
                    "东拉诺西亚": ["薄雾", 5, "碧空", 50, "晴朗", 80, "阴云", 90, "小雨", 95, "暴雨"],
                    "西拉诺西亚": ["薄雾", 10, "碧空", 40, "晴朗", 60, "阴云", 80, "微风", 90, "强风"],
                    "拉诺西亚高地": ["碧空", 30, "晴朗", 50, "阴云", 70, "薄雾", 80, "打雷", 90, "雷雨"],
                    "西萨纳兰": ["碧空", 40, "晴朗", 60, "阴云", 85, "薄雾", 95, "小雨"],
                    "中萨纳兰": ["扬沙", 15, "碧空", 55, "晴朗", 75, "阴云", 85, "薄雾", 95, "小雨"],
                    "东萨纳兰": ["碧空", 40, "晴朗", 60, "阴云", 70, "薄雾", 80, "小雨", 85, "暴雨"],
                    "南萨纳兰": ["热浪", 20, "碧空", 60, "晴朗", 80, "阴云", 90, "薄雾"],
                    "北萨纳兰": ["碧空", 5, "晴朗", 20, "阴云", 50, "薄雾"],
                    "黑衣森林中央林区": ["打雷", 5, "小雨", 20, "薄雾", 30, "阴云", 40, "晴朗", 55, "碧空", 85, "晴朗"],
                    "黑衣森林东部林区": ["打雷", 5, "小雨", 20, "薄雾", 30, "阴云", 40, "晴朗", 55, "碧空", 85, "晴朗"],
                    "黑衣森林南部林区": ["薄雾", 5, "雷雨", 10, "打雷", 25, "薄雾", 30, "阴云", 40, "晴朗", 70, "碧空"],
                    "黑衣森林北部林区": ["薄雾", 5, "暴雨", 10, "小雨", 25, "薄雾", 30, "阴云", 40, "晴朗", 70, "碧空"],
                    "库尔札斯中央高地": ["暴雪", 20, "小雪", 60, "晴朗", 70, "碧空", 75, "阴云", 90, "薄雾"],
                    "摩杜纳": ["阴云", 15, "薄雾", 30, "妖雾", 60, "碧空", 75, "晴朗"],
                    "拉诺西亚外地": ["碧空", 30, "晴朗", 50, "阴云", 70, "薄雾", 85, "小雨"],
                    "狼狱停船场": ["阴云", 20, "碧空", 50, "晴朗", 80, "薄雾", 90, "雷雨"],
                    "薰衣草苗圃": ["阴云", 5, "小雨", 20, "薄雾", 30, "阴云", 40, "晴朗", 55, "碧空", 85, "晴朗"],
                    "高脚孤丘": ["碧空", 40, "晴朗", 60, "阴云", 85, "薄雾", 95, "小雨"],
                    "库尔札斯西部高地": ["暴雪", 20, "小雪", 60, "晴朗", 70, "碧空", 75, "阴云", 90, "薄雾"],
                    "龙堡参天高地": ["阴云", 10, "薄雾", 20, "打雷", 30, "扬沙", 40, "碧空", 70, "晴朗"],
                    "龙堡内陆低地": ["阴云", 10, "薄雾", 20, "小雨", 30, "暴雨", 40, "碧空", 70, "晴朗"],
                    "翻云雾海": ["阴云", 10, "强风", 20, "灵电", 40, "碧空", 70, "晴朗"],
                    "阿巴拉提亚云海": ["碧空", 30, "晴朗", 60, "阴云", 70, "薄雾", 80, "微风", 90, "灵风"],
                    "魔大陆阿济兹拉": ["晴朗", 35, "阴云", 70, "打雷"],
                    "伊修加德基础层": ["小雪", 60, "晴朗", 70, "碧空", 75, "阴云", 90, "薄雾"],
                    "伊修加德砥柱层": ["小雪", 60, "晴朗", 70, "碧空", 75, "阴云", 90, "薄雾"],
                    "田园郡": ["阴云", 10, "薄雾", 20, "小雨", 30, "暴雨", 40, "碧空", 70, "晴朗"],
                    "基拉巴尼亚边区": ["碧空", 15, "晴朗", 60, "阴云", 80, "薄雾", 90, "打雷"],
                    "红玉海": ["打雷", 10, "微风", 20, "阴云", 35, "晴朗", 75, "碧空"],
                    "延夏": ["暴雨", 5, "小雨", 15, "薄雾", 25, "阴云", 40, "晴朗", 80, "碧空"],
                    "基拉巴尼亚山区": ["碧空", 10, "晴朗", 60, "阴云", 75, "薄雾", 85, "微风", 95, "扬沙"],
                    "基拉巴尼亚湖区": ["碧空", 20, "晴朗", 60, "阴云", 80, "薄雾", 90, "雷雨"],
                    "太阳神草原": ["强风", 5, "微风", 10, "小雨", 17, "薄雾", 25, "阴云", 35, "晴朗", 75, "碧空"],
                    "黄金港": ["小雨", 10, "薄雾", 20, "阴云", 40, "晴朗", 80, "碧空"],
                    "神拳痕": ["碧空", 15, "晴朗", 60, "阴云", 80, "薄雾", 90, "打雷"],
                    "白银乡": ["小雨", 10, "薄雾", 20, "阴云", 40, "晴朗", 80, "碧空"],
                    "优雷卡常风之地": ["晴朗", 30, "强风", 60, "暴雨", 90, "小雪"],
                    "优雷卡恒冰之地": ["晴朗", 10, "薄雾", 28, "热浪", 46, "小雪", 64, "打雷", 82, "暴雪"],
                    "优雷卡涌火之地": ["晴朗", 10, "热浪", 28, "打雷", 46, "暴雪", 64, "灵风", 82, "小雪"],
                    "雷克兰德": ["碧空", 20, "晴朗", 60, "阴云", 75, "薄雾", 85, "小雨", 95, "雷雨"],
                    "珂露西亚岛": ["强风", 10, "小雨", 20, "薄雾", 30, "阴云", 45, "晴朗", 85, "碧空"],
                    "安穆·艾兰": ["晴朗", 45, "阴云", 60, "扬沙", 70, "热浪", 80, "碧空"],
                    "伊尔美格": ["小雨", 10, "薄雾", 20, "阴云", 35, "雷雨", 45, "碧空", 60, "晴朗"],
                    "拉凯提卡大森林": ["薄雾", 10, "小雨", 20, "灵风", 30, "碧空", 45, "晴朗", 85, "阴云"],
                    "黑风海": ["阴云", 20, "晴朗", 80, "碧空"],
                    "水晶都": ["碧空", 20, "晴朗", 60, "阴云", 75, "薄雾", 85, "小雨", 95, "雷雨"],
                    "游末邦": ["强风", 10, "小雨", 20, "薄雾", 30, "阴云", 45, "晴朗", 85, "碧空"],
                    "优雷卡丰水之地": ["晴朗", 12, "暴雨", 34, "妖雾", 56, "雷雨", 78, "小雪"],
                    "南方博兹雅战线": ["晴朗", 52, "小雨", 64, "微风", 76, "打雷", 88, "扬沙"],
                    "迷津": ["碧空", 15, "晴朗", 60, "阴云", 85, "小雨"],
                    "萨维奈岛": ["薄雾", 10, "小雨", 20, "暴雨", 25, "碧空", 40, "晴朗", 80, "阴云"],
                    "加雷马": ["小雪", 45, "打雷", 50, "小雨", 55, "薄雾", 60, "阴云", 85, "晴朗", 95, "碧空"],
                    "叹息海": ["灵风", 15, "月尘", 30, "晴朗"],
                    "天外天垓": ["磁暴", 15, "晴朗", 85, "灵风"],
                    "厄尔庇斯": ["阴云", 25, "灵风", 40, "晴朗", 85, "碧空"],
                    "旧萨雷安": ["碧空", 10, "晴朗", 50, "阴云", 70, "薄雾", 85, "小雪"],
                    "拉札罕": ["薄雾", 10, "小雨", 25, "碧空", 40, "晴朗", 80, "阴云"],
                    "扎杜诺尔高原": ["晴朗", 60, "小雨", 70, "微风", 80, "打雷", 90, "小雪"]
                }
            },
            i = 175e3,
            c = 42e5,
            l = 14e5,
            f = [["拉诺西亚", "利姆萨·罗敏萨上层甲板", "中拉诺西亚", "拉诺西亚低地", "东拉诺西亚", "西拉诺西亚", "拉诺西亚高地", "拉诺西亚外地", "狼狱停船场", "海雾村"], ["黑衣森林", "格里达尼亚新街", "黑衣森林中央林区", "黑衣森林东部林区", "黑衣森林南部林区", "黑衣森林北部林区", "薰衣草苗圃"], ["萨纳兰", "乌尔达哈现世回廊", "西萨纳兰", "中萨纳兰", "东萨纳兰", "南萨纳兰", "北萨纳兰", "高脚孤丘"], ["库尔札斯", "伊修加德基础层", "库尔札斯中央高地", "库尔札斯西部高地"], ["阿巴拉提亚", "阿巴拉提亚云海", "魔大陆阿济兹拉"], ["龙堡", "田园郡", "龙堡参天高地", "龙堡内陆低地", "翻云雾海"], ["基拉巴尼亚", "神拳痕", "基拉巴尼亚边区", "基拉巴尼亚山区", "基拉巴尼亚湖区"], ["远东之国", "黄金港", "白银乡"], ["奥萨德", "红玉海", "延夏", "太阳神草原"], ["诺弗兰特", "水晶都", "游末邦", "雷克兰德", "珂露西亚岛", "安穆·艾兰", "伊尔美格", "拉凯提卡大森林", "黑风海"], ["摩杜纳", "摩杜纳"], ["伊尔萨巴德", "拉札罕", "萨维奈岛", "加雷马"], ["北洋地域", "旧萨雷安", "迷津"], ["星外天域", "叹息海", "天外天垓"], ["古代世界", "厄尔庇斯"], ["优雷卡", "优雷卡常风之地", "优雷卡恒冰之地", "优雷卡涌火之地", "优雷卡丰水之地"], ["博兹雅", "南方博兹雅战线", "扎杜诺尔高原"]],
            s = {
                "利姆萨·罗敏萨上层甲板": "利姆萨·罗敏萨",
                "格里达尼亚新街": "格里达尼亚",
                "乌尔达哈现世回廊": "乌尔达哈",
                "伊修加德基础层": "伊修加德"
            },
            h = function(t) {
                for (var r = 0,
                         e = Object.keys(s); r < e.length; r++) {
                    var n = e[r];
                    if (s[n] === t) return n
                }
                return t
            },
            p = function(t, r) {
                return Array.isArray(r) ? r.some((function(r) {
                    return r === t
                })) : r === t
            },
            v = " must be a number",
            g = function() {
                function t() {}
                return Object.defineProperty(t.prototype, "icons", {
                    get: function() {
                        return Object.freeze(o.icons)
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                    Object.defineProperty(t.prototype, "areas", {
                        get: function() {
                            return Object.freeze(f.map((function(t) {
                                return t.map((function(t) {
                                    var r;
                                    return null !== (r = s[t]) && void 0 !== r ? r: t
                                }))
                            })))
                        },
                        enumerable: !1,
                        configurable: !0
                    }),
                    t.prototype.humanizeTimestamp = function(t) {
                        var r = new Date(t),
                            e = this.getEorzeanTimes(t, !0);
                        return [t.toString(), "ET ".concat(e[3], "/").concat(e[2], " ").concat(e[1], ":").concat(e[0].toString().padStart(2, "0")), "LT ".concat(r.getMonth() + 1, "/").concat(r.getDate(), " ").concat(r.getHours(), ":").concat(r.getMinutes().toString().padStart(2, "0"), ":").concat(r.getSeconds().toString().padStart(2, "0"))].join("|")
                    },
                    t.prototype.getEorzeanTimes = function(t, r) {
                        void 0 === r && (r = !1),
                            t = Math.abs(null != t ? t: Date.now());
                        var e = Math.round(Math.round(t / (175 / 60)) / 1e3),
                            n = Math.trunc(e / 60);
                        if (!0 !== r) return [e % 60, n % 24];
                        var a = Math.trunc(n / 24);
                        return [e % 60, n % 24, a % 32 + 1, Math.trunc(a / 32) % 12 + 1]
                    },
                    t.prototype.setEorzeanTimes = function(t, r, e) {
                        if (void 0 === e && (e = 0), "number" != typeof t) throw new TypeError("timestamp" + v);
                        if ("number" != typeof r) throw new TypeError("bell" + v);
                        if ("number" != typeof e) throw new TypeError("minute" + v);
                        var n = Math.trunc(Math.abs(t) / c) * c;
                        return n += r * i,
                        e > 0 && (n += Math.round(i / 60 * e)),
                            n
                    },
                    t.prototype.getValidWeathers = function(t) {
                        var r = o.rates[h(t)];
                        return r ? r.filter((function(t) {
                            return "number" != typeof t
                        })) : null
                    },
                    t.prototype.getWeather = function(t, r) {
                        var e = o.rates[h(t)];
                        if (null == e) return null;
                        for (var n = function(t) {
                            t = Math.abs(null != t ? t: Date.now());
                            var r = Math.trunc(t / 1e3),
                                e = Math.trunc(r / 175),
                                n = (e + 8 - e % 8) % 24,
                                a = 100 * (Math.trunc(r / 4200) >>> 0) + n,
                                u = (a << 11 ^ a) >>> 0;
                            return ((u >>> 8 ^ u) >>> 0) % 100
                        } (null != r ? r: Date.now()), a = 0;; a++) {
                            var u = 2 * a + 1;
                            if (u >= e.length) break;
                            if (n < e[u]) return e[2 * a]
                        }
                        return e[e.length - 1]
                    },
                    t.prototype.getMultipleWeathers = function(t, r, e) {
                        var n = this;
                        if (null == o.rates[h(t)]) return null;
                        e = Math.abs(null != e ? e: Date.now());
                        var a = [[e = Math.trunc(e / l) * l, this.getWeather(t, e)]],
                            u = function(r, u) {
                                void 0 === u && (u = !1),
                                    r = Math.abs(r);
                                for (var o = 1; o <= r; o++) {
                                    var i = u ? e - o * l: e + o * l,
                                        c = n.getWeather(t, i);
                                    a[u ? "unshift": "push"]([i, c])
                                }
                            };
                        return "number" == typeof r ? u(r, r < 0) : Array.isArray(r) && (u(r[0], !0), u(r[1])),
                            a
                    },
                    t.prototype.findWeathers = function(t, r, e, n) {
                        if (void 0 === n && (n = !1), null == o.rates[h(t)]) return null;
                        var a = this.getValidWeathers(t);
                        if (!Array.isArray(r) || !r.every((function(t) {
                            return Array.isArray(t) ? t.every((function(t) {
                                return a.includes(t)
                            })) : a.includes(t)
                        }))) return null;
                        e = Math.abs(null != e ? e: Date.now());
                        for (var u = r.length - 1,
                                 i = function(a) {
                                     var o = c.getMultipleWeathers(t, n ? -u: u, e);
                                     if (r.every((function(t, r) {
                                         return p(o[r][1], t)
                                     }))) return {
                                         value: o
                                     };
                                     e = n ? e - l: e + l
                                 },
                                 c = this, f = 1; f <= 1e6; f++) {
                            var s = i();
                            if ("object" == typeof s) return s.value
                        }
                        return null
                    },
                    t.prototype.findNextWeather = function(t, r, e) {
                        var n = this;
                        if (null == o.rates[h(t)] || null == r) return null;
                        var a = this.getValidWeathers(t),
                            u = function(t) {
                                if (null == t) return a;
                                var r = Array.isArray(t) ? t: [t];
                                return 0 === r.length || a.every((function(t) {
                                    return r.includes(t)
                                })) ? a: r
                            },
                            c = [u(r.previous), u(r.weather)],
                            f = Array.isArray(r.bells) ?
                                function(t) {
                                    var r = t[0],
                                        e = t[1],
                                        n = [];
                                    if ((r = Math.abs(r) % 24) < (e = Math.abs(e) % 24)) for (var a = r; a <= e; a++) n.push(a);
                                    else {
                                        for (a = 0; a <= e; a++) n.push(a);
                                        for (a = r; a <= 23; a++) n.includes(a) || n.push(a)
                                    }
                                    return n
                                } (r.bells) : null;
                        e = Math.abs(null != e ? e: Date.now());
                        for (var s = function() {
                                var r = n.findWeathers(t, c, e - l);
                                if (null == r) return null;
                                if (c[0] !== a || c[1] !== a) for (; p(r[r.length - 1][1], c[0]);) {
                                    var u = n.findWeathers(t, c, r[1][0]);
                                    if (null == u) break;
                                    r.push(u[1])
                                }
                                return r
                            },
                                 v = 0; v < 1e5; v++) {
                            var g = s();
                            if (null == g) return null;
                            var y = g[1][0],
                                b = g[g.length - 1][0] + l;
                            if (null == f) return [y, b, g.map((function(t) {
                                return t[1]
                            }))];
                            for (var d = [], m = y; m < b; m += i) {
                                var M = this.getEorzeanTimes(m)[1];
                                if (f.includes(M)) {
                                    var w = this.setEorzeanTimes(m, M);
                                    if (d.length > 0 && Math.abs(w - d[d.length - 1]) !== i) break;
                                    d.push(w)
                                }
                            }
                            if (d.length > 0) return [y = Math.min.apply(Math, d), b = Math.max.apply(Math, d) + i, g.slice(0, Math.ceil((b - y) / l) + 1).map((function(t) {
                                return t[1]
                            }))];
                            e += i
                        }
                        return null
                    },
                    t
            } ();
        window.Weather = null !== (t = window.Weather) && void 0 !== t ? t: g,
            r = new g,
            e = {
                eorzea: function(t) {
                    var e = r.getEorzeanTimes(t),
                        n = e[0],
                        a = e[1];
                    return "".concat(a, ":").concat(n.toString().padStart(2, "0"))
                },
                local: function(t) {
                    var r = new Date(t);
                    return "".concat(r.getHours(), ":").concat(r.getMinutes().toString().padStart(2, "0"))
                },
                server: function(t) {
                    var r = new Date(t + 6e4 * (new Date).getTimezoneOffset());
                    return "".concat(r.getHours(), ":").concat(r.getMinutes().toString().padStart(2, "0"))
                }
            },
            n = {},
            a = Object.keys(e),
            (u = function() {
                for (var t = Date.now(), r = function(r) {
                        var a = document.getElementsByClassName("clock-".concat(r));
                        if (0 === a.length) return "continue";
                        var u = e[r](t);
                        u !== n[r] &&
                        function(t) {
                            Array.prototype.forEach.call(a, (function(e) {
                                return e.innerHTML = '<i class="xiv '.concat(r, '-time-chs"></i> ').concat(t)
                            }))
                        } (n[r] = u)
                    },
                         u = 0, o = a; u < o.length; u++) r(o[u])
            })(),
            setInterval((function() {
                return u()
            }), 1e3)
    } ();
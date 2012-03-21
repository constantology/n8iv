!function(n8iv) {
    var F = !1, N = null, T = !0;
    function aggregate(o, val, fn, ctx) {
        ctx || (ctx = o);
        return Object.keys(o).reduce(function(res, k, i) {
            return fn.call(ctx, res, o[k], k, o, i);
        }, val);
    }
    function clear(o) {
        Object.keys(o).forEach(function(k) {
            delete o[k];
        }, o);
        return o;
    }
    function equalTo(o, k) {
        switch (n8iv.type(o)) {
          case "array":
            return Array.isArray(k) ? arraysEqual(o, k) : F;
          case "object":
            return n8iv.isObj(k) ? objectsEqual(o, k) : F;
          case "date":
            return +o == +k;
        }
        return o == k;
    }
    function arraysEqual(a1, a2) {
        return a1.length == a2.length && Array.from(a1).every(function(v, i) {
            return equalTo(a2[i], v);
        });
    }
    function objectsEqual(o1, o2) {
        if (Object.len(o1) !== Object.len(o2) || ownLen(o1) !== ownLen(o2)) return F;
        for (var k in o2) if (n8iv.has(o1, k) !== n8iv.has(o2, k) || !equalTo(o1[k], o2[k])) return F;
        return T;
    }
    function ownKeys(o) {
        return Object.getOwnPropertyNames(o);
    }
    function ownLen(o) {
        return ownKeys(o).length;
    }
    function reduce(o, fn, val) {
        return Object.keys(o).reduce(function(res, k, i) {
            return fn.call(o, res, o[k], k, o, i);
        }, val);
    }
    n8iv.defs(Object, {
        aggregate : aggregate,
        clear : clear,
        equalTo : equalTo,
        ownKeys : ownKeys,
        ownLen : ownLen,
        reduce : reduce
    }, "r");
    n8iv.defs(Function.prototype, function() {
        var re_args = /^[\s\(]*function[^\(]*\(([^\)]*)\)/, re_split = /\s*,\s*/;
        n8iv.def(Function, "from", n8iv.describe(function from(o) {
            return n8iv.isFn(o) ? o : function() {
                return o;
            };
        }, "r"));
        return {
            params : {
                get : function() {
                    var names = String(this).match(re_args)[1].trim().split(re_split);
                    return names.length == 1 && !names[0] ? [] : names;
                }
            },
            attempt : function(ctx) {
                var args = Array.from(arguments, 1), fn = this;
                return function attempting() {
                    try {
                        return fn.apply(ctx || this, args);
                    } catch (e) {
                        return e;
                    }
                }();
            },
            bake : function() {
                var baked = "baked", fn = this;
                return fn[baked] || !n8iv.def(fn, baked, n8iv.describe(function() {
                    return fn.apply(this, [ this ].concat(Array.from(arguments)));
                }.mimic(fn), "r")) || fn[baked];
            },
            defer : n8iv.ENV == "commonjs" ? function(ctx) {
                return process.nextTick(this.bind.apply(this, [ ctx ].concat(Array.from(arguments, 1))));
            } : function() {
                return this.delay.apply(this, [ 1 ].concat(Array.from(arguments)));
            },
            delay : function(ms, ctx) {
                var args = Array.from(arguments, 2), fn = this;
                function delayed() {
                    delayed.stop();
                    return fn.apply(ctx || this, args);
                }
                return n8iv.copy(delayed, {
                    stop : function() {
                        clearTimeout(this.timeoutId);
                        delete this.timeoutId;
                        return fn;
                    },
                    timeoutId : setTimeout(delayed, ms)
                });
            },
            memoize : function(cache) {
                var fn = this;
                n8iv.isObj(cache) || (cache = n8iv.obj());
                function memo() {
                    var args = Array.from(arguments), s = args.toString();
                    return s in cache ? cache[s] : cache[s] = fn.apply(this, args);
                }
                memo.unmemoize = function() {
                    return fn;
                };
                return memo;
            },
            stop : function() {
                return this;
            },
            unmemoize : function() {
                return this;
            },
            wrap : function(wrapper) {
                var args = Array.from(arguments, 1), fn = this;
                return function() {
                    return wrapper.apply(this, [ fn.bind(this) ].concat(args).concat(Array.from(arguments)));
                }.mimic(wrapper);
            }
        };
    }(), "r");
    n8iv.defs(Array.prototype, function() {
        function groupByFn(field, v) {
            return field(v) ? 0 : 1;
        }
        function groupByRegExp(field, v) {
            return field.test(v) ? 0 : 1;
        }
        function groupByStr(field, v) {
            return Object.value(v, field) || 1;
        }
        function isFalsey(o) {
            return !o ? N : o;
        }
        function sortedVal(o) {
            return o[0];
        }
        function sortingVal(o) {
            return [ o, n8iv.isFn(this) ? this(o) : Object.value(o, this) ];
        }
        var AP = Array.prototype, sort = {
            desc : function(a, b) {
                return a[1] == b[1] ? 0 : a[1] < b[1] ? 1 : -1;
            },
            asc : function(a, b) {
                return a[1] == b[1] ? 0 : a[1] > b[1] ? 1 : -1;
            }
        };
        sort[String(T)] = sort[1] = sort.asc;
        sort[String(!1)] = sort[0] = sort.desc;
        n8iv.def(Array, "sortFns", n8iv.describe({
            value : sort
        }, "r"));
        return {
            aggregate : function(val, fn, ctx) {
                return AP.reduce.call(this, function(val, o, i, a) {
                    return fn.call(ctx || o, val, o, i, a);
                }, val);
            },
            associate : function(a, fn, ctx) {
                fn || (fn = n8iv.requite);
                ctx || (ctx = this);
                return AP.reduce.call(this, function(o, v, i) {
                    o[a[i]] = fn.call(ctx, v, i, this);
                    return o;
                }, n8iv.obj());
            },
            clear : function() {
                this.length = 0;
                return this;
            },
            clone : function() {
                return AP.slice.call(this);
            },
            compact : function(falsey) {
                return AP.mapc.call(this, falsey === T ? isFalsey : n8iv.requite);
            },
            contains : function(o) {
                return !!~AP.indexOf.call(this, o);
            },
            each : function(fn, ctx) {
                AP.forEach.call(this, fn, ctx || this);
                return this;
            },
            flatten : function(n) {
                if (n8iv.isNum(n)) {
                    if (n > 0) --n; else return this;
                }
                return AP.aggregate.call(this, [], function(v, o, i) {
                    Array.isArray(o) ? v.splice.apply(v, [ v.length, 0 ].concat(o.flatten(n))) : v.push(o);
                    return v;
                }, this);
            },
            grep : function(re, fn, ctx) {
                var a = this;
                fn || (fn = n8iv.requite);
                ctx || (ctx = a);
                !n8iv.isStr(re) || (re = new RegExp(re.escapeRE(), "g"));
                return AP.aggregate.call(a, [], function(v, o, i) {
                    !re.test(o) || v.push(fn.call(ctx, o, i, a));
                    return v;
                });
            },
            groupBy : function(f, fn, ctx) {
                fn || (fn = n8iv.requite);
                var a = this, keys, match, res = n8iv.obj();
                switch (n8iv.type(f)) {
                  case "function":
                    match = groupByFn;
                    break;
                  case "regexp":
                    match = groupByRegExp;
                    break;
                  case "number":
                  case "string":
                    match = groupByStr;
                    keys = AP.pluck.call(a, f, T);
                    break;
                  default:
                    n8iv.trace().error(new TypeError("Array.prototype.groupBy can only match based on a Function, RegExp or String."), T);
                }
                (keys || [ 0, 1 ]).forEach(function(k) {
                    res[k] = [];
                });
                return AP.aggregate.call(a, res, function(v, o, i) {
                    v[match(f, o)].push(fn.call(this, o, i, a));
                    return v;
                }, ctx || a);
            },
            include : function(o) {
                return AP.contains.call(this, o) ? !1 : !this.push(o) || T;
            },
            invoke : function(fn) {
                var args = Array.from(arguments, 1);
                return AP.map.call(this, function(o, i) {
                    return o[fn].apply(o, args);
                });
            },
            invokec : function(fn) {
                var args = Array.from(arguments, 1);
                return AP.mapc.call(this, function(o, i) {
                    return n8iv.isFn(o[fn]) ? o[fn].apply(o, args) : N;
                });
            },
            item : function(i) {
                return this[i < 0 ? this.length + i : i];
            },
            last : function() {
                return this[this.length - 1];
            },
            mapc : function(fn, ctx) {
                ctx || (ctx = this);
                return AP.reduce.call(this, function(v, o, i, a) {
                    !n8iv.exists(o = fn.call(ctx, o, i, a)) || v.push(o);
                    return v;
                }, []);
            },
            pluck : function(k, c) {
                return AP[c === T ? "mapc" : "map"].call(this, function(o) {
                    return Object.value(o, k);
                });
            },
            remove : function() {
                var args = Array.from(arguments), i, res = [], v;
                while (v = args.shift()) !~(i = AP.indexOf.call(this, v)) || res.push(AP.splice.call(this, i, 1)[0]);
                return res;
            },
            sortBy : function(f, d) {
                return AP.map.call(this, sortingVal, f).sort(n8iv.isFn(d) ? d : sort[String(d).lc()] || sort.asc).map(sortedVal);
            },
            tuck : function(k, a) {
                var is_arr = Array.isArray(a);
                return AP.each.call(this, function(o, i) {
                    o[k] = is_arr ? a[i] : a;
                });
            },
            uniq : function() {
                return AP.reduce.call(this, function(v, o) {
                    v.contains(o) || v.push(o);
                    return v;
                }, []);
            },
            without : function() {
                var a = AP.clone.call(this);
                a.remove.apply(a, arguments);
                return a;
            },
            zip : function() {
                var args = Array.from(arguments);
                args.unshift(this);
                return AP.map.call(this, function(o, i) {
                    return args.pluck(i);
                });
            }
        };
    }(), "r");
    n8iv.defs(Number, function() {
        var abs = Math.abs, big_int = 9007199254740992, floor = Math.floor;
        return {
            isInteger : function(v) {
                return n8iv.isNum(v) && isFinite(v) && v > -big_int && v < big_int && floor(v) === v;
            },
            toInteger : function(v) {
                v = +v;
                if (isNaN(v)) return +0;
                if (v === 0 || !isFinite(v)) return v;
                return (v < 0 ? -1 : 1) * abs(floor(v));
            }
        };
    }(), "cw");
    n8iv.defs(Number.prototype, {
        pad : function(l, radix) {
            var s = this.toString(radix || 10);
            return "0".times(l - s.length) + s;
        },
        times : function(fn, ctx) {
            n8iv.range(0, this).forEach(fn, ctx || n8iv.global);
            return this;
        },
        toHex : function() {
            return this.pad(2, 16);
        }
    }, "r");
    n8iv.defs(String.prototype, function() {
        var cache_chars = n8iv.obj(), cache_slices = n8iv.obj(), esc_chars = /([-\*\+\?\.\|\^\$\/\\\(\)[\]\{\}])/g, esc_val = "\\$1", re_caps = /([A-Z])/g, re_gsub = /\$?\{([^\}]+)\}/g, re_hex = /#?(\w{1,6})/, re_rgb = /(\d{1,3})/g, re_split_string = /[\sA-Z_-]+/g;
        function _splitString(m, p) {
            return p + p.lc();
        }
        function splitString(s) {
            s = s.trim();
            var s0 = s.charAt(0), s1 = s.charAt(1), i = s0.lc() == s0 && s1 != " " && s1.uc() == s1 ? 2 : 1, o = s.substring(i).replace(re_caps, _splitString).split(re_split_string);
            o[0] = s.substring(0, i) + o[0];
            return o;
        }
        return {
            blank : function() {
                return !!this.trim().empty();
            },
            capitalize : function() {
                return this.charAt(0).uc() + this.substring(1).lc();
            },
            cc : function() {
                return this.toCamelCase();
            },
            clean : function(character) {
                character || (character = " ");
                character = cache_chars[character] || (cache_chars[character] = {
                    re : new RegExp("(" + character + "){1,}", "g"),
                    fill : character
                });
                return this.split(character.re).filter(function(s) {
                    return !s.blank() && s != character.fill;
                }).join(character.fill);
            },
            contains : function(s) {
                return !!~this.indexOf(s);
            },
            empty : function() {
                return String(this) === "";
            },
            format : function() {
                return this.gsub.call(this, Array.from(arguments));
            },
            gsub : function(o, pattern) {
                return this.replace(pattern || re_gsub, function(m, p) {
                    return o[p] || "";
                });
            },
            hyphenate : function() {
                return splitString(this).join("-").lc();
            },
            includes : function(s) {
                return this.lc().contains(String(s).lc());
            },
            parts : function(re) {
                var m = Array.from(this.match(re));
                switch (m.length) {
                  case 1:
                    if (m[0] === N || m[0] === this) return [];
                  default:
                    m[0] !== this || m.shift();
                    return m;
                }
            },
            qw : function() {
                return this.split(" ");
            },
            regexpEsc : function() {
                return this.replace(esc_chars, esc_val);
            },
            sliceEvery : function(n) {
                n = parseInt(n, 10);
                if (isNaN(n) || this.length < n || n == 0) return [ String(this) ];
                return this.match(cache_slices[n] || (cache_slices[n] = new RegExp("(.{1," + n + "})", "g")));
            },
            times : function(n) {
                return (new Array(Number.toInteger(n) + 1)).join(this);
            },
            toCamelCase : function() {
                var parts = splitString(this), str = [ parts.shift() ];
                return parts.reduce(function(res, val) {
                    res.push(val.capitalize());
                    return res;
                }, str).join("");
            },
            toHex : function() {
                function toHex(o) {
                    return parseInt(o, 10).pad(2, 16);
                }
                return function() {
                    var m = this.match(re_rgb);
                    return "#" + (m.length == 1 ? toHex(m[0]).times(3) : m.map(toHex).join(""));
                };
            }(),
            toJSON : function() {
                return JSON.parse(this);
            },
            toRGB : function(as_array) {
                var o = this.match(re_hex)[1], l = o.length, v;
                switch (l) {
                  case 6:
                    break;
                  case 3:
                    o = this.times(2);
                    break;
                  case 2:
                    o = this.times(3);
                    break;
                  default:
                    o = l > 6 ? o.substring(0, 6) : l == 4 ? o + "00" : o + "0";
                }
                v = o.sliceEvery(2).map(function(v) {
                    return parseInt(v, 16);
                });
                return as_array === T ? v : "rgb(" + v.join(", ") + ")";
            },
            truncate : function(i, c) {
                i || (i = 50);
                n8iv.isStr(c) || (c = "...");
                return this.length < i ? String(this) : this.substring(0, i).trimRight() + c;
            },
            uc : function() {
                return this.toUpperCase();
            },
            underscore : function() {
                return splitString(this).join("_").lc();
            }
        };
    }(), "r");
    n8iv.ENV != "commonjs" || module.exports === n8iv || (module.exports = n8iv);
}(typeof n8iv != "undefined" ? n8iv : typeof require != "undefined" ? require("./n8iv._") : N);
!function(root) {
    function $A(a, i, j) {
        return got(a, LEN) ? slice.call(a, isNum(i) ? i > 0 ? i : 0 : 0, isNum(j) ? j > i ? j : i + 1 : a[LEN]) : [ a ];
    }
    function bless(ns, ctx) {
        switch (n8iv_type(ns)) {
          case ARR:
            break;
          case STR:
            ns = ns.split(".");
            break;
          default:
            return ctx || ENV != CJS ? root : module.exports;
        }
        ctx || (ctx = ENV != CJS ? root : module.exports);
        ns[0] != "n8iv" || (ctx = n8iv, ns.shift());
        ns.forEach(function(o) {
            if (!o) return;
            got(ctx, o) || (ctx[o] = n8iv_obj());
            ctx = ctx[o];
        });
        return ctx;
    }
    function bool(o) {
        switch (n8iv_type(o)) {
          case F:
            return F;
          case BOOL:
            return o;
          case NUM:
            return o !== 0 && !isNaN(o);
          case STR:
            return !booleans.some(function(v) {
                return v === o;
            });
          default:
            return o === U || o === N ? F : T;
        }
    }
    function coerce(o, n, s) {
        return !isNaN(n = Number(o)) ? n : (s = String(o)) in coercions ? coercions[s] : o;
    }
    function copy(d, s, n) {
        n = n === T;
        for (var k in s) !has(s, k) || n && has(d, k) || (d[k] = s[k]);
        return d;
    }
    function def(item, name, desc, overwrite, debug) {
        var exists = got(item, name);
        !(desc.get || desc.set) || delete desc.writable;
        if (overwrite === T || !exists) Object.defineProperty(item, name, desc); else if (debug === T && exists) trace().error(new Error("Trying to overwrite existing property: " + name + ", in: " + (isFn(item) ? item.n8ivName : item[CTOR].n8ivName) + "."), T);
        return n8iv;
    }
    function defs(item, o, m, overwrite, debug) {
        m || (m = cw);
        for (var k in o) !has(o, k) || def(item, k, describe(o[k], m), overwrite, debug);
        return n8iv;
    }
    function describe(v, m) {
        return copy(isObj(v, T) ? v : {
            value : v
        }, isObj(m) ? m : modes[lc(m)] || modes.cew);
    }
    function description(o, k) {
        return Object.getOwnPropertyDescriptor(o, k);
    }
    function error(e, chuck) {
        var msg;
        switch (n8iv_type(e)) {
          case ERR:
            msg = e.message;
            break;
          case STR:
            msg = String(e);
            e = new Error(e);
            break;
        }
        !(ERR in console) || console.error(msg);
        if (chuck === T) throw e;
        return n8iv;
    }
    function exists(o) {
        return o !== N && o !== U && (typeof o == NUM ? !isNaN(o) : T);
    }
    function got(o, k) {
        return k in Object(o);
    }
    function has(o, k) {
        return OP.hasOwnProperty.call(o, k);
    }
    function lc(s) {
        return String(s).toLowerCase();
    }
    function n8iv_id(o, prefix) {
        return o ? got(o, "id") ? o.id : o.id = _id(prefix) : _id(prefix);
    }
    function _id(prefix) {
        return (prefix || id_prefix) + ++id_count;
    }
    function n8iv_obj(o, n) {
        return (n = Object.create(N)) && arguments[LEN] >= 1 ? copy(n, o) : n;
    }
    function n8iv_proto(o) {
        return Object.getPrototypeOf(o);
    }
    function noop() {}
    function range(i, j) {
        var a = [ i ];
        while (++i <= j) a.push(i);
        return a;
    }
    function requite(o) {
        return o;
    }
    function tostr(o) {
        return OP.toString.call(o);
    }
    function trace() {
        !("trace" in console) || console.trace();
        return n8iv;
    }
    function valof(o) {
        return OP.valueOf.call(o);
    }
    function __type__() {
        var ctor = this[CTOR], nt = nativeType(this), t = ENV != CJS ? domType(nt) : re_global.test(nt) ? "global" : F;
        return t || (nt == OBJ && ctor[TYPE] != FN ? ctor[TYPE] || lc(ctor.n8ivName) || nt : nt);
    }
    function domType(t) {
        return re_col.test(t) ? "htmlcollection" : re_el.test(t) ? "htmlelement" : re_global.test(t) ? "global" : F;
    }
    function n8iv_type(o) {
        return o === N || o === U ? F : o[TYPE] || (n8iv_proto(o) === N ? NOBJ : U);
    }
    function nativeType(o, t) {
        if ((t = tostr(o)) in types) return types[t];
        return types[t] = lc(t).match(re_type)[1].replace(re_vendor, "$1");
    }
    function isBool(o) {
        return n8iv_type(o) == BOOL;
    }
    function isEmpty(o) {
        switch (n8iv_type(o)) {
          case ARR:
            return !o[LEN];
          case NUM:
            return isNaN(o);
          case OBJ:
            return !Object.len(o);
          case STR:
            return o === "";
          default:
            return !exists(o);
        }
    }
    function isFn(fn) {
        return typeof fn == FN;
    }
    function isNum(o) {
        return n8iv_type(o) == NUM && !isNaN(o);
    }
    function isObj(o, exclusive) {
        var t = n8iv_type(o);
        return t == OBJ && nativeType(o) == OBJ || exclusive !== T && t == NOBJ;
    }
    function isStr(o) {
        return n8iv_type(o) == STR;
    }
    function isUndef(o) {
        return typeof o == UNDEF;
    }
    var F = !1, N = null, T = !0, U, ARR = "array", BOOL = "boolean", CJS = "commonjs", CTOR = "constructor", ERR = "error", FN = "function", LEN = "length", NUM = "number", OBJ = "object", NOBJ = N + OBJ, PROTO = "prototype", STR = "string", TYPE = "__type__", UNDEF = "" + U, OP = Object[PROTO], ENV = typeof module != UNDEF && "exports" in module ? CJS : typeof navigator != UNDEF ? "ua" : "other", booleans = [ 0, F, "", NaN, N, U ].map(String), coercions = [ F, NaN, N, T, U ].reduce(function(o, v) {
        o[String(v)] = v;
        return o;
    }, n8iv_obj()), c = "c", cw = "cw", r = "r", id_count = 999, id_prefix = "anon__", modes = function() {
        var f = "configurable enumerable writable".split(" "), m = {
            ce : "ec",
            cw : "wc",
            ew : "we",
            cew : "cwe ecw ewc wce wec".split(" ")
        }, p = {
            c : [ T, F, F ],
            ce : [ T, T, F ],
            cew : [ T, T, T ],
            cw : [ T, F, T ],
            e : [ F, T, F ],
            ew : [ F, T, T ],
            r : [ F, F, F ],
            w : [ F, F, T ]
        };
        return Object.keys(p).reduce(function(o, k) {
            o[k] = f.reduce(function(v, f, i) {
                v[f] = p[k][i];
                return v;
            }, n8iv_obj());
            !(k in m) || typeof m[k] == STR ? o[m[k]] = o[k] : m[k].forEach(function(f) {
                o[f] = o[k];
            });
            return o;
        }, n8iv_obj());
    }(), re_col = /htmlcollection|nodelist/, re_el = /^html\w+?element$/, re_global = /domprototype|global|window/i, re_type = /\[[^\s]+\s([^\]]+)\]/, re_vendor = /^[Ww]ebkit|[Mm]oz|O|[Mm]s|[Kk]html(.*)$/, slice = Array[PROTO].slice, types = {
        "[object Object]" : OBJ
    };
    n8iv = n8iv_obj();
    def(OP, TYPE, copy({
        get : __type__
    }, modes.r));
    def(Array, "from", describe($A, r));
    defs(Object, {
        clone : function(o) {
            return copy(n8iv_obj(), o);
        },
        each : function(o, fn, ctx) {
            ctx || (ctx = o);
            Object.keys(o).forEach(function(k, i) {
                fn.call(ctx, o[k], k, o, i);
            }, o);
            return o;
        },
        key : function(o, v) {
            for (var k in o) if (o[k] === v) return k;
            return N;
        },
        len : function(o) {
            return Object.keys(o)[LEN];
        },
        remove : function(o, keys) {
            (Array.isArray(keys) ? keys : $A(arguments, 1)).forEach(function(k) {
                delete o[k];
            });
            return o;
        },
        value : function(o, k) {
            if (isNaN(k) && k.indexOf(".") > -1) {
                var v;
                k = k.split(".");
                while (v = k.shift()) {
                    o = Object.value(o, v);
                    if (o === U) return o;
                }
                return o;
            }
            return isEmpty(o) ? U : !isEmpty(o[k]) ? o[k] : isFn(o.get) ? o.get(k) : isFn(o.getAttribute) ? o.getAttribute(k) : U;
        },
        values : function(o) {
            return Object.keys(o).map(function(k) {
                return o[k];
            });
        }
    }, r);
    def(Array[PROTO], "find", describe(function(fn, ctx) {
        var i = -1, l = this[LEN] >>> 0;
        ctx || (ctx = this);
        while (++i < l) if (!!fn.call(ctx, this[i], i, this)) return this[i];
        return N;
    }, r));
    defs(Function[PROTO], {
        n8ivName : {
            get : function() {
                var anon = "anonymous", non = [ "", "" ], namu = "__n8ivName__", re_name = /[\s\(]*function([^\(]+).*/;
                return function n8ivName() {
                    if (!this[namu]) {
                        var fn = this.valueOf(), m = fn !== this ? fn.n8ivName !== anon ? fn.n8ivName : N : N, n = this.name || this.displayName || (String(this).match(re_name) || non)[1].trim();
                        def(this, namu, describe(m || n || anon, "w"));
                    }
                    return this[namu];
                };
            }()
        },
        bind : function(ctx) {
            var args = $A(arguments, 1), bound = function() {
                return fn.apply(this instanceof bound ? this : ctx || root, args.concat($A(arguments)));
            }, fn = this;
            bound[PROTO] = Object.create(fn[PROTO]);
            return bound.mimic(fn);
        },
        mimic : function(fn, name) {
            return Object.defineProperties(this, {
                displayName : describe(name || fn.n8ivName, c),
                toString : describe(function() {
                    return fn.valueOf().toString();
                }, c),
                valueOf : describe(function() {
                    return fn;
                }, c)
            });
        }
    }, r);
    defs(String[PROTO], {
        endsWith : function(s) {
            return this[LEN] && this.lastIndexOf(s) == this[LEN] - s[LEN];
        },
        lc : function() {
            return lc(this);
        },
        startsWith : function(s) {
            return !this.indexOf(s);
        }
    }, r);
    typeof global == UNDEF || (root = global);
    try {
        ENV != CJS ? def(root, "n8iv", describe({
            value : n8iv
        }, r)) : module.exports = n8iv;
    } catch (e) {}
    defs(n8iv, {
        ENV : ENV,
        modes : modes,
        global : {
            value : root
        },
        bless : bless,
        bool : bool,
        coerce : coerce,
        copy : copy,
        def : def,
        defs : defs,
        describe : describe,
        description : description,
        error : error,
        exists : exists,
        got : got,
        has : has,
        id : n8iv_id,
        isBool : isBool,
        isEmpty : isEmpty,
        isFn : isFn,
        isNum : isNum,
        isObj : isObj,
        isStr : isStr,
        isUndef : isUndef,
        nativeType : nativeType,
        noop : noop,
        obj : n8iv_obj,
        proto : n8iv_proto,
        range : range,
        requite : requite,
        tostr : tostr,
        trace : trace,
        type : n8iv_type,
        valof : valof
    }, r);
}(this);

!function(root, n8iv) {
    var LEN = "length", PROTO = "prototype", F = !1, N = null, T = !0, r = "r";
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
        return a1[LEN] == a2[LEN] && Array.from(a1).every(function(v, i) {
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
        return ownKeys(o)[LEN];
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
    }, r);
    n8iv.defs(Function[PROTO], function() {
        var re_args = /^[\s\(]*function[^\(]*\(([^\)]*)\)/, re_split = /\s*,\s*/;
        n8iv.def(Function, "from", n8iv.describe(function from(o) {
            return n8iv.isFn(o) ? o : function() {
                return o;
            };
        }, r));
        return {
            params : {
                get : function() {
                    var names = String(this).match(re_args)[1].trim().split(re_split);
                    return names[LEN] == 1 && !names[0] ? [] : names;
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
                }.mimic(fn), r)) || fn[baked];
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
    }(), r);
    n8iv.defs(Array[PROTO], function() {
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
        var AP = Array[PROTO], sort = {
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
        }, r));
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
                this[LEN] = 0;
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
                    Array.isArray(o) ? v.splice.apply(v, [ v[LEN], 0 ].concat(o.flatten(n))) : v.push(o);
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
                return this[i < 0 ? this[LEN] + i : i];
            },
            last : function() {
                return this[this[LEN] - 1];
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
    }(), r);
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
    n8iv.defs(Number[PROTO], {
        pad : function(l, radix) {
            var s = this.toString(radix || 10);
            return "0".times(l - s[LEN]) + s;
        },
        times : function(fn, ctx) {
            n8iv.range(0, this).forEach(fn, ctx || root);
            return this;
        },
        toHex : function() {
            return this.pad(2, 16);
        }
    }, r);
    n8iv.defs(String[PROTO], function() {
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
                switch (m[LEN]) {
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
                if (isNaN(n) || this[LEN] < n || n == 0) return [ String(this) ];
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
                    return "#" + (m[LEN] == 1 ? toHex(m[0]).times(3) : m.map(toHex).join(""));
                };
            }(),
            toJSON : function() {
                return JSON.parse(this);
            },
            toRGB : function(as_array) {
                var o = this.match(re_hex)[1], l = o[LEN], v;
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
                return this[LEN] < i ? String(this) : this.substring(0, i).trimRight() + c;
            },
            uc : function() {
                return this.toUpperCase();
            },
            underscore : function() {
                return splitString(this).join("_").lc();
            }
        };
    }(), r);
    n8iv.ENV != "commonjs" || (module.exports = n8iv);
}(this, typeof n8iv == "undefined" ? this.document ? this.n8iv : require("./n8iv._") : n8iv);

!function(root, n8iv) {
    var F = !1, N = null, T = !0, U, cw = "cw", r = "r", ARR = "array", CTOR = "constructor", FN = "function", LEN = "length", OBJ = "object", NOBJ = N + OBJ, PROTO = "prototype", TYPE = "__type__";
    !function() {
        function Class(path, desc) {
            if (!desc && n8iv.isObj(path)) {
                desc = path;
                path = "";
            }
            var C, name, ns, _ctor = desc[CTOR], _proto = n8iv.obj(), _super = desc.extend || Object, mod = getModule(desc.module), mixin = desc.mixin || dumb, singleton = desc.singleton, type = getType(desc.type || path);
            !n8iv.isStr(_super) || (_super = reg_path[_super] || reg_type[_super]);
            if (path) {
                ns = path.split(".");
                name = ns.pop();
                !ns[LEN] || !ns[0].startsWith("^") || (mod ? ns.shift() : ns[0] = ns[0].substring(1));
                ns = n8iv.bless(ns, mod);
            }
            n8iv.def(_proto, PARENT, n8iv.describe(n8iv.noop, cw), T);
            n8iv.def(_proto, CTOR, n8iv.describe(ctor(_ctor, _super[PROTO][CTOR], name, _proto), r), T);
            C = _proto[CTOR];
            n8iv.def(C, TYPE, n8iv.describe("class", r), T);
            n8iv.def(_proto, TYPE, n8iv.describe(type, r), T);
            Object.remove(desc, defaults);
            C[PROTO] = apply(_proto, n8iv.copy(desc, mixin));
            n8iv.def(C, "create", n8iv.describe(create(extend(C, _super)), r), T);
            path = path.replace(re_root, "");
            if (singleton) {
                n8iv.def(C, "singleton", n8iv.describe({
                    value : singleton === T ? new C : C.create.apply(C, [].concat(singleton))
                }, r));
                register(C, path, type);
                C = C.singleton;
            } else if (path) register(C, path, type);
            !(name && ns) || n8iv.def(ns, name, n8iv.describe({
                value : C
            }, r));
            return C;
        }
        function apply(proto, desc) {
            Object.each(desc, function(v, k) {
                switch (n8iv.type(v)) {
                  case OBJ:
                    n8iv.def(proto, k, v, T);
                    break;
                  default:
                    proto[k] = v;
                }
            });
            return proto;
        }
        function create(C) {
            return function create() {
                return singleton(C) || C.apply(Object.create(C[PROTO]), arguments);
            };
        }
        function ctor(m, s, name, P) {
            var C = wrap(m, s, name), Ctor = function() {
                return singleton(this.constructor) || C.apply(is(this, Ctor) ? this : Object.create(P), arguments);
            };
            return Ctor.mimic(m, name);
        }
        function extend(C, Sup) {
            if (!(SUPER in C[PROTO])) {
                var p = C[PROTO], sp = Sup[PROTO];
                Object.keys(sp).forEach(function(k) {
                    if (k in reserved) return;
                    switch (n8iv.type(sp[k])) {
                      case FN:
                        p[k] = !n8iv.isFn(p[k]) ? wrap(sp[k], n8iv.noop, k) : wrap(p[k], sp[k], k);
                        break;
                      default:
                        k in p || n8iv.def(p, k, n8iv.description(sp, k), T);
                    }
                });
                Object.keys(p).forEach(function(k) {
                    !(n8iv.isFn(p[k]) && (!(k in sp) || p[k].valueOf() !== sp[k].valueOf())) || (p[k] = wrap(p[k], n8iv.noop, k));
                });
                sp = n8iv.describe({
                    value : Object.create(Sup[PROTO])
                }, r);
                n8iv.def(C, SUPER, sp);
                n8iv.def(C[PROTO], SUPER, sp);
            }
            return C;
        }
        function getModule(mod) {
            return !mod ? N : Module && mod instanceof Module ? mod.exports || (mod.exports = n8iv.obj()) : mod;
        }
        function getType(type) {
            return type.replace(re_root, "").replace(re_dot, "_").lc();
        }
        function is(o, C) {
            if (o instanceof C) return T;
            if (!(o = o[CTOR])) return F;
            do {
                if (o === C) return T;
            } while (o[SUPER] && (o = o[SUPER][CTOR]));
            return F;
        }
        function register(C, path, type) {
            var err_msg = path + ERR_MSG, msg = [];
            !path || !(path in reg_path) || msg.push(err_msg + "Class");
            !type || !(type in reg_type) || msg.push(err_msg + "Type");
            if (msg[LEN]) {
                n8iv.trace();
                msg.forEach(n8iv.error);
                n8iv.error(new Error("n8iv.Class overwrite error."), T);
            }
            reg_path[path] = reg_type[type] = C;
        }
        function singleton(C) {
            return !C ? N : C.singleton || N;
        }
        function type(c) {
            var ctor = c[CTOR], k;
            for (k in reg_path) if (reg_path[k] === ctor) return k;
            return N;
        }
        function wrap(m, s, name) {
            return function() {
                var o, p = n8iv.description(this, PARENT) || desc_noop;
                p.writable = T;
                n8iv.def(this, PARENT, s ? n8iv.describe(s, cw) : desc_noop, T);
                o = m.apply(this, arguments);
                n8iv.def(this, PARENT, p, T);
                return this.chain !== F && o === U ? this : o;
            }.mimic(m, name);
        }
        var ERR_MSG = " already exists. Cannot override existing ", PARENT = "parent", SUPER = "__super", Module = n8iv.ENV != "commonjs" ? N : require("module"), defaults = (CTOR + " extend mixin module singleton type").split(" "), desc_noop = n8iv.describe(n8iv.noop, cw), dumb = n8iv.obj(), re_dot = /\./g, re_root = /^\u005E/, reg_path = n8iv.obj(), reg_type = n8iv.obj(), reserved = n8iv.obj();
        reserved[CTOR] = reserved[PARENT] = reserved[SUPER] = reserved[TYPE] = T;
        n8iv.def(Class, "is", n8iv.describe(is, r)).def(Class, "type", n8iv.describe(type, r)).def(n8iv, "Class", n8iv.describe(Class, r)).def(n8iv, "create", n8iv.describe(function(n) {
            var C = reg_type[n] || reg_type["n8iv_" + n] || reg_path[n], args = Array.from(arguments, 1);
            C || n8iv.trace().error(new Error(n + " does not match any registered n8iv.Classes."), T);
            return C.create.apply(root, args);
        }, r));
    }();
    n8iv.Class("n8iv.Callback", function() {
        n8iv.def(Function[PROTO], "callback", n8iv.describe(function(conf) {
            return (new n8iv.Callback(this, conf)).fire.mimic(this);
        }, r));
        function buffer() {
            if (bid in this) return this;
            this[bid] = setTimeout(buffer_stop.bind(this), this.buffer);
            return this.exec.apply(this, arguments);
        }
        function buffer_stop() {
            clearTimeout(this[bid]);
            delete this[bid];
        }
        function handleEvent() {
            return this.fire.apply(this, arguments);
        }
        var bid = "bufferId", he = "handleEvent";
        return {
            constructor : function Callback(fn, conf) {
                n8iv.copy(this, conf || n8iv.obj());
                var desc = n8iv.describe(N, r), fire = (n8iv.isNum(this.buffer) ? buffer : this.exec).bind(this);
                desc.value = fn;
                n8iv.def(this, "fn", desc);
                desc.value = this;
                n8iv.def(fire, "cb", desc);
                desc.value = fire;
                n8iv.def(this, "fire", desc);
                this.args || (this.args = []);
                this.ctx || (this.ctx = this);
                n8iv.isNum(this.delay) || (this.delay = N);
                n8iv.isNum(this.times) && this.times > 0 || (this.times = 0);
                this.enable();
            },
            chain : T,
            buffer : N,
            count : 0,
            delay : N,
            times : 0,
            disable : function() {
                this.disabled = T;
                this[he] = n8iv.noop;
            },
            enable : function() {
                this.disabled = F;
                this[he] = handleEvent;
            },
            exec : function() {
                if (this.disabled) return;
                this.times === 0 || this.times > ++this.count || this.disable();
                var a = Array.from(arguments), ctx = this.ctx, ms = this.delay, t = n8iv.type(a[0]), v;
                t && (t.endsWith("event") || t == "n8iv_observer") ? a.splice.apply(a, [ 1, 0 ].concat(this.args)) : a.unshift.apply(a, this.args);
                ms === N ? v = this.fn.apply(ctx, a) : this.fn.delay.apply(this.fn, [ ms, ctx ].concat(a));
                return v;
            },
            reset : function() {
                this.count = 0;
                buffer_stop.call(this.enable());
            }
        };
    }());
    n8iv.Class("n8iv.Hash", function() {
        var ID = "__hashid__", cache = [];
        return {
            constructor : function Hash(o) {
                n8iv.def(this, ID, n8iv.describe(cache.push(n8iv.obj()) - 1, r));
                !n8iv.isObj(o) || this.set(o);
            },
            keys : {
                get : function() {
                    return Object.keys(cache[this[ID]]);
                }
            },
            length : {
                get : function() {
                    return this.keys[LEN];
                }
            },
            values : {
                get : function() {
                    return Object.values(cache[this[ID]]);
                }
            },
            aggregate : function(val, fn, ctx) {
                var hash = this, o = cache[this[ID]];
                ctx || (ctx = hash);
                return Object.keys(o).reduce(function(res, k, i) {
                    return fn.call(ctx, res, o[k], k, hash, i);
                }, val);
            },
            clear : function() {
                cache[this[ID]] = n8iv.obj();
            },
            clone : function() {
                return new n8iv.Hash(Object.clone(cache[this[ID]]));
            },
            each : function(fn, ctx) {
                var hash = this, o = cache[this[ID]];
                ctx || (ctx = hash);
                Object.keys(o).forEach(function(k, i) {
                    fn.call(ctx, o[k], k, hash, i);
                }, hash);
                return hash;
            },
            get : function(k) {
                return n8iv.has(cache[this[ID]], k) ? cache[this[ID]][k] : N;
            },
            has : function(k) {
                return n8iv.has(cache[this[ID]], k);
            },
            key : function(v) {
                return Object.key(cache[this[ID]], v);
            },
            reduce : function(fn, val) {
                var hash = this, o = cache[this[ID]];
                return Object.keys(o).reduce(function(res, k, i) {
                    return fn.call(hash, res, o[k], k, hash, i);
                }, val);
            },
            remove : function(k) {
                return n8iv.has(cache[this[ID]], k) ? delete cache[this[ID]][k] : F;
            },
            set : function(o, v) {
                switch (n8iv.type(o)) {
                  case OBJ:
                  case NOBJ:
                    Object.keys(o).forEach(function(k) {
                        this.set(k, o[k]);
                    }, this);
                    break;
                  default:
                    cache[this[ID]][o] = v;
                }
            },
            stringify : function() {
                return JSON.stringify(cache[this[ID]]);
            },
            toString : function() {
                return n8iv.tostr(cache[this[ID]]);
            },
            valueOf : function() {
                return Object.clone(cache[this[ID]]);
            }
        };
    }());
    n8iv.Class("n8iv.Observer", function() {
        function addObservers(observers) {
            observers = Object.clone(observers);
            var ctx = observers[_ctx], k, l, o, opt = observers[_options], s;
            Object.remove(observers, _ctx, _options);
            for (k in observers) {
                l = observers[k];
                o = !n8iv.isUndef(l[_options]) ? l[_options] : opt;
                s = !n8iv.isUndef(l[_ctx]) ? l[_ctx] : ctx;
                switch (n8iv.type(l)) {
                  case FN:
                    this.on(k, l, ctx, opt);
                    break;
                  case OBJ:
                  case NOBJ:
                    switch (n8iv.type(l[_fn])) {
                      case FN:
                      case OBJ:
                      case NOBJ:
                        this.on(k, l[_fn], s, o);
                        break;
                      case ARR:
                        l[_fn].forEach(function(fn) {
                            this.on(k, fn, s, o);
                        }, this);
                        break;
                    }
                    break;
                  case ARR:
                    l.forEach(function(fn) {
                        this.on(k, fn, ctx, opt);
                    }, this);
                    break;
                }
            }
            return this;
        }
        function broadcast(cb) {
            var args = this.args.concat(cb[_options].args), ctx = cb[_ctx] || this[_ctx], fire = cb.fire || cb[_fn];
            if (!n8iv.isFn(fire)) return T;
            if (!!Object.key(this[_ctx], cb[_fn])) args[0] !== this[_ctx] || args.shift(); else if (args[0] !== this[_ctx]) args.unshift(this[_ctx]);
            return fire.apply(ctx, args) !== F;
        }
        function createRelayCallback(ctxr, ctx, evt) {
            return function Observer_relayedCallback() {
                var args = Array.from(arguments);
                !(args[0] === ctxr) || args.shift();
                args.unshift(evt, ctx);
                return relay.apply(ctx, args);
            };
        }
        function createSingleCallback(event, cb) {
            var ctx = this;
            return cb.fire = function Observer_singleCallback() {
                ctx.un(event, cb[_fn], cb[_ctx]);
                if (cb.fired) {
                    return;
                }
                cb.fired = T;
                return cb[_fn].apply(cb[_ctx] || ctx, arguments);
            };
        }
        function handleEvent(cb) {
            return function handleEvent() {
                return cb.handleEvent.apply(cb, arguments);
            }.mimic(cb.fire);
        }
        function ignore(event, fn, ctx) {
            event = event.lc();
            var e = this[_observers].get(event), i, o;
            if (!e) {
                return;
            }
            switch (n8iv.type(fn)) {
              case "n8iv_callback":
                o = {
                    ctx : fn,
                    isCB : T
                };
                break;
              default:
                o = {
                    ctx : ctx || this,
                    fn : fn
                };
            }
            o.event = event;
            o = e.find(matchCallback, o);
            if (o !== N) {
                i = e.indexOf(o);
                i < 0 || e.splice(i, 1);
            }
        }
        function matchCallback(o) {
            return (this.isCB === T ? o[_fn].valueOf() === this[_ctx].fire : o[_fn] === this[_fn]) && o[_ctx] === this[_ctx] && o.event === this.event;
        }
        function observe(event, fn, ctx, o) {
            var cb, e = this[_observers], fnt, q;
            if (n8iv.isObj(event)) return addObservers.call(this, event);
            switch (fnt = n8iv.nativeType(fn)) {
              case ARR:
                cb = n8iv.obj();
                cb[event] = {
                    fn : fn,
                    options : o,
                    ctx : ctx
                };
                return addObservers.call(this, cb);
              case OBJ:
              case NOBJ:
              case "n8iv_callback":
                if ("handleEvent" in fn) {
                    !(n8iv.isObj(ctx) && n8iv.isUndef(o)) || (o = ctx);
                    ctx = fn;
                    fn = handleEvent(fn);
                }
                break;
              case "string":
                !ctx || (fn = ctx[fn]);
                break;
            }
            event = event.lc();
            (q = e.get(event)) || e.set(event, q = []);
            switch (n8iv.type(o)) {
              case "boolean":
                o = {
                    single : !!o
                };
                break;
              case "number":
                o = {
                    delay : o
                };
                break;
              case OBJ:
              case NOBJ:
                o = Object.clone(o);
                break;
              default:
                o = n8iv.obj();
            }
            Array.isArray(o.args) || (o.args = []);
            cb = {
                ctx : ctx || this,
                event : event,
                fn : fn,
                id : ++listener_id,
                options : o
            };
            cb.fire = (o.single ? createSingleCallback.call(this, event, cb) : cb[_fn]).callback({
                args : o.args,
                buffer : o.buffer,
                ctx : cb[_ctx],
                delay : o.delay
            });
            q.push(cb);
        }
        function relay() {
            return this.broadcast.apply(this, arguments);
        }
        var _broadcasting = "broadcasting", _ctx = "ctx", _destroyed = "destroyed", _fn = "fn", _observers = "listeners", _options = "options", _suspended = "observer_suspended", listener_id = 0;
        return {
            constructor : function Observer(observers) {
                this[_broadcasting] = F;
                this[_destroyed] = F;
                this[_suspended] = F;
                this[_observers] = n8iv.Hash.create();
                !n8iv.isObj(observers) || this.on(observers);
                !n8iv.isObj(this.observers) || this.on(this.observers), delete this.observers;
            },
            broadcast : function(event) {
                if (this[_destroyed] || this[_suspended] || !this[_observers][LEN] || !event || !this[_observers].has(event = event.lc())) return;
                var args = Array.from(arguments, 1), e = this[_observers].get(event).clone();
                if (!e[LEN]) return;
                this[_broadcasting] = event;
                e.every(broadcast, {
                    args : args,
                    ctx : this
                });
                this[_broadcasting] = F;
            },
            buffer : function(ms, evt, fn, ctx, o) {
                n8iv.isObj(o) || (o = n8iv.obj());
                o.buffer = Number.toInteger(ms);
                this.on(evt, fn, ctx, o);
            },
            delay : function(ms, evt, fn, ctx, o) {
                n8iv.isObj(o) || (o = n8iv.obj());
                o.delay = Number.toInteger(ms);
                this.on(evt, fn, ctx, o);
            },
            destroy : function() {
                if (this[_destroyed]) return T;
                if (this.broadcast("before:destroy") === F) return F;
                this[_destroyed] = T;
                this._destroy();
                this.broadcast("destroy");
                this[_suspended] = T;
                delete this[_observers];
                return T;
            },
            ignore : ignore,
            observe : observe,
            on : observe,
            once : function(evt, fn, ctx, o) {
                n8iv.isObj(o) || (o = n8iv.obj());
                o.single = T;
                this.on(evt, fn, ctx, o);
            },
            purgeObservers : function(event) {
                var e = this[_observers];
                if (!event) {
                    e.clear();
                    return;
                }
                event = event.lc();
                !e.has(event) || e.set(event, []);
            },
            relayEvents : function(o) {
                var e = Array.from(arguments, 1), evt;
                while (evt = e.shift()) this.on(evt, createRelayCallback(this, o, evt), o);
            },
            resumeEvents : function() {
                !this[_suspended] || (this[_suspended] = F, this.broadcast("observer:resumed"));
            },
            suspendEvents : function() {
                this[_suspended] || (this[_suspended] = T, this.broadcast("observer:suspended"));
            },
            un : ignore,
            _destroy : n8iv.noop
        };
    }());
    n8iv.ENV != "commonjs" || (module.exports = n8iv);
}(this, typeof n8iv == "undefined" ? this.document ? this.n8iv : require("./n8iv._") : n8iv);
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
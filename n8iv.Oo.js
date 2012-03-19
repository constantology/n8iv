!function(root, n8iv) {
    var F = !1, N = null, T = !0, U, cw = "cw", r = "r", ARR = "array", CTOR = "constructor", FN = "function", LEN = "length", OBJ = "object", NOBJ = N + OBJ, PROTO = "prototype", TYPE = "__type__";
    !function() {
        function Class(path, desc) {
            if (!desc && n8iv.isObj(path)) {
                desc = path;
                path = "";
            }
            var C, name, ns, _ctor, _proto = n8iv.obj(), _super = desc.extend || Object, mod = desc.module, mixin = desc.mixin || dumb, singleton = desc.singleton, type = getType(desc.type || path);
            !n8iv.isStr(_super) || (_super = reg_path[_super] || reg_type[_super]);
            _ctor = desc[CTOR] !== Object ? desc[CTOR] : _super;
            if (path) {
                ns = path.split(".");
                name = ns.pop();
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
        var ERR_MSG = " already exists. Cannot override existing ", PARENT = "parent", SUPER = "__super", defaults = (CTOR + " extend mixin module singleton type").split(" "), desc_noop = n8iv.describe(n8iv.noop, cw), dumb = n8iv.obj(), re_dot = /\./g, re_root = /^\u005E/, reg_path = n8iv.obj(), reg_type = n8iv.obj(), reserved = n8iv.obj();
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
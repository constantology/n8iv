m8.x.cache( 'Function', function( Type ) {
	var re_args  = /^[\s\(]*function[^\(]*\(([^\)]*)\)/,
		re_split = /\s*,\s*/;

	m8.def( Type, 'coerce', m8.describe( function coerce( o ) { return m8.nativeType( o ) == 'function' ? o : function() { return o; }; }, 'w' ) );

	m8.defs( Type.prototype, {
// properties
		params : { get : function() {
			var names = String( this ).match( re_args )[1].trim().split( re_split );
			return names.length == 1 && !names[0] ? [] : names;
		} },
// methods
		attempt   : function( ctx ) {
			var args = Array.coerce( arguments, 1 ), fn = this;
			return function attempting() {
				try { return fn.apply( ctx || this, args ); }
				catch ( e ) { return e; }
			}();
		},
		bake      : function() {
			var baked = 'baked', fn = this;
			return fn[baked] || !m8.def( fn, baked, m8.describe( function() { return fn.apply( this, [this].concat( Array.coerce( arguments ) ) ); }.mimic( fn ), 'w' ) ) || fn[baked];
		},
		defer     : m8.ENV == 'commonjs'
				  ? function( ctx ) { return process.nextTick( this.bind.apply( this, [ctx].concat( Array.coerce( arguments, 1 ) ) ) ); }
				  : function() { return this.delay.apply( this, [1].concat( Array.coerce( arguments ) ) ); },
		delay     : function( ms, ctx ) {
			var args = Array.coerce( arguments, 2 ), fn = this;
			function delayed() {
				delayed.stop();
				return fn.apply( ctx || this, args );
			}
			return m8.copy( delayed, {
				stop : function() {
					clearTimeout( this.timeoutId ); delete this.timeoutId;
					return fn;
				},
				timeoutId : setTimeout( delayed, ms )
			} );
		},
		memoize   : function( cache ) {
			var fn = this; m8.nativeType( cache ) == 'object' || ( cache = m8.obj() );
			function memo() {
				var args = Array.coerce( arguments ), s = args.toString();
				return s in cache ? cache[s] : ( cache[s] = fn.apply( this, args ) );
			}
			memo.unmemoize = function() { return fn; };
			return memo;
		},
		stop      : function() { return this; },
		unmemoize : function() { return this; },
		wrap      : function( wrapper ) {
			var args = Array.coerce( arguments, 1 ), fn = this;
			return function() {
				return wrapper.apply( this, [fn.bind( this )].concat( args ).concat( Array.coerce( arguments ) ) );
			}.mimic( wrapper );
		}
	}, 'w' );
} );

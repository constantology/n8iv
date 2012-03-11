n8iv.defs( Function[PROTO], function() {
	var re_args  = /^[\s\(]*function[^\(]*\(([^\)]*)\)/,
		re_split = /\s*,\s*/;

	n8iv.def( Function, 'from', n8iv.describe( function from( o ) { return n8iv.isFn( o ) ? o : function() { return o; }; }, r ) );

	return {
// properties
		params : { get : function() {
			var names = String( this ).match( re_args )[1].trim().split( re_split );
			return names[LEN] == 1 && !names[0] ? [] : names;
		} },
// methods
		attempt   : function( ctx ) {
			var args = Array.from( arguments, 1 ), fn = this;
			return function attempting() {
				try { return fn.apply( ctx || this, args ); }
				catch ( e ) { return e; }
			}();
		},
		bake      : function() {
			var baked = 'baked', fn = this;
			return fn[baked] || !n8iv.def( fn, baked, n8iv.describe( function() { return fn.apply( this, [this].concat( Array.from( arguments ) ) ); }.mimic( fn ), r ) ) || fn[baked];
		},
		defer     : n8iv.ENV == 'commonjs'
				  ? function( ctx ) { return process.nextTick( this.bind.apply( this, [ctx].concat( Array.from( arguments, 1 ) ) ) ); }
				  : function() { return this.delay.apply( this, [1].concat( Array.from( arguments ) ) ); },
		delay     : function( ms, ctx ) {
			var args = Array.from( arguments, 2 ), fn = this;
			function delayed() {
				delayed.stop();
				return fn.apply( ctx || this, args );
			}
			return n8iv.copy( delayed, {
				stop : function() { 
					clearTimeout( this.timeoutId ); delete this.timeoutId;
					return fn;
				}, 
				timeoutId : setTimeout( delayed, ms )
			} );
		},
		memoize   : function( cache ) {
			var fn = this; n8iv.isObj( cache ) || ( cache = n8iv.obj() );
			function memo() {
				var args = Array.from( arguments ), s = args.toString();
				return s in cache ? cache[s] : ( cache[s] = fn.apply( this, args ) );
			}
			memo.unmemoize = function() { return fn; };
			return memo;
		},
		stop      : function() { return this; }, 
		unmemoize : function() { return this; }, 
		wrap      : function( wrapper ) {
			var args = Array.from( arguments, 1 ), fn = this;
			return function() {
				return wrapper.apply( this, [fn.bind( this )].concat( args ).concat( Array.from( arguments ) ) );
			}.mimic( wrapper );
		}
	};
}(), r );

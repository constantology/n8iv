;!function( util, Name, PACKAGE ) {
	"use strict";

/*~  n8iv/src/Object.js  ~*/
util.x.cache( 'Object', function( Type ) {
	function  arraysEqual( a1, a2 ) {
		return a1.length == a2.length && Array.coerce( a1 ).every( function( v, i ) { return Type.equalTo( a2[i], v ); } );
	}
	function objectsEqual( o1, o2 ) {
		if ( util.len( o1 ) !== util.len( o2 ) || Type.ownLen( o1 ) !== Type.ownLen( o2 ) ) return false;
		for ( var k in o2 ) if ( util.has( o1, k ) !== util.has( o2, k ) || !Type.equalTo( o1[k], o2[k] ) ) return false;
		return true;
	}

	util.defs( Type, {
		aggregate : function( o, val, fn, ctx ) {
			ctx || ( ctx = o );
			return Type.keys( o ).reduce( function( res, k, i ) { return fn.call( ctx, res, o[k], k, o, i ); }, val );
		},
		clear     : function( o ) {
			Type.keys( o ).forEach( function( k ) { delete o[k]; }, o );
			return o;
		},
		equalTo   : function( o, k ) {
			switch ( util.ntype( o ) ) {
				case 'array'  : return Array.isArray( k )          ?  arraysEqual( o, k ) : false;
				case 'object' : return util.ntype( k ) == 'object' ? objectsEqual( o, k ) : false;
				case 'date'   : return +o == +k;
			}
			return o == k;
		},
		ownKeys   : function( o ) { return Type.getOwnPropertyNames( o ); },
		ownLen    : function( o ) { return Type.ownKeys( o ).length; }
	}, 'w' );
} );

/*~  n8iv/src/Function.js  ~*/
util.x.cache( 'Function', function( Type ) {
	var re_args  = /^[\s\(]*function[^\(]*\(([^\)]*)\)/,
		re_split = /\s*,\s*/;

	util.def( Type, 'coerce', util.describe( function coerce( o ) { return util.ntype( o ) == 'function' ? o : function() { return o; }; }, 'w' ) );

	util.defs( Type.prototype, {
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
			return fn[baked] || !util.def( fn, baked, util.describe( function() { return fn.apply( this, [this].concat( Array.coerce( arguments ) ) ); }.mimic( fn ), 'w' ) ) || fn[baked];
		},
		defer     : util.ENV == 'commonjs'
				  ? function( ctx ) { return process.nextTick( this.bind.apply( this, [ctx].concat( Array.coerce( arguments, 1 ) ) ) ); }
				  : function() { return this.delay.apply( this, [1].concat( Array.coerce( arguments ) ) ); },
		delay     : function( ms, ctx ) {
			var args = Array.coerce( arguments, 2 ), fn = this;
			function delayed() {
				delayed.stop();
				return fn.apply( ctx || this, args );
			}
			return util.copy( delayed, {
				stop : function() {
					clearTimeout( this.timeoutId ); delete this.timeoutId;
					return fn;
				},
				timeoutId : setTimeout( delayed, ms )
			} );
		},
		memoize   : function( ctx, cache ) {
			var fn = this; util.ntype( cache ) == 'object' || ( cache = util.obj() );
			function memo() {
				var args = Array.coerce( arguments ), s = args.toString();
				return s in cache ? cache[s] : ( cache[s] = fn.apply( ctx, args ) );
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

/*~  n8iv/src/Array.js  ~*/
util.x.cache( 'Array', function( Type ) {
	function groupByFn( field, v ) { return field( v ) ? '0' : '1'; }
	function groupByRegExp( field, v ) { return field.test( v ) ? '0' : '1'; }
	function groupByStr( field, v ) { return Object.value( v, field ) || '1'; }
	function isFalsey( o ) { return !o ? null : o; }
	function sortedVal( o )  { return o[0]; }
	function sortingVal( o ) { return [o, ( typeof this == 'function' ? this( o ) : Object.value( o, this ) )]; }
	
	var PROTO = Type.prototype,
		sort  = {
			desc : function( a, b ) { return a[1] == b[1] ? 0 : a[1] < b[1] ? 1 : -1; },
			asc  : function( a, b ) { return a[1] == b[1] ? 0 : a[1] > b[1] ? 1 : -1; }
		};

	sort[String( true )] = sort[1] = sort.asc;
	sort[String( !1 )]   = sort[0] = sort.desc;

	util.def( Type, 'sortFns', util.describe( { value : sort }, 'w' ) );

	util.defs( Type.prototype, {
		aggregate : function( val, fn, ctx ) {
			return PROTO.reduce.call( this, function( val, o, i, a ) {
				return fn.call( ctx || o, val, o, i, a );
			}, val );
		},
		associate : function( a, fn, ctx ) {
			fn || ( fn = util ); ctx || ( ctx = this );
			return PROTO.reduce.call( this, function( o, v, i ) {
				o[a[i]] = fn.call( ctx, v, i, this );
				return o;
			}, util.obj() );
		},
		clear     : function() { this.length = 0; return this; },
		clone     : function() { return PROTO.slice.call( this ); },
		compact   : function( falsey ) { return PROTO.mapc.call( this, falsey === true ? isFalsey : util ); },
		contains  : function( o ) { return !!~PROTO.indexOf.call( this, o ); },
		each      : function( fn, ctx ) { PROTO.forEach.call( this, fn, ctx || this ); return this; },
		flatten   : function( n ) {
			if ( util.type( n ) == 'number' ) {
				if ( n > 0 ) --n;
				else return this;
			}
			return PROTO.aggregate.call( this, [], function( v, o, i ) {
				Type.isArray( o ) ? v.splice.apply( v, [v.length, 0].concat( o.flatten( n ) ) ) : v.push( o );
				return v;
			}, this );
		},
		grep : function( re, fn, ctx ) {
			var a = this; fn || ( fn = util ); ctx || ( ctx = a );
			util.ntype( re ) != 'string' || ( re = new RegExp( re.escapeRE(), 'g' ) );
			return PROTO.aggregate.call( a, [], function( v, o, i ) {
				!re.test( o ) || v.push( fn.call( ctx, o, i, a ) );
				return v;
			} );
		},
		groupBy   : function( f, fn, ctx ) {
			fn || ( fn = util );
			var a = this, keys, match, res = {};
			
			switch( util.type( f ) ) {
				case 'function' : match = groupByFn;       break;
				case 'regexp'   : match = groupByRegExp;   break;
				case 'number'   :
				case 'string'   : match = groupByStr;
								  keys = PROTO.pluck.call( a, f, true ); break;
				default         : throw new TypeError( 'Array.prototype.groupBy can only match based on a Function, RegExp or String.' );
			}
			
			if ( keys ) keys.forEach( function( k ) { res[k] = []; } );
			else {
				res['0'] = [];
				res['1'] = [];
			}
			
			return PROTO.aggregate.call( a, res, function( v, o, i ) {
				v[match( f, o )].push( fn.call( this, o, i, a ) );
				return v;
			}, ctx || a );
		},
		include   : function( o ) { return PROTO.contains.call( this, o ) ? !1 : !this.push( o ) || true; },
		invokec   : function( fn ) {
			var args = Type.coerce( arguments, 1 );
			return PROTO.mapc.call( this, function( o, i ) {
				return util.ntype( o[fn] ) == 'function' ? o[fn].apply( o, args ) : null;
			} );
		}, 
		item      : function( i ) { return this[i < 0 ? this.length + i : i]; },
		last      : function() { return this[this.length - 1]; },
		mapc      : function( fn, ctx ) {
			ctx || ( ctx = this );
			return PROTO.reduce.call( this, function( v, o, i, a ) {
				!util.exists( ( o = fn.call( ctx, o, i, a ) ) ) || v.push( o );
				return v;
			}, [] );
		}, 
		remove    : function() {
			var args = Type.coerce( arguments ), i, res = [], v;
			while ( v = args.shift() )
				!~( i = PROTO.indexOf.call( this, v ) ) || res.push( PROTO.splice.call( this, i, 1 )[0] );
			return res;
		},
		sortBy    : function( f, d ) { // schwartzian optimised
			return PROTO.map.call( this, sortingVal, f )
						.sort( util.ntype( d ) == 'function' ? d : sort[String( d ).toLowerCase()] || sort.asc )
						.map( sortedVal );
		},
		tuck      : function( k, a ) {
			var is_arr = Type.isArray( a );
			return PROTO.each.call( this, function( o, i ) { o[k] = is_arr ? a[i] : a; } );
		},
		uniq      : function() {
			return PROTO.reduce.call( this, function( v, o ) {
				v.contains( o ) || v.push( o );
				return v;
			}, [] );
		},
		without   : function() {
			var a = PROTO.clone.call( this ); a.remove.apply( a, arguments );
			return a;
		},
		zip       : function() {
			var args = Type.coerce( arguments ); args.unshift( this );
			return PROTO.map.call( this, function( o, i ) { return args.pluck( i ); } );
		}
	}, 'w' );
} );

/*~  n8iv/src/Number.js  ~*/
util.x.cache( 'Number', function( Type ) {
	var abs = Math.abs, big_int = 9007199254740992, floor = Math.floor;

	util.defs( Type, {
// complies with: http://wiki.ecmascript.org/doku.php?id=harmony:number.isinteger
		isInteger : function( v ) { return util.type( v ) =='number' && isFinite( v ) && v > -big_int && v < big_int && floor( v ) === v; },
// complies with: http://wiki.ecmascript.org/doku.php?id=harmony:number.tointeger
		toInteger : function( v ) {
			v = +v;
			if ( isNaN( v ) ) return +0;
			if ( v === 0 || !isFinite( v ) ) return v;
			return ( v < 0 ? -1 : 1 ) * abs( floor( v ) );
		}
	}, 'w' );

	util.defs( Type.prototype, {
		pad   : function( l, radix ) {
			var s = this.toString( radix || 10 );
			return '0'.times( l - s.length ) + s;
		},
		times : function( fn, ctx ) {
			util.range( 0, this ).forEach( fn, ctx || util.global );
			return this;
		},
		toHex : function() { return this.pad( 2, 16 ); }
	}, 'w' );
} );

/*~  n8iv/src/String.js  ~*/
util.x.cache( 'String', function( Type ) {
	var cache_chars     = util.obj(),    cache_slices  = util.obj(),
		esc_chars       = /([-\*\+\?\.\|\^\$\/\\\(\)[\]\{\}])/g,
		esc_val         = '\\$1',        re_caps       = /([A-Z])/g,
		re_hex          = /#?(\w{1,6})/, re_rgb        = /(\d{1,3})/g,
		re_split_string = /[\sA-Z_-]+/g, re_trim_right = /(.*?)\s*$/;

// so we don't lose any chars on split
	function _splitString( m, p ) { return p + p.toLowerCase(); }
	function  splitString( s ) {
		s = s.trim();
		var s0 = s.charAt( 0 ), s1 = s.charAt( 1 ),
			 i = s0.toLowerCase() == s0 && s1 != ' ' && s1.toUpperCase() == s1 ? 2 : 1,
			 o = s.substring( i ).replace( re_caps, _splitString ).split( re_split_string );
		o[0] = s.substring( 0, i ) + o[0];
		return o;
	}

/**
 * Some methods here are proposed in ES6: http://wiki.ecmascript.org/doku.php?id=harmony:string_extras
 * However, since we are extending prototypes the correct way, we don't need worry.
 * When the new methods are implemented, they will not be overwritten, instead, the methods here will be discarded.
 * */
	util.defs( Type.prototype, {
		blank        : function() { return !!this.trim().empty(); },
		capitalize   : function() { return this.charAt( 0 ).toUpperCase() + this.substring( 1 ).toLowerCase(); },
		clean        : function( character ) {
			character || ( character = ' ' );
			character = cache_chars[character] || ( cache_chars[character] = { re : new RegExp( '(' + character + '){1,}', 'g' ), fill : character } );
			return this.split( character.re ).filter( function( s ) { return !s.blank() && s != character.fill; } ).join( character.fill );
		},
		contains     : function( s ) { return !!~this.indexOf( s ); },
		empty        : function() { return Type( this ) === ''; },
		endsWith     : function( s ) { return this.length && this.lastIndexOf( s ) == this.length - s.length; },
		format       : util.format.bake(),
		gsub         : util.gsub.bake(),
		hyphenate    : function() { return splitString( this ).join( '-' ).toLowerCase(); },
		includes     : function( s ) { return this.toLowerCase().contains( Type( s ).toLowerCase() ); },
		parts        : function( re ) {
			var m = Array.coerce( this.match( re ) );
			switch ( m.length ) {
				case 1  : if ( m[0] === null || m[0] === this ) return [];
				default : m[0] !== this || m.shift(); return m;
			}
		},
		regexpEsc    : function() { return this.replace( esc_chars, esc_val ); },
		sliceEvery   : function( n ) {
			n = parseInt( n, 10 );
			if ( isNaN( n ) || this.length < n || n == 0 ) return [Type( this )];
			return this.match( cache_slices[n] || ( cache_slices[n] = new RegExp( '(.{1,' + n + '})', 'g' ) ) );
		},
		startsWith   : function( s ) { return !this.indexOf( s ); },
		times        : function( n ) { return new Array( Number.toInteger( n ) + 1 ).join( this ); },
		toCamelCase  : function() {
			var parts = splitString( this ), str = [parts.shift()];
			return parts.reduce( function( res, val ) {
				res.push( val.capitalize() );
				return res;
			}, str ).join( '' );
		},
		toHex        : ( function() {
			function toHex( o ) { return parseInt( o, 10 ).pad( 2, 16 ); }
			return function() {
				var m = this.match( re_rgb );
				return '#' + ( ( m.length == 1 ) ? toHex( m[0] ).times( 3 ) : m.map( toHex ).join( '' ) );
			}
		}() ),
		toJSON       : JSON.parse.bake(),
		toRGB        : function( as_array ) {
			var o = this.match( re_hex )[1], l = o.length, v;
			switch( l ) {
				case 6  : break;
				case 3  : o = this.times( 2 ); break;
				case 2  : o = this.times( 3 ); break;
				default : o = l > 6 ? o.substring( 0, 6 ) : l == 4 ? o + '00' : o + '0';
			}
			v = o.sliceEvery( 2 ).map( function( v ) { return parseInt( v, 16 ); } );
			return as_array === true ? v : 'rgb(' + v.join( ', ' ) + ')';
		},
		trimRight    : function() {
			return this.replace( re_trim_right, '$1' );
		},
		truncate     : function( i, c ) {
			i || ( i = 50 ); util.ntype( c ) == 'string' || ( c = '...' );
			return this.length < i ? Type( this ) : this.substring( 0, i ).trimRight() + c;
		},
		underscore   : function() { return splitString( this ).join( '_' ).toLowerCase(); }
	}, 'w' );
} );

/*~  n8iv/src/expose.js  ~*/
	function __lib__() {
		util.x.apply( util, arguments );
		return __lib__;
	}

	function x( Type, extender ) {
		util.x.cache( Type.__name__, extender ).x( Type );
		return __lib__;
	}

	util.iter( PACKAGE ) || ( PACKAGE = util.ENV == 'commonjs' ? module : util.global );

// expose n8iv
	util.defs( ( __lib__ = util.expose( __lib__, Name, PACKAGE ) ), {
		util : util,
		x    : x
	}, 'r' );
	util.expose( util, __lib__ );  // store a reference to m8 on n8iv

	util.x( Object, Array, Function, Number, String );

// at this point we don't know if util is available or not, and as such do not know what environment we are in.
// so, we check and do what is required.
}( typeof m8 != 'undefined' ? m8 : typeof require != 'undefined' ? require( 'm8' ) : null, 'n8iv' );

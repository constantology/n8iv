( function( root ) {
	"use strict";
	( typeof root != 'undefined' ) || ( root = _root );
// utils
	function $A( a, i, j ) { return got( a, 'length' ) ? slice.call( a, ( isNum( i ) ? i > 0 ? i : 0 : 0 ), ( isNum( j ) ? j > i ? j : i + 1 : a.length ) ) : [a]; }

	function bless( ns, ctx ) {
		switch( n8iv_type( ns ) ) {
			case 'array'  :                         break;
			case 'string' : ns = ns.split( '.' );   break;
			default       : return blessCTX( ctx );
		}

		if ( re_n8iv.test( ns[0] ) ) { ctx = n8iv; ns.shift(); }

		if ( !ns.length ) return blessCTX( ctx );

		!ns[0].startsWith( '^' ) || ( ctx ? ns.shift() : ns[0] = ns[0].substring( 1 ) );
		ctx = blessCTX( ctx );

		ns.forEach( function( o ) {
			if ( !o ) return;
			got( ctx, o ) || ( ctx[o] = n8iv_obj() ); // def( ctx, o, describe( { value : n8iv_obj() }, 'cw' ) );
			ctx = ctx[o];
		} );

		return ctx;
	}
	function blessCTX( ctx ) {
		if ( ENV == CJS ) return ctx ? ctx instanceof Module ? ctx.exports : ctx : module.exports;
		else return ctx || root;
	}

	function bool( o ) { switch( n8iv_type( o ) ) {
		case F         : return F;
		case 'boolean' : return o;
		case 'number'  : return o !== 0 && !isNaN( o );
		case 'string'  : return !booleans.some( function( v ) { return v === o; } );
		default        : return ( o === U || o === N ) ? F : T;
	} }

	function coerce( o, n, s ) { return !isNaN( ( n = Number( o ) ) ) ? n : ( s = String( o ) ) in coercions ? coercions[s] : o; }

	function copy( d, s, n ) {
		n = n === T;
		for ( var k in s ) !has( s, k ) || n && has( d, k ) || ( d[k] = s[k] );
		return d;
 	}

	function def( item, name, desc, overwrite, debug ) {
		var exists = got( item, name );
		!( desc.get || desc.set ) || delete desc.writable; // <- ARGH!!! see: https://plus.google.com/117400647045355298632/posts/YTX1wMry8M2
		if ( overwrite === T || !exists ) Object.defineProperty( item, name, desc );
		else if ( debug === T && exists )
			trace().error( new Error( 'Trying to overwrite existing property: ' + name + ', in: ' + ( isFn( item ) ? item.n8ivName : item.constructor.n8ivName ) + '.' ), T );
		return n8iv;
	}

	function defs( item, o, m, overwrite, debug ) {
		m || ( m = 'cw' );
		for ( var k in o ) !has( o, k ) || def( item, k, describe( o[k], m ), overwrite, debug );
		return n8iv;
	}

	function describe( v, m ) { return copy( ( isObj( v, T ) ? v : { value : v } ), ( isObj( m ) ? m : modes[lc( m )] || modes.cew ) ); }

	function description( o, k ) { return Object.getOwnPropertyDescriptor( o, k ); }

	function error( e, chuck ) {
		var msg;
		switch( n8iv_type( e ) ) {
			case 'error'  : msg = e.message;                       break;
			case 'string' : msg = String( e ); e = new Error( e ); break;
		}
		!( 'error' in console ) || console.error( msg );
		if ( chuck === T ) throw e;
		return n8iv;
	}

	function exists( o ) { return o !== N && o !== U && ( typeof o == 'number' ? !isNaN( o ) : T ); }

	function got( o, k ) { return k in Object( o ); }

	function has( o, k ) { return OP.hasOwnProperty.call( o, k ); }

	function lc( s ) { return String( s ).toLowerCase(); }

	function n8iv_id( o, prefix ) { return o ? got( o, 'id' ) ? o.id : ( o.id = _id( prefix ) ) : _id( prefix ); }
	function     _id(    prefix ) { return ( prefix || id_prefix ) + ( ++id_count ); }

	function n8iv_obj( o, n ) { return ( n = Object.create( N ) ) && arguments.length >= 1 ? copy( n, o ) : n; }

	function n8iv_proto( o ) { return Object.getPrototypeOf( o ); }

	function noop() {}

	function range( i, j ) {
		var a = [i];
		while ( ++i <= j ) a.push( i );
		return a;
	}

	function requite( o ) { return o; }

	function tostr( o ) { return OP.toString.call( o ); }

	function trace() { !( 'trace' in console ) || console.trace(); return n8iv; }

	function valof( o ) { return OP.valueOf.call( o ); }

// type methods
	function __type__() {
		var ctor = this.constructor, nt = nativeType( this ),
			t    = ENV != CJS ? domType( nt ) : re_global.test( nt ) ? 'global' : F;
		return t || ( nt == 'object' && ctor.__type__ != 'function' ? ctor.__type__ || lc( ctor.n8ivName ) || nt : nt );
	}
	function domType( t ) { return re_col.test( t ) ? 'htmlcollection' : re_el.test( t ) ? 'htmlelement' : re_global.test( t ) ? 'global' : F; }
	function n8iv_type( o ) { return o === N || o === U ? F : o.__type__ || ( n8iv_proto( o ) === N ? 'nullobject' : U ); }
	function nativeType( o, t ) {
		if ( ( t = tostr( o ) ) in types ) return types[t]; // check the cached types first
		return ( types[t] = lc( t ).match( re_type )[1].replace( re_vendor, '$1' ) );
	}

	function isBool( o )   { return n8iv_type( o ) == 'boolean'; }
	function isEmpty( o )  { switch ( n8iv_type( o ) ) {
		case 'array'  : return !o.length;
		case 'number' : return isNaN( o );
		case 'object' : return !Object.len( o );
		case 'string' : return o === '';
		default       : return !exists( o );
	} }
	function isFn( fn )    { return typeof fn == 'function'; }
	function isNum( o )    { return n8iv_type( o ) == 'number' && !isNaN( o ); }
	function isObj( o, exclusive ) {
		var t = n8iv_type( o );
		return ( t == 'object' && nativeType( o ) == 'object' ) || ( exclusive !== T && t == 'nullobject' );
	}
	function isStr( o )    { return n8iv_type( o ) == 'string'; }
	function isUndef( o )  { return typeof o == 'undefined'; }

	var CJS = 'commonjs',
		ENV = typeof module != 'undefined' && 'exports' in module ? CJS : typeof navigator != 'undefined' ? 'browser' : 'other',
		F   = !1, N = null, OP = Object.prototype, T = !0, U,
		Module    = ENV != CJS ? N : require( 'module' ),
		booleans  = [0, F, '', NaN, N, U].map( String ),
		coercions = [F, NaN, N, T, U].reduce( function( o, v ) { o[String( v )] = v; return o; }, n8iv_obj() ),
		id_count  = 999, id_prefix = 'anon__',
	// this is a Map of all the different combination of modes for assigning access descriptors using Object.defineProperty
		modes     = function() {
			var f = 'configurable enumerable writable'.split( ' ' ),
				m = { ce : 'ec', cw : 'wc', ew : 'we', cew : 'cwe ecw ewc wce wec'.split( ' ' ) },
				p = { c : [T, F, F], ce : [T, T, F], cew : [T, T, T], cw : [T, F, T], e : [F, T, F], ew : [F, T, T], r : [F, F, F], w : [F, F, T] },
				v = Object.keys( p ).reduce( function( o, k ) {
					o[k] = f.reduce( function( v, f, i ) { v[f] = p[k][i]; return v; }, n8iv_obj() );
					!( k in m ) || typeof m[k] == 'string' ? ( o[m[k]] = o[k] ) : m[k].forEach( function( f ) { o[f] = o[k]; } );
					return o;
				}, n8iv_obj() );
			delete v.undefined;
			return v;
		}(),
		n8iv      = n8iv_obj(),
		re_col    = /htmlcollection|nodelist/,     re_el     = /^html\w+?element$/,
		re_global = /global|window/i,              re_n8iv   = /^\u005E?n8iv/,
		re_type   = /\[[^\s]+\s([^\]]+)\]/,        re_vendor = /^[Ww]ebkit|[Mm]oz|O|[Mm]s|[Kk]html(.*)$/,
		slice     = Array.prototype.slice,         types     = { '[object Object]' : 'object' };

/**
* The methods defined here are required for n8iv to work when any of, n8iv._, n8iv.Fn AND n8iv.Oo, are present.
* It's a bit of a hack and makes the architecture slightly uglier, but it saves on duplicate code.
**/
	def( OP, '__type__', copy( { get : __type__ }, modes.r ) );
	defs( Object, {
		clone  : function ( o ) { return copy( n8iv_obj(), o ); },
		each   : function ( o, fn, ctx ) {
			ctx || ( ctx = o );
			Object.keys( o ).forEach( function( k, i ) { fn.call( ctx, o[k], k, o, i ); }, o );
			return o;
		},
		key    : function ( o, v ) {
			for ( var k in o ) if ( o[k] === v ) return k;
			return N;
		},
		len    : function ( o ) { return Object.keys( o ).length; },
		remove : function ( o, keys ) {
			( Array.isArray( keys ) ? keys : $A( arguments, 1 ) ).forEach( function( k ) { delete o[k]; } );
			return o;
		},
		value  : function( o, k )  {
			if ( isNaN( k ) && !!~k.indexOf( '.' ) ) {
				var v; k = k.split( '.' );
				while ( v = k.shift() ) {
					o = Object.value( o, v );
					if ( o === U ) return o;
				}
				return o;
			}
			return isEmpty( o ) ? U : !isEmpty( o[k] ) ? o[k] : isFn( o.get ) ? o.get( k ) : isFn( o.getAttribute ) ? o.getAttribute( k ) : U;
		},
		values : function( o ) { return Object.keys( o ).map( function( k ) { return o[k]; } ); }
	}, 'w' );

	def( Array, 'from', describe( $A, 'w' ) );
	def( Array.prototype, 'find', describe( function( fn, ctx ) {
		var i = -1, l = this.length >>> 0; ctx || ( ctx = this );
		while ( ++i < l ) if ( !!fn.call( ctx, this[i], i, this ) ) return this[i];
		return N;
	}, 'w' ) );

	defs( Function.prototype, {
// properties
		n8ivName  : { get : function() {
			var anon    = 'anonymous',
				non     = ['', ''], namu = '__n8ivName__',
				re_name = /[\s\(]*function([^\(]+).*/;
			return function n8ivName() {
				if ( !this[namu] ) {
					var fn = this.valueOf(),
						m  = fn !== this ? fn.n8ivName !== anon ? fn.n8ivName : N : N, // this handles anonymous functions which are mimicking named functions
						n  = this.name || this.displayName || ( String( this ).match( re_name ) || non )[1].trim();

					def( this, namu, describe( ( m || n || anon ), 'w' ) );
				}
				return this[namu];
			};
		}() },
// methods
// conforms to: http://es5.github.com/#x15.3.4.5 –> for javascript engines which STILL have no support! :( http://kangax.github.com/es5-compat-table/ ):
		bind      : function( ctx ) { // webkit nightly version: 5.1.3 (7534.53.10, r110235) looks like it has support now
			var args  = $A( arguments, 1 ),
				bound = function() { return fn.apply( ( this instanceof bound ? this : ctx || root ), args.concat( $A( arguments ) ) ); },
				fn    = this;

			bound.prototype = Object.create( fn.prototype );

			return bound.mimic( fn );
		},
		mimic  : function( fn, name ) {
			return Object.defineProperties( this, {
				displayName : describe( ( name || fn.n8ivName ), 'c' ),
				toString    : describe( function() { return fn.valueOf().toString(); }, 'c' ),
				valueOf     : describe( function() { return fn; }, 'c' )
			} );
		}
	}, 'w' );

	defs( String.prototype, {
		contains   : function( s ) { return !!~this.indexOf( s ); },
		endsWith   : function( s ) { return this.length && this.lastIndexOf( s ) == ( this.length - s.length ); },
		startsWith : function( s ) { return !this.indexOf( s ); }
	}, 'w' );

// if ENV === commonjs we want root to be global and we want to do it down here so we don't break anything up there
	typeof global == 'undefined' || ( root = global );
// expose n8iv: JavaScript Natives are exposed by default, as such we do not need to worry about adding them to module.exports
	ENV != CJS ? def( root, 'n8iv', describe( { value : n8iv }, 'w' ) ) : ( module.exports = n8iv );

	defs( n8iv, {
	// properties
		ENV        : ENV,        modes    : modes,    global      : { value : root },
	// methods
		bless      : bless,      bool     : bool,     coerce      : coerce,      copy   : copy,       def     : def,
		defs       : defs,       describe : describe, description : description, error  : error,      exists  : exists,
		got        : got,        has      : has,      id          : n8iv_id,     isBool : isBool,     isEmpty : isEmpty,
		isFn       : isFn,       isNum    : isNum,    isObj       : isObj,       isStr  : isStr,      isUndef : isUndef,
		nativeType : nativeType, noop     : noop,     obj         : n8iv_obj,    proto  : n8iv_proto, range   : range,
		requite    : requite,    tostr    : tostr,    trace       : trace,       type   : n8iv_type,  valof   : valof
	}, 'w' );

	return n8iv;

}( this ) );

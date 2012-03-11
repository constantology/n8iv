n8iv.Class( 'n8iv.Hash', function() {
	var ID = '__hashid__', cache = [];

	return {
		constructor : function Hash( o ) {
			n8iv.def( this, ID, n8iv.describe( cache.push( n8iv.obj() ) - 1, r ) );
			!n8iv.isObj( o ) || this.set( o );
		},

		keys        : { get : function() { return Object.keys( cache[this[ID]] ); } },
		length      : { get : function() { return this.keys[LEN]; } },
		values      : { get : function() { return Object.values( cache[this[ID]] ); } },

		aggregate   : function( val, fn, ctx ) {
			var hash = this, o = cache[this[ID]]; ctx || ( ctx = hash );
			return Object.keys( o ).reduce( function( res, k, i ) { return fn.call( ctx, res, o[k], k, hash, i ); }, val );
		},
		clear       : function() { cache[this[ID]] = n8iv.obj(); },
		clone       : function() { return new n8iv.Hash( Object.clone( cache[this[ID]] ) ); },
		each        : function( fn, ctx ) {
			var hash = this, o = cache[this[ID]]; ctx || ( ctx = hash );
			Object.keys( o ).forEach( function( k, i ) { fn.call( ctx, o[k], k, hash, i ); }, hash );
			return hash;
		},
		get         : function( k ) { return n8iv.has( cache[this[ID]], k ) ? cache[this[ID]][k] : N; },
		has         : function( k ) { return n8iv.has( cache[this[ID]], k ); },
		key         : function( v ) { return Object.key( cache[this[ID]], v ); },
		reduce      : function( fn, val ) {
			var hash = this, o = cache[this[ID]];
			return Object.keys( o ).reduce( function( res, k, i ) { return fn.call( hash, res, o[k], k, hash, i ); }, val );
		},
		remove      : function( k ) { return n8iv.has( cache[this[ID]], k ) ? ( delete cache[this[ID]][k] ) : F; },
		set         : function( o, v ) {
			switch ( n8iv.type( o ) ) {
				case  OBJ :
				case NOBJ : Object.keys( o ).forEach( function( k ) { this.set( k, o[k] ); }, this ); break;
				default   : cache[this[ID]][o] = v;
			}
		},
		stringify   : function() { return JSON.stringify( cache[this[ID]] ); },
		toString    : function() { return n8iv.tostr( cache[this[ID]] ); },
		valueOf     : function() { return Object.clone( cache[this[ID]] ); }
	};
}() );

n8iv.defs( Number, function() {
	var abs = Math.abs, big_int = 9007199254740992, floor = Math.floor;
	return {
	// complies with: http://wiki.ecmascript.org/doku.php?id=harmony:number.isinteger
		isInteger : function( v ) { return n8iv.isNum( v ) && isFinite( v ) && v > -big_int && v < big_int && floor( v ) === v; },
	// complies with: http://wiki.ecmascript.org/doku.php?id=harmony:number.tointeger
		toInteger : function( v ) {
			v = +v;
			if ( isNaN( v ) ) return +0;
			if ( v === 0 || !isFinite( v ) ) return v;
			return ( v < 0 ? -1 : 1 ) * abs( floor( v ) );
		}
	};
}(), 'cw' );

n8iv.defs( Number[PROTO], {
	pad   : function( l, radix ) {
		var s = this.toString( radix || 10 );
		return '0'.times( l - s[LEN] ) + s;
	},
	times : function( fn, ctx ) {
		n8iv.range( 0, this ).forEach( fn, ctx || root );
		return this;
	},
	toHex : function() { return this.pad( 2, 16 ); }
}, r );

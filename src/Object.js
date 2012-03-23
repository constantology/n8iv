	function aggregate( o, val, fn, ctx ) {
		ctx || ( ctx = o );
		return Object.keys( o ).reduce( function( res, k, i ) { return fn.call( ctx, res, o[k], k, o, i ); }, val );
	}

	function clear( o ) {
		Object.keys( o ).forEach( function( k ) { delete o[k]; }, o );
		return o;
	}

	function equalTo( o, k ) {
		switch ( n8iv.type( o ) ) {
			case 'array'  : return Array.isArray( k ) ?  arraysEqual( o, k ) : F;
			case 'object' : return n8iv.isObj( k )    ? objectsEqual( o, k ) : F;
			case 'date'   : return +o == +k;
		}
		return o == k;
	}
	function  arraysEqual( a1, a2 ) { return a1.length == a2.length && Array.from( a1 ).every( function( v, i ) { return equalTo( a2[i], v ); } ); }
	function objectsEqual( o1, o2 ) {
		if ( Object.len( o1 ) !== Object.len( o2 ) || ownLen( o1 ) !== ownLen( o2 ) ) return F;
		for ( var k in o2 ) if ( n8iv.has( o1, k ) !== n8iv.has( o2, k ) || !equalTo( o1[k], o2[k] ) ) return F;
		return T;
	}

	function ownKeys( o ) { return Object.getOwnPropertyNames( o ); }

	function ownLen( o ) { return ownKeys( o ).length; }

	function reduce( o, fn, val ) { return Object.keys( o ).reduce( function( res, k, i ) { return fn.call( o, res, o[k], k, o, i ); }, val ); }

	n8iv.defs( Object, { aggregate : aggregate, clear : clear, equalTo : equalTo, ownKeys : ownKeys, ownLen : ownLen, reduce : reduce }, 'w' );

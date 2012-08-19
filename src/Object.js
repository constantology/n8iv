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
			switch ( util.nativeType( o ) ) {
				case 'array'  : return Array.isArray( k )             ?  arraysEqual( o, k ) : false;
				case 'object' : return util.nativeType( k ) == 'object' ? objectsEqual( o, k ) : false;
				case 'date'   : return +o == +k;
			}
			return o == k;
		},
		ownKeys   : function( o ) { return Type.getOwnPropertyNames( o ); },
		ownLen    : function( o ) { return Type.ownKeys( o ).length; }
	}, 'w' );
} );

logger.group( 'Array' );

;!function() {
	logger.group( 'aggregate' );
		
	if ( !Object.equalTo( [1, 2, 3, 4, 5].aggregate( 0, function ( v, n ) { return v += n; } ), 15 ) ) {
		logger.log( "FAIL: Object.equalTo( [1, 2, 3, 4, 5].aggregate( 0, function ( v, n ) { return v += n; } ), 15 ) " );
	}
	
	if ( !Object.equalTo( [1, 2, 3, 4, 5].aggregate( 0, function ( v, n ) { return v += n + this; }, 10 ), 65 ) ) {
		logger.log( "FAIL: Object.equalTo( [1, 2, 3, 4, 5].aggregate( 0, function ( v, n ) { return v += n + this; }, 10 ), 65 ) " );
	}
}();

;!function() {
	logger.group( 'associate' );
		
	var expected = { 'one' : 1, 'two' : 2, 'three' : 3 },
		keys    = ['one', 'two', 'three'],
		values   = [1, 2, 3],
		returned = values.associate( keys );

	
	if ( !m8.nativeType( returned ) == 'object' ) {
		logger.log( "FAIL: m8.nativeType( returned ) == 'object' " );
	}
	
	if ( !Object.equalTo( returned, expected ) ) {
		logger.log( "FAIL: Object.equalTo( returned, expected ) " );
	}
	
	if ( !Object.equalTo( values.associate( keys, function( v ) { return this + v.pad( 2 ); }, 'VALUE_' ), { 'one' : 'VALUE_01', 'two' : 'VALUE_02', 'three' : 'VALUE_03' } ) ) {
		logger.log( "FAIL: Object.equalTo( values.associate( keys, function( v ) { return this + v.pad( 2 ); }, 'VALUE_' ), { 'one' : 'VALUE_01', 'two' : 'VALUE_02', 'three' : 'VALUE_03' } ) " );
	}
}();

;!function() {
	logger.group( 'clear' );
		
	
	if ( !Object.equalTo( [1, 2, 3, 4, 5].clear(), [] ) ) {
		logger.log( "FAIL: Object.equalTo( [1, 2, 3, 4, 5].clear(), [] ) " );
	}
	
	if ( !Object.equalTo( [1, 2, 3, 4, 5].clear().length, 0 ) ) {
		logger.log( "FAIL: Object.equalTo( [1, 2, 3, 4, 5].clear().length, 0 ) " );
	}
}();

;!function() {
	logger.group( 'clone' );

	var a = [1, 2, 3, 4, 5].clone();

	
	if ( a === [1, 2, 3, 4, 5] ) {
		logger.log( "FAIL: a === [1, 2, 3, 4, 5] " );
	}
	
	if ( !Object.equalTo( a, [1, 2, 3, 4, 5] ) ) {
		logger.log( "FAIL: Object.equalTo( a, [1, 2, 3, 4, 5] ) " );
	}
}();

;!function() {
	logger.group( 'compact' );
		
	
	if ( !Object.equalTo( [0, 1, undefined, 2, null, 3, NaN, 4, false, 5].compact(), [0, 1, 2, 3, 4, false, 5] ) ) {
		logger.log( "FAIL: Object.equalTo( [0, 1, undefined, 2, null, 3, NaN, 4, false, 5].compact(), [0, 1, 2, 3, 4, false, 5] ) " );
	}
	
	if ( !Object.equalTo( [0, 1, undefined, 2, null, 3, NaN, 4, false, 5].compact( true ), [1, 2, 3, 4, 5] ) ) {
		logger.log( "FAIL: Object.equalTo( [0, 1, undefined, 2, null, 3, NaN, 4, false, 5].compact( true ), [1, 2, 3, 4, 5] ) " );
	}
}();

;!function() {
	logger.group( 'contains' );
		
	var a = [1, 2, 3];

	if ( a.contains( 1 ) !== true ) {
		logger.log( "FAIL: a.contains( 1 ) !== true " );
	}
	
	if ( a.contains( 2 ) !== true ) {
		logger.log( "FAIL: a.contains( 2 ) !== true " );
	}
	
	if ( a.contains( 3 ) !== true ) {
		logger.log( "FAIL: a.contains( 3 ) !== true " );
	}
	
	if ( a.contains( 4 ) !== false ) {
		logger.log( "FAIL: a.contains( 4 ) !== false " );
	}
}();

;!function() {
	logger.group( 'each' );
		
	var a = [1, 2, 3, 4, 5], ctx = { foo : 'bar' };

	if ( !Object.equalTo( a.each( function( o, i ) {
		if ( !Object.equalTo( o, a[i] ) ) {
			logger.log( "FAIL: Object.equalTo( o, a[i] ) " );
		}

		if ( this !== ctx ) {
			logger.log( "FAIL: this !== ctx " );
		}
	}, ctx ), a ) ) {
		logger.log( "FAIL: Object.equalTo( a.each( function( o, i ) {}, ctx ), a )" );
	}
}();

;!function() {
	logger.group( 'find' );

	if ( !Object.equalTo( [1, 2, 3, 4, 5].find( function( v ) { return v == 3; } ), 3 ) ) {
		logger.log( "FAIL: Object.equalTo( [1, 2, 3, 4, 5].find( function( v ) { return v == 3; } ), 3 ) " );
	}
	
	if ( [1, 2, 3, 4, 5].find( function( v ) { return v == 6; } ) !== null ) {
		logger.log( "FAIL: [1, 2, 3, 4, 5].find( function( v ) { return v == 6; } ) !== null " );
	}
}();

;!function() {
	logger.group( 'flatten' );
		
	var a = [1, 2, 3, [4, 5, 6, [7, 8, 9, [10, 11, 12]]]];

	
	if ( !Object.equalTo( a.flatten(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] ) ) {
		logger.log( "FAIL: Object.equalTo( a.flatten(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] ) " );
	}
	
	if ( !Object.equalTo( a.flatten( 1 ), [1, 2, 3, 4, 5, 6, [7, 8, 9, [10, 11, 12]]] ) ) {
		logger.log( "FAIL: Object.equalTo( a.flatten( 1 ), [1, 2, 3, 4, 5, 6, [7, 8, 9, [10, 11, 12]]] ) " );
	}
	
	if ( !Object.equalTo( a.flatten( 2 ), [1, 2, 3, 4, 5, 6, 7, 8, 9, [10, 11, 12]] ) ) {
		logger.log( "FAIL: Object.equalTo( a.flatten( 2 ), [1, 2, 3, 4, 5, 6, 7, 8, 9, [10, 11, 12]] ) " );
	}
}();

;!function() {
	logger.group( 'grep' );
		
	var a = ['a', 'back', 'chapter'];

	
	if ( !Object.equalTo( a.grep( /a/g, function( o, i ) { return i; } ), [0, 1, 2] ) ) {
		logger.log( "FAIL: Object.equalTo( a.grep( /a/g, function( o, i ) { return i; } ), [0, 1, 2] ) " );
	}
	
	if ( !Object.equalTo( a.grep( /z/g ), [] ) ) {
		logger.log( "FAIL: Object.equalTo( a.grep( /z/g ), [] ) " );
	}
}();

;!function() {
	logger.group( 'groupBy' );
		
	var o1 = { cls : 'one',   id : '1', role : 'foo', value : 'a' },
		o2 = { cls : 'one',   id : '2', role : 'foo', value : 'b' },
		o3 = { cls : 'one two', id : '3', role : 'bar', value : 'c' },
		o4 = { cls : 'two',   id : '4', role : 'bar', value : 'd' },
		a = [o1, o2, o3, o4];

	
	if ( !Object.equalTo( a.groupBy( 'role' ), { foo : [o1, o2], bar : [o3, o4] } ) ) {
		logger.log( "FAIL: Object.equalTo( a.groupBy( 'role' ), { foo : [o1, o2], bar : [o3, o4] } ) " );
	}

	
	if ( !Object.equalTo( a.groupBy( function( o ) { return o.cls.contains( 'one' ); } ), { 0 : [o1, o2, o3], 1 : [o4] } ) ) {
		logger.log( "FAIL: Object.equalTo( a.groupBy( function( o ) { return o.cls.contains( 'one' ); } ), { 0 : [o1, o2, o3], 1 : [o4] } ) " );
		logger.log( "EXPECTED: " + JSON.stringify( { 0 : [o1, o2, o3], 1 : [o4] } ) );
		logger.log( "RETURNED: " + JSON.stringify( a.groupBy( function( o ) { return o.cls.contains( 'one' ); } ) ) );
	}

		if ( !Object.equalTo( a.pluck( 'cls' ).groupBy( /one/ ), { 0 : ['one', 'one', 'one two'], 1 : ['two'] } ) ) {
		logger.log( "FAIL: Object.equalTo( a.pluck( 'cls' ).groupBy( /one/ ), { 0 : ['one', 'one', 'one two'], 1 : ['two'] } ) " );
		logger.log( "EXPECTED: " + JSON.stringify( { 0 : ['one', 'one', 'one two'], 1 : ['two'] } ) );
		logger.log( "RETURNED: " + JSON.stringify( a.pluck( 'cls' ).groupBy( /one/ ) ) );
	}
}();

;!function() {
	logger.group( 'include' );
		
	var a = [1, 2, 3];

	if ( a.include( 1 ) !== false ) {
		logger.log( "FAIL: a.include( 1 ) !== false " );
	}
	
	if ( a.include( 4 ) !== true ) {
		logger.log( "FAIL: a.include( 4 ) !== true " );
	}
	
	if ( !Object.equalTo( a, [1, 2, 3, 4] ) ) {
		logger.log( "FAIL: Object.equalTo( a, [1, 2, 3, 4] ) " );
	}

}();

;!function() {
	logger.group( 'invoke' );

	if ( !Object.equalTo( [1, 2, 3, 4, 5].invoke( 'pad', 3 ), ['001', '002', '003', '004', '005'] ) ) {
		logger.log( "FAIL: Object.equalTo( [1, 2, 3, 4, 5].invoke( 'pad', 3 ), ['001', '002', '003', '004', '005'] ) " );
	}
}();

;!function() {
	logger.group( 'invokec' );
		
	if ( !Object.equalTo( [
		{ toString : function() { return null; } },
		{ toString : function() { return 1; } },
		{ toString : function() { return undefined; } },
		{ toString : function() { return 2; } },
		{ toString : function() { return NaN; } },
		{ toString : function() { return 3; } }
	].invokec( 'toString' ), [1, 2, 3] ) ) {
		logger.log( "FAIL: Object.equalTo( [\
				{ toString : function() { return null; } },\
				{ toString : function() { return 1; } },\
				{ toString : function() { return undefined; } },\
				{ toString : function() { return 2; } },\
				{ toString : function() { return NaN; } },\
				{ toString : function() { return 3; } }\
			].invokec( 'toString' ), [1, 2, 3] )" );
	}
}();

;!function() {
	logger.group( 'item' );

	
	if ( !Object.equalTo( [1, 2, 3, 4, 5].item( 0 ), 1 ) ) {
		logger.log( "FAIL: Object.equalTo( [1, 2, 3, 4, 5].item( 0 ), 1 ) " );
	}
	
	if ( !Object.equalTo( [1, 2, 3, 4, 5].item( -1 ), 5 ) ) {
		logger.log( "FAIL: Object.equalTo( [1, 2, 3, 4, 5].item( -1 ), 5 ) " );
	}
	
	if ( !Object.equalTo( [1, 2, 3, 4, 5].item( -3 ), 3 ) ) {
		logger.log( "FAIL: Object.equalTo( [1, 2, 3, 4, 5].item( -3 ), 3 ) " );
	}
	
	if ( !Object.equalTo( [1, 2, 3, 4, 5].item( 2 ), 3 ) ) {
		logger.log( "FAIL: Object.equalTo( [1, 2, 3, 4, 5].item( 2 ), 3 ) " );
	}
}();

;!function() {
	logger.group( 'last' );
		
	
	if ( !Object.equalTo( [1, 2, 3, 4, 5].last(), 5 ) ) {
		logger.log( "FAIL: Object.equalTo( [1, 2, 3, 4, 5].last(), 5 ) " );
	}
}();

;!function() {
	logger.group( 'mapc' );
		
	
	if ( !Object.equalTo( [1, undefined, 2, null, 3, NaN].mapc( m8 ), [1,2,3] ) ) {
		logger.log( "FAIL: Object.equalTo( [1, undefined, 2, null, 3, NaN].mapc( m8 ), [1,2,3] ) " );
	}
}();

;!function() {
	logger.group( 'pluck' );
		
	if ( !Object.equalTo( [
		{ 'one' : 1, 'two' : 2, 'three' : 3 },
		{ 'one' : 1, 'two' : 2, 'three' : 3 },
		{ 'one' : 1, 'two' : 2, 'three' : 3 }
	].pluck( 'one' ), [1, 1, 1] ) ) {
		logger.log( "FAIL: Object.equalTo( [\
			{ 'one' : 1, 'two' : 2, 'three' : 3 },\
			{ 'one' : 1, 'two' : 2, 'three' : 3 },\
			{ 'one' : 1, 'two' : 2, 'three' : 3 }\
		].pluck( 'one' ), [1, 1, 1] )" );
	}
	if( !Object.equalTo( [
		{ 'one' : 1,     'two' : 2, 'three' : 3 },
		{ 'one' : undefined, 'two' : 2, 'three' : 3 },
		{ 'one' : 1,     'two' : 2, 'three' : 3 },
		{ 'one' : null,   'two' : 2, 'three' : 3 },
		{ 'one' : 1,     'two' : 2, 'three' : 3 }
	].pluck( 'one', true ), [1, 1, 1] ) ) {
		logger.log( "FAIL: Object.equalTo( [\
			{ 'one' : 1,     'two' : 2, 'three' : 3 },\
			{ 'one' : undefined, 'two' : 2, 'three' : 3 },\
			{ 'one' : 1,     'two' : 2, 'three' : 3 },\
			{ 'one' : null,   'two' : 2, 'three' : 3 },\
			{ 'one' : 1,     'two' : 2, 'three' : 3 }\
		].pluck( 'one', true ), [1, 1, 1] )" );
	}
	if ( !Object.equalTo( m8.range( 1, 10 ).map( function( o, i ) {
		return { src : { val : i } };
	} ).pluck( 'src.val' ), m8.range( 0, 9 ) ) ) {
		logger.log( "FAIL: Object.equalTo( m8.range( 1, 10 ).map( function( o, i ) {\
			return { src : { val : i } };\
		} ).pluck( 'src.val' ), m8.range( 0, 9 ) )" );
	}
	if ( !Object.equalTo( m8.range( 1, 10 ).map( function( o, i ) {
		return { src : { val : i % 2 ? i : null } };
	} ).pluck( 'src.val', true ), [1, 3, 5, 7, 9] ) ) {
		logger.log( "FAIL: Object.equalTo( m8.range( 1, 10 ).map( function( o, i ) {\
			return { src : { val : i % 2 ? i : null } };\
		} ).pluck( 'src.val', true ), [1, 3, 5, 7, 9] )" );
	}
}();

;!function() {
	logger.group( 'remove' );
		
	var a = m8.range( 0, 9 );

	
	if ( !Object.equalTo( a.remove( 7, 8, 9 ), [7, 8, 9] ) ) {
		logger.log( "FAIL: Object.equalTo( a.remove( 7, 8, 9 ), [7, 8, 9] ) " );
	}
	
	if ( !Object.equalTo( a, m8.range( 0, 6 ) ) ) {
		logger.log( "FAIL: Object.equalTo( a, m8.range( 0, 6 ) ) " );
	}
}();

;!function() {
	logger.group( 'sortBy' );
		
	var o1 = { cls : 'one',   id : '1', role : 'foo', value : 'a' },
		o2 = { cls : 'one',   id : '2', role : 'foo', value : 'b' },
		o3 = { cls : 'one two', id : '3', role : 'bar', value : 'c' },
		o4 = { cls : 'two',   id : '4', role : 'bar', value : 'd' },
		a = [o1, o2, o3, o4];

	
	if ( !Object.equalTo( a.sortBy( 'id',  'desc' ), [o4, o3, o2, o1] ) ) {
		logger.log( "FAIL: Object.equalTo( a.sortBy( 'id',  'desc' ), [o4, o3, o2, o1] ) " );
	}
	
	if ( !Object.equalTo( a.sortBy( 'role', 'asc' ), [o3, o4, o1, o2] ) ) {
		logger.log( "FAIL: Object.equalTo( a.sortBy( 'role', 'asc' ), [o3, o4, o1, o2] ) " );
	}
	if ( !Object.equalTo( a.sortBy( function( o ) {
		return o.cls.replace( /\s/g, '' );
	},
	function( a, b ) {
		return a[1] == b[1] ? a[0].value > b[0].value ? 1 : -1 : a[1] > b[1] ? 1 : -1;
	} ), [o1, o2, o3, o4] ) ) {
		logger.log( "FAIL: Object.equalTo( a.sortBy( function( o ) {\
			return o.cls.replace( /\s/g, '' );\
		},\
		function( a, b ) {\
			return a[1] == b[1] ? a[0].value > b[0].value ? 1 : -1 : a[1] > b[1] ? 1 : -1;\
		} ), [o1, o2, o3, o4] )" );
	}
}();

;!function() {
	logger.group( 'tuck' );
		
	if ( !Object.equalTo( [
		{ 'one' : 1, 'two' : 2, 'three' : 3 },
		{ 'one' : 1, 'two' : 2, 'three' : 3 },
		{ 'one' : 1, 'two' : 2, 'three' : 3 }
	].tuck( 'four', 4 ), [
		{ 'one' : 1, 'two' : 2, 'three' : 3, 'four' : 4 },
		{ 'one' : 1, 'two' : 2, 'three' : 3, 'four' : 4 },
		{ 'one' : 1, 'two' : 2, 'three' : 3, 'four' : 4 }
	] ) ) {
		logger.log( "FAIL: Object.equalTo( [\
			{ 'one' : 1, 'two' : 2, 'three' : 3 },\
			{ 'one' : 1, 'two' : 2, 'three' : 3 },\
			{ 'one' : 1, 'two' : 2, 'three' : 3 }\
		].tuck( 'four', 4 ), [\
			{ 'one' : 1, 'two' : 2, 'three' : 3, 'four' : 4 },\
			{ 'one' : 1, 'two' : 2, 'three' : 3, 'four' : 4 },\
			{ 'one' : 1, 'two' : 2, 'three' : 3, 'four' : 4 }\
		] )" );
	}
	if ( !Object.equalTo( [
		{ 'one' : 1, 'two' : 2, 'three' : 3 },
		{ 'one' : 1, 'two' : 2, 'three' : 3 },
		{ 'one' : 1, 'two' : 2, 'three' : 3 }
	].tuck( 'four', [4, 5, 6] ), [
		{ 'one' : 1, 'two' : 2, 'three' : 3, 'four' : 4 },
		{ 'one' : 1, 'two' : 2, 'three' : 3, 'four' : 5 },
		{ 'one' : 1, 'two' : 2, 'three' : 3, 'four' : 6 }
	] ) ) {
		logger.log( "FAIL: Object.equalTo( [\
			{ 'one' : 1, 'two' : 2, 'three' : 3 },\
			{ 'one' : 1, 'two' : 2, 'three' : 3 },\
			{ 'one' : 1, 'two' : 2, 'three' : 3 }\
		].tuck( 'four', [4, 5, 6] ), [\
			{ 'one' : 1, 'two' : 2, 'three' : 3, 'four' : 4 },\
			{ 'one' : 1, 'two' : 2, 'three' : 3, 'four' : 5 },\
			{ 'one' : 1, 'two' : 2, 'three' : 3, 'four' : 6 }\
		] )" );
	}

}();

;!function() {
	logger.group( 'uniq' );
		
	var a = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9],
		e = m8.range( 1, 9 ),
		r = a.uniq();

	
	if ( r === a ) {
		logger.log( "FAIL: r === a " );
	}
	
	if ( !Object.equalTo( r, e ) ) {
		logger.log( "FAIL: Object.equalTo( r, e ) " );
	}
	
	if ( !Object.equalTo( r, e ) ) {
		logger.log( "FAIL: Object.equalTo( r, e ) " );
	}
}();

;!function() {
	logger.group( 'without' );
		
	var a = m8.range( 0, 9 );

	
	if ( !Object.equalTo( a.without( 7, 8, 9 ), m8.range( 0, 6 ) ) ) {
		logger.log( "FAIL: Object.equalTo( a.without( 7, 8, 9 ), m8.range( 0, 6 ) ) " );
	}
	
	if ( !Object.equalTo( a, m8.range( 0, 9 ) ) ) {
		logger.log( "FAIL: Object.equalTo( a, m8.range( 0, 9 ) ) " );
	}
}();

;!function() {
	logger.group( 'zip' );
		
	var a1 = ['one', 'two', 'three'], a2 = [1, 2, 3], a3 = ['a', 'b', 'c'];

	
	if ( !Object.equalTo( a2.zip( a1, a3 ), [[1, 'one', 'a'], [2, 'two', 'b'], [3, 'three', 'c']] ) ) {
		logger.log( "FAIL: Object.equalTo( a2.zip( a1, a3 ), [[1, 'one', 'a'], [2, 'two', 'b'], [3, 'three', 'c']] ) " );
	}
}();

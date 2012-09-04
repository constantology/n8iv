logger.group( 'm8' );
;!function() {
	logger.group( '<static> m8' );

	var expected = { one : 1, three : 3, five : 5 };

	if ( !( m8( true ) === true ) ) {
		logger.log( "FAIL: m8( true ) === true" );
	}
	if ( !( m8( expected ) === expected ) ) {
		logger.log( "FAIL: m8( expected ) === expected" );
	}
}();
	
;!function() {
	logger.group( '<static> m8.bless' );

	var expected = { foo : { bar : 'hello' } };

	if ( !( typeof m8.bless( 'foo.bar' ) == 'object' ) ) {
		logger.log( "FAIL: typeof m8.bless( 'foo.bar' ) == 'object'" );
	}

	if ( !( m8.bless( '^foo.bar', expected ) === expected.bar ) ) {
		logger.log( "FAIL: m8.bless( '^foo.bar', expected ) === expected.bar" );
	}
	if ( !( m8.bless( '^.bar'    ) === m8.global.bar ) ) {
		logger.log( "FAIL: m8.bless( '^.bar'    ) === m8.global.bar" );
	}

	if ( !( m8.bless( 'foo.bar', expected ) === 'hello' ) ) {
		logger.log( "FAIL: m8.bless( 'foo.bar', expected ) === 'hello'" );
	}
}();

;!function() {
	logger.group( '<static> m8.coerce' );

	if ( !( m8.coerce( 'false'     ) === false ) ) {
		logger.log( "FAIL: m8.coerce( 'false'     ) === false" );
	}
	if ( !( m8.coerce( 'null'      ) === null ) ) {
		logger.log( "FAIL: m8.coerce( 'null'      ) === null" );
	}
	if ( !( m8.coerce( 'true'      ) === true ) ) {
		logger.log( "FAIL: m8.coerce( 'true'      ) === true" );
	}
	if ( !( m8.coerce( 'undefined' ) === undefined ) ) {
		logger.log( "FAIL: m8.coerce( 'undefined' ) === undefined" );
	}
	if ( !( isNaN( m8.coerce( 'NaN' ) ) === true ) ) {
		logger.log( "FAIL: isNaN( m8.coerce( 'NaN' ) ) === true" );
	}
	if ( !( m8.coerce( '1' ) === 1 ) ) {
		logger.log( "FAIL: m8.coerce( '1' ) === 1" );
	}
	if ( !( m8.coerce( '12' ) === 12 ) ) {
		logger.log( "FAIL: m8.coerce( '12' ) === 12" );
	}
	if ( !( m8.coerce( '123' ) === 123 ) ) {
		logger.log( "FAIL: m8.coerce( '123' ) === 123" );
	}
	if ( !( m8.coerce( '123.4' ) === 123.4 ) ) {
		logger.log( "FAIL: m8.coerce( '123.4' ) === 123.4" );
	}
	if ( !( m8.coerce( '123.45' ) === 123.45 ) ) {
		logger.log( "FAIL: m8.coerce( '123.45' ) === 123.45" );
	}
	if ( !( m8.coerce( '123.456' ) === 123.456 ) ) {
		logger.log( "FAIL: m8.coerce( '123.456' ) === 123.456" );
	}
	if ( !( m8.coerce( '1e10' ) === 10000000000 ) ) {
		logger.log( "FAIL: m8.coerce( '1e10' ) === 10000000000" );
	}
	if ( !( m8.coerce( '.0000000001e10' ) === 1 ) ) {
		logger.log( "FAIL: m8.coerce( '.0000000001e10' ) === 1" );
	}
}();

;!function() {
	logger.group( '<static> m8.copy' );

	var expected = { foo : { bar : 'hello' } };

	if ( !( Object.equalTo( m8.copy( {}, expected ), expected ) ) ) {
		logger.log( "FAIL: Object.equalTo( m8.copy( {}, expected ), expected )" );
	}
	if ( !( Object.equalTo( m8.copy( expected, { foo : { bar : 'goodbye' } }, true ), expected ) ) ) {
		logger.log( "FAIL: Object.equalTo( m8.copy( expected, { foo : { bar : 'goodbye' } }, true ), expected )" );
	}
	if ( !( Object.equalTo( m8.copy( { foo : { bar : 'goodbye' } }, expected ), expected ) ) ) {
		logger.log( "FAIL: Object.equalTo( m8.copy( { foo : { bar : 'goodbye' } }, expected ), expected )" );
	}
}();

;!function() {
	logger.group( '<static> m8.def' );

	var o = {};

	m8.def( o, 'foo', m8.describe( 'bar', 'r' ) );
	m8.def( o, 'bar', m8.describe( { value : { boo : 'baz' } }, 'c' ) );

	if ( !( o.foo === 'bar' ) ) {
		logger.log( "FAIL: o.foo === 'bar'" );
	}
	if ( !( Object.equalTo( o.bar, { boo : 'baz' } ) ) ) {
		logger.log( "FAIL: Object.equalTo( o.bar, { boo : 'baz' } )" );
	}
	if ( !( Object.equalTo( Object.keys( o ), [] ) ) ) {
		logger.log( "FAIL: Object.equalTo( Object.keys( o ), [] )" );
	}
	if ( !( delete o.foo === false ) ) {
		logger.log( "FAIL: delete o.foo === false" );
	}
	if ( !( delete o.bar === true ) ) {
		logger.log( "FAIL: delete o.bar === true" );
	}
}();

;!function() {
	logger.group( '<static> m8.defs' );

	var o = {};

	m8.defs( o, {
		foo : 'bar',
		bar : { value : { boo : 'baz' } }
	}, 'c' );

	if ( !( o.foo === 'bar' ) ) {
		logger.log( "FAIL: o.foo === 'bar'" );
	}
	if ( !( Object.equalTo( o.bar, { boo : 'baz' } ) ) ) {
		logger.log( "FAIL: Object.equalTo( o.bar, { boo : 'baz' } )" );
	}
	if ( !( Object.equalTo( Object.keys( o ), [] ) ) ) {
		logger.log( "FAIL: Object.equalTo( Object.keys( o ), [] )" );
	}
	if ( !( delete o.foo === true ) ) {
		logger.log( "FAIL: delete o.foo === true" );
	}
	if ( !( delete o.bar === true ) ) {
		logger.log( "FAIL: delete o.bar === true" );
	}
}();

;!function() {
	logger.group( '<static> m8.describe' );

	function getter() {} function setter() {}

	if ( !( Object.equalTo( m8.describe( 'foo', 'r' ), { configurable : false, enumerable : false, value : 'foo', writable : false } ) ) ) {
		logger.log( "FAIL: Object.equalTo( m8.describe( 'foo', 'r' ), { configurable : false, enumerable : false, value : 'foo', writable : false } )" );
	}
	if ( !( Object.equalTo( m8.describe( { value : 'bar' }, 'cw' ), { configurable : true, enumerable : false, value : 'bar', writable : true } ) ) ) {
		logger.log( "FAIL: Object.equalTo( m8.describe( { value : 'bar' }, 'cw' ), { configurable : true, enumerable : false, value : 'bar', writable : true } )" );
	}
	if ( !( Object.equalTo( m8.describe( { get : getter, set : setter }, m8.modes.c ), { configurable : true, enumerable : false, get : getter, set : setter, writable : false } ) ) ) {
		logger.log( "FAIL: Object.equalTo( m8.describe( { get : getter, set : setter }, m8.modes.c ), { configurable : true, enumerable : false, get : getter, set : setter, writable : false } )" );
	}
	if ( !( Object.equalTo( m8.describe( getter, m8.modes.e ), { configurable : false, enumerable : true, value : getter, writable : false } ) ) ) {
		logger.log( "FAIL: Object.equalTo( m8.describe( getter, m8.modes.e ), { configurable : false, enumerable : true, value : getter, writable : false } )" );
	}
}();

;!function() {
	logger.group( '<static> m8.empty' );

	if ( !( m8.empty( '' ) === true ) ) {
		logger.log( "FAIL: m8.empty( '' ) === true" );
	}
	if ( !( m8.empty( [] ) === true ) ) {
		logger.log( "FAIL: m8.empty( [] ) === true" );
	}
	if ( !( m8.empty( NaN ) === true ) ) {
		logger.log( "FAIL: m8.empty( NaN ) === true" );
	}
	if ( !( m8.empty( {} ) === true ) ) {
		logger.log( "FAIL: m8.empty( {} ) === true" );
	}
	if ( !( m8.empty( null ) === true ) ) {
		logger.log( "FAIL: m8.empty( null ) === true" );
	}
	if ( !( m8.empty( undefined ) === true ) ) {
		logger.log( "FAIL: m8.empty( undefined ) === true" );
	}
	if ( !( m8.empty() === true ) ) {
		logger.log( "FAIL: m8.empty() === true" );
	}
	if ( !( m8.empty( 0 ) === false ) ) {
		logger.log( "FAIL: m8.empty( 0 ) === false" );
	}
	if ( !( m8.empty( ' ' ) === false ) ) {
		logger.log( "FAIL: m8.empty( ' ' ) === false" );
	}
	if ( !( m8.empty( [''] ) === false ) ) {
		logger.log( "FAIL: m8.empty( [''] ) === false" );
	}
	if ( !( m8.empty( { foo : '' } ) === false ) ) {
		logger.log( "FAIL: m8.empty( { foo : '' } ) === false" );
	}
}();

;!function() {
	logger.group( '<static> m8.exists' );

	if ( !( m8.exists( 0 ) === true ) ) {
		logger.log( "FAIL: m8.exists( 0 ) === true" );
	}
	if ( !( m8.exists( false ) === true ) ) {
		logger.log( "FAIL: m8.exists( false ) === true" );
	}
	if ( !( m8.exists( '' ) === true ) ) {
		logger.log( "FAIL: m8.exists( '' ) === true" );
	}
	if ( !( m8.exists( NaN ) === false ) ) {
		logger.log( "FAIL: m8.exists( NaN ) === false" );
	}
	if ( !( m8.exists( null ) === false ) ) {
		logger.log( "FAIL: m8.exists( null ) === false" );
	}
	if ( !( m8.exists( undefined ) === false ) ) {
		logger.log( "FAIL: m8.exists( undefined ) === false" );
	}
}();

;!function() {
	logger.group( '<static> m8.got' );

	function Test( val ) { this.value = val; }
	Test.prototype = { foo : 'bar', baz : 'bam' };

	if ( !( m8.got( { foo : 'bar' }, 'foo' ) === true ) ) {
		logger.log( "FAIL: m8.got( { foo : 'bar' }, 'foo' ) === true" );
	}
	if ( !( m8.got( [1, 2, 3], 'length' ) === true ) ) {
		logger.log( "FAIL: m8.got( [1, 2, 3], 'length' ) === true" );
	}
	if ( !( m8.got( { foo : 'bar' }, 'bar' ) === false ) ) {
		logger.log( "FAIL: m8.got( { foo : 'bar' }, 'bar' ) === false" );
	}
	if ( !( m8.got( { foo : 'bar', baz : 'bam' }, 'foo', 'baz' ) === true ) ) {
		logger.log( "FAIL: m8.got( { foo : 'bar', baz : 'bam' }, 'foo', 'baz' ) === true" );
	}
	if ( !( m8.got( new Test(), 'foo', 'baz' ) === true ) ) {
		logger.log( "FAIL: m8.got( new Test(), 'foo', 'baz' ) === true" );
	}
	if ( !( m8.got( new Test(), 'baz', 'bam' ) === true ) ) {
		logger.log( "FAIL: m8.got( new Test(), 'baz', 'bam' ) === true" );
	}
	if ( !( m8.got( new Test( 'val' ), 'foo', 'bam', 'val' ) === true ) ) {
		logger.log( "FAIL: m8.got( new Test( 'val' ), 'foo', 'bam', 'val' ) === true" );
	}
}();

;!function() {
	logger.group( '<static> m8.has' );

	function Test( val ) { this.value = val; } Test.prototype = { foo : 'bar', baz : 'bam' };

	if ( !( m8.has( { foo : 'bar' }, 'foo' ) === true ) ) {
		logger.log( "FAIL: m8.has( { foo : 'bar' }, 'foo' ) === true" );
	}
	if ( !( m8.has( [1, 2, 3], 'length' ) === true ) ) {
		logger.log( "FAIL: m8.has( [1, 2, 3], 'length' ) === true" );
	}
	if ( !( m8.has( { foo : 'bar' }, 'bar' ) === false ) ) {
		logger.log( "FAIL: m8.has( { foo : 'bar' }, 'bar' ) === false" );
	}
	if ( !( m8.has( { foo : 'bar', baz : 'bam' }, 'foo', 'baz' ) === true ) ) {
		logger.log( "FAIL: m8.has( { foo : 'bar', baz : 'bam' }, 'foo', 'baz' ) === true" );
	}
	if ( !( m8.has( new Test(), 'foo', 'baz' ) === false ) ) {
		logger.log( "FAIL: m8.has( new Test(), 'foo', 'baz' ) === false" );
	}
	if ( !( m8.has( new Test(), 'bar', 'bam' ) === false ) ) {
		logger.log( "FAIL: m8.has( new Test(), 'bar', 'bam' ) === false" );
	}
	if ( !( m8.has( new Test( 'value' ), 'foo', 'bam', 'value' ) === true ) ) {
		logger.log( "FAIL: m8.has( new Test( 'value' ), 'foo', 'bam', 'value' ) === true" );
	}
}();

;!function() {
	logger.group( '<static> m8.id' );
	var expected = { id : 'foo' }, empty_obj = {};

	if ( !( m8.id( expected ) === 'foo' ) ) {
		logger.log( "FAIL: m8.id( expected ) === 'foo'" );
	}
	if ( !( empty_obj.id === undefined ) ) {
		logger.log( "FAIL: empty_obj.id === undefined" );
	}
	if ( !( m8.id( empty_obj ) === empty_obj.id ) ) {
		logger.log( "FAIL: m8.id( empty_obj ) === empty_obj.id" );
	}
	if ( !( m8.id( {}, 'foo' ).split( '-' )[0] === 'foo' ) ) {
		logger.log( "FAIL: m8.id( {}, 'foo' ).split( '-' )[0] === 'foo'" );
	}
}();

;!function() {
	logger.group( '<static> m8.iter' );

	if ( !( m8.iter( [] ) === true ) ) {
		logger.log( "FAIL: m8.iter( [] ) === true" );
	}
	if ( !( m8.iter( {} ) === true ) ) {
		logger.log( "FAIL: m8.iter( {} ) === true" );
	}
	if ( !( m8.iter( m8.obj() ) === true ) ) {
		logger.log( "FAIL: m8.iter( m8.obj() ) === true" );
	}
	if ( !( m8.iter( '' ) === true ) ) {
		logger.log( "FAIL: m8.iter( '' ) === true" );
	}
	if ( !( m8.iter( null ) === false ) ) {
		logger.log( "FAIL: m8.iter( null ) === false" );
	}
	if ( !( m8.iter( 3 ) === false ) ) {
		logger.log( "FAIL: m8.iter( 3 ) === false" );
	}
	if ( !( m8.iter( new Date() ) === false ) ) {
		logger.log( "FAIL: m8.iter( new Date() ) === false" );
	}
}();

;!function() {
	logger.group( '<static> m8.len' );

	if ( !( m8.len( { foo : 'bar' } ) === 1 ) ) {
		logger.log( "FAIL: m8.len( { foo : 'bar' } ) === 1" );
	}
	if ( !( m8.len( ['foo', 'bar'] ) === 2 ) ) {
		logger.log( "FAIL: m8.len( ['foo', 'bar'] ) === 2" );
	}
}();

;!function() {
	logger.group( '<static> m8.merge' );

	var expected = { foo : 'bar', items : [{ value : 1 }, { items : [{ value : 1 }, { items : [{ value : 1 }, { value : 2 }, { value : 3 }], value : 2 }, { value : 3 }], value : 2 }, { value : 3 }]},
		returned = m8.merge( m8.obj(), expected );

	if ( !( returned !== expected ) ) {
		logger.log( "FAIL: returned !== expected" );
	}
	if ( !( Object.equalTo( returned, expected ) ) ) {
		logger.log( "FAIL: Object.equalTo( returned, expected )" );
	}
	if ( !( returned.items !== expected.items ) ) {
		logger.log( "FAIL: returned.items !== expected.items" );
	}
	if ( !( returned.items[1].items[1] !== expected.items[1].items[1] ) ) {
		logger.log( "FAIL: returned.items[1].items[1] !== expected.items[1].items[1]" );
	}
}();

;!function() {
	logger.group( '<static> m8.nativeType' );

	if ( !( m8.nativeType( null ) === 'null' ) ) {
		logger.log( "FAIL: m8.nativeType( null ) === 'null'" );
	}
	if ( !( m8.nativeType( undefined ) === 'undefined' ) ) {
		logger.log( "FAIL: m8.nativeType( undefined ) === 'undefined'" );
	}
	if ( !( m8.nativeType( [] ) === 'array' ) ) {
		logger.log( "FAIL: m8.nativeType( [] ) === 'array'" );
	}
	if ( !( m8.nativeType( true ) === 'boolean' ) ) {
		logger.log( "FAIL: m8.nativeType( true ) === 'boolean'" );
	}
	if ( !( m8.nativeType( new Date() ) === 'date' ) ) {
		logger.log( "FAIL: m8.nativeType( new Date() ) === 'date'" );
	}
	if ( !( m8.nativeType( function() {} ) === 'function' ) ) {
		logger.log( "FAIL: m8.nativeType( function() {} ) === 'function'" );
	}
	if ( !( m8.nativeType( 0 ) === 'number' ) ) {
		logger.log( "FAIL: m8.nativeType( 0 ) === 'number'" );
	}
	if ( !( m8.nativeType( NaN ) === 'number' ) ) {
		logger.log( "FAIL: m8.nativeType( NaN ) === 'number'" );
	}
	if ( !( m8.nativeType( {} ) === 'object' ) ) {
		logger.log( "FAIL: m8.nativeType( {} ) === 'object'" );
	}
	if ( !( m8.nativeType( Object.create( null ) ) === 'object' ) ) {
		logger.log( "FAIL: m8.nativeType( Object.create( null ) ) === 'object'" );
	}
	if ( !( m8.nativeType( /.*/ ) === 'regexp' ) ) {
		logger.log( "FAIL: m8.nativeType( /.*/ ) === 'regexp'" );
	}
	if ( !( m8.nativeType( '' ) === 'string' ) ) {
		logger.log( "FAIL: m8.nativeType( '' ) === 'string'" );
	}
}();

;!function() {
	logger.group( '<static> m8.obj' );

	var expected = { foo : 'bar', items : [1, 2, 3] }, returned = m8.obj( expected );

	if ( !( Object.equalTo( returned, expected ) ) ) {
		logger.log( "FAIL: Object.equalTo( returned, expected )" );
	}
	if ( !( m8.type( returned ) === 'nullobject' ) ) {
		logger.log( "FAIL: m8.type( returned ) === 'nullobject'" );
	}
	if ( !( Object.getPrototypeOf( returned ) === null ) ) {
		logger.log( "FAIL: Object.getPrototypeOf( returned ) === null" );
	}
	if ( !( m8.nativeType( returned ) === 'object' ) ) {
		logger.log( "FAIL: m8.nativeType( returned ) === 'object'" );
	}
	if ( !( m8.nativeType( returned ) !== 'nullobject' ) ) {
		logger.log( "FAIL: m8.nativeType( returned ) !== 'nullobject'" );
	}
	if ( !( m8.type( returned ) !== 'object' ) ) {
		logger.log( "FAIL: m8.type( returned ) !== 'object'" );
	}
}();

;!function() {
	logger.group( '<static> m8.range' );

	var returned = m8.range( 1, 10 );

	if ( !( Object.equalTo( returned, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] ) ) ) {
		logger.log( "FAIL: Object.equalTo( returned, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] )" );
	}
	if ( !( m8.nativeType( returned ) == 'array' ) ) {
		logger.log( "FAIL: m8.nativeType( returned ) == 'array'" );
	}
}();

;!function() {
	logger.group( '<static> m8.remove' );

	var expected = { one : 1, three : 3, five : 5 };

	if ( !( Object.equalTo( m8.remove( { one : 1, two : 2, three : 3, four : 4, five : 5 }, 'two', 'four' ), expected ) ) ) {
		logger.log( "FAIL: Object.equalTo( m8.remove( { one : 1, two : 2, three : 3, four : 4, five : 5 }, 'two', 'four' ), expected )" );
	}
	if ( !( Object.equalTo( m8.remove( { one : 1, two : 2, three : 3, four : 4, five : 5 }, ['two', 'four'] ), expected ) ) ) {
		logger.log( "FAIL: Object.equalTo( m8.remove( { one : 1, two : 2, three : 3, four : 4, five : 5 }, ['two', 'four'] ), expected )" );
	}
}();

;!function() {
	logger.group( '<static> m8.tostr' );

	if ( !( m8.tostr( {} ) === '[object Object]' ) ) {
		logger.log( "FAIL: m8.tostr( {} ) === '[object Object]'" );
	}
	if ( !( m8.tostr( [] ) === '[object Array]' ) ) {
		logger.log( "FAIL: m8.tostr( [] ) === '[object Array]'" );
	}
}();

;!function() {
	logger.group( '<static> m8.type' );

	if ( !( m8.type( null ) === false ) ) {
		logger.log( "FAIL: m8.type( null ) === false" );
	}
	if ( !( m8.type( undefined ) === false ) ) {
		logger.log( "FAIL: m8.type( undefined ) === false" );
	}
	if ( !( m8.type( [] ) === 'array' ) ) {
		logger.log( "FAIL: m8.type( [] ) === 'array'" );
	}
	if ( !( m8.type( true ) === 'boolean' ) ) {
		logger.log( "FAIL: m8.type( true ) === 'boolean'" );
	}
	if ( !( m8.type( new Date() ) === 'date' ) ) {
		logger.log( "FAIL: m8.type( new Date() ) === 'date'" );
	}
	if ( !( m8.type( function() {} ) === 'function' ) ) {
		logger.log( "FAIL: m8.type( function() {} ) === 'function'" );
	}
	if ( !( m8.type( 0 ) === 'number' ) ) {
		logger.log( "FAIL: m8.type( 0 ) === 'number'" );
	}
	if ( !( m8.type( NaN ) === 'nan' ) ) {
		logger.log( "FAIL: m8.type( NaN ) === 'nan'" );
	}
	if ( !( m8.type( {} ) === 'object' ) ) {
		logger.log( "FAIL: m8.type( {} ) === 'object'" );
	}
	if ( !( m8.type( Object.create( null ) ) === 'nullobject' ) ) {
		logger.log( "FAIL: m8.type( Object.create( null ) ) === 'nullobject'" );
	}
	if ( !( m8.type( /.*/ ) === 'regexp' ) ) {
		logger.log( "FAIL: m8.type( /.*/ ) === 'regexp'" );
	}
	if ( !( m8.type( '' ) === 'string' ) ) {
		logger.log( "FAIL: m8.type( '' ) === 'string'" );
	}
}();

;!function() {
	logger.group( '<static> Array.coerce returns an Array based on the passed item' );

	if ( !( Object.equalTo( Array.coerce( [1, 2, 3] ), [1, 2, 3] ) ) ) {
		logger.log( "FAIL: Object.equalTo( Array.coerce( [1, 2, 3] ), [1, 2, 3] )" );
	}
	if ( !( Object.equalTo( Array.coerce( { foo : 'bar' } ), [{ foo : 'bar' }] ) ) ) {
		logger.log( "FAIL: Object.equalTo( Array.coerce( { foo : 'bar' } ), [{ foo : 'bar' }] )" );
	}
	if ( !( Object.equalTo( Array.coerce( function() { return arguments; }( 1, 2, 3 ) ), [1, 2, 3] ) ) ) {
		logger.log( "FAIL: Object.equalTo( Array.coerce( function() { return arguments; }( 1, 2, 3 ) ), [1, 2, 3] )" );
	}
}();

;!function() {
	logger.group( '<static> Boolean.coerce: returns true for true like Strings' );

	if ( !( Boolean.coerce( true ) === true ) ) {
		logger.log( "FAIL: Boolean.coerce( true ) === true" );
	}
	if ( !( Boolean.coerce( 'true' ) === true ) ) {
		logger.log( "FAIL: Boolean.coerce( 'true' ) === true" );
	}
	if ( !( Boolean.coerce( 1 ) === true ) ) {
		logger.log( "FAIL: Boolean.coerce( 1 ) === true" );
	}
	if ( !( Boolean.coerce( '1' ) === true ) ) {
		logger.log( "FAIL: Boolean.coerce( '1' ) === true" );
	}
	if ( !( Boolean.coerce( 'some random string of text' ) === true ) ) {
		logger.log( "FAIL: Boolean.coerce( 'some random string of text' ) === true" );
	}
	if ( !( Boolean.coerce( -1 ) === true ) ) {
		logger.log( "FAIL: Boolean.coerce( -1 ) === true" );
	}
}();

;!function() {
	logger.group( '<static> Boolean.coerce: returns false for false like Strings' );

	if ( !( Boolean.coerce( false ) === false ) ) {
		logger.log( "FAIL: Boolean.coerce( false ) === false" );
	}
	if ( !( Boolean.coerce( 'false' ) === false ) ) {
		logger.log( "FAIL: Boolean.coerce( 'false' ) === false" );
	}
	if ( !( Boolean.coerce( 0 ) === false ) ) {
		logger.log( "FAIL: Boolean.coerce( 0 ) === false" );
	}
	if ( !( Boolean.coerce( '0' ) === false ) ) {
		logger.log( "FAIL: Boolean.coerce( '0' ) === false" );
	}
	if ( !( Boolean.coerce( NaN ) === false ) ) {
		logger.log( "FAIL: Boolean.coerce( NaN ) === false" );
	}
	if ( !( Boolean.coerce( 'NaN' ) === false ) ) {
		logger.log( "FAIL: Boolean.coerce( 'NaN' ) === false" );
	}
	if ( !( Boolean.coerce( null ) === false ) ) {
		logger.log( "FAIL: Boolean.coerce( null ) === false" );
	}
	if ( !( Boolean.coerce( 'null' ) === false ) ) {
		logger.log( "FAIL: Boolean.coerce( 'null' ) === false" );
	}
	if ( !( Boolean.coerce( undefined ) === false ) ) {
		logger.log( "FAIL: Boolean.coerce( undefined ) === false" );
	}
	if ( !( Boolean.coerce( 'undefined' ) === false ) ) {
		logger.log( "FAIL: Boolean.coerce( 'undefined' ) === false" );
	}
	if ( !( Boolean.coerce() === false ) ) {
		logger.log( "FAIL: Boolean.coerce() === false" );
	}
	if ( !( Boolean.coerce( '' ) === false ) ) {
		logger.log( "FAIL: Boolean.coerce( '' ) === false" );
	}
}();

;!function() {
	logger.group( 'Function.prototype.__name__' );

	function Test() {}
	Test.prototype = {
		get : function get() {}, set : function set() {}, test : function() {}
	};

	if ( !( function( one ){}.__name__ === 'anonymous' ) ) {
		logger.log( "FAIL: function( one ){}.__name__ === 'anonymous'" );
	}
	if ( !( function foo( one, two, three ){}.__name__ === 'foo' ) ) {
		logger.log( "FAIL: function foo( one, two, three ){}.__name__ === 'foo'" );
	}
	if ( !( m8.obj.__name__ === 'obj' ) ) {
		logger.log( "FAIL: m8.obj.__name__ === 'obj'" );
	}
	if ( !( m8.nativeType.__name__ === 'nativeType' ) ) {
		logger.log( "FAIL: m8.nativeType.__name__ === 'nativeType'" );
	}
	if ( !( Test.__name__ === 'Test' ) ) {
		logger.log( "FAIL: Test.__name__ === 'Test'" );
	}
	if ( !( Test.prototype.get.__name__ === 'get' ) ) {
		logger.log( "FAIL: Test.prototype.get.__name__ === 'get'" );
	}
	if ( !( Test.prototype.set.__name__ === 'set' ) ) {
		logger.log( "FAIL: Test.prototype.set.__name__ === 'set'" );
	}
	if ( !( Test.prototype.test.__name__ === 'anonymous' ) ) {
		logger.log( "FAIL: Test.prototype.test.__name__ === 'anonymous'" );
	}
}();

;!function() {
	logger.group( 'Function.prototype.mimic' );

	function one() {}
	function two() {}
	two.mimic( one );

	if ( !( one !==  two ) ) {
		logger.log( "FAIL: one !==  two" );
	}
	if ( !( one !== two ) ) {
		logger.log( "FAIL: one !== two" );
	}
	if ( !( one.valueOf()  === two.valueOf()  ) ) {
		logger.log( "FAIL: one.valueOf()  === two.valueOf() " );
	}
	if ( !( one.toString() === two.toString() ) ) {
		logger.log( "FAIL: one.toString() === two.toString()" );
	}
}();

;!function() {
	logger.group( '<static> Object.key' );

	if ( !( Object.key( { foo : 'bar' }, 'bar' ) === 'foo' ) ) {
		logger.log( "FAIL: Object.key( { foo : 'bar' }, 'bar' ) === 'foo'" );
	}
	if ( !( Object.key( { foo : 'bar' }, 'foo' ) === null ) ) {
		logger.log( "FAIL: Object.key( { foo : 'bar' }, 'foo' ) === null" );
	}
}();

;!function() {
	logger.group( '<static> Object.reduce' );

	if ( !( Object.reduce( { one : 1, two : 2, three : 3, four : 4, five : 5 }, function( res, v, k, o ) {
			return res += v;
		}, 0 ) === 15 ) ) {
		logger.log( 'FAIL: Object.reduce( { one : 1, two : 2, three : 3, four : 4, five : 5 }, function( res, v, k, o ) { return res += v; }, 0 ) === 15' );
	}
}();

;!function() {
	logger.group( '<static> Object.value' );

	var d = { one : { two : { three : true, four : [1, 2, 3, 4] } } };

	if ( !( Object.equalTo( Object.value( d, 'one' ), d.one ) ) ) {
		logger.log( "FAIL: Object.equalTo( Object.value( d, 'one' ), d.one )" );
	}
	if ( !( Object.equalTo( Object.value( d, 'one.two' ), d.one.two ) ) ) {
		logger.log( "FAIL: Object.equalTo( Object.value( d, 'one.two' ), d.one.two )" );
	}
	if ( !( Object.equalTo( Object.value( d, 'one.two.three' ), d.one.two.three ) ) ) {
		logger.log( "FAIL: Object.equalTo( Object.value( d, 'one.two.three' ), d.one.two.three )" );
	}
	if ( !( Object.equalTo( Object.value( d, 'one.two.four' ), d.one.two.four ) ) ) {
		logger.log( "FAIL: Object.equalTo( Object.value( d, 'one.two.four' ), d.one.two.four )" );
	}
	if ( !( Object.equalTo( Object.value( d, 'one.two.four.2' ), d.one.two.four[2] ) ) ) {
		logger.log( "FAIL: Object.equalTo( Object.value( d, 'one.two.four.2' ), d.one.two.four[2] )" );
	}
	if ( !( Object.value( d, 'one.three.four.2' ) === undefined ) ) {
		logger.log( "FAIL: Object.value( d, 'one.three.four.2' ) === undefined" );
	}
	if ( !( Object.value( d, 'one.two.beep.7' ) === undefined ) ) {
		logger.log( "FAIL: Object.value( d, 'one.two.beep.7' ) === undefined" );
	}
	if ( !( Object.value( d, 'one.two.four.7' ) === undefined ) ) {
		logger.log( "FAIL: Object.value( d, 'one.two.four.7' ) === undefined" );
	}
}();

;!function() {
	logger.group( '<static> Object.values' );

	if ( !( Object.equalTo( Object.values( { one : 1, two : 2, three : 3, four : 4, five : 5 } ), [1, 2, 3, 4, 5] ) ) ) {
		logger.log( "FAIL: Object.equalTo( Object.values( { one : 1, two : 2, three : 3, four : 4, five : 5 } ), [1, 2, 3, 4, 5] )" );
	}
	if ( !( Object.equalTo( Object.values( [1, 2, 3, 4, 5] ), [1, 2, 3, 4, 5] ) ) ) {
		logger.log( "FAIL: Object.equalTo( Object.values( [1, 2, 3, 4, 5] ), [1, 2, 3, 4, 5] )" );
	}
}();

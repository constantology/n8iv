logger.group( 'Function' );

;!function() {
	logger.group( '<static> coerce' );
		
	var a = [1, 2, 3];

	if ( !( Function.coerce( 'foo' )( 1, 2, 3) === 'foo'  ) ) {
		logger.log( "FAIL: Function.coerce( 'foo' )( 1, 2, 3) === 'foo' " );
	}
	
	if ( !( Function.coerce( a )( 4, 5, 6 ) === a  ) ) {
		logger.log( "FAIL: Function.coerce( a )( 4, 5, 6 ) === a " );
	}
	
	if ( !( Object.equalTo( Function.coerce( function( a, b, c ) { return [a, b, c]; } )( 7, 8, 9 ), [7, 8, 9] )  ) ) {
		logger.log( "FAIL: Object.equalTo( Function.coerce( function( a, b, c ) { return [a, b, c]; } )( 7, 8, 9 ), [7, 8, 9] ) " );
	}
}();

;!function() {
	logger.group( 'params' );

	if ( !( Object.equalTo( function( one ){}.params, ['one'] )  ) ) {
		logger.log( "FAIL: Object.equalTo( function( one ){}.params, ['one'] ) " );
	}
	
	if ( !( Object.equalTo( function( one, two, three ){}.params, ['one', 'two', 'three'] )  ) ) {
		logger.log( "FAIL: Object.equalTo( function( one, two, three ){}.params, ['one', 'two', 'three'] ) " );
	}
	
	if ( !( Object.equalTo( function(){}.params, [] )  ) ) {
		logger.log( "FAIL: Object.equalTo( function(){}.params, [] ) " );
	}
}();

;!function() {
	logger.group( 'attempt' );
		
	var ctx = { foo : 'bar' };

	if ( !( ( function() {
		
		if ( !( this === ctx  ) ) {
			logger.log( "FAIL: this === ctx " );
		}

		if ( !( Object.equalTo( Array.coerce( arguments ), [1, 2, 3] )  ) ) {
			logger.log( "FAIL: Object.equalTo( arguments, [1, 2, 3] ) " );
		}

		return true;
	} ).attempt( ctx, 1, 2, 3 ) === true ) ) {
		logger.log( "FAIL: Function.prototype.attempt" );
	}

	if ( ( function() {
		throw new TypeError( 'TestError' );
	}.attempt() ).constructor !== TypeError ) {
		logger.log( "FAIL: Function.prototype.attempt TypeError" );
	}
}();

;!function() {
	logger.group( 'bake' );
		
	function testBake( o, a, b, c ) {
		if ( !( o === test  ) ) {
			logger.log( "FAIL: o === test " );
		}

		if ( !( Object.equalTo( a, 1 )  ) ) {
			logger.log( "FAIL: Object.equalTo( a, 1 ) " );
		}

		if ( !( Object.equalTo( b, 2 )  ) ) {
			logger.log( "FAIL: Object.equalTo( b, 2 ) " );
		}

		if ( !( Object.equalTo( c, 3 )  ) ) {
			logger.log( "FAIL: Object.equalTo( c, 3 ) " );
		}
	}

	function Test() {}
	Test.prototype.baked = testBake.bake();

	var test = new Test();
	test.baked( 1, 2, 3 );
}();

;!function() {
	logger.group( 'defer' );
		
	var ctx = { foo : 'bar' }, n = Date.now();

	( function() {
		var a = Array.coerce( arguments ), r = this,
			e = Date.now() - n;

		if ( e < 0 || e > 100 ) {
			logger.log( "FAIL: Function.prototype.defer" );
		}
		
		if ( !( r === ctx  ) ) {
			logger.log( "FAIL: r === ctx " );
		}
		
		if ( !( Object.equalTo( a, [1, 2, 3] )  ) ) {
			logger.log( "FAIL: Object.equalTo( a, [1, 2, 3] ) " );
		}

	} ).defer( ctx, 1, 2, 3 );
}();

;!function() {
	logger.group( 'delay' );

	var ctx = { foo : 'bar' }, n = Date.now();

	( function() {
		var a = Array.coerce( arguments ), r = this,
			e = Date.now() - n;

		if ( e < 110 || e > 175 ) {
			logger.log( "FAIL: Function.prototype.delay" );
		}
		
		if ( !( r === ctx  ) ) {
			logger.log( "FAIL: r === ctx " );
		}
		
		if ( !( Object.equalTo( a, [1, 2, 3] )  ) ) {
			logger.log( "FAIL: Object.equalTo( a, [1, 2, 3] ) " );
		}
	} ).delay( 125, ctx, 1, 2, 3 );
}();

;!function() {
	logger.group( 'memoize' );

	function Test() {}
	Test.prototype.method = function( a, b, c, d, e ) {
		this.prop = ( ( a ? a + ' ' : '' ) + ( b ? b + ' ' : '' ) + ( c ? c + ' ' : '' ) + ( d ? d + ' ' : '' ) + ( e ? e + ' ' : '' ) ).trim();
		return this.prop;
	};

	var t = new Test(),
		tm_original   = t.method.bind( t ),
		test_memoized = t.method.memoize( t, m8.obj( { 'testing' : 'testing', 'testing,memoization' : 'testing memoization' } ) );

	if ( !( test_memoized !== tm_original ) ) {
		logger.log( "FAIL: Function.prototype.memoize " );
	}
	
	if ( !( Object.equalTo( test_memoized( 'testing' ), 'testing' ) ) ) {
		logger.log( "FAIL: Object.equalTo( test_memoized( 'testing' ), 'testing' ) " );
	}
	
	if ( !( Object.equalTo( test_memoized( 'testing', 'memoization' ), 'testing memoization' )  ) ) {
		logger.log( "FAIL: Object.equalTo( test_memoized( 'testing', 'memoization' ), 'testing memoization' ) " );
	}
	
	if ( !( Object.equalTo( test_memoized( 'testing', 'memoization', 'but' ), 'testing memoization but' )  ) ) {
		logger.log( "FAIL: Object.equalTo( test_memoized( 'testing', 'memoization', 'but' ), 'testing memoization but' ) " );
	}
	
	if ( !( Object.equalTo( test_memoized( 'testing', 'memoization', 'but', 'not' ), 'testing memoization but not' )  ) ) {
		logger.log( "FAIL: Object.equalTo( test_memoized( 'testing', 'memoization', 'but', 'not' ), 'testing memoization but not' ) " );
	}
	
	if ( !( Object.equalTo( test_memoized( 'testing', 'memoization', 'but', 'not', 'optimisation' ), 'testing memoization but not optimisation' )  ) ) {
		logger.log( "FAIL: Object.equalTo( test_memoized( 'testing', 'memoization', 'but', 'not', 'optimisation' ), 'testing memoization but not optimisation' ) " );
	}
}();

;!function() {
	logger.group( 'mimic' );
		
	function one() {}
	function two() {}
	two.mimic( one );

	if ( !( one !== two ) ) {
		logger.log( "FAIL: one !== two" );
	}
	if ( !( one != two ) ) {
		logger.log( "FAIL: one != two" );
	}
	
	if ( !( Object.equalTo( one.valueOf() , two.valueOf()  )  ) ) {
		logger.log( "FAIL: Object.equalTo( one.valueOf() , two.valueOf()  ) " );
	}
	
	if ( !( Object.equalTo( one.toString(), two.toString() )  ) ) {
		logger.log( "FAIL: Object.equalTo( one.toString(), two.toString() ) " );
	}
}();

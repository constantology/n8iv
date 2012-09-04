logger.group( 'Object' );

;!function() {
	logger.group( '<static> aggregate' );
		
	if ( !( Object.aggregate( { one : 1, two : 2, three : 3, four : 4, five : 5 }, 0, function( res, v, k, o ) {
		return res += v;
	} ) === 15 ) ) {
		logger.log( "FAIL: Object.aggregate( { one : 1, two : 2, three : 3, four : 4, five : 5 }, 0, function( res, v, k, o ) {\
			return res += v;\
		} ) === 15 )" );
	}
}();

;!function() {
	logger.group( '<static> clear' );

	if ( !( m8.empty( Object.clear( { one : 1, two : 2, three : 3, four : 4, five : 5 } ) ) === true  ) ) {
		logger.log( "FAIL: m8.empty( Object.clear( { one : 1, two : 2, three : 3, four : 4, five : 5 } ) ) === true " );
	}
}();

;!function() {
	logger.group( '<static> equalTo' );

	if ( !( Object.equalTo( { one : 1, two : 2, three : 3 }, { one : 1, two : 2, three : 3 } ) === true  ) ) {
		logger.log( "FAIL: Object.equalTo( { one : 1, two : 2, three : 3 }, { one : 1, two : 2, three : 3 } ) === true " );
	}
	
	if ( !( Object.equalTo( Object.keys( { one : 1, two : 2, three : 3 } ), Object.keys( { one : 1, two : 2, three : 3 } ) ) === true  ) ) {
		logger.log( "FAIL: Object.equalTo( Object.keys( { one : 1, two : 2, three : 3 } ), Object.keys( { one : 1, two : 2, three : 3 } ) ) === true " );
	}
	
	if ( !( Object.equalTo( Object.values( { one : 1, two : 2, three : 3 } ), Object.values( { one : 1, two : 2, three : 3 } ) ) === true  ) ) {
		logger.log( "FAIL: Object.equalTo( Object.values( { one : 1, two : 2, three : 3 } ), Object.values( { one : 1, two : 2, three : 3 } ) ) === true " );
	}
	
	if ( !( Object.equalTo( new Date( 2012, 0, 1 ), new Date( 2012, 0, 1 ) ) === true  ) ) {
		logger.log( "FAIL: Object.equalTo( new Date( 2012, 0, 1 ), new Date( 2012, 0, 1 ) ) === true " );
	}
	
	if ( !( Object.equalTo( { one : 1, two : 2, three : 3, four : 4 }, { one : 1, two : 2, three : 3 } ) === false  ) ) {
		logger.log( "FAIL: Object.equalTo( { one : 1, two : 2, three : 3, four : 4 }, { one : 1, two : 2, three : 3 } ) === false " );
	}
	
	if ( !( Object.equalTo( { one : 1, two : 2, three : 3 }, { one : 1, two : 2, three : 3, four : 4 } ) === false  ) ) {
		logger.log( "FAIL: Object.equalTo( { one : 1, two : 2, three : 3 }, { one : 1, two : 2, three : 3, four : 4 } ) === false " );
	}
	
	if ( !( Object.equalTo( { one : 1, two : 2, three : 3, four : 4 }, { one : 1, two : 2, three : 3 } ) === false  ) ) {
		logger.log( "FAIL: Object.equalTo( { one : 1, two : 2, three : 3, four : 4 }, { one : 1, two : 2, three : 3 } ) === false " );
	}
	
	if ( !( Object.equalTo( { one : 1, two : 2, three : 3 }, { one : 1, two : 2, three : 3, four : 4 } ) === false  ) ) {
		logger.log( "FAIL: Object.equalTo( { one : 1, two : 2, three : 3 }, { one : 1, two : 2, three : 3, four : 4 } ) === false " );
	}
}();

;!function() {
	logger.group( '<static> ownKeys' );

	if ( !( Object.equalTo( Object.ownKeys( { foo : 'bar' } ), ['foo'] )  ) ) {
		logger.log( "FAIL: Object.equalTo( Object.ownKeys( { foo : 'bar' } ), ['foo'] ) " );
	}
	
	if ( !( Object.equalTo( Object.ownKeys( ['foo', 'bar'] ).sort(), ['0', '1', 'length'] )  ) ) {
		logger.log( "FAIL: Object.equalTo( Object.ownKeys( ['foo', 'bar'] ).sort(), ['0', '1', 'length'] ) " );
	}
}();

;!function() {
	logger.group( '<static> ownLen' );

	if ( !( Object.equalTo( Object.ownLen( { foo : 'bar' } ), 1 )  ) ) {
		logger.log( "FAIL: Object.equalTo( Object.ownLen( { foo : 'bar' } ), 1 ) " );
	}
	
	if ( !( Object.equalTo( Object.ownLen( ['foo', 'bar'] ), 3 )  ) ) {
		logger.log( "FAIL: Object.equalTo( Object.ownLen( ['foo', 'bar'] ), 3 ) " );
	}
}();

;!function() {
	logger.group( '<static> values' );

	if ( !( Object.equalTo( Object.values( { one : 1, two : 2, three : 3, four : 4, five : 5 } ), [1, 2, 3, 4, 5] )  ) ) {
		logger.log( "FAIL: Object.equalTo( Object.values( { one : 1, two : 2, three : 3, four : 4, five : 5 } ), [1, 2, 3, 4, 5] ) " );
	}
	
	if ( !( Object.equalTo( Object.values( [1, 2, 3, 4, 5] ), [1, 2, 3, 4, 5] )  ) ) {
		logger.log( "FAIL: Object.equalTo( Object.values( [1, 2, 3, 4, 5] ), [1, 2, 3, 4, 5] ) " );
	}
}();

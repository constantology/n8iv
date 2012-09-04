logger.group( 'Number' );

;!function() {
	logger.group( '<static> isInteger' );
		
	
	if ( !( Number.isInteger( 1 ) === true  ) ) {
		logger.log( "FAIL: Number.isInteger( 1 ) === true " );
	}
	
	if ( !( Number.isInteger( parseInt( '0x1e10' ) ) === true  ) ) {
		logger.log( "FAIL: Number.isInteger( parseInt( '0x1e10' ) ) === true " );
	}
	
	if ( !( Number.isInteger( Number.toInteger( '0x1e10' ) ) === true  ) ) {
		logger.log( "FAIL: Number.isInteger( Number.toInteger( '0x1e10' ) ) === true " );
	}
	
	if ( !( Number.isInteger(  Infinity ) === false  ) ) {
		logger.log( "FAIL: Number.isInteger(  Infinity ) === false " );
	}
	
	if ( !( Number.isInteger( -Infinity ) === false  ) ) {
		logger.log( "FAIL: Number.isInteger( -Infinity ) === false " );
	}
	
	if ( !( Number.isInteger( Number.MIN_VALUE ) === false  ) ) {
		logger.log( "FAIL: Number.isInteger( Number.MIN_VALUE ) === false " );
	}
	
	if ( !( Number.isInteger( Number.MAX_VALUE ) === false  ) ) {
		logger.log( "FAIL: Number.isInteger( Number.MAX_VALUE ) === false " );
	}
	
	if ( !( Number.isInteger( '0x1e10' ) === false  ) ) {
		logger.log( "FAIL: Number.isInteger( '0x1e10' ) === false " );
	}
}();

;!function() {
	logger.group( '<static> toInteger' );
		
	
	if ( !( Object.equalTo( Number.toInteger(  '1' ), 1 )  ) ) {
		logger.log( "FAIL: Object.equalTo( Number.toInteger(  '1' ), 1 ) " );
	}
	
	if ( !( Object.equalTo( Number.toInteger(  'Infinity' ), Number.POSITIVE_INFINITY )  ) ) {
		logger.log( "FAIL: Object.equalTo( Number.toInteger(  'Infinity' ), Number.POSITIVE_INFINITY ) " );
	}
	
	if ( !( Object.equalTo( Number.toInteger( '-Infinity' ), Number.NEGATIVE_INFINITY )  ) ) {
		logger.log( "FAIL: Object.equalTo( Number.toInteger( '-Infinity' ), Number.NEGATIVE_INFINITY ) " );
	}
//	
	if ( !( Object.equalTo( Number.toInteger( String( Number.MIN_VALUE ) ), 0 )  ) ) {
		logger.log( "FAIL: Object.equalTo( Number.toInteger( String( Number.MIN_VALUE ) ), 0 ) " );
	}
	
	if ( !( Object.equalTo( Number.toInteger( String( Number.MAX_VALUE ) ), Number.MAX_VALUE )  ) ) {
		logger.log( "FAIL: Object.equalTo( Number.toInteger( String( Number.MAX_VALUE ) ), Number.MAX_VALUE ) " );
	}
	
	if ( !( Object.equalTo( Number.toInteger( 'foo' ), 0 )  ) ) {
		logger.log( "FAIL: Object.equalTo( Number.toInteger( 'foo' ), 0 ) " );
	}
	
	if ( !( Object.equalTo( Number.toInteger( '0x1e10' ), 7696 )  ) ) {
		logger.log( "FAIL: Object.equalTo( Number.toInteger( '0x1e10' ), 7696 ) " );
	}
}();

;!function() {
	logger.group( 'pad' );
		
	
	if ( !( Object.equalTo( ( 1 ).pad( 3 ), '001' )  ) ) {
		logger.log( "FAIL: Object.equalTo( ( 1 ).pad( 3 ), '001' ) " );
	}
	
	if ( !( Object.equalTo( ( 100 ).pad( 3 ), '100' )  ) ) {
		logger.log( "FAIL: Object.equalTo( ( 100 ).pad( 3 ), '100' ) " );
	}
}();

;!function() {
	logger.group( 'times' );
		
	var count = -1;

	( 3 ).times( function( o, i ) {
		
		if ( !( Object.equalTo( o, i )  ) ) {
			logger.log( "FAIL: Object.equalTo( o, i ) " );
		}
		++count;
	} );
	
	if ( !( Object.equalTo( count, 3 )  ) ) {
		logger.log( "FAIL: Object.equalTo( count, 3 ) " );
	}
}();

;!function() {
	logger.group( 'toHex' );
		
	
	if ( !( Object.equalTo( ( 0 ).toHex(), '00' )  ) ) {
		logger.log( "FAIL: Object.equalTo( ( 0 ).toHex(), '00' ) " );
	}
	
	if ( !( Object.equalTo( ( 127 ).toHex(), '7f' )  ) ) {
		logger.log( "FAIL: Object.equalTo( ( 127 ).toHex(), '7f' ) " );
	}
	
	if ( !( Object.equalTo( ( 255 ).toHex(), 'ff' )  ) ) {
		logger.log( "FAIL: Object.equalTo( ( 255 ).toHex(), 'ff' ) " );
	}
}();

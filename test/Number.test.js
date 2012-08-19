typeof m8     !== 'undefined' || ( m8     = require( 'm8' ) );
typeof n8iv   !== 'undefined' || ( n8iv   = require( 'n8iv' ) );
typeof expect !== 'undefined' || ( expect = require( 'expect.js' ) );

suite( 'Number', function() {
	test( '<static> isInteger', function( done ) {
			expect( Number.isInteger( 1 ) ).to.be( true );
			expect( Number.isInteger( parseInt( '0x1e10' ) ) ).to.be( true );
			expect( Number.isInteger( Number.toInteger( '0x1e10' ) ) ).to.be( true );
			expect( Number.isInteger(  Infinity ) ).to.be( false );
			expect( Number.isInteger( -Infinity ) ).to.be( false );
			expect( Number.isInteger( Number.MIN_VALUE ) ).to.be( false );
			expect( Number.isInteger( Number.MAX_VALUE ) ).to.be( false );
			expect( Number.isInteger( '0x1e10' ) ).to.be( false );

		done();
	} );

	test( '<static> toInteger', function( done ) {
			expect( Number.toInteger(  '1' ) ).to.eql( 1 );
			expect( Number.toInteger(  'Infinity' ) ).to.eql( Number.POSITIVE_INFINITY );
			expect( Number.toInteger( '-Infinity' ) ).to.eql( Number.NEGATIVE_INFINITY );
//			expect( Number.toInteger( String( Number.MIN_VALUE ) ) ).to.eql( 0 );
			expect( Number.toInteger( String( Number.MAX_VALUE ) ) ).to.eql( Number.MAX_VALUE );
			expect( Number.toInteger( 'foo' ) ).to.eql( 0 );
			expect( Number.toInteger( '0x1e10' ) ).to.eql( 7696 );

		done();
	} );

	test( 'pad', function( done ) {
			expect( ( 1 ).pad( 3 ) ).to.eql( '001' );
			expect( ( 100 ).pad( 3 ) ).to.eql( '100' );

		done();
	} );

	test( 'times', function( done ) {
		var count = -1;

			( 3 ).times( function( o, i ) {
				expect( o ).to.eql( i );
				++count;
			} );
			expect( count ).to.eql( 3 );

		done();
	} );

	test( 'toHex', function( done ) {
			expect( ( 0 ).toHex() ).to.eql( '00' );
			expect( ( 127 ).toHex() ).to.eql( '7f' );
			expect( ( 255 ).toHex() ).to.eql( 'ff' );

		done();
	} );
} );

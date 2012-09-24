typeof m8   !== 'undefined' || ( m8   = require( 'm8'   ) );
typeof n8iv !== 'undefined' || ( n8iv = require( '../n8iv' ) );
typeof chai !== 'undefined' || ( chai = require( 'chai' ) );

expect = chai.expect;

suite( 'Number', function() {
	test( '<static> isInteger', function( done ) {
		expect( Number.isInteger( 1 ) ).to.equal( true );
		expect( Number.isInteger( parseInt( '0x1e10' ) ) ).to.equal( true );
		expect( Number.isInteger( Number.toInteger( '0x1e10' ) ) ).to.equal( true );
		expect( Number.isInteger(  Infinity ) ).to.equal( false );
		expect( Number.isInteger( -Infinity ) ).to.equal( false );
		expect( Number.isInteger( Number.MIN_VALUE ) ).to.equal( false );
		expect( Number.isInteger( Number.MAX_VALUE ) ).to.equal( false );
		expect( Number.isInteger( '0x1e10' ) ).to.equal( false );

		done();
	} );

	test( '<static> toInteger', function( done ) {
		expect( Number.toInteger(  '1' ) ).to.deep.equal( 1 );
		expect( Number.toInteger(  'Infinity' ) ).to.deep.equal( Number.POSITIVE_INFINITY );
		expect( Number.toInteger( '-Infinity' ) ).to.deep.equal( Number.NEGATIVE_INFINITY );
//		expect( Number.toInteger( String( Number.MIN_VALUE ) ) ).to.deep.equal( 0 );
		expect( Number.toInteger( String( Number.MAX_VALUE ) ) ).to.deep.equal( Number.MAX_VALUE );
		expect( Number.toInteger( 'foo' ) ).to.deep.equal( 0 );
		expect( Number.toInteger( '0x1e10' ) ).to.deep.equal( 7696 );

		done();
	} );

	test( 'pad', function( done ) {
		expect( ( 1 ).pad( 3 ) ).to.deep.equal( '001' );
		expect( ( 100 ).pad( 3 ) ).to.deep.equal( '100' );

		done();
	} );

	test( 'times', function( done ) {
		var count = -1;

		( 3 ).times( function( o, i ) {
			expect( o ).to.deep.equal( i );
			++count;
		} );
		expect( count ).to.deep.equal( 3 );

		done();
	} );

	test( 'toHex', function( done ) {
		expect( ( 0 ).toHex() ).to.deep.equal( '00' );
		expect( ( 127 ).toHex() ).to.deep.equal( '7f' );
		expect( ( 255 ).toHex() ).to.deep.equal( 'ff' );

		done();
	} );
} );

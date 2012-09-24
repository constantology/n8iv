typeof m8   !== 'undefined' || ( m8   = require( 'm8'   ) );
typeof n8iv !== 'undefined' || ( n8iv = require( '../n8iv' ) );
typeof chai !== 'undefined' || ( chai = require( 'chai' ) );

expect = chai.expect;

suite( 'Object', function() {
	test( '<static> aggregate', function( done ) {
		expect( Object.aggregate( { one : 1, two : 2, three : 3, four : 4, five : 5 }, 0, function( res, v, k, o ) {
			return res += v;
		} ) ).to.deep.equal( 15 );

		done();
	} );

	test( '<static> clear', function( done ) {
		expect( m8.empty( Object.clear( { one : 1, two : 2, three : 3, four : 4, five : 5 } ) ) ).to.equal( true );

		done();
	} );

	test( '<static> equalTo', function( done ) {
		expect( Object.equalTo( { one : 1, two : 2, three : 3 }, { one : 1, two : 2, three : 3 } ) ).to.equal( true );
		expect( Object.equalTo( Object.keys( { one : 1, two : 2, three : 3 } ), Object.keys( { one : 1, two : 2, three : 3 } ) ) ).to.equal( true );
		expect( Object.equalTo( Object.values( { one : 1, two : 2, three : 3 } ), Object.values( { one : 1, two : 2, three : 3 } ) ) ).to.equal( true );
		expect( Object.equalTo( new Date( 2012, 0, 1 ), new Date( 2012, 0, 1 ) ) ).to.equal( true );
		expect( Object.equalTo( { one : 1, two : 2, three : 3, four : 4 }, { one : 1, two : 2, three : 3 } ) ).to.equal( false );
		expect( Object.equalTo( { one : 1, two : 2, three : 3 }, { one : 1, two : 2, three : 3, four : 4 } ) ).to.equal( false );
		expect( Object.equalTo( { one : 1, two : 2, three : 3, four : 4 }, { one : 1, two : 2, three : 3 } ) ).to.equal( false );
		expect( Object.equalTo( { one : 1, two : 2, three : 3 }, { one : 1, two : 2, three : 3, four : 4 } ) ).to.equal( false );

		done();
	} );

	test( '<static> ownKeys', function( done ) {
		expect( Object.ownKeys( { foo : 'bar' } ) ).to.deep.equal( ['foo'] );
		expect( Object.ownKeys( ['foo', 'bar'] ).sort() ).to.deep.equal( ['0', '1', 'length'] );

		done();
	} );

	test( '<static> ownLen', function( done ) {
		expect( Object.ownLen( { foo : 'bar' } ) ).to.deep.equal( 1 );
		expect( Object.ownLen( ['foo', 'bar'] ) ).to.deep.equal( 3 );

		done();
	} );

	test( '<static> values', function( done ) {
		expect( Object.values( { one : 1, two : 2, three : 3, four : 4, five : 5 } ) ).to.deep.equal( [1, 2, 3, 4, 5] );
		expect( Object.values( [1, 2, 3, 4, 5] ) ).to.deep.equal( [1, 2, 3, 4, 5] );

		done();
	} );
} );

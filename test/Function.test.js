typeof m8   !== 'undefined' || ( m8   = require( 'm8'   ) );
typeof n8iv !== 'undefined' || ( n8iv = require( '../n8iv' ) );
typeof chai !== 'undefined' || ( chai = require( 'chai' ) );

expect = chai.expect;

suite( 'Function', function() {
	test( '<static> coerce', function( done ) {
		var a = [1, 2, 3];

		expect( Function.coerce( 'foo' )( 1, 2, 3) ).to.equal( 'foo' );
		expect( Function.coerce( a )( 4, 5, 6 ) ).to.equal( a );
		expect( Function.coerce( function( a, b, c ) { return [a, b, c]; } )( 7, 8, 9 ) ).to.deep.equal( [7, 8, 9] );

		done();
	} );

	test( 'params', function( done ) {
		expect( function( one ){}.params ).to.deep.equal( ['one'] );
		expect( function( one, two, three ){}.params ).to.deep.equal( ['one', 'two', 'three'] );
		expect( function(){}.params ).to.deep.equal( [] );

		done();
	} );

	test( 'attempt', function( done ) {
		var ctx = { foo : 'bar' };

		expect( ( function() {
			expect( this ).to.equal( ctx );
			expect( arguments ).to.deep.equal( [1, 2, 3] );
			return true;
		} ).attempt( ctx, 1, 2, 3 ) ).to.equal( true );
		expect( function() {
			throw new TypeError( 'TestError' );
		}.attempt() ).to.be.an.instanceof( TypeError );

		done();
	} );

	test( 'bake', function( done ) {
		function testBake( o, a, b, c ) {
			expect( o ).to.equal( test );
			expect( a ).to.deep.equal( 1 );
			expect( b ).to.deep.equal( 2 );
			expect( c ).to.deep.equal( 3 );
		}

		function Test() {}
		Test.prototype.baked = testBake.bake();

		var test = new Test();
		test.baked( 1, 2, 3 );

		done();
	} );

	test( 'defer', function( done ) {
		var ctx = { foo : 'bar' }, n = Date.now();
		( function() {
			var a = arguments, r = this;

// the reason the range is so high is because MSIE 10 f**ks out, MSIE9 and every other browser are fine
// must be one of them improved MSIE10 features, improved f**king out
			expect( Date.now() - n ).to.be.within( 0, 250 );
			expect( r ).to.equal( ctx );
			expect( a ).to.deep.equal( [1, 2, 3] );

			done();
		} ).defer( ctx, 1, 2, 3 );
	} );

	test( 'delay', function( done ) {
		var ctx = { foo : 'bar' }, n = Date.now();
		( function() {
			var a = arguments, r = this;

			expect( Date.now() - n ).to.be.within( 110, 175 );
			expect( r ).to.equal( ctx );
			expect( a ).to.deep.equal( [1, 2, 3] );

			done();
		} ).delay( 125, ctx, 1, 2, 3 );
	} );

	test( 'memoize', function( done ) {
		function Test() {}
		Test.prototype.method = function( a, b, c, d, e ) {
			this.prop = ( ( a ? a + ' ' : '' ) + ( b ? b + ' ' : '' ) + ( c ? c + ' ' : '' ) + ( d ? d + ' ' : '' ) + ( e ? e + ' ' : '' ) ).trim();
			return this.prop;
		};
		var t = new Test(),
			tm_original   = t.method.bind( t ),
			test_memoized = t.method.memoize( t, m8.obj( { 'testing' : 'testing', 'testing,memoization' : 'testing memoization' } ) );

		expect( test_memoized ).not.to.equal( tm_original );
		expect( test_memoized( 'testing' ) ).to.deep.equal( 'testing' );
		expect( test_memoized( 'testing', 'memoization' ) ).to.deep.equal( 'testing memoization' );
		expect( test_memoized( 'testing', 'memoization', 'but' ) ).to.deep.equal( 'testing memoization but' );
		expect( test_memoized( 'testing', 'memoization', 'but', 'not' ) ).to.deep.equal( 'testing memoization but not' );
		expect( test_memoized( 'testing', 'memoization', 'but', 'not', 'optimisation' ) ).to.deep.equal( 'testing memoization but not optimisation' );

		done();
	} );

	test( 'mimic', function( done ) {
		function one() {}
		function two() {}
		two.mimic( one );

		expect( one ).not.to.equal(  two );
		expect( one ).not.to.deep.equal( two );
		expect( one.valueOf()  ).to.deep.equal( two.valueOf()  );
		expect( one.toString() ).to.deep.equal( two.toString() );

		done();
	} );

	test( 'wrap', function( done ) {
		done.wrap( function( done ) {
			expect( done ).to.be.an( 'function' );
			done();
		} )();
	} );
} );

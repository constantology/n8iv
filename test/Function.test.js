typeof m8     !== 'undefined' || ( m8     = require( 'm8' ) );
typeof n8iv   !== 'undefined' || ( n8iv   = require( 'n8iv' ) );
typeof expect !== 'undefined' || ( expect = require( 'expect.js' ) );

suite( 'Function', function() {
	test( '<static> coerce', function( done ) {
		var a = [1, 2, 3];

			expect( Function.coerce( 'foo' )( 1, 2, 3) ).to.be( 'foo' );
			expect( Function.coerce( a )( 4, 5, 6 ) ).to.be( a );
			expect( Function.coerce( function( a, b, c ) { return [a, b, c]; } )( 7, 8, 9 ) ).to.eql( [7, 8, 9] );

		done();
	} );

	test( 'params', function( done ) {
			expect( function( one ){}.params ).to.eql( ['one'] );
			expect( function( one, two, three ){}.params ).to.eql( ['one', 'two', 'three'] );
			expect( function(){}.params ).to.eql( [] );

		done();
	} );

	test( 'attempt', function( done ) {
		var ctx = { foo : 'bar' };

			expect( ( function() {
				expect( this ).to.be( ctx );
				expect( arguments ).to.eql( [1, 2, 3] );
				return true;
			} ).attempt( ctx, 1, 2, 3 ) ).to.be( true );
			expect( function() {
				throw new TypeError( 'TestError' );
			}.attempt() ).to.be.a( TypeError );

		done();
	} );

	test( 'bake', function( done ) {
			function testBake( o, a, b, c ) {
				expect( o ).to.be( test );
				expect( a ).to.eql( 1 );
				expect( b ).to.eql( 2 );
				expect( c ).to.eql( 3 );
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

				expect( Date.now() - n ).to.be.within( 0, 50 );
				expect( r ).to.be( ctx );
				expect( a ).to.eql( [1, 2, 3] );

			done();
		} ).defer( ctx, 1, 2, 3 );

	} );

	test( 'delay', function( done ) {
		var ctx = { foo : 'bar' }, n = Date.now();
		( function() {
			var a = arguments, r = this;
				expect( Date.now() - n ).to.be.within( 110, 175 );
				expect( r ).to.be( ctx );
				expect( a ).to.eql( [1, 2, 3] );

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

			expect( test_memoized ).not.to.be( tm_original );
			expect( test_memoized( 'testing' ) ).to.eql( 'testing' );
			expect( test_memoized( 'testing', 'memoization' ) ).to.eql( 'testing memoization' );
			expect( test_memoized( 'testing', 'memoization', 'but' ) ).to.eql( 'testing memoization but' );
			expect( test_memoized( 'testing', 'memoization', 'but', 'not' ) ).to.eql( 'testing memoization but not' );
			expect( test_memoized( 'testing', 'memoization', 'but', 'not', 'optimisation' ) ).to.eql( 'testing memoization but not optimisation' );

		done();
	} );

	test( 'mimic', function( done ) {
		function one() {}
		function two() {}
		two.mimic( one );

			expect( one ).not.to.be(  two );
			expect( one ).not.to.eql( two );
			expect( one.valueOf()  ).to.eql( two.valueOf()  );
			expect( one.toString() ).to.eql( two.toString() );

		done();
	} );

	test( 'wrap', function( done ) {
		done.wrap( function( done ) {
			expect( done ).to.be.an( 'function' );
			done();
		} )();

	} );
} );

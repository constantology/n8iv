typeof m8     !== 'undefined' || ( m8     = require( 'm8' ) );
typeof n8iv   !== 'undefined' || ( n8iv   = require( 'n8iv' ) );
typeof expect !== 'undefined' || ( expect = require( 'expect.js' ) );

suite( 'Array', function() {
	test( 'aggregate', function( done ) {
			expect( [1, 2, 3, 4, 5].aggregate( 0, function ( v, n ) { return v += n; } ) ).to.eql( 15 );
			expect( [1, 2, 3, 4, 5].aggregate( 0, function ( v, n ) { return v += n + this; }, 10 ) ).to.eql( 65 );

		done();
	} );

	test( 'associate', function( done ) {
		var expected = { 'one' : 1, 'two' : 2, 'three' : 3 },
			keys     = ['one', 'two', 'three'],
			values   = [1, 2, 3],
			returned = values.associate( keys );

			expect( returned ).to.be.an( 'object' );
			expect( returned ).to.eql( expected );
			expect( values.associate( keys, function( v ) { return this + v.pad( 2 ); }, 'VALUE_' ) ).to.eql( { 'one' : 'VALUE_01', 'two' : 'VALUE_02', 'three' : 'VALUE_03' } );

		done();
	} );

	test( 'clear', function( done ) {
			expect( [1, 2, 3, 4, 5].clear() ).to.eql( [] );
			expect( [1, 2, 3, 4, 5].clear().length ).to.eql( 0 );

		done();
	} );

	test( 'clone', function( done ) {
		var a = [1, 2, 3, 4, 5].clone();

			expect( a ).not.to.be( [1, 2, 3, 4, 5] );
			expect( a ).to.eql( [1, 2, 3, 4, 5] );

		done();
	} );

	test( 'compact', function( done ) {
			expect( [0, 1, undefined, 2, null, 3, NaN, 4, false, 5].compact() ).to.eql( [0, 1, 2, 3, 4, false, 5] );
			expect( [0, 1, undefined, 2, null, 3, NaN, 4, false, 5].compact( true ) ).to.eql( [1, 2, 3, 4, 5] );

		done();
	} );

	test( 'contains', function( done ) {
		var a = [1, 2, 3];

			expect( a.contains( 1 ) ).to.be( true );
			expect( a.contains( 2 ) ).to.be( true );
			expect( a.contains( 3 ) ).to.be( true );
			expect( a.contains( 4 ) ).to.be( false );

		done();
	} );

	test( 'each', function( done ) {
		var a = [1, 2, 3, 4, 5], ctx = { foo : 'bar' };

			expect( a.each( function( o, i ) {
				expect( o ).to.eql( a[i] );
				expect( this ).to.be( ctx );
			}, ctx ) ).to.eql( a );

		done();
	} );

	test( 'find', function( done ) {

			expect( [1, 2, 3, 4, 5].find( function( v ) { return v == 3; } ) ).to.eql( 3 );
			expect( [1, 2, 3, 4, 5].find( function( v ) { return v == 6; } ) ).to.be( null );

		done();
	} );

	test( 'flatten', function( done ) {
		var a = [1, 2, 3, [4, 5, 6, [7, 8, 9, [10, 11, 12]]]];

			expect( a.flatten() ).to.eql( [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] );
			expect( a.flatten( 1 ) ).to.eql( [1, 2, 3, 4, 5, 6, [7, 8, 9, [10, 11, 12]]] );
			expect( a.flatten( 2 ) ).to.eql( [1, 2, 3, 4, 5, 6, 7, 8, 9, [10, 11, 12]] );

		done();
	} );

	test( 'grep', function( done ) {
		var a = ['a', 'back', 'chapter'];

			expect( a.grep( /a/g, function( o, i ) { return i; } ) ).to.eql( [0, 1, 2] );
			expect( a.grep( /z/g ) ).to.eql( [] );

		done();
	} );

	test( 'groupBy', function( done ) {
		var o1 = { cls : 'one',     id : '1', role : 'foo', value : 'a' },
			o2 = { cls : 'one',     id : '2', role : 'foo', value : 'b' },
			o3 = { cls : 'one two', id : '3', role : 'bar', value : 'c' },
			o4 = { cls : 'two',     id : '4', role : 'bar', value : 'd' },
			a = [o1, o2, o3, o4];

			expect( a.groupBy( 'role' ) ).to.eql( { foo : [o1, o2], bar : [o3, o4] } );
			expect( a.groupBy( function( o ) { return o.cls.contains( 'one' ); } ) ).to.eql( { 0 : [o1, o2, o3], 1 : [o4] } );
			expect( a.pluck( 'cls' ).groupBy( /one/ ) ).to.eql( { 0 : ['one', 'one', 'one two'], 1 : ['two'] } );

		done();
	} );

	test( 'include', function( done ) {
		var a = [1, 2, 3];

			expect( a.include( 1 ) ).to.be( false );
			expect( a.include( 4 ) ).to.be( true );
			expect( a ).to.eql( [1, 2, 3, 4] );

		done();
	} );

	test( 'invoke', function( done ) {
			expect( [1, 2, 3, 4, 5].invoke( 'pad', 3 ) ).to.eql( ['001', '002', '003', '004', '005'] );

		done();
	} );

	test( 'invokec', function( done ) {
			expect( [
				{ toString : function() { return null; } },
				{ toString : function() { return 1; } },
				{ toString : function() { return undefined; } },
				{ toString : function() { return 2; } },
				{ toString : function() { return NaN; } },
				{ toString : function() { return 3; } }
			].invokec( 'toString' ) ).to.eql( [1, 2, 3] );

		done();
	} );

	test( 'item', function( done ) {
			expect( [1, 2, 3, 4, 5].item( 0 ) ).to.eql( 1 );
			expect( [1, 2, 3, 4, 5].item( -1 ) ).to.eql( 5 );
			expect( [1, 2, 3, 4, 5].item( -3 ) ).to.eql( 3 );
			expect( [1, 2, 3, 4, 5].item( 2 ) ).to.eql( 3 );

		done();
	} );

	test( 'last', function( done ) {
			expect( [1, 2, 3, 4, 5].last() ).to.eql( 5 );

		done();
	} );

	test( 'mapc', function( done ) {
			expect( [1, undefined, 2, null, 3, NaN].mapc( m8 ) ).to.eql( [1,2,3] );

		done();
	} );

	test( 'pluck', function( done ) {
			expect( [
				{ 'one' : 1, 'two' : 2, 'three' : 3 },
				{ 'one' : 1, 'two' : 2, 'three' : 3 },
				{ 'one' : 1, 'two' : 2, 'three' : 3 }
			].pluck( 'one' ) ).to.eql( [1, 1, 1] );
			expect( [
				{ 'one' : 1,         'two' : 2, 'three' : 3 },
				{ 'one' : undefined, 'two' : 2, 'three' : 3 },
				{ 'one' : 1,         'two' : 2, 'three' : 3 },
				{ 'one' : null,      'two' : 2, 'three' : 3 },
				{ 'one' : 1,         'two' : 2, 'three' : 3 }
			].pluck( 'one', true ) ).to.eql( [1, 1, 1] );
			expect( m8.range( 1, 10 ).map( function( o, i ) {
				return { src : { val : i } };
			} ).pluck( 'src.val' ) ).to.eql( m8.range( 0, 9 ) );
			expect( m8.range( 1, 10 ).map( function( o, i ) {
				return { src : { val : i % 2 ? i : null } };
			} ).pluck( 'src.val', true ) ).to.eql( [1, 3, 5, 7, 9] );

		done();
	} );

	test( 'remove', function( done ) {
		var a = m8.range( 0, 9 );

			expect( a.remove( 7, 8, 9 ) ).to.eql( [7, 8, 9] );
			expect( a ).to.eql( m8.range( 0, 6 ) );

		done();
	} );

	test( 'sortBy', function( done ) {
		var o1 = { cls : 'one',     id : '1', role : 'foo', value : 'a' },
			o2 = { cls : 'one',     id : '2', role : 'foo', value : 'b' },
			o3 = { cls : 'one two', id : '3', role : 'bar', value : 'c' },
			o4 = { cls : 'two',     id : '4', role : 'bar', value : 'd' },
			a = [o1, o2, o3, o4];

			expect( a.sortBy( 'id',    'desc' ) ).to.eql( [o4, o3, o2, o1] );
			expect( a.sortBy( 'role',  'asc'  ) ).to.eql( [o3, o4, o1, o2] );
			expect( a.sortBy( function( o ) {
				return o.cls.replace( /\s/g, '' );
			},
			function( a, b ) {
				return a[1] == b[1] ? a[0].value > a[0].value ? 1 : -1 : a[1] > b[1] ? 1 : -1;
			} ) ).to.eql( [o1, o2, o3, o4] );

		done();
	} );

	test( 'tuck', function( done ) {
			expect( [
				{ 'one' : 1, 'two' : 2, 'three' : 3 },
				{ 'one' : 1, 'two' : 2, 'three' : 3 },
				{ 'one' : 1, 'two' : 2, 'three' : 3 }
			].tuck( 'four', 4 ) ).to.eql( [
				{ 'one' : 1, 'two' : 2, 'three' : 3, 'four' : 4 },
				{ 'one' : 1, 'two' : 2, 'three' : 3, 'four' : 4 },
				{ 'one' : 1, 'two' : 2, 'three' : 3, 'four' : 4 }
			] );
			expect( [
				{ 'one' : 1, 'two' : 2, 'three' : 3 },
				{ 'one' : 1, 'two' : 2, 'three' : 3 },
				{ 'one' : 1, 'two' : 2, 'three' : 3 }
			].tuck( 'four', [4, 5, 6] ) ).to.eql( [
				{ 'one' : 1, 'two' : 2, 'three' : 3, 'four' : 4 },
				{ 'one' : 1, 'two' : 2, 'three' : 3, 'four' : 5 },
				{ 'one' : 1, 'two' : 2, 'three' : 3, 'four' : 6 }
			] );

		done();
	} );

	test( 'uniq', function( done ) {
		var a = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9],
				e = m8.range( 1, 9 ),
				r = a.uniq();

			expect( r ).not.to.be( a );
			expect( r ).to.eql( e );
			expect( r ).to.eql( e );

		done();
	} );

	test( 'without', function( done ) {
		var a = m8.range( 0, 9 );

			expect( a.without( 7, 8, 9 ) ).to.eql( m8.range( 0, 6 ) );
			expect( a ).to.eql( m8.range( 0, 9 ) );

		done();
	} );

	test( 'zip', function( done ) {
		var a1 = ['one', 'two', 'three'], a2 = [1, 2, 3], a3 = ['a', 'b', 'c'];

			expect( a2.zip( a1, a3 ) ).to.eql( [[1, 'one', 'a'], [2, 'two', 'b'], [3, 'three', 'c']] );

		done();
	} );
} );
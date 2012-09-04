typeof m8   !== 'undefined' || ( m8   = require( 'm8'   ) );
typeof n8iv !== 'undefined' || ( n8iv = require( 'n8iv' ) );
typeof chai !== 'undefined' || ( chai = require( 'chai' ) );

expect = chai.expect;

suite( 'String', function() {
	test( 'blank', function( done ) {
		expect( ''.blank()         ).to.equal( true );
		expect( '  '.blank()       ).to.equal( true );
		expect( '  \t\n\r'.blank() ).to.equal( true );
		expect( '  0     '.blank() ).to.equal( false );

		done();
	} );

	test( 'capitalize', function( done ) {
		expect( 'the quick brown fox jumps over the lazy dog.'.capitalize() ).to.deep.equal( 'The quick brown fox jumps over the lazy dog.' );
		expect( 'The quick brown fox jumps over the lazy dog.'.capitalize() ).to.deep.equal( 'The quick brown fox jumps over the lazy dog.' );
		expect( 'the Quick Brown Fox Jumps Over The Lazy Dog.'.capitalize() ).to.deep.equal( 'The quick brown fox jumps over the lazy dog.' );
		expect( 'The Quick Brown Fox Jumps Over The Lazy Dog.'.capitalize() ).to.deep.equal( 'The quick brown fox jumps over the lazy dog.' );

		done();
	} );

	test( 'clean', function( done ) {
		expect( '   the     quick   brown fox    jumps  over    the lazy dog.   '.clean() ).to.deep.equal( 'the quick brown fox jumps over the lazy dog.' );
		expect( '&nbsp;&nbsp;the&nbsp;&nbsp;&nbsp;&nbsp;quick&nbsp;&nbsp;&nbsp;&nbsp;brown fox&nbsp;&nbsp;&nbsp;jumps&nbsp;&nbsp;over&nbsp;the&nbsp;lazy&nbsp;dog.&nbsp;&nbsp;&nbsp;'.clean( '&nbsp;' ) ).to.deep.equal( 'the&nbsp;quick&nbsp;brown fox&nbsp;jumps&nbsp;over&nbsp;the&nbsp;lazy&nbsp;dog.' );

		done();
	} );

	test( 'contains', function( done ) {
		expect( 'the quick brown fox jumps over the lazy dog.'.contains( 'the'   ) ).to.equal( true );
		expect( 'the quick brown fox jumps over the lazy dog.'.contains( 'quick' ) ).to.equal( true );
		expect( 'the quick brown fox jumps over the lazy dog.'.contains( 'lazy'  ) ).to.equal( true );
		expect( 'the quick brown fox jumps over the lazy dog.'.contains( 'dog'   ) ).to.equal( true );
		expect( 'the quick brown fox jumps over the lazy dog.'.contains( 'n8iv'  ) ).to.equal( false );

		done();
	} );

	test( 'empty', function( done ) {
		expect( ''.empty()  ).to.equal( true );
		expect( ' '.empty() ).to.equal( false );
		expect( '0'.empty() ).to.equal( false );

		done();
	} );

	test( 'endsWith', function( done ) {
		expect( 'the quick brown fox jumps over the lazy dog.'.endsWith( 'dog.' ) ).to.equal( true );
		expect( 'the quick brown fox jumps over the lazy dog.'.endsWith( 'the'  ) ).to.equal( false );
		expect( 'the quick brown fox jumps over the lazy dog.'.endsWith( 'n8iv' ) ).to.equal( false );

		done();
	} );

	test( 'format', function( done ) {
		expect( '{0}, {1}, {2}, {3}, {4}, {5}, {6}, ${7}, ${8}, ${9}'.format( 'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine' ) ).to.deep.equal( 'zero, one, two, three, four, five, six, seven, eight, nine' );

		done();
	} );

	test( 'gsub', function( done ) {
		expect( 'The {one} {two} {three} jumps over the ${four} ${five}.'.gsub( {
			one   : 'quick', two  : 'brown',
			three : 'fox',   four : 'lazy',
			five  : 'dog'
		} ) ).to.deep.equal( 'The quick brown fox jumps over the lazy dog.' );
		expect( 'The ===one=== ===two=== ===three=== jumps over the ===four=== ===five===.'.gsub( {
			one   : 'quick', two  : 'brown',
			three : 'fox',   four : 'lazy',
			five  : 'dog'
		}, /={3}([^=]+)={3}/g ) ).to.deep.equal( 'The quick brown fox jumps over the lazy dog.' );

		done();
	} );

	test( 'hyphenate', function( done ) {
		expect( 'test_string_to_hyphenate'.hyphenate()  ).to.deep.equal( 'test-string-to-hyphenate'  );
		expect( 'testStringToHyphenate'.hyphenate()     ).to.deep.equal( 'test-string-to-hyphenate'  );
		expect( 'TestStringToHyphenate'.hyphenate()     ).to.deep.equal( 'test-string-to-hyphenate'  );
		expect( 'test-string-to-hyphenate'.hyphenate()  ).to.deep.equal( 'test-string-to-hyphenate'  );
		expect( '1 test string 2 hyphenate'.hyphenate() ).to.deep.equal( '1-test-string-2-hyphenate' );

		done();
	} );

	test( 'includes', function( done ) {
		expect( 'the quick brown fox jumps over the lazy dog.'.includes( 'THE'   ) ).to.equal( true );
		expect( 'the quick brown fox jumps over the lazy dog.'.includes( 'QUICK' ) ).to.equal( true );
		expect( 'the quick brown fox jumps over the lazy dog.'.includes( 'LAZY'  ) ).to.equal( true );
		expect( 'the quick brown fox jumps over the lazy dog.'.includes( 'DOG'   ) ).to.equal( true );
		expect( 'the quick brown fox jumps over the lazy dog.'.includes( 'THUD'  ) ).to.equal( false );

		done();
	} );

	test( 'parts', function( done ) {
		expect( '{0}{1}{2}'.parts( /\{\d\}/g )    ).to.deep.equal( ['{0}', '{1}', '{2}'] );
		expect( '{0}{1}{2}'.parts( /\d/g )        ).to.deep.equal( ['0', '1', '2']       );
		expect( '{0}4{1}5{2}6'.parts( /\{\d\}/g ) ).to.deep.equal( ['{0}', '{1}', '{2}'] );
		expect( '{0}4{1}5{2}6'.parts( /\d/g )     ).to.deep.equal( ['0', '4', '1', '5', '2', '6'] );

		done();
	} );

	test( 'regexpEsc', function( done ) {
		var expected = '!\\(\\)\\*\\+\\.:=\\?\\[\\]\\^\\{\\|\\}\\\\',
			returned = '!()*+.:=?[]^{|}\\'.regexpEsc();

		expect( returned ).to.deep.equal( expected );

		done();
	} );

	test( 'sliceEvery', function( done ) {
		expect( 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'.sliceEvery( 16 ) ).to.deep.equal( ['AaBbCcDdEeFfGgHh', 'IiJjKkLlMmNnOoPp', 'QqRrSsTtUuVvWwXx', 'YyZz0123456789'] );
		expect( 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'.sliceEvery(  8 ) ).to.deep.equal( ['AaBbCcDd', 'EeFfGgHh', 'IiJjKkLl', 'MmNnOoPp', 'QqRrSsTt', 'UuVvWwXx', 'YyZz0123', '456789'] );
		expect( 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'.sliceEvery(  4 ) ).to.deep.equal( ['AaBb', 'CcDd', 'EeFf', 'GgHh', 'IiJj', 'KkLl', 'MmNn', 'OoPp', 'QqRr', 'SsTt', 'UuVv', 'WwXx', 'YyZz', '0123', '4567', '89'] );

		done();
	} );

	test( 'startsWith', function( done ) {
		expect( 'the quick brown fox jumps over the lazy dog.'.startsWith( 'the'  ) ).to.equal( true );
		expect( 'the quick brown fox jumps over the lazy dog.'.startsWith( 'dog.' ) ).to.equal( false );
		expect( 'the quick brown fox jumps over the lazy dog.'.startsWith( 'n8iv' ) ).to.equal( false );

		done();
	} );

	test( 'times', function( done ) {
		expect( 'na'.times( 8 ) + ' batman!' ).to.deep.equal( 'nananananananana batman!' );

		done();
	} );

	test( 'toCamelCase', function( done ) {
		expect( 'test_string_to_camel_case'.toCamelCase()  ).to.deep.equal( 'testStringToCamelCase' );
		expect( 'testStringToCamelCase'.toCamelCase()      ).to.deep.equal( 'testStringToCamelCase' );
		expect( 'TestStringToCamelCase'.toCamelCase()      ).to.deep.equal( 'TestStringToCamelCase' );
		expect( 'test-string-to-camel-case'.toCamelCase()  ).to.deep.equal( 'testStringToCamelCase' );
		expect( '1 test string 2 camel case'.toCamelCase() ).to.deep.equal( '1TestString2CamelCase' );

		done();
	} );

	test( 'toHex', function( done ) {
		expect( '255'.toHex()                ).to.deep.equal( '#ffffff' );
		expect( '255255255'.toHex()          ).to.deep.equal( '#ffffff' );
		expect( '255,255,255'.toHex()        ).to.deep.equal( '#ffffff' );
		expect( 'rgb(255, 255, 255)'.toHex() ).to.deep.equal( '#ffffff' );

		done();
	} );

	test( 'toJSON', function( done ) {
		expect( '{ "foo" : "bar", "items" : [1, 2, 3] }'.toJSON() ).to.deep.equal( { foo : 'bar', items : [1, 2, 3] } );

		done();
	} );

	test( 'toRGB', function( done ) {
		expect( 'ff'.toRGB()            ).to.deep.equal( 'rgb(255, 255, 255)'  );
		expect( 'fff'.toRGB()           ).to.deep.equal( 'rgb(255, 255, 255)'  );
		expect( 'ffffff'.toRGB()        ).to.deep.equal( 'rgb(255, 255, 255)'  );
		expect( '#ffffff'.toRGB()       ).to.deep.equal( 'rgb(255, 255, 255)'  );
		expect( '#ffffff'.toRGB( true ) ).to.deep.equal( [255, 255, 255] );

		done();
	} );

	test( 'truncate', function( done ) {
		expect( 'The quick brown fox jumps over the lazy dog.'.truncate( 20 ) ).to.deep.equal( 'The quick brown fox...' );

		done();
	} );

	test( 'underscore', function( done ) {
		expect( 'test_string_to_underscore'.underscore()  ).to.deep.equal( 'test_string_to_underscore'  );
		expect( 'testStringToUnderscore'.underscore()     ).to.deep.equal( 'test_string_to_underscore'  );
		expect( 'TestStringToUnderscore'.underscore()     ).to.deep.equal( 'test_string_to_underscore'  );
		expect( 'test-string-to-underscore'.underscore()  ).to.deep.equal( 'test_string_to_underscore'  );
		expect( '1 test string 2 underscore'.underscore() ).to.deep.equal( '1_test_string_2_underscore' );

		done();
	} );
} );

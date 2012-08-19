typeof m8     !== 'undefined' || ( m8     = require( 'm8' ) );
typeof n8iv   !== 'undefined' || ( n8iv   = require( 'n8iv' ) );
typeof expect !== 'undefined' || ( expect = require( 'expect.js' ) );

suite( 'String', function() {
	test( 'blank', function( done ) {
			expect( ''.blank()         ).to.be( true );
			expect( '  '.blank()       ).to.be( true );
			expect( '  \t\n\r'.blank() ).to.be( true );
			expect( '  0     '.blank() ).to.be( false );

		done();
	} );

	test( 'capitalize', function( done ) {
			expect( 'the quick brown fox jumps over the lazy dog.'.capitalize() ).to.eql( 'The quick brown fox jumps over the lazy dog.' );
			expect( 'The quick brown fox jumps over the lazy dog.'.capitalize() ).to.eql( 'The quick brown fox jumps over the lazy dog.' );
			expect( 'the Quick Brown Fox Jumps Over The Lazy Dog.'.capitalize() ).to.eql( 'The quick brown fox jumps over the lazy dog.' );
			expect( 'The Quick Brown Fox Jumps Over The Lazy Dog.'.capitalize() ).to.eql( 'The quick brown fox jumps over the lazy dog.' );

		done();
	} );

	test( 'clean', function( done ) {
			expect( '   the     quick   brown fox    jumps  over    the lazy dog.   '.clean() ).to.eql( 'the quick brown fox jumps over the lazy dog.' );
			expect( '&nbsp;&nbsp;the&nbsp;&nbsp;&nbsp;&nbsp;quick&nbsp;&nbsp;&nbsp;&nbsp;brown fox&nbsp;&nbsp;&nbsp;jumps&nbsp;&nbsp;over&nbsp;the&nbsp;lazy&nbsp;dog.&nbsp;&nbsp;&nbsp;'.clean( '&nbsp;' ) ).to.eql( 'the&nbsp;quick&nbsp;brown fox&nbsp;jumps&nbsp;over&nbsp;the&nbsp;lazy&nbsp;dog.' );

		done();
	} );

	test( 'contains', function( done ) {
			expect( 'the quick brown fox jumps over the lazy dog.'.contains( 'the'   ) ).to.be( true );
			expect( 'the quick brown fox jumps over the lazy dog.'.contains( 'quick' ) ).to.be( true );
			expect( 'the quick brown fox jumps over the lazy dog.'.contains( 'lazy'  ) ).to.be( true );
			expect( 'the quick brown fox jumps over the lazy dog.'.contains( 'dog'   ) ).to.be( true );
			expect( 'the quick brown fox jumps over the lazy dog.'.contains( 'n8iv'  ) ).to.be( false );

		done();
	} );

	test( 'empty', function( done ) {
			expect( ''.empty()  ).to.be( true );
			expect( ' '.empty() ).to.be( false );
			expect( '0'.empty() ).to.be( false );

		done();
	} );

	test( 'endsWith', function( done ) {
			expect( 'the quick brown fox jumps over the lazy dog.'.endsWith( 'dog.' ) ).to.be( true );
			expect( 'the quick brown fox jumps over the lazy dog.'.endsWith( 'the'  ) ).to.be( false );
			expect( 'the quick brown fox jumps over the lazy dog.'.endsWith( 'n8iv' ) ).to.be( false );

		done();
	} );

	test( 'format', function( done ) {
			expect( '{0}, {1}, {2}, {3}, {4}, {5}, {6}, ${7}, ${8}, ${9}'.format( 'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine' ) ).to.eql( 'zero, one, two, three, four, five, six, seven, eight, nine' );

		done();
	} );

	test( 'gsub', function( done ) {
			expect( 'The {one} {two} {three} jumps over the ${four} ${five}.'.gsub( {
				one   : 'quick', two  : 'brown',
				three : 'fox',   four : 'lazy',
				five  : 'dog'
			} ) ).to.eql( 'The quick brown fox jumps over the lazy dog.' );
			expect( 'The ===one=== ===two=== ===three=== jumps over the ===four=== ===five===.'.gsub( {
				one   : 'quick', two  : 'brown',
				three : 'fox',   four : 'lazy',
				five  : 'dog'
			}, /={3}([^=]+)={3}/g ) ).to.eql( 'The quick brown fox jumps over the lazy dog.' );

		done();
	} );

	test( 'hyphenate', function( done ) {
			expect( 'test_string_to_hyphenate'.hyphenate()  ).to.eql( 'test-string-to-hyphenate'  );
			expect( 'testStringToHyphenate'.hyphenate()     ).to.eql( 'test-string-to-hyphenate'  );
			expect( 'TestStringToHyphenate'.hyphenate()     ).to.eql( 'test-string-to-hyphenate'  );
			expect( 'test-string-to-hyphenate'.hyphenate()  ).to.eql( 'test-string-to-hyphenate'  );
			expect( '1 test string 2 hyphenate'.hyphenate() ).to.eql( '1-test-string-2-hyphenate' );

		done();
	} );

	test( 'includes', function( done ) {
			expect( 'the quick brown fox jumps over the lazy dog.'.includes( 'THE'   ) ).to.be( true );
			expect( 'the quick brown fox jumps over the lazy dog.'.includes( 'QUICK' ) ).to.be( true );
			expect( 'the quick brown fox jumps over the lazy dog.'.includes( 'LAZY'  ) ).to.be( true );
			expect( 'the quick brown fox jumps over the lazy dog.'.includes( 'DOG'   ) ).to.be( true );
			expect( 'the quick brown fox jumps over the lazy dog.'.includes( 'THUD'  ) ).to.be( false );

		done();
	} );

	test( 'parts', function( done ) {
			expect( '{0}{1}{2}'.parts( /\{\d\}/g )    ).to.eql( ['{0}', '{1}', '{2}'] );
			expect( '{0}{1}{2}'.parts( /\d/g )        ).to.eql( ['0', '1', '2']       );
			expect( '{0}4{1}5{2}6'.parts( /\{\d\}/g ) ).to.eql( ['{0}', '{1}', '{2}'] );
			expect( '{0}4{1}5{2}6'.parts( /\d/g )     ).to.eql( ['0', '4', '1', '5', '2', '6'] );

		done();
	} );

	test( 'regexpEsc', function( done ) {
			var expected = '!\\(\\)\\*\\+\\.:=\\?\\[\\]\\^\\{\\|\\}\\\\',
				returned = '!()*+.:=?[]^{|}\\'.regexpEsc();

			expect( returned ).to.eql( expected );

		done();
	} );

	test( 'sliceEvery', function( done ) {
			expect( 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'.sliceEvery( 16 ) ).to.eql( ['AaBbCcDdEeFfGgHh', 'IiJjKkLlMmNnOoPp', 'QqRrSsTtUuVvWwXx', 'YyZz0123456789'] );
			expect( 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'.sliceEvery(  8 ) ).to.eql( ['AaBbCcDd', 'EeFfGgHh', 'IiJjKkLl', 'MmNnOoPp', 'QqRrSsTt', 'UuVvWwXx', 'YyZz0123', '456789'] );
			expect( 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'.sliceEvery(  4 ) ).to.eql( ['AaBb', 'CcDd', 'EeFf', 'GgHh', 'IiJj', 'KkLl', 'MmNn', 'OoPp', 'QqRr', 'SsTt', 'UuVv', 'WwXx', 'YyZz', '0123', '4567', '89'] );

		done();
	} );

	test( 'startsWith', function( done ) {
			expect( 'the quick brown fox jumps over the lazy dog.'.startsWith( 'the'  ) ).to.be( true );
			expect( 'the quick brown fox jumps over the lazy dog.'.startsWith( 'dog.' ) ).to.be( false );
			expect( 'the quick brown fox jumps over the lazy dog.'.startsWith( 'n8iv' ) ).to.be( false );

		done();
	} );

	test( 'times', function( done ) {
			expect( 'na'.times( 8 ) + ' batman!' ).to.eql( 'nananananananana batman!' );

		done();
	} );

	test( 'toCamelCase', function( done ) {
			expect( 'test_string_to_camel_case'.toCamelCase()  ).to.eql( 'testStringToCamelCase' );
			expect( 'testStringToCamelCase'.toCamelCase()      ).to.eql( 'testStringToCamelCase' );
			expect( 'TestStringToCamelCase'.toCamelCase()      ).to.eql( 'TestStringToCamelCase' );
			expect( 'test-string-to-camel-case'.toCamelCase()  ).to.eql( 'testStringToCamelCase' );
			expect( '1 test string 2 camel case'.toCamelCase() ).to.eql( '1TestString2CamelCase' );

		done();
	} );

	test( 'toHex', function( done ) {
			expect( '255'.toHex()                ).to.eql( '#ffffff' );
			expect( '255255255'.toHex()          ).to.eql( '#ffffff' );
			expect( '255,255,255'.toHex()        ).to.eql( '#ffffff' );
			expect( 'rgb(255, 255, 255)'.toHex() ).to.eql( '#ffffff' );

		done();
	} );

	test( 'toJSON', function( done ) {
			expect( '{ "foo" : "bar", "items" : [1, 2, 3] }'.toJSON() ).to.eql( { foo : 'bar', items : [1, 2, 3] } );

		done();
	} );

	test( 'toRGB', function( done ) {
			expect( 'ff'.toRGB()            ).to.eql( 'rgb(255, 255, 255)'  );
			expect( 'fff'.toRGB()           ).to.eql( 'rgb(255, 255, 255)'  );
			expect( 'ffffff'.toRGB()        ).to.eql( 'rgb(255, 255, 255)'  );
			expect( '#ffffff'.toRGB()       ).to.eql( 'rgb(255, 255, 255)'  );
			expect( '#ffffff'.toRGB( true ) ).to.eql( ['255', '255', '255'] );

		done();
	} );

	test( 'truncate', function( done ) {
			expect( 'The quick brown fox jumps over the lazy dog.'.truncate( 20 ) ).to.eql( 'The quick brown fox...' );

		done();
	} );

	test( 'underscore', function( done ) {
			expect( 'test_string_to_underscore'.underscore()  ).to.eql( 'test_string_to_underscore'  );
			expect( 'testStringToUnderscore'.underscore()     ).to.eql( 'test_string_to_underscore'  );
			expect( 'TestStringToUnderscore'.underscore()     ).to.eql( 'test_string_to_underscore'  );
			expect( 'test-string-to-underscore'.underscore()  ).to.eql( 'test_string_to_underscore'  );
			expect( '1 test string 2 underscore'.underscore() ).to.eql( '1_test_string_2_underscore' );

		done();
	} );
} );

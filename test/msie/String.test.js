logger.group( 'String' );

;!function() {
	logger.group( 'blank' );
		
			
	if ( !( ''.blank()         === true  ) ) {
		logger.log( "FAIL: ''.blank()         === true " );
	}
			
	if ( !( '  '.blank()       === true  ) ) {
		logger.log( "FAIL: '  '.blank()       === true " );
	}
			
	if ( !( '  \t\n\r'.blank() === true  ) ) {
		logger.log( "FAIL: '  \t\n\r'.blank() === true " );
	}
			
	if ( !( '  0     '.blank() === false  ) ) {
		logger.log( "FAIL: '  0     '.blank() === false " );
	}

}();

;!function() {
	logger.group( 'capitalize' );
		
			
	if ( !( Object.equalTo( 'the quick brown fox jumps over the lazy dog.'.capitalize(), 'The quick brown fox jumps over the lazy dog.' )  ) ) {
		logger.log( "FAIL: Object.equalTo( 'the quick brown fox jumps over the lazy dog.'.capitalize(), 'The quick brown fox jumps over the lazy dog.' ) " );
	}
			
	if ( !( Object.equalTo( 'The quick brown fox jumps over the lazy dog.'.capitalize(), 'The quick brown fox jumps over the lazy dog.' )  ) ) {
		logger.log( "FAIL: Object.equalTo( 'The quick brown fox jumps over the lazy dog.'.capitalize(), 'The quick brown fox jumps over the lazy dog.' ) " );
	}
			
	if ( !( Object.equalTo( 'the Quick Brown Fox Jumps Over The Lazy Dog.'.capitalize(), 'The quick brown fox jumps over the lazy dog.' )  ) ) {
		logger.log( "FAIL: Object.equalTo( 'the Quick Brown Fox Jumps Over The Lazy Dog.'.capitalize(), 'The quick brown fox jumps over the lazy dog.' ) " );
	}
			
	if ( !( Object.equalTo( 'The Quick Brown Fox Jumps Over The Lazy Dog.'.capitalize(), 'The quick brown fox jumps over the lazy dog.' )  ) ) {
		logger.log( "FAIL: Object.equalTo( 'The Quick Brown Fox Jumps Over The Lazy Dog.'.capitalize(), 'The quick brown fox jumps over the lazy dog.' ) " );
	}

}();

;!function() {
	logger.group( 'clean' );
		
			
	if ( !( Object.equalTo( '   the     quick   brown fox    jumps  over    the lazy dog.   '.clean(), 'the quick brown fox jumps over the lazy dog.' )  ) ) {
		logger.log( "FAIL: Object.equalTo( '   the     quick   brown fox    jumps  over    the lazy dog.   '.clean(), 'the quick brown fox jumps over the lazy dog.' ) " );
	}
			
	if ( !( Object.equalTo( '&nbsp;&nbsp;the&nbsp;&nbsp;&nbsp;&nbsp;quick&nbsp;&nbsp;&nbsp;&nbsp;brown fox&nbsp;&nbsp;&nbsp;jumps&nbsp;&nbsp;over&nbsp;the&nbsp;lazy&nbsp;dog.&nbsp;&nbsp;&nbsp;'.clean( '&nbsp;' ), 'the&nbsp;quick&nbsp;brown fox&nbsp;jumps&nbsp;over&nbsp;the&nbsp;lazy&nbsp;dog.' )  ) ) {
		logger.log( "FAIL: Object.equalTo( '&nbsp;&nbsp;the&nbsp;&nbsp;&nbsp;&nbsp;quick&nbsp;&nbsp;&nbsp;&nbsp;brown fox&nbsp;&nbsp;&nbsp;jumps&nbsp;&nbsp;over&nbsp;the&nbsp;lazy&nbsp;dog.&nbsp;&nbsp;&nbsp;'.clean( '&nbsp;' ), 'the&nbsp;quick&nbsp;brown fox&nbsp;jumps&nbsp;over&nbsp;the&nbsp;lazy&nbsp;dog.' ) " );
	}

}();

;!function() {
	logger.group( 'contains' );
		
			
	if ( !( 'the quick brown fox jumps over the lazy dog.'.contains( 'the'   ) === true  ) ) {
		logger.log( "FAIL: 'the quick brown fox jumps over the lazy dog.'.contains( 'the'   ) === true " );
	}
			
	if ( !( 'the quick brown fox jumps over the lazy dog.'.contains( 'quick' ) === true  ) ) {
		logger.log( "FAIL: 'the quick brown fox jumps over the lazy dog.'.contains( 'quick' ) === true " );
	}
			
	if ( !( 'the quick brown fox jumps over the lazy dog.'.contains( 'lazy'  ) === true  ) ) {
		logger.log( "FAIL: 'the quick brown fox jumps over the lazy dog.'.contains( 'lazy'  ) === true " );
	}
			
	if ( !( 'the quick brown fox jumps over the lazy dog.'.contains( 'dog'   ) === true  ) ) {
		logger.log( "FAIL: 'the quick brown fox jumps over the lazy dog.'.contains( 'dog'   ) === true " );
	}
			
	if ( !( 'the quick brown fox jumps over the lazy dog.'.contains( 'n8iv'  ) === false  ) ) {
		logger.log( "FAIL: 'the quick brown fox jumps over the lazy dog.'.contains( 'n8iv'  ) === false " );
	}

}();

;!function() {
	logger.group( 'empty' );
		
			
	if ( !( ''.empty()  === true  ) ) {
		logger.log( "FAIL: ''.empty()  === true " );
	}
			
	if ( !( ' '.empty() === false  ) ) {
		logger.log( "FAIL: ' '.empty() === false " );
	}
			
	if ( !( '0'.empty() === false  ) ) {
		logger.log( "FAIL: '0'.empty() === false " );
	}

}();

;!function() {
	logger.group( 'endsWith' );
		
			
	if ( !( 'the quick brown fox jumps over the lazy dog.'.endsWith( 'dog.' ) === true  ) ) {
		logger.log( "FAIL: 'the quick brown fox jumps over the lazy dog.'.endsWith( 'dog.' ) === true " );
	}
			
	if ( !( 'the quick brown fox jumps over the lazy dog.'.endsWith( 'the'  ) === false  ) ) {
		logger.log( "FAIL: 'the quick brown fox jumps over the lazy dog.'.endsWith( 'the'  ) === false " );
	}
			
	if ( !( 'the quick brown fox jumps over the lazy dog.'.endsWith( 'n8iv' ) === false  ) ) {
		logger.log( "FAIL: 'the quick brown fox jumps over the lazy dog.'.endsWith( 'n8iv' ) === false " );
	}

}();

;!function() {
	logger.group( 'format' );
		
			
	if ( !( Object.equalTo( '{0}, {1}, {2}, {3}, {4}, {5}, {6}, ${7}, ${8}, ${9}'.format( 'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine' ), 'zero, one, two, three, four, five, six, seven, eight, nine' )  ) ) {
		logger.log( "FAIL: Object.equalTo( '{0}, {1}, {2}, {3}, {4}, {5}, {6}, ${7}, ${8}, ${9}'.format( 'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine' ), 'zero, one, two, three, four, five, six, seven, eight, nine' ) " );
	}

}();

;!function() {
	logger.group( 'gsub' );
		
	if ( !( 'The {one} {two} {three} jumps over the ${four} ${five}.'.gsub( {
		one   : 'quick', two  : 'brown',
		three : 'fox',   four : 'lazy',
		five  : 'dog'
	} ) === 'The quick brown fox jumps over the lazy dog.' ) ) {
		logger.log( "FAIL: 'The {one} {two} {three} jumps over the ${four} ${five}.'.gsub( {\
			one   : 'quick', two  : 'brown',\
			three : 'fox',   four : 'lazy',\
			five  : 'dog'\
		} ) === 'The quick brown fox jumps over the lazy dog.' )" );
	}
	if ( !( 'The ===one=== ===two=== ===three=== jumps over the ===four=== ===five===.'.gsub( {
		one   : 'quick', two  : 'brown',
		three : 'fox',   four : 'lazy',
		five  : 'dog'
	}, /={3}([^=]+)={3}/g ) === 'The quick brown fox jumps over the lazy dog.' ) ) {
		logger.log( "FAIL: 'The ===one=== ===two=== ===three=== jumps over the ===four=== ===five===.'.gsub( {\
			one   : 'quick', two  : 'brown',\
			three : 'fox',   four : 'lazy',\
			five  : 'dog'\
		}, /={3}([^=]+)={3}/g ) === 'The quick brown fox jumps over the lazy dog.' )" );
	}
}();

;!function() {
	logger.group( 'hyphenate' );

	if ( !( Object.equalTo( 'test_string_to_hyphenate'.hyphenate() , 'test-string-to-hyphenate'  )  ) ) {
		logger.log( "FAIL: Object.equalTo( 'test_string_to_hyphenate'.hyphenate() , 'test-string-to-hyphenate'  ) " );
	}
	
	if ( !( Object.equalTo( 'testStringToHyphenate'.hyphenate()    , 'test-string-to-hyphenate'  )  ) ) {
		logger.log( "FAIL: Object.equalTo( 'testStringToHyphenate'.hyphenate()    , 'test-string-to-hyphenate'  ) " );
	}
	
	if ( !( Object.equalTo( 'TestStringToHyphenate'.hyphenate()    , 'test-string-to-hyphenate'  )  ) ) {
		logger.log( "FAIL: Object.equalTo( 'TestStringToHyphenate'.hyphenate()    , 'test-string-to-hyphenate'  ) " );
	}
	
	if ( !( Object.equalTo( 'test-string-to-hyphenate'.hyphenate() , 'test-string-to-hyphenate'  )  ) ) {
		logger.log( "FAIL: Object.equalTo( 'test-string-to-hyphenate'.hyphenate() , 'test-string-to-hyphenate'  ) " );
	}
	
	if ( !( Object.equalTo( '1 test string 2 hyphenate'.hyphenate(), '1-test-string-2-hyphenate' )  ) ) {
		logger.log( "FAIL: Object.equalTo( '1 test string 2 hyphenate'.hyphenate(), '1-test-string-2-hyphenate' ) " );
	}
}();

;!function() {
	logger.group( 'includes' );
		
	if ( !( 'the quick brown fox jumps over the lazy dog.'.includes( 'THE'   ) === true  ) ) {
		logger.log( "FAIL: 'the quick brown fox jumps over the lazy dog.'.includes( 'THE'   ) === true " );
	}
	
	if ( !( 'the quick brown fox jumps over the lazy dog.'.includes( 'QUICK' ) === true  ) ) {
		logger.log( "FAIL: 'the quick brown fox jumps over the lazy dog.'.includes( 'QUICK' ) === true " );
	}
	
	if ( !( 'the quick brown fox jumps over the lazy dog.'.includes( 'LAZY'  ) === true  ) ) {
		logger.log( "FAIL: 'the quick brown fox jumps over the lazy dog.'.includes( 'LAZY'  ) === true " );
	}
	
	if ( !( 'the quick brown fox jumps over the lazy dog.'.includes( 'DOG'   ) === true  ) ) {
		logger.log( "FAIL: 'the quick brown fox jumps over the lazy dog.'.includes( 'DOG'   ) === true " );
	}
	
	if ( !( 'the quick brown fox jumps over the lazy dog.'.includes( 'THUD'  ) === false  ) ) {
		logger.log( "FAIL: 'the quick brown fox jumps over the lazy dog.'.includes( 'THUD'  ) === false " );
	}
}();

;!function() {
	logger.group( 'parts' );
		
	if ( !( Object.equalTo( '{0}{1}{2}'.parts( /\{\d\}/g )   , ['{0}', '{1}', '{2}'] )  ) ) {
		logger.log( "FAIL: Object.equalTo( '{0}{1}{2}'.parts( /\{\d\}/g )   , ['{0}', '{1}', '{2}'] ) " );
	}
	
	if ( !( Object.equalTo( '{0}{1}{2}'.parts( /\d/g )       , ['0', '1', '2']       )  ) ) {
		logger.log( "FAIL: Object.equalTo( '{0}{1}{2}'.parts( /\d/g )       , ['0', '1', '2']       ) " );
	}
	
	if ( !( Object.equalTo( '{0}4{1}5{2}6'.parts( /\{\d\}/g ), ['{0}', '{1}', '{2}'] )  ) ) {
		logger.log( "FAIL: Object.equalTo( '{0}4{1}5{2}6'.parts( /\{\d\}/g ), ['{0}', '{1}', '{2}'] ) " );
	}
	
	if ( !( Object.equalTo( '{0}4{1}5{2}6'.parts( /\d/g )    , ['0', '4', '1', '5', '2', '6'] )  ) ) {
		logger.log( "FAIL: Object.equalTo( '{0}4{1}5{2}6'.parts( /\d/g )    , ['0', '4', '1', '5', '2', '6'] ) " );
	}
}();

;!function() {
	logger.group( 'regexpEsc' );
		
	var expected = '!\\(\\)\\*\\+\\.:=\\?\\[\\]\\^\\{\\|\\}\\\\',
		returned = '!()*+.:=?[]^{|}\\'.regexpEsc();
	
	if ( !( Object.equalTo( returned, expected )  ) ) {
		logger.log( "FAIL: Object.equalTo( returned, expected ) " );
	}
}();

;!function() {
	logger.group( 'sliceEvery' );

	if ( !( Object.equalTo( 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'.sliceEvery( 16 ), ['AaBbCcDdEeFfGgHh', 'IiJjKkLlMmNnOoPp', 'QqRrSsTtUuVvWwXx', 'YyZz0123456789'] )  ) ) {
		logger.log( "FAIL: Object.equalTo( 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'.sliceEvery( 16 ), ['AaBbCcDdEeFfGgHh', 'IiJjKkLlMmNnOoPp', 'QqRrSsTtUuVvWwXx', 'YyZz0123456789'] ) " );
	}
	
	if ( !( Object.equalTo( 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'.sliceEvery(  8 ), ['AaBbCcDd', 'EeFfGgHh', 'IiJjKkLl', 'MmNnOoPp', 'QqRrSsTt', 'UuVvWwXx', 'YyZz0123', '456789'] )  ) ) {
		logger.log( "FAIL: Object.equalTo( 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'.sliceEvery(  8 ), ['AaBbCcDd', 'EeFfGgHh', 'IiJjKkLl', 'MmNnOoPp', 'QqRrSsTt', 'UuVvWwXx', 'YyZz0123', '456789'] ) " );
	}
	
	if ( !( Object.equalTo( 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'.sliceEvery(  4 ), ['AaBb', 'CcDd', 'EeFf', 'GgHh', 'IiJj', 'KkLl', 'MmNn', 'OoPp', 'QqRr', 'SsTt', 'UuVv', 'WwXx', 'YyZz', '0123', '4567', '89'] )  ) ) {
		logger.log( "FAIL: Object.equalTo( 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'.sliceEvery(  4 ), ['AaBb', 'CcDd', 'EeFf', 'GgHh', 'IiJj', 'KkLl', 'MmNn', 'OoPp', 'QqRr', 'SsTt', 'UuVv', 'WwXx', 'YyZz', '0123', '4567', '89'] ) " );
	}
}();

;!function() {
	logger.group( 'startsWith' );

	if ( !( 'the quick brown fox jumps over the lazy dog.'.startsWith( 'the'  ) === true  ) ) {
		logger.log( "FAIL: 'the quick brown fox jumps over the lazy dog.'.startsWith( 'the'  ) === true " );
	}
	
	if ( !( 'the quick brown fox jumps over the lazy dog.'.startsWith( 'dog.' ) === false  ) ) {
		logger.log( "FAIL: 'the quick brown fox jumps over the lazy dog.'.startsWith( 'dog.' ) === false " );
	}
	
	if ( !( 'the quick brown fox jumps over the lazy dog.'.startsWith( 'n8iv' ) === false  ) ) {
		logger.log( "FAIL: 'the quick brown fox jumps over the lazy dog.'.startsWith( 'n8iv' ) === false " );
	}
}();

;!function() {
	logger.group( 'times' );

	if ( !( Object.equalTo( 'na'.times( 8 ) + ' batman!', 'nananananananana batman!' )  ) ) {
		logger.log( "FAIL: Object.equalTo( 'na'.times( 8 ) + ' batman!', 'nananananananana batman!' ) " );
	}
}();

;!function() {
	logger.group( 'toCamelCase' );

	if ( !( Object.equalTo( 'test_string_to_camel_case'.toCamelCase() , 'testStringToCamelCase' )  ) ) {
		logger.log( "FAIL: Object.equalTo( 'test_string_to_camel_case'.toCamelCase() , 'testStringToCamelCase' ) " );
	}
	
	if ( !( Object.equalTo( 'testStringToCamelCase'.toCamelCase()     , 'testStringToCamelCase' )  ) ) {
		logger.log( "FAIL: Object.equalTo( 'testStringToCamelCase'.toCamelCase()     , 'testStringToCamelCase' ) " );
	}
	
	if ( !( Object.equalTo( 'TestStringToCamelCase'.toCamelCase()     , 'TestStringToCamelCase' )  ) ) {
		logger.log( "FAIL: Object.equalTo( 'TestStringToCamelCase'.toCamelCase()     , 'TestStringToCamelCase' ) " );
	}
	
	if ( !( Object.equalTo( 'test-string-to-camel-case'.toCamelCase() , 'testStringToCamelCase' )  ) ) {
		logger.log( "FAIL: Object.equalTo( 'test-string-to-camel-case'.toCamelCase() , 'testStringToCamelCase' ) " );
	}
	
	if ( !( Object.equalTo( '1 test string 2 camel case'.toCamelCase(), '1TestString2CamelCase' )  ) ) {
		logger.log( "FAIL: Object.equalTo( '1 test string 2 camel case'.toCamelCase(), '1TestString2CamelCase' ) " );
	}
}();

;!function() {
	logger.group( 'toHex' );

	
	if ( !( Object.equalTo( '255'.toHex()               , '#ffffff' )  ) ) {
		logger.log( "FAIL: Object.equalTo( '255'.toHex()               , '#ffffff' ) " );
	}
	
	if ( !( Object.equalTo( '255255255'.toHex()         , '#ffffff' )  ) ) {
		logger.log( "FAIL: Object.equalTo( '255255255'.toHex()         , '#ffffff' ) " );
	}
	
	if ( !( Object.equalTo( '255,255,255'.toHex()       , '#ffffff' )  ) ) {
		logger.log( "FAIL: Object.equalTo( '255,255,255'.toHex()       , '#ffffff' ) " );
	}
	
	if ( !( Object.equalTo( 'rgb(255, 255, 255)'.toHex(), '#ffffff' )  ) ) {
		logger.log( "FAIL: Object.equalTo( 'rgb(255, 255, 255)'.toHex(), '#ffffff' ) " );
	}
}();

;!function() {
	logger.group( 'toJSON' );
		
	if ( !( Object.equalTo( '{ "foo" : "bar", "items" : [1, 2, 3] }'.toJSON(), { foo : 'bar', items : [1, 2, 3] } )  ) ) {
		logger.log( "FAIL: Object.equalTo( '{ \"foo\" : \"bar\", \"items\" : [1, 2, 3] }'.toJSON(), { foo : 'bar', items : [1, 2, 3] } ) " );
	}
}();

;!function() {
	logger.group( 'toRGB' );

	if ( !( Object.equalTo( 'ff'.toRGB()           , 'rgb(255, 255, 255)'  )  ) ) {
		logger.log( "FAIL: Object.equalTo( 'ff'.toRGB()           , 'rgb(255, 255, 255)'  ) " );
	}
	
	if ( !( Object.equalTo( 'fff'.toRGB()          , 'rgb(255, 255, 255)'  )  ) ) {
		logger.log( "FAIL: Object.equalTo( 'fff'.toRGB()          , 'rgb(255, 255, 255)'  ) " );
	}
	
	if ( !( Object.equalTo( 'ffffff'.toRGB()       , 'rgb(255, 255, 255)'  )  ) ) {
		logger.log( "FAIL: Object.equalTo( 'ffffff'.toRGB()       , 'rgb(255, 255, 255)'  ) " );
	}
	
	if ( !( Object.equalTo( '#ffffff'.toRGB()      , 'rgb(255, 255, 255)'  )  ) ) {
		logger.log( "FAIL: Object.equalTo( '#ffffff'.toRGB()      , 'rgb(255, 255, 255)'  ) " );
	}
	
	if ( !( Object.equalTo( '#ffffff'.toRGB( true ), ['255', '255', '255'] )  ) ) {
		logger.log( "FAIL: Object.equalTo( '#ffffff'.toRGB( true ), ['255', '255', '255'] ) " );
	}
}();

;!function() {
	logger.group( 'truncate' );
	
	if ( !( Object.equalTo( 'The quick brown fox jumps over the lazy dog.'.truncate( 20 ), 'The quick brown fox...' )  ) ) {
		logger.log( "FAIL: Object.equalTo( 'The quick brown fox jumps over the lazy dog.'.truncate( 20 ), 'The quick brown fox...' ) " );
	}
}();

;!function() {
	logger.group( 'underscore' );

	if ( !( Object.equalTo( 'test_string_to_underscore'.underscore() , 'test_string_to_underscore'  )  ) ) {
		logger.log( "FAIL: Object.equalTo( 'test_string_to_underscore'.underscore() , 'test_string_to_underscore'  ) " );
	}
	
	if ( !( Object.equalTo( 'testStringToUnderscore'.underscore()    , 'test_string_to_underscore'  )  ) ) {
		logger.log( "FAIL: Object.equalTo( 'testStringToUnderscore'.underscore()    , 'test_string_to_underscore'  ) " );
	}
	
	if ( !( Object.equalTo( 'TestStringToUnderscore'.underscore()    , 'test_string_to_underscore'  )  ) ) {
		logger.log( "FAIL: Object.equalTo( 'TestStringToUnderscore'.underscore()    , 'test_string_to_underscore'  ) " );
	}
	
	if ( !( Object.equalTo( 'test-string-to-underscore'.underscore() , 'test_string_to_underscore'  )  ) ) {
		logger.log( "FAIL: Object.equalTo( 'test-string-to-underscore'.underscore() , 'test_string_to_underscore'  ) " );
	}
	
	if ( !( Object.equalTo( '1 test string 2 underscore'.underscore(), '1_test_string_2_underscore' )  ) ) {
		logger.log( "FAIL: Object.equalTo( '1 test string 2 underscore'.underscore(), '1_test_string_2_underscore' ) " );
	}
}();

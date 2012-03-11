# String

## extensions to String.prototype

### blank():Boolean
Returns `true` if the String is empty or contains nothing but whitespace.

#### Example:

```javascript

   ''.blank()     // returns => true

   ' '.blank()    // returns => true

   'nope'.blank() // returns => false

```

### capitalize():String
Returns a copy of the String with the first character in uppercase and all subsequent characters in lowercase.

#### Example:

```javascript

   'LOREM IPSUM DOLOR'.capitalize() // returns => "Lorem ipsum dolor"

   'lorem ipsum dolor'.capitalize() // returns => "Lorem ipsum dolor"

   'Lorem Ipsum Dolor'.capitalize() // returns => "Lorem ipsum dolor"

   'Lorem ipsum dolor'.capitalize() // returns => "Lorem ipsum dolor"

```

### cc():String
Alias for `toCamelCase`.

### clean( [character:String] ):String
Returns a "clean" copy of the String with all duplicate characters removed. The most common example is removing multiple space characters from a String.

If no `character` is supplied, then a space character is used as the default.

#### Example:

```javascript

   '     '.clean()                                      // returns => ""

   '  lorem     ipsum dolor   '.clean()                 // returns => "lorem ipsum dolor"

   'one, two, two, one, two, two, one'.clean( 'two, ' ) // returns => "one, two, one, two, one"

```

### contains( string:String ):Boolean
Returns `true` if the String `contains` the passed `string`.

#### Example:

```javascript

   'lorem ipsum dolor'.contains( 'm ip' )  // returns => true

   'lorem ipsum dolor'.contains( 'IPSUM' ) // returns => false

   'lorem ipsum dolor'.contains( 'ipsum' ) // returns => false

   'lorem ipsum dolor'.contains( 'foo' )   // returns => false

```

### empty():Boolean
Returns `true` if the String is an empty String.

#### Example:

```javascript

   ''.empty()     // returns => true

   ' '.empty()    // returns => false

   'nope'.empty() // returns => false

```

### endsWith( string:String ):Boolean
Returns `true` if the String "ends with" the passed `string`.

#### Example:

```javascript

   'lorem ipsum dolor'.endsWith( 'dolor' ) // returns => true

   'lorem ipsum dolor'.endsWith( 'lorem' ) // returns => false

```

### format( arg1:String[, arg2:String, ..., argN:String] ):String
Replaces the – zero indexed – numeric tokens in the String with the passed parameters.

If a token does not have a value, an empty String is used in its place.

**NOTE:** `format` calls `gsub` internally.

#### Example:

```javascript

   '{0} {1} {2} {3}'.format( 'lorem', 'ipsum', 'dolor' ) // returns => "lorem ipsum dolor "

```

### gsub( dictionary:String[]|String{}[, pattern:RegExp] ):String
Replaces the tokens in the String with the values of the corresponding properties from the passed `dictionary` Object.

Also accepts an optional second parameter allowing you to define your own token matching `pattern`.

If a token does not have a value, an empty String is used in its place.

#### Example:

```javascript

   '{one} {two} {three} {four}'.format( { one : 'lorem', two : 'ipsum', three : 'dolor' } ) // returns => "lorem ipsum dolor "

```

### hyphenate():String
Returns a copy of the String with any spaces and/ or underscores replaced by hyphens.

When uppercase characters are encountered they are also replaced with a hyphen followed by their lowercase equivelant.

#### Example:

```javascript

   'Lorem IpsumDolor_sit'.hyphenate()     // returns => "lorem-ipsum-dolor-sit"

   'Lorem IPsumDolor_sit'.hyphenate()     // returns => "lorem-i-psum-dolor-sit"

   'Lorem    IpsumDolor_-sit'.hyphenate() // returns => "lorem-ipsum-dolor-sit"

```

### includes( string:String ):Boolean
Returns `true` if the String contains a **case insensitive** version of the passed `string`.

#### Example:

```javascript

   'lorem ipsum dolor'.includes( 'm ip' )  // returns => true

   'lorem ipsum dolor'.includes( 'IPSUM' ) // returns => true

   'lorem ipsum dolor'.includes( 'ipsum' ) // returns => true

   'lorem ipsum dolor'.includes( 'foo' )   // returns => false

```

### lc():String
Alias for `toLowerCase`.

#### Example:

```javascript

   'LOREM IPSUM DOLOR'.lc() // returns => "lorem ipsum dolor"

```

### parts( re:RegExp ):String[]
Returns an Array of the **matched** parts of the resulting RegExp or an empty Array if there are no matches.

#### Example:

```javascript

   'a 1, a 2, a 1, 2, 3, hit it!'.parts( /(\d)/g )      // returns => ["1", "2", "1", "2", "3"]

   'a 1, a 2, a 1, 2, 3, hit it!'.parts( /(["'\.]+)/g ) // returns => []

```

### qw():Array
Shorthand for splitting a String using `.split( ' ' );`.

#### Example:

```javascript

   'one two three'.qw() // returns => ["one", "two", "three"]

```

### regexpEsc():String
Returns a RegExp escaped version of the String.

**NOTE:** Since backslashes are used to escape characters if you need to include a backslash, you will need to escape it.

#### Example:

```javascript

   '£50.00 (GBP) == $100.00 (US) \\w'.regexpEsc() // returns => "£50\.00 \(GBP\) == \$100\.00 \(US\) \\w"

   '\\w.*\\d'.regexpEsc()                         // returns => "\\w\.\*\\d"

   '-*+?.|^$/\\()[]{}'.regexpEsc()                // returns => "\-\*\+\?\.\|\^\$\/\\\(\)\[\]\{\}"

```

### sliceEvery( length:Number ):String[]
Returns an Array of the String split into smaller strings equal to the `length`.

**NOTE:** It cannot be guaranteed that the last String in the Array will be the exact `length` provided.

#### Example:

```javascript

   'fourfourfourfour'.sliceEvery( 4 ) // returns => ["four", "four", "four", "four"]

   'ten'.times( 10 ).sliceEvery( 4 )  // returns => ["tent", "ente", "nten", "tent", "ente", "nten", "tent", "en"]

```

### startsWith( string:String ):Boolean
Returns `true` if the String "starts with" the passed `string`.

#### Example:

```javascript

   'lorem ipsum dolor'.startsWith( 'lorem' ) // returns => true

   'lorem ipsum dolor'.startsWith( 'dolor' ) // returns => false

```

### times( count:Number ):Number
Returns the String concatenated `count` times.

#### Example:

```javascript

   'three'.times( 3 ) // returns => "threethreethree"

```

### toCamelCase():String
Returns a copy of the String with any spaces and/ or hyphens removed and the lowercase character succeeding them transformed to uppercase.

#### Example:

```javascript

   'Lorem IpsumDolor_sit'.toCamelCase()     // returns => "LoremIpsumDolorSit"

   'Lorem IPsumDolor_sit'.toCamelCase()     // returns => "LoremIPsumDolorSit"

   'lorem    IpsumDolor_-sit'.toCamelCase() // returns => "loremIpsumDolorSit"

```

### toHex():String
Turns a String containing RGB colour values into a Hex.

#### Example:

```javascript

   '255, 153, 0'.toHex()    // returns => "#ff9900"

   '(255,153,0)'.toHex()    // returns => "#ff9900"

   'rgb(255,153,0)'.toHex() // returns => "#ff9900"

```

### toJSON():Mixed
Calls `JSON.parse` on the String instance and returns the output.

#### Example:

```javascript

   '{ "foo" : "bar" }'.toJSON()                    // returns => { foo : "bar" }

   '[1, 2, 3]'.toJSON()                            // returns => [1, 2, 3]

   '"foo"'.toJSON()                                // returns => "foo"

   '{ "foo" : "bar", items : [1, 2, 3] }'.toJSON() // returns => SyntaxError: JSON.parse: expected double-quoted property name

```

### toRGB( [as_array:Boolean] ):String|String[]
Turns a String containing Hexadecimal colour values into RGB.

Alternatively if the `as_array` parameter is set to `true` an Array of the three values is returned.

#### Example:

```javascript

   'ff9900'.toRGB()        // returns => "rgb(255, 153, 0)"

   'ff9900'.toRGB( true )  // returns => [255, 153, 0]

   '#ff9900'.toRGB()       // returns => "rgb(255, 153, 0)"

   '#ff9900'.toRGB( true ) // returns => [255, 153, 0]

```

### truncate( length:Number[, crop:String] ):String
Truncates the String to the given length, if the String is too long, adding an ellipsis at the end.

Accepts an optional second parameter to use instead of an ellipsis.

#### Example:

```javascript

   'lorem ipsum dolor'.truncate( 10 )             // returns => "lorem ipsu..."

   'lorem ipsum dolor'.truncate( 10, '... more' ) // returns => "lorem ipsu... more"

   'lorem ipsum dolor'.truncate( 20 )             // returns => "lorem ipsum dolor"

```

### uc():String
Alias for `toUpperCase`.

#### Example:

```javascript

   'lorem ipsum dolor'.uc() // returns => "LOREM IPSUM DOLOR"

```

### underscore():String
Returns a copy of the String with any spaces and/ or hyphens replaced by underscores.

When uppercase characters are encountered they are also replaced with a underscore followed by their lowercase equivelant.

#### Example:

```javascript

   'Lorem IpsumDolor_sit'.underscore()     // returns => "lorem_ipsum_dolor_sit"

   'Lorem IPsumDolor_sit'.underscore()     // returns => "lorem_i_psum_dolor_sit"

   'Lorem    IpsumDolor_-sit'.underscore() // returns => "lorem_ipsum_dolor_sit"

```

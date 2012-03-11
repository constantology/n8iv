# Array

## static methods

### from( value:Mixed ):Array
Returns an Array based on the passed `value`.

If the value is "Array like", e.g: a `HtmlCollection`, `NodeList` or Function `Arguments`, then an Array version will be returned.

Otherwise the `value` is wrapped in an Array and the Array is returned.

#### Example:

```html

   <body>
      <div id="one"></div>
      <div id="two"></div>
      <div id="three"></div>
   </body>

```

```javascript

   Array.from( document.body.children );                               // returns => [div#one, div#two, div#three]

   Array.from( document.body.querySelectorAll( '*' ) );                // returns => [div#one, div#two, div#three]

   Array.from( function( a, b, c ) { return arguments; }( 1, 2, 3 ) ); // returns => [1, 2, 3]

   Array.from( { one : 1, two : 2, three : 3 } );                      // returns => [{ one : 1, two : 2, three : 3 }]

```

## static properties

### sortFns:Function{}
Default ascending and descending sort Functions available for your convenience.

#### Example:

```html

   <body>
      <div id="one" data-pos="1"></div>
      <div id="two" data-pos="2"></div>
      <div id="three" data-pos="3"></div>
   </body>

```

```javascript

   Array.from( document.body.children ).sortBy( 'data-pos', 'desc' ); // returns => [div#three, div#two, div#one]

```

## extensions to Array.prototype

### aggregate( value:Mixed, iterator:Function[, context:Object] ):Mixed
Works similar to [Array.prototype.reduce](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/reduce) except that this `iterator` method accepts the initial `value` as the first parameter in the `arguments` Array.

Unlike `reduce`, you can also supply an optional `context` Object to `aggregate`.

#### Example:

```javascript

   [1, 2, 3].aggregate( 0, function( res, value ) {
      return res += value;
   } ); // returns => 6

```

**NOTE:** `aggregate` calls `reduce` internally, thereby alowing you to maintain the performance benefits of the native `iterator` method, while eliminating the need to write the same pattern of code repeatedly when using `reduce` with the need to maintain `context`.

### associate( array:Array[, iterator:Function, context:Object] ):Object
Returns an Object where each `key` in the Object are the items in the passed `array`; and each `key`'s `value` is the corresponding item in the Array instance.

`associate` also accepts an **optional** `iterator` Function and `context` Object to execute over each item in the Array instance and associate the `return value` of the `iterator` to the Object instead of the original item.

#### Example:

```javascript

   ['one', 'two', 'three'].associate( [1, 2, 3] ); // returns => { 1 : 'one', 2 : 'two', 3 : 'three' }

```

### clear():Array
Removes all the items in the Array and returns it.

#### Example:

```javascript

   var foo = [1, 2, 3];

   foo.clear(); // returns => []

   foo.length;  // returns => 0

```

### clone():Array
Returns an exact copy of the Array.

#### Example:

```javascript

   var foo = [1, 2, 3],
       bar = foo.clone();

   bar;                // returns => [1, 2, 3]

   foo.equalTo( bar ); // returns => true

   bar === foo         // returns => false

```

### compact( [falsey:Boolean] ):Array
Returns a copy of the Array with all `null` and `undefined` values removed.

Alternatively, to remove any value that is `falsey`, simply pass `true` as the first parameter.

#### Example:

```javascript

   [0, 1, undefined, 2, null, 3, false, 4, '', 5, NaN].compact();       // returns => [0, 1, 2, 3, false, 4, '', 5, NaN]

   [0, 1, undefined, 2, null, 3, false, 4, '', 5, NaN].compact( true ); // returns => [1, 2, 3, 4, 5]

```

### contains( value:Mixed ):Boolean
Returns `true` if the passed `value` is included in the Array, based on whether or not [Array.prototype.indexOf](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf) returns a Number greater than `-1`.

#### Example:

```javascript

   [1, 2, 3].contains( 1 ); // returns => true

   [1, 2, 3].contains( 0 ); // returns => false

```

### each( iterator:Function[, context:Object] ):Array
A wrapper for the native [Array.prototype.forEach](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach) that returns the Array instance, instead of undefined, allowing chainning.

### equalTo( array:Array ):Boolean
Returns `true` if the passed `array` is equal to the Array instance.

The conditions to satisfy the Array's being equal are:

- both Arrays must have the same length
- each item in the passed `array` must be present, and at the same index position in the Array instance.

#### Example:

```javascript

   [1, 2, 3].equalTo( [1, 2, 3] );    // returns => true

   [1, 2, 3].equalTo( [1, 2, 3, 4] ); // returns => false

```

### find( iterator:Function[, context:Object] ):Mixed
Returns the first item in the Array that returns a "truthy" value when executing the passed `iterator` function over the Array, or `null` if none is found.

#### Example:

```javascript

   [1, 2, 3, 4].find( function( value ) { return value > 2; } );                     // returns => 3

   [1, 2, 3, 4].find( function( value, index ) { return value > 2 && index > 2; } ); // returns => 4

   [1, 2, 3, 4].find( function( value ) { return value > 4; } );                     // returns => null

```

**REMEMBER:** The ACTUAL item in the Array is returned, NOT the `iterator`'s return value.

### flatten( [depth:Number] ):Array
Returns a one dimensional copy of the Array. Alternatively, you can pass a `depth` parameter to limit how many levels to `flatten`.

**NOTE:** `flatten` will stop iterating when a one-dimensional Array has been created, so if you pass a `depth` that is greater than the depth of nested Arrays you won't pay a perfomance penalty.

#### Example:

```javascript

  [1, 2, 3, [4, 5, 6, [7, 8, 9, [10, 11, 12]]]].flatten();      // returns => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  [1, 2, 3, [4, 5, 6, [7, 8, 9, [10, 11, 12]]]].flatten( 1 );   // returns => [1, 2, 3, 4, 5, 6, [7, 8, 9, [10, 11, 12]]]

  [1, 2, 3, [4, 5, 6, [7, 8, 9, [10, 11, 12]]]].flatten( 2 );   // returns => [1, 2, 3, 4, 5, 6, 7, 8, 9, [10, 11, 12]]

  [1, 2, 3, [4, 5, 6, [7, 8, 9, [10, 11, 12]]]].flatten( 3 );   // returns => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  [1, 2, 3, [4, 5, 6, [7, 8, 9, [10, 11, 12]]]].flatten( 100 ); // returns => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

```

### grep( re:RegExp[, iterator:Function, ctx:Object] ):Array
Returns an Array containing all of the items which, when tested against the supplied Regular Expression, returned `true`.

If an `iterator` Function is supplied, the matched items will be parsed through the `iterator` and the return values used to populate the Array.

#### Example:

```javascript

   var data = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipisicing', 'elit'];

   data.grep( /[mt]$/ );                     // returns => ["Lorem", "ipsum", "sit", "amet", "elit"]

   data.grep( /[mt]$/, String.toUpperCase ); // returns => ["LOREM", "IPSUM", "SIT", "AMET", "ELIT"]

```

### groupBy( field:Function|RegExp|String[, iterator:Function, context:Object] ):Array{}
Returns an Object whereby each item in the Array is grouped by either a specific `field` (String); or a Function or RegExp.

Also accepts an **optional** `iterator` Function and `context` Object to execute over each item in the Array assigning the `return value` to the grouped Array instead of the original item.

If grouping by a String `field`, the return Object's keys are the unique values obtained from each item's `field`.

If grouping by a Function or RegExp, the return Object's keys are `0` – where all items that **DID** match the Function or RegExp are assigned – and `1` – where all items that **DID NOT** match the Function or RegExp are assigned.

#### Example:

```javascript

   var data = [{ val : 'foo', id : 2 }, { val : 'bar', id : 3 }, { val : 'foo', id : 4 }, { val : 'bar', id : 1 }];

// Grouping by a String
   data.groupBy( 'val' );
   // returns => { "foo" : [{ "val" : "foo", "id" : 2 }, { "val" : "foo", "id" : 4 }], "bar" : [{ "val" : "bar", "id" : 3 }, { "val" : "bar", "id" : 1 }] }

// Grouping by a Function
   data.groupBy( function( o ) { return o.id < 3; } );
   // returns => { "0" : [{ "val" : "foo", "id" : 2}, { "val" : "bar", "id" : 1}], "1" : [{ "val" : "bar", "id" : 3 }, { "val" : "foo", "id" : 4 }] }

// Grouping by a RegExp
   data.pluck( 'val' ).groupBy( /oo/ );
   // returns => { "0" : ["foo", "foo"], "1" : ["bar","bar"] }

```

### include( value:Mixed ):Boolean
If the passed `value` is contained in the Array instance, `include` will return `false`; otherwise, the value will be added to the Array instance and `include` will return `true`.

```javascript

	var foo = [1, 2, 3];

	foo.include( 4 ); // returns => true

	foo;              // returns => [1, 2, 3, 4]

	foo.include( 2 ); // returns => false;

```

### invoke( method:String[, arg1:Mixed, arg2:Mixed, ..., argN:Mixed] ):Array
Executes the passed `method` – **NOTE:** `method` is a String, and should be the name of `method` that exists on each item in the Array – on each item in the Array, passing any extra arguments to each method call.

#### Example:

```javascript

   ['lorem', 'ipsum', 'dolor', 'sit', 'amet'].invoke( 'toUpperCase' ); // returns => ["LOREM", "IPSUM", "DOLOR", "SIT", "AMET"]

   [1, 2, 3, 4, 5, 6, 7, 8].invoke( 'pad', 4, 2 );                     // returns => ["0001", "0010", "0011", "0100", "0101", "0110", "0111", "1000"]

```

### invokec( method_name:String[, arg1:Mixed, arg2:Mixed, ..., argN:Mixed] ):Array
Works similar to `invoke` above, only any `null` and `undefined` values are omitted from the returned Array.

Think of it as an optimised version of running: `[].invoke().compact()`.

#### Example:

```javascript

   function iterator( v ) { return !( v % 4 ); }

// standard invoke method
   [[1, 2, 3], [4, 5, 6], [7, 8, 9]].invoke( 'find', iterator );  // returns => [null, 4, 8]

// invokec method
   [[1, 2, 3], [4, 5, 6], [7, 8, 9]].invokec( 'find', iterator ); // returns => [4, 8]

```

### item( i:Number ):Mixed
Returns the `item` at the specified index in the Array. If the index is a negative Number, then it will begin at the end of the Array.

#### Example:

```javascript

   [1, 2, 3, 4, 5, 6, 7, 8, 9].item(  3 ); // returns => 4

   [1, 2, 3, 4, 5, 6, 7, 8, 9].item( -3 ); // returns => 7

```

### last():Mixed
Returns the last item in the Array.

#### Example:

```javascript

   [1, 2, 3, 4, 5, 6, 7, 8, 9].last(); // returns => 9

```

**NOTE:** The reason there is no `first` method is because it's easier – and less characters – to just use `[0]`.

### mapc( iterator:Function[, context:Object] ):Array
Works similar to [Array.prototype.map](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/map), only any `null` and `undefined` values are omitted from the returned Array.

Think of it as an optimised version of running: `[].map().compact()`.

#### Example:

```javascript

   function iterator( v ) { return ( v % 2 ) ? null : v; }

   var data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// standard map method
   data.map( iterator );  // returns => [null, 2, null, 4, null, 6, null, 8, null]

// mapc method
   data.mapc( iterator ); // returns => [2, 4, 6, 8]

```

### pluck( key:String[, compact:Boolean] ):Array
Returns a new Array where all the items are the values of the passed property `key`.

If `compact` is set to `true` then all `null` and `undefined` values will be omitted from the returned Array.

**NOTE:** Unlike other `pluck` implementations, this implementation has a "smarter" way to get property values, allows you to `pluck` nested Object values, as well as HTML attributes.

#### Example:

```javascript

   var data = [{ data : { value : 'foo' } }, { data : { value : 'bar' } }, {}, { value : 'blim' }, { data : { value : 'blam' } }];

// slower, has to iterate twice
   data.pluck( 'data' ).pluck( 'value' );  // returns => ["foo", "bar", undefined, undefined, "blam"]

// optimised version of the above
   data.pluck( 'data.value' );             // returns => ["foo", "bar", undefined, undefined, "blam"]

   data.pluck( 'data.value', true );       // returns => ["foo", "bar", "blam"]

```

### remove( arg1:Mixed[, arg2:Mixed, ..., argN:Mixed] ):Array
Alters the Array by removing the passed items from the Array instance. Returns an Array with all the removed items.

#### Example:

```javascript

   var data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

   data.remove( 1, 3, 5, 7, 9 ); // returns => [1, 3, 5, 7, 9]

   data;                         // returns => [2, 4, 6, 8]

```

### sortBy( field:Function|String[, direction:String] ):Array
Returns a copy of the Array sorted by the passed `field`, either a String representing a property in each item, or a Function that returns a value to sort by.

Accepts a second `direction` argument allowing you to specify whether the sort is `asc`ending or `desc`ending.

#### Example:

```javascript

   var data = [{ val : 'foo', id : 2 }, { val : 'bar', id : 3 }, { val : 'foo', id : 4 }, { val : 'bar', id : 1 }];

   data.sortBy( 'id', 'asc' );
   // returns => [{ "val" : "bar", "id" : 1 }, { "val" : "foo", "id" : 2 },{ "val" : "bar", "id" : 3 },{ "val" : "foo", "id" : 4 }]

   data.sortBy( 'val', 'desc' );
   // returns => [{ "val" : "foo", "id" : 2 },{ "val" : "foo", "id" : 4 },{ "val" : "bar", "id" : 3 },{ "val" : "bar", "id" : 1 }]

   data.sortBy( function( o ) { return o.val.charCodeAt( 0 ) + o.id; }, 'desc' );
   // returns => [{ "val" : "foo", "id" : 4 }, { "val" : "foo", "id" : 2 },{ "val" : "bar", "id" : 3 },{ "val" : "bar", "id" : 1 }]

```

**NOTE:** The sorting works using a [Schwartzian transform](http://en.wikipedia.org/wiki/Schwartzian_transform), which – when looking at the implementation – might seem less performant, is actually significantly faster than a regular sort, especially when not sorting lexographically.

### tuck( key:String, array:Array|Mixed ):Array
Works the opposite to `pluck`, where the method assigns the items in the passed `array` to the passed `key`, for each item in the Array instance.

If a single value is given as the second parameter instead of an Array, then that same value is assigned to each item in the Array.

#### Example:

```javascript

   [{ id : 1 }, { id : 2 }, { id : 3 }, { id : 4 }].tuck( 'val', ['foo', 'bar', 'blim', 'blam'] );
   // returns => [{ "id" : 1, "val" : "foo" }, { "id" : 2, "val" : "bar" }, { "id" : 3, "val" : "blim" }, { "id" : 4, "val" : "blam" }]

   [{ id : 1 }, { id : 2 }, { id : 3 }, { id : 4 }].tuck( 'processed', true );
   // returns => [{ "id" : 1, "processed" : true }, { "id" : 2, "processed" : true }, { "id" : 3, "processed" : true }, { "id" : 4, "processed" : true }]

```

### uniq():Array
Returns a copy of the Array with all duplicate items removed.

Duplicates are determined based on whether the `contains` method – documented above – returns `true` or `false`.

#### Example:

```javascript

   [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9].uniq(); // returns => [1, 2, 3, 4, 5, 6, 7, 8, 9]

```

### without( arg1:Mixed[, arg2:Mixed, ..., argN:Mixed] ):Array
Returns a copy of the Array with all the passed items removed from it, leaving the original Array untouched.

#### Example:

```javascript

   var data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

   data.without( 1, 3, 5, 7, 9 ); // returns => [2, 4, 6, 8]

   data;                          // returns => [1, 2, 3, 4, 5, 6, 7, 8, 9]

```

### zip( array1:Array[, array2:Array, ..., arrayN:Array] ):Array[]
Returns a new multi-dimensional Array where each child Array represents the items at the specified index of all Arrays zipped.

#### Example:

```javascript

   [1, 2, 3].zip( [10, 20, 30], [100, 200, 300] ); // returns => [[1, 10, 100], [2, 20, 200], [3, 30, 300]]

```

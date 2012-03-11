# Object

## static methods

### aggregate( object:Object, value:Mixed, iterator:Function[, context:Object] ):Mixed
This works similar to `Object.reduce` except that the initial value is passed in as the second parameter instead of the last; and an **optional** `context` Object can be supplied.

If no `context` Object is supplied, the `object` being iterated over will be used as the `context` Object.

The `iterator` Function will receive 5 arguments:

<table border="0" cellpadding="0" cellspacing="0" width="100%">
	<tr><td>previous_value</td><td>When the <code>iterator</code> Function is first called, this will be the initially supplied <code>value</code>, after which it will be previous value returned by the <code>iterator</code> Function.</td></tr>
	<tr><td>value</td><td>The value of the item currently being iterated over.</td></tr>
	<tr><td>key</td><td>The key of the item currently being iterated over.</td></tr>
	<tr><td>object</td><td>The Object being iterated over.</td></tr>
	<tr><td>index</td><td>The zero based index of the item currently being iterated over.</td></tr>
</table>

#### Example:

```javascript

// the sum of all values of the passed object
   Object.aggregate( { one : 1, two : 2, three : 3 }, 0, function( previous_value, value, key, index, object ) {
        console.log( 'previous_value : ', previous_value, ', value : ', value, ', key : ', key, ', index : ', index );
		return previous_value += value;
   } );
// logs    => previous_value : 0, value : 1, key : one,   index : 0
// logs    => previous_value : 1, value : 2, key : two,   index : 1
// logs    => previous_value : 3, value : 3, key : three, index : 2
// returns => 6

```

### clear( object:Object ):Object
Removes all the passed `object`'s properties accessible via `Object.keys` and returns it.

#### Example:

```javascript

   var foo = { one : 1, two : 2, three : 3 };

   Object.len( foo );    // returns => 3

   Object.clear( foo );

   Object.len( foo );    // returns => 0

```

### clone( object:Object ):Object
Returns a copy of the passed `object`.

#### Example:

```javascript

   var foo = { one : 1, two : 2, three : 3 },
       bar = Object.clone( foo );

   foo ==  bar                 // returns => false

   foo === bar                 // returns => false

   Object.equalTo( foo, bar ); // returns => true

```

### each( object:Object, iterator:Function[, context:Object] ):Object
Iterates over the passed `object`, executing the `iterator` Function once for each item in the Object.

If a `context` Object is passed, it is used as the `this` value for the `iterator` Function, otherwise the passed `object` will be used as the `context`.

The `iterator` Function will receive 4 arguments:

<table border="0" cellpadding="0" cellspacing="0" width="100%">
	<tr><td>value</td><td>The value of the item currently being iterated over.</td></tr>
	<tr><td>key</td><td>The key of the item currently being iterated over.</td></tr>
	<tr><td>object</td><td>The Object being iterated over.</td></tr>
	<tr><td>index</td><td>The zero based index of the item currently being iterated over.</td></tr>
</table>

#### Example:

```javascript

   Object.each( { one : 1, two : 2, three : 3 }, function( value, key, index, object ) {
        console.log( 'value : ', value, ', key : ', key, ', index : ', index, ', object : ', object );
   } );
// logs    => value : 1, key : one,   index : 0, object : { one : 1, two : 2, three : 3 }
// logs    => value : 2, key : two,   index : 1, object : { one : 1, two : 2, three : 3 }
// logs    => value : 3, key : three, index : 2, object : { one : 1, two : 2, three : 3 }

```

### equalTo( object1:Object, object2:Object ):Boolean
Returns `true` if both Objects' key/ value pairs are equal, `false` otherwise.

#### Example:

```javascript

   var foo = { one : 1, two : 2, three : 3 },
       bar = Object.clone( foo );

   Object.equalTo( foo, bar ); // returns => true

   bar.four = 4;

   Object.equalTo( foo, bar ); // returns => false

```

### key( object:Object, value:Mixed ):Null|String
Returns the `object`'s property `key` for the passed `value` if `value` is a property of `object`. If not `null` is returned.

**NOTE:** `value` is determined based on the `===` operator.

#### Example:

```javascript

   var foo = { one : 1, two : 2, three : 3 };

   Object.key( foo, 2 ); // returns => "two"

   Object.key( foo, 4 ); // returns => null

```

### len( object:Object ):Number
Returns the `length` property of the Array returned when executing `Object.keys` on the passed Object.

#### Example:

```javascript

   Object.len( { one : 1, two : 2, three : 3 } ); // returns => 3

   Object.len( [1, 2, 3] );                       // returns => 3

```

### ownKeys( object:Object ):String[]
Shortened version of [Object.getOwnPropertyNames](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames).

#### Example:

```javascript

   Object.ownKeys( { one : 1, two : 2, three : 3 } ); // returns => ["one", "two", "three"]

   Object.ownKeys( [1, 2, 3] );                       // returns => ["length", "0", "1", "2"]

   Object.keys( [1, 2 ,3] );                          // returns => ["0", "1", "2"]

```

### ownLen( object:Object ):Number
Returns the `length` property of the Array returned when executing `Object.ownKeys` on the passed Object.

#### Example:

```javascript

   Object.ownLen( { one : 1, two : 2, three : 3 } ); // returns => 3

   Object.ownLen( [1, 2, 3] );                       // returns => 4

   Object.len( [1, 2 ,3] );                          // returns => 3

```

### value( object:Object, path:String ):Mixed
Returns the property value at the specified path in an Object.

#### Example:

```javascript

   var data = { one : { two : { three : true, four : [1, 2, 3, 4] } } };

   Object.prop( data, 'one' );            // returns => { two : { three : true, four : [1, 2, 3, 4] } }

   Object.prop( data, 'one.two' );        // returns => { three : true, four : [1, 2, 3, 4] }

   Object.prop( data, 'one.two.three' );  // returns => { three : true }

   Object.prop( data, 'one.two.four' );   // returns => [1, 2, 3, 4]

   Object.prop( data, 'one.two.four.2' ); // returns => 3

```

### reduce( object:Object, iterator:Function, value:Mixed ):Mixed
This is similar to [Array.reduce](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/reduce) except that it is used on Objects instead of Arrays.

The `iterator` Function will receive 5 arguments:

<table border="0" cellpadding="0" cellspacing="0" width="100%">
	<tr><td>previous_value</td><td>When the <code>iterator</code> Function is first called, this will be the initially supplied <code>value</code>, after which it will be previous value returned by the <code>iterator</code> Function.</td></tr>
	<tr><td>value</td><td>The value of the item currently being iterated over.</td></tr>
	<tr><td>key</td><td>The key of the item currently being iterated over.</td></tr>
	<tr><td>object</td><td>The Object being iterated over.</td></tr>
	<tr><td>index</td><td>The zero based index of the item currently being iterated over.</td></tr>
</table>

#### Example:

```javascript

// the sum of all values of the passed object
   Object.reduce( { one : 1, two : 2, three : 3 }, function( previous_value, value, key, index, object ) {
        console.log( 'previous_value : ', previous_value, ', value : ', value, ', key : ', key, ', index : ', index );
		return previous_value += value;
   }, 0 );
// logs    => previous_value : 0, value : 1, key : one,   index : 0
// logs    => previous_value : 1, value : 2, key : two,   index : 1
// logs    => previous_value : 3, value : 3, key : three, index : 2
// returns => 6

```

### remove( object:Object, key1:String[, key2:String, ..., key3:String] ):Object
Removes each `key` from the passed `object` and returns `object`.

#### Example:

```javascript

   var foo = { one : 1, two : 2, three : 3 };

   Object.remove( foo, 'one', 'three' );   // returns => { two : 2 }

   Object.remove( foo, ['one', 'three'] ); // same as above

```

### values( object:Object ):Array
Returns the `values` of the passed Object.

#### Example:

```javascript

   Object.values( { one : 1, two : 2, three : 3 } ); // returns => [1,2,3]

```

---------------------------------------
**NOTE:** The reason why other iterators like `map` are not included, is that they can be achieved using `Object.reduce` and/ or `Object.aggregate`. So to reduce file size they have been ommited.

---------------------------------------

## OMFG!!! extensions to Object.prototype

As mentioned previously, n8iv extends JavaScript Natives correctly, so you don't need to worry about having a bunch of enumerable properties/ methods on any of instances of a native JavaScript object.

There are no instance methods just one convenience getter.

### \_\_type\_\_:String
Returns a normalised type based on the result of executing `Object.prototype.toString.call` on the `context` Object.

**Note:** All types are **always** in lowercase.

Examples:

```javascript

   Object.type( null );                                   // throws => TypeError

   Object.type( undefined );                              // throws => TypeError

   Object.type( [] );                                     // returns => "array"

   Object.type( true );                                   // returns => "boolean"

   Object.type( new Date() );                             // returns => "date"

   Object.type( function() {} );                          // returns => "function"

   Object.type( 0 );                                      // returns => "number"

   Object.type( {} );                                     // returns => "object"

   Object.type( Object.create( null ) );                  // returns => "nullobject"

   Object.type( /.*/ );                                   // returns => "regexp"

   Object.type( '' );                                     // returns => "string"

   Object.type( document.createElement( 'div' ) );        // returns => "htmlelement"

   Object.type( document.querySelectorAll( 'div' ) );     // returns => "htmlcollection"

   Object.type( document.getElementsByTagName( 'div' ) ); // returns => "htmlcollection"

```

**NOTE:** you can define your own custom `__type__` property on any `Function.prototype` you create so all instances of your "JavaScript Class" will return their custom type.

This is handled automatically when using n8iv.Class to create a "JavaScript Class".

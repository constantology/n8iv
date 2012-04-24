# Object

## static methods

### Object.aggregate( object:Object, value:Mixed, iterator:Function[, context:Object] ):Mixed
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

### Object.clear( object:Object ):Object
Removes all the passed `object`'s properties accessible via `Object.keys` and returns it.

#### Example:

```javascript

   var foo = { one : 1, two : 2, three : 3 };

   m8.len( foo );    // returns => 3

   m8.clear( foo );

   m8.len( foo );    // returns => 0

```

### Object.equalTo( object1:Object, object2:Object ):Boolean
Returns `true` if both Objects' key/ value pairs are equal, `false` otherwise.

#### Example:

```javascript

   var foo = { one : 1, two : 2, three : 3 },
       bar = Object.clone( foo );

   Object.equalTo( foo, bar ); // returns => true

   bar.four = 4;

   Object.equalTo( foo, bar ); // returns => false

```

### Object.ownKeys( object:Object ):String[]
Shortened version of [Object.getOwnPropertyNames](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames).

#### Example:

```javascript

   Object.ownKeys( { one : 1, two : 2, three : 3 } ); // returns => ["one", "two", "three"]

   Object.ownKeys( [1, 2, 3] );                       // returns => ["length", "0", "1", "2"]

   Object.keys( [1, 2 ,3] );                          // returns => ["0", "1", "2"]

```

### Object.ownLen( object:Object ):Number
Returns the `length` property of the Array returned when executing `Object.ownKeys` on the passed Object.

#### Example:

```javascript

   Object.ownLen( { one : 1, two : 2, three : 3 } ); // returns => 3

   Object.ownLen( [1, 2, 3] );                       // returns => 4

   m8.len( [1, 2 ,3] );                              // returns => 3

   Object.ownLen( [1, 2, 3] ) === Object.getOwnPropertyNames( [1, 2, 3] ).length
   // returns => true

```

---------------------------------------

**NOTE:** The reason why other iterators like `map` are not included, is that they can be achieved using `Object.reduce` and/ or `Object.aggregate`. So to reduce file size they have been ommited.

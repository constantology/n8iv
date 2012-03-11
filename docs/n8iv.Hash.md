# n8iv.Hash( [object:Object] ):n8iv.Hash
Wraps the native JavaScript `Object` in order to allow you to work with Objects in a similar fashion to Arrays.

n8iv.Hash's store is private, i.e. not publicly accessible. You can use the `valueOf` instance method to get a copy of the Hash's internal store.

## configuration options

### object:Object
An initial `object` to populate the Hash's store with.

## instance properties

### keys:String[]
Returns the `Object.keys` of the Hash's store.

#### Example:

```javascript

   var hash = n8iv.Hash.create( { one : 1, two : 2, three : 3 } );

   hash.keys; // returns => ["one", "two", "three"]

```

### length:Number
Returns the item count – `length` – of the Hash's store.

#### Example:

```javascript

   var hash = n8iv.create( 'hash', { one : 1, two : 2, three : 3 } );

   hash.length; // returns => 3

```

### values:Array
Returns the `Object.values` of the Hash's store.

#### Example:

```javascript

   var hash = new n8iv.Hash( { one : 1, two : 2, three : 3 } );

   hash.values; // returns => [1, 2, 3]

```

## instance methods

### aggregate( val:Mixed, iterator:Function[, context:Object] ):Mixed
This works similar to `n8iv.Hash.prototype.reduce` except that the initial value is passed in as the second parameter instead of the last; and an **optional** `context` Object can be supplied.

If no `context` Object is supplied, the Hash instance will be used as the `context` Object.

The `iterator` Function will receive 5 arguments:

<table border="0" cellpadding="0" cellspacing="0" width="100%">
	<tr><td>previous_value</td><td>When the <code>iterator</code> Function is first called, this will be the initially supplied <code>value</code>, after which it will be previous value returned by the <code>iterator</code> Function.</td></tr>
	<tr><td>value</td><td>The value of the item currently being iterated over.</td></tr>
	<tr><td>key</td><td>The key of the item currently being iterated over.</td></tr>
	<tr><td>hash</td><td>The n8iv.Hash being iterated over.</td></tr>
	<tr><td>index</td><td>The zero based index of the item currently being iterated over.</td></tr>
</table>

#### Example:

```javascript

   var hash = n8iv.Hash.create( { one : 1, two : 2, three : 3 } );

// the sum of all values of the passed object
   hash.aggregate( 0, function( previous_value, value, key, index, hash ) {
        console.log( 'previous_value : ', previous_value, ', value : ', value, ', key : ', key, ', index : ', index );
		return previous_value += value;
   } );
// logs    => previous_value : 0, value : 1, key : one,   index : 0
// logs    => previous_value : 1, value : 2, key : two,   index : 1
// logs    => previous_value : 3, value : 3, key : three, index : 2
// returns => 6

```

### clear():n8iv.Hash
Clears the Hash's store.

#### Example:

```javascript

   var hash = n8iv.Hash.create( { one : 1, two : 2, three : 3 } );

   hash.length;  // returns => 3

   hash.clear(); // returns => 3

   hash.length;  // returns => 0

```

### each( iterator:Function[, context:Object] ):n8iv.Hash
Iterates over the Hash instance, executing the `iterator` Function once for each item in the Hash's store.

If a `context` Object is passed, it is used as the `this` value for the `iterator` Function, otherwise the passed Hash instance will be used as the `context`.

The `iterator` Function will receive 4 arguments:

<table border="0" cellpadding="0" cellspacing="0" width="100%">
	<tr><td>value</td><td>The value of the item currently being iterated over.</td></tr>
	<tr><td>key</td><td>The key of the item currently being iterated over.</td></tr>
	<tr><td>hash</td><td>The n8iv.Hash being iterated over.</td></tr>
	<tr><td>index</td><td>The zero based index of the item currently being iterated over.</td></tr>
</table>

#### Example:

```javascript

   var hash = n8iv.create( 'hash', { one : 1, two : 2, three : 3 } );

   hash.each( function( value, key, index, hash ) {
        console.log( 'value : ', value, ', key : ', key, ', index : ', index, ', hash : ', hash .valueOf() );
   } );
// logs    => value : 1, key : one,   index : 0, hash : { one : 1, two : 2, three : 3 }
// logs    => value : 2, key : two,   index : 1, hash : { one : 1, two : 2, three : 3 }
// logs    => value : 3, key : three, index : 2, hash : { one : 1, two : 2, three : 3 }

```

### get( key:String ):Mixed
Returns the value associated with the passed `key` or `null` if the `key` does not exist in the Hash's store.

#### Example:

```javascript

   var hash = new n8iv.Hash( { one : 1, two : 2, three : 3 } );

   hash.get( 'two' );  // returns => 2

   hash.get( 'foo' );  // returns => null

```

### has( key:String ):Boolean
Returns `true` if the passed `key` exists in the Hash's store, or `false` otherwise.

#### Example:

```javascript

   var hash = n8iv.Hash.create( { one : 1, two : 2, three : 3 } );

   hash.has( 'two' );  // returns => true

   hash.has( 'foo' );  // returns => false

```


### key( value:Mixed ):Null|String
Returns the property `key` for the passed `value` if `value` is a property of Hash's store. If not `null` is returned.

**NOTE:** `value` is determined based on the `===` operator.

#### Example:

```javascript

   var foo = n8iv.Hash.create( { one : 1, two : 2, three : 3 } );

   foo.key( foo, 2 ); // returns => "two"

   foo.key( foo, 4 ); // returns => null

```

### reduce( iterator:Function, val:Mixed ):Mixed
This is similar to `Object.reduce` except that it iterates over the Hash instance's store.

The `iterator` Function will receive 5 arguments:

<table border="0" cellpadding="0" cellspacing="0" width="100%">
	<tr><td>previous_value</td><td>When the <code>iterator</code> Function is first called, this will be the initially supplied <code>value</code>, after which it will be previous value returned by the <code>iterator</code> Function.</td></tr>
	<tr><td>value</td><td>The value of the item currently being iterated over.</td></tr>
	<tr><td>key</td><td>The key of the item currently being iterated over.</td></tr>
	<tr><td>hash</td><td>The n8iv.Hash being iterated over.</td></tr>
	<tr><td>index</td><td>The zero based index of the item currently being iterated over.</td></tr>
</table>

#### Example:

```javascript

   var hash = new n8iv.Hash( { one : 1, two : 2, three : 3 } );

// the sum of all values of the passed object
   hash.reduce( function( previous_value, value, key, index, hash ) {
        console.log( 'previous_value : ', previous_value, ', value : ', value, ', key : ', key, ', index : ', index );
		return previous_value += value;
   }, 0 );
// logs    => previous_value : 0, value : 1, key : one,   index : 0
// logs    => previous_value : 1, value : 2, key : two,   index : 1
// logs    => previous_value : 3, value : 3, key : three, index : 2
// returns => 6

```

### remove( key:String ):Boolean
Attempts to remove the passed `key` and its associated value from the Hash's store if it exists.

If the removed the method returns `true`, `false` otherwise.

#### Example:

```javascript

   var hash = n8iv.create( 'thud_hash', { one : 1, two : 2, three : 3 } );

   hash.remove( 'two' );  // returns => true

   hash.remove( 'foo' );  // returns => false

```

### set( key:Object|String[, value:Mixed] ):n8iv.Hash

### stringify
Returns the result of executing `JSON.stringify` on the Hash's store.

#### Example:

```javascript

   var hash = n8iv.Hash.create( { one : 1, two : 2, three : 3 } );

   hash.stringify(); // returns => "{ "one" : 1, "two" : 2, "three" : 3 }"

```

### toString
Returns the result of executing `Object.prototype.toString.call` on the Hash's store.

#### Example:

```javascript

   var hash = new n8iv.Hash( { one : 1, two : 2, three : 3 } );

   hash.toString(); // returns => "[object Object]"

```

### valueOf
Returns a copy of the Hash's store.

#### Example:

```javascript

   var hash = n8iv.create( 'hash', { one : 1, two : 2, three : 3 } );

   hash.valueOf(); // returns => { one : 1, two : 2, three : 3 }

```

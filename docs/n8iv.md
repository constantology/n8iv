# n8iv

## static methods

### bless( namespace:String[, context:Object] ):Object
Creates an Object representation of the passed `namespace` String and returns it.

If a `context` Object is given, the Object tree created will be added to the `context` Object, otherwise it will be added to the global namespace.

**NOTE:** If any existing Objects with the same name already exist, they will **NOT** be replaced and any child Objects will be appended to them.

#### Example:

```javascript

   n8iv.bless( 'foo.bar' );       // creates => global.foo.bar

// you can now do:
   foo.bar.Something = function() {};

   n8iv.bless( 'foo.bar', n8iv ); // creates => global.n8iv.foo.bar

   var bar = n8iv.bless( 'foo.bar' );

   bar === foo.bar                  // returns => true

```

### bool( value:Mixed ):Boolean
Handy for working with Booleans trapped in Strings.

Returns a normalised Boolean value for a String, Number, null or undefined.

Everything will return `true`, except for the following:

```javascript

   n8iv.bool( 'false' );     n8iv.bool(  false  );

   n8iv.bool( '0' );         n8iv.bool(  0  );

   n8iv.bool( 'NaN' );       n8iv.bool(  NaN  );

   n8iv.bool( 'null' );      n8iv.bool(  null  );

   n8iv.bool( 'undefined' ); n8iv.bool(  undefined );

   n8iv.bool();              n8iv.bool( '' );

```

### coerce( item:Mixed ):Mixed
Attempts to coerce primitive values "trapped" in Strings, into their real types.

#### Example:

```javascript

   n8iv.coerce( 'false' );     // returns false

   n8iv.coerce( 'null' );      // returns null

   n8iv.coerce( 'true' );      // returns true

   n8iv.coerce( 'undefined' ); // returns undefined

   n8iv.coerce( 'NaN' );       // returns NaN

   n8iv.coerce( '1' );         // returns 1

   n8iv.coerce( '12' );        // returns 12

   n8iv.coerce( '123' );       // returns 123

   n8iv.coerce( '123.4' );     // returns 123.4

   n8iv.coerce( '123.45' );    // returns 123.45

   n8iv.coerce( '123.456' );   // returns 123.456

```

### copy( destination:Object, source:Object ):Object
Copies the properties – accessible via `Object.keys` – from the `source` Object to the `destination` Object and returns the `destination` Object.

#### Example:

```javascript

   var foo = { one : 1, two : 2, three : 3 },
       bar = n8iv.copy( {}, foo );

   Object.equalTo( foo, bar ); // returns => true

   foo === bar                 // returns => false

```

### def( item:Mixed, name:String, descriptor:Object[, overwrite:Boolean, debug:Boolean]] ):n8iv
Shortened version of [Object.defineProperty](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/defineProperty) with some extra options.

<table border="0" cellpadding="0" cellspacing="0" width="100%">
	<tr><td>item</td><td>The item to define a property on.</td></tr>
	<tr><td>name</td><td>The name of the property you are defining.</td></tr>
	<tr><td>descriptor</td><td>The property descriptor for the new/ modified property.</td></tr>
	<tr><td>overwrite</td><td>Whether or not to attempt overwriting the new property if it exists.</td></tr>
	<tr><td>debug</td><td>Whether or not to throw an error if the property already exists.</td></tr>
</table>

The last two – optional – parameters are handy for extending JavaScript Natives without risking collisions with native/ other implementations.

#### Example:

```javascript

   n8iv.def( Object, 'greet', n8iv.describe( function( name ) { return 'Hello ' + name + '!'; }, 'w' ) );

   Object.greet( 'world' ); // returns => "Hello world!"

   delete Object.greet;     // returns => false; Object.greet is not configurable

```

### defs( item:Mixed, descriptors:Object, mode:String|Object[, overwrite:Boolean, debug:Boolean]] ):n8iv
Similar to `n8iv.def` except `n8iv.defs` allows you to define multiple properties at once.

**NOTE:** Calls `n8iv.def` internally.

<table border="0" cellpadding="0" cellspacing="0" width="100%">
	<tr><td>item</td><td>The item to define the properties on.</td></tr>
	<tr><td>descriptors</td><td>An Object of properties apply to the item. Each of the <code>descriptors</code> key/ value pairs become the property name and value on the item. This can be a property descriptor, partial descriptor or just the value you want to assign.</td></tr>
	<tr><td>mode</td><td>The permissions to apply to each property descriptor in the <code>descriptors</code> Object. See <code>n8iv.describe</code> directly below and <code>n8iv.modes</code> to find out more about this.</td></tr>
	<tr><td>overwrite</td><td>Whether or not to attempt overwriting the new property if it exists.</td></tr>
	<tr><td>debug</td><td>Whether or not to throw an error if the property already exists.</td></tr>
</table>

The last two – optional – parameters are handy for extending JavaScript Natives without risking collisions with native/ other implementations.

#### Example:

```javascript

   n8iv.defs( Object, {
      accessor : { get : function() { return this.__accessor; }, set : function( a ) { this.__accessor = a; } },
      global   : { value : window },
      greeting : function( name ) { return 'Hello ' + name + '!'; }
   }, 'w' ) );
/**
   IMPORTANT TO NOTE: Accessors do not alllow the "writeable" attribute to even be present in the descriptor Object.
                      see: https://plus.google.com/117400647045355298632/posts/YTX1wMry8M2
                      n8iv.def handles this internally, so if a "get" or "set" Function is in the descriptor, the
                      "writeable" attribute will be removed from the descriptor, if it exists.
**/

   Object.accessor = 'foo'; // returns => 'foo'
   Object.accessor;         // returns => 'foo'

   Object.global === window // returns => true
   Object.greet( 'world' ); // returns => "Hello world!"

   delete Object.greet;     // returns => false; Object.greet is not configurable

```

### describe( value:Mixed[, mode:Object|String] ):Object
When using [Object.defineProperty](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/defineProperty) en masse, your property descriptors can really start to bulk out your codebase.

Using `n8iv.describe` in combination with `n8iv.modes` can significantly reduce the amount of superfluous code you need to write. Especially when working with verbose property names like: `configurable`, `enumerable` & `writeable`.

When `value` is an Object `n8iv.describe` assumes you are passing it a property descriptor you want to assign modes to.

#### Example:

```javascript

   n8iv.describe( {
      get : function() { ... },
      set : function() { ... }
   }, 'cw' );

   /* returns => {
       configurable : true,
       enumerable   : false,
       get          : function() { ... },
       set          : function() { ... },
       writeable    : true
   } */

```

When `value` is anything but an Object, it is assigned to the `value` property of the property descriptor.

#### Example:

```javascript

   n8iv.describe( function() { ... }, n8iv.modes.c );

   /* returns => {
       configurable : true,
       enumerable   : false,
       value        : function() { ... },
       writeable    : false
   } */

```

See `n8iv.modes` below for a list of available property descriptors.

### description( object:Object, key:String ):Object
Shortened version of [Object.getOwnPropertyDescriptor](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor).

### error( error:Error|String[, chuck:Boolean] ):void
Wraps `console.error` passing the `error` to it, for logging in the `console`. If `console.error` does not exist, it is not called.

If `chuck` is `true` then the passed `error` will also be `throw`n halting any script execution.

**NOTE:** If you want the `error` to be thrown then it is recommended you pass `n8iv.error` an instance of an [Error](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error), so that the Error console will display the correct line number for your `error`. Otherwise the `error` will appear to come from `n8iv.error`, which is not very helpful when debugging.

### got( object:Object, key:String ):Boolean
Returns `true` if `object` contains `key` based on the `in` operator.

```javascript

   var foo = { one : 1, two : 2, three : 3 };

   n8iv.got( foo, 'one' );          // returns => true

   n8iv.got( foo, 'four' );         // returns => false

   n8iv.got( foo, '__type__' );     // returns => true

```

### has( object:Object, key:String ):Boolean
Shortened version of `Object.prototype.hasOwnProperty.call`.

#### Example:

```javascript

   var foo = { one : 1, two : 2, three : 3 };

   n8iv.has( foo, 'one' );          // returns => true

   n8iv.has( foo, 'four' );         // returns => false

   n8iv.has( foo, '__type__' );     // returns => false

```

### id( item:Mixed[, prefix:String] ):String

Returns the `id` property of the passed item – item can be an Object, DOM Node, "JavaScript Class" instance – if one does not exist, an `id` is created on the item and its value is returned.

If a `prefix` is supplied then it is used as the prefix for the `id` – if not `anon__` is used – with an automatically incremented counter appended to the end.

#### Example:

```javascript

   var foo = { id : 'foo' },
       bar = { name : 'bar' },
       yum = { nam  : 'yum' };

   n8iv.id( foo );         // returns => "foo"

   n8iv.id( bar );         // returns => "anon__1000"

   n8iv.id( yum, 'yum-' ); // returns => "yum-1001"

```

### isEmpty( value:Mixed ):Boolean
Returns `true` if the passed `value` is `undefined` or `null`, returns `false` otherwise.

#### Example:

```javascript

   n8iv.isEmpty( undefined ); // returns => true

   n8iv.isEmpty( null );      // returns => true

   n8iv.isEmpty( 0 );         // returns => false

   n8iv.isEmpty( 0 );         // returns => false

   n8iv.isEmpty( {} );        // returns => false

```

### isFn( value:Mixed ):Boolean
Returns `true` if the passed `value` is a Function, returns `false` otherwise.

#### Example:

```javascript

   n8iv.isFn( function() {} ); // returns => true

   n8iv.isFn( {} );            // returns => false

```

### isNum( value:Mixed ):Boolean
Returns `true` if the passed `value` is a Number, returns `false` otherwise.

#### Example:

```javascript

   n8iv.isNum( 0 );   // returns => true

   n8iv.isNum( NaN ); // returns => false

```

### isObj( value:Mixed ):Boolean
Returns `true` if the passed `value` is an Object, returns `false` otherwise.

#### Example:

```javascript

   n8iv.isObj( {} ); // returns => true

   n8iv.isObj( [] ); // returns => false

```

### isStr( value:Mixed ):Boolean
Returns `true` if the passed `value` is a String, returns `false` otherwise.

#### Example:

```javascript

   n8iv.isStr( '' ); // returns => true

   n8iv.isStr( [] ); // returns => false

```

### isUndef( value:Mixed ):Boolean
Returns `true` if the passed `value` is a `undefined`, returns `false` otherwise.

#### Example:

```javascript

   var foo, bar = 'bar';

   n8iv.isUndef( foo ); // returns => true

   n8iv.isUndef( bar ); // returns => false

```

### nativeType( item:Mixed ):String
Returns the native `type` of the passed item. For normalised types use `n8iv.type`.

**Note:** All types are **always** in lowercase.

#### Example:

```javascript

   n8iv.nativeType( null );                                   // returns => "null"

   n8iv.nativeType( undefined );                              // returns => "undefined"

   n8iv.nativeType( [] );                                     // returns => "array"

   n8iv.nativeType( true );                                   // returns => "boolean"

   n8iv.nativeType( new Date() );                             // returns => "date"

   n8iv.nativeType( function() {} );                          // returns => "function"

   n8iv.nativeType( 0 );                                      // returns => "number"

   n8iv.nativeType( {} );                                     // returns => "object"

   n8iv.nativeType( Object.create( null ) );                  // returns => "object"

   n8iv.nativeType( /.*/ );                                   // returns => "regexp"

   n8iv.nativeType( '' );                                     // returns => "string"

   n8iv.nativeType( document.createElement( 'div' ) );        // returns => "htmldivelement"

   n8iv.nativeType( document.querySelectorAll( 'div' ) );     // returns => "htmlcollection" | "nodelist"

   n8iv.nativeType( document.getElementsByTagName( 'div' ) ); // returns => "htmlcollection" | "nodelist"

   n8iv.nativeType( global );                                 // returns => "global"

   n8iv.nativeType( window );                                 // returns => "global" | "window"

```

### noop():void
An empty Function that returns nothing.

### obj( [props:Obejct] ):Object
Creates an empty Object using `Object.create( null )`, the Object has no constructor and executing `Object.getPrototypeOf` on the empty Object instance will return `null` rather than `Object.prototype`.

Optionally pass an Object whose properties you want copied to the empty Object instance.

### proto( item:Mixed ):Mixed
Shortened version of [Object.getOwnPropertyDescriptor](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/getPrototypeOf).

### tostr( item:Mixed ):String
Shortened version of `Object.prototype.toString.call`.

### trace():n8iv
Wraps `console.trace` so that if it does not exist, it is not called.

### type( item:Mixed ):String
Returns the normalised `type` of the passed item.

**Note:** All types are **always** in lowercase.

#### Example:

```javascript

   n8iv.type( null );                                   // returns => false

   n8iv.type( undefined );                              // returns => false

   n8iv.type( [] );                                     // returns => "array"

   n8iv.type( true );                                   // returns => "boolean"

   n8iv.type( new Date() );                             // returns => "date"

   n8iv.type( function() {} );                          // returns => "function"

   n8iv.type( 0 );                                      // returns => "number"

   n8iv.type( {} );                                     // returns => "object"

   n8iv.type( Object.create( null ) );                  // returns => "nullobject"

   n8iv.type( /.*/ );                                   // returns => "regexp"

   n8iv.type( '' );                                     // returns => "string"

   n8iv.type( document.createElement( 'div' ) );        // returns => "htmlelement"

   n8iv.type( document.querySelectorAll( 'div' ) );     // returns => "htmlcollection"

   n8iv.type( document.getElementsByTagName( 'div' ) ); // returns => "htmlcollection"

   n8iv.nativeType( global );                           // returns => "global"

   n8iv.nativeType( window );                           // returns => "global"

```

## static properties

### modes:Object
`n8iv.modes` is an Object containing all the variations on different permissions a property may have when assigned using `Object.defineProperty`.

See `n8iv.describe` above for more information on how to use `n8iv.modes` to create property descriptors compatible with `Object.defineProperty`.

#### Available modes are:
<table border="0" cellpadding="0" cellspacing="0">
	<thead><tr><th>mode</th><th>configurable</th><th>enumerable</th><th>writeable</th></tr></thead>
	<tbody>
		<tr><td><strong>r</strong></td><td>false</td><td>false</td><td>false</td></tr>
		<tr><td><strong>ce</strong></td><td>true</td><td>true</td><td>false</td></tr>
		<tr><td><strong>cw</strong></td><td>true</td><td>false</td><td>true</td></tr>
		<tr><td><strong>ew</strong></td><td>false</td><td>true</td><td>true</td></tr>
		<tr><td><strong>cew</strong></td><td>true</td><td>true</td><td>true</td></tr>
	<tbody>
</table>

**NOTE:** You can supply the characters for a specific mode in any order.

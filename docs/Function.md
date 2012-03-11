# Function

## extensions to Function.prototype

### @get n8ivName:Array
Tries to return the name of a Function based on it's `name`, `displayName` and/ or examining the Function's `toString` method.

If a Function is mimicking another Function it will return the mimicked Function's `n8ivName`.

#### Example:

```javascript

   function foo( a, b, c ) { ... }

   foo.n8ivName                                                // returns => "foo"

   ( function( a, b, c ) { ... } ).n8ivName                    // returns => "anonymous"

   var = function bar( a, b, c ) { ... }.mimic( foo ).n8ivName // returns => "foo"

```

### @get params:Array
Returns an Array of the argument names in a Function declaration by examining the Function's `toString` method.

#### Example:

```javascript

   ( function foo( a, b, c ) { ... } ).params // returns => ["a", "b", "c"]

```

### attempt( [context:Object, arg1:Mixed, arg2:Mixed, ..., argN:Mixed] ):Mixed
Attempts to execute the Function – and return it's return value – using a `try`/ `catch` statement.

If the Function is not executed successfully, `attempt` will perform a `console.trace`, log the exception to `console.error` – assuming the console and the methods are available – and finally returns the `Error` instance.

#### Example:

```javascript

                ( function( foo ) { return foo; } ).attempt( null, true );   // returns => true

   n8iv.type( ( function( foo ) { return bar; } ).attempt( null, true ) ); // returns => 'error'

```

### bake():Function
Returns a new Function which, when executed, passes its context – **this** – Object as the first argument to the original Function, along with any other arguments passed to it.

Handy for baking Functions into "JavaScript Classes" as methods, without having to wrap each one individually.

#### Example:

```javascript

   Number.prototype.sqrt = Math.sqrt.bake();

   ( 4 ).sqrt() === Math.sqrt( 4 )     // returns => true

   Number.prototype.pow = Math.pow.bake();

   ( 4 ).pow( 2 ) === Math.pow( 4, 2 ) // returns => true

```

### defer( [context:Object, arg1:Mixed, arg2:Mixed, ..., argN:Mixed] ):Function
Executes the Function once the current call stack becomes idle.

This is similar to executing the Function using `setTimeout` with a value of 0.

`defer` calls `delay` internally and returns the delayed Function.

#### Example:

```javascript

   function log( value ) { console.log( value ); }

   log( 1 );

   log.defer( null, 2 );

   log( 3 );

   // logs => 1
   // logs => 3
   // logs => 2 – 3 gets logged before 2!

```

### delay( milliseconds:Number[, context:Object, arg1:Mixed, arg2:Mixed, ..., argN:Mixed] ):Function
Delays the execution of the Function by the number of `milliseconds`.

The `delayed` Function returned has a `stop` Function and the `timeoutId` attached to it, allowing you to stop the ACTUAL Function's execution.

#### Example:

```javascript

   function log( value ) { console.log( value ); }

   log( 1 );

   log.delay( 250, null, 2 );

   var _log = log.delay( 500, null, 3 );

   _log.stop();

   log( 4 );

   // log => 1
   // log => 4
   // log => 2
   // 3 is NOT logged because the delayed Function was stopped!

```

### mimic( callback:Function[, name:String] ):Function
Makes the Function look like the passed `callback` Function. Handy for profiling & debugging.

#### Example:

```javascript

   function foo() { ... }

   var bar = function() { ... }.mimic( foo );

   bar.toString()           // returns => "function foo() { ... }"

   bar.valueOf()            // returns => foo()

   bar.displayName == 'foo' // returns => true

```

### wrap( wrapper:Function ):Function
Wraps the Function in the passed `wrapper` Function, supplying the original Function as the first parameter to the `wrapper` Function.

#### Example:

```javascript

   function log( value ) { console.log( value ); }

   var wrapped_log = log.wrap( function( fn, value ) {
      fn( 'logging: ' + value );
   } );

   log( 1 );         // logs => 1

   wrapped_log( 1 ); // logs => logging: 1

```

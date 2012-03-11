# Number

## extensions to Number.prototype

### pad( length:Number[, radix:Number] ):String
Returns a String representation of the Number instance with leading zeros. The String's minimum length will be equal to the passed `length` parameter.

The method also accepts an optional `radix` parameter. The default `radix` is 10.

#### Example:

```javascript

   ( 16 ).pad( 4 );     // returns =>  "0016"

   ( 16 ).pad( 4, 8 );  // returns =>  "0020"

   ( 16 ).pad( 4, 10 ); // returns =>  "0016"

   ( 16 ).pad( 4, 16 ); // returns =>  "0010"

   ( 16 ).pad( 4, 2 );  // returns => "10000"

```

### times( callback:Function[, context:Object] ):Number
Executes the passed `callback` Function the specified number of times. An optional `context` Object can be passed to the method.

The `callback` Function will receive 1 argument:

<table border="0" cellpadding="0" cellspacing="0" width="100%">
	<tr><td>index</td><td>The zero based index of the current iteration.</td></tr>
</table>

#### Example:

```javascript

   ( 5 ).times( console.log );

   // logs => 0
   // logs => 1
   // logs => 2
   // logs => 3
   // logs => 4

```

### toHex():String
Returns a hexadecimal representation of the Number instance.

#### Example:

```javascript

     ( 0 ).toHex(); // returns => "00"

    ( 15 ).toHex(); // returns => "0f"

   ( 255 ).toHex(); // returns => "ff"

```

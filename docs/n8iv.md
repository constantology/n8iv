# n8iv( NativeType1:Function[, NativeType2:Function, ..., NativeTypeN:Function] ):n8iv
n8iv itself wraps `m8.x`. It does exactly the same thing and returns itself – the n8iv global.

## n8iv.x( NativeType:Function, extensions:Function ):n8iv
If you want to extend a Native Type immediately you can pass it to `n8iv.x`, along with a Function containing the `extensions` and `n8iv` will make it so.

Unlike `m8.x.cache`, which takes a String name of the Native Type you wish to extend, `n8iv.x` takes the actual Type.

### Example:

```javascript

   typeof Array.prototype.foo;  // returns => "undefined"

   n8iv.x( Array, function( Type ) {
      m8.def( Type.prototype, 'foo', m8.describe( 'bar', 'w' ) );
   } );

  typeof Array.prototype.foo;   // returns => "string"

  Array.prototype.foo == 'bar'; // returns => true

```

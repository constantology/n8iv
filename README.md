# n8iv.js [![build status](https://secure.travis-ci.org/constantology/n8iv.png)](http://travis-ci.org/constantology/n8iv)

n8iv is a functional programming library – for modern javascript engines – which correctly extends JavaScript Natives. Giving you a – relatively – safe and easy to use API, to make your code more succinct and efficient.

n8iv is based on the awesomeness of [prototypejs](https://github.com/savetheclocktower/prototype).

If you like the idea of having one global variable with a bunch of static functions – in no particular order – attached to it, then this is probably not the framework for you.

If you think that extending JavaScript Natives is a "bad part" of JavaScript, then this is probably not the framework for you.

If, however, you like your methods bound to your types, then come on in and sit a spell!

**n8iv will not overwrite any implementations – native or otherwise – of any methods, properties or accessors already defined.**

## Dependencies

n8iv.js only has one dependency [m8.js](/constantology/m8).

**NOTE:**
If you are using n8iv within a commonjs module, you don't need to require m8 before requiring n8iv as this is done internally and a reference to **m8** is available as: `n8iv.m8`.

```javascript

   var n8iv = require( 'n8iv' ),
       m8  = n8iv.m8; // <= reference to m8

// if running in a sandboxed environment remember to:
   m8.x( Object, Array, Boolean, Function, String ); // and/ or any other Types that require extending.
// alternatively, this does the same and returns the n8iv global
   n8iv( Object, Array, Boolean, Function, String );

```

See [m8: Extending into the future](/constantology/m8) for more information on working with sandboxed modules.

## Support

Tested to work with nodejs, FF4+, Safari 5+, Chrome 7+, IE9+. Should technically work in any browser that supports [ecma 5]( http://kangax.github.com/es5-compat-table/) without throwing any JavaScript errors.

## File size

- n8iv.js ≅ 4.6kb (gzipped)
- n8iv.min.js ≅ 3.2kb (minzipped)

## License

(The MIT License)

Copyright &copy; 2012 christos "constantology" constandinou http://muigui.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

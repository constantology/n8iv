# n8iv.js

n8iv is an object-oriented & functional programming library – for modern javascript engines – which correctly extends JavaScript Natives – using Object.defineProperty. As well as providing other useful Classes. Giving you a – relatively – safe and easy to use API, to help make your code more succinct and efficient.

n8iv is based on the awesomeness of [prototypejs](https://github.com/savetheclocktower/prototype).

If you like the idea of having one global variable with a bunch of static functions – in no particular order – attached to it, then this is probably not the framework for you. If, however, you like your methods bound to your types, then come on in and sit a spell!

**n8iv will not overwrite any implementations – native or otherwise – of any methods, properties or accessors already defined.**

n8iv comes in 3 parts:

- `n8iv._.js`  : is where all the base n8iv functionality – used across the other 2 parts – is defined.
- `n8iv.Fn.js` : is where all the extensions to JavaScript's natives takes place.
- `n8iv.Oo.js` : is where the n8iv Class system and a few useful Classes are defined.

All of the above are pakaged as a single file: `n8iv.js`.

If you don't like the idea of extending JavaScript natives, you can still to take advantage of the functionality defined in: `n8iv._.js` and `n8iv.Oo.js`.

## WARNING!!!

This is an, as yet, untested framework, use at your own risk!

## File sizes

<table border="0" cellpadding="0" cellspacing="0" width="100%">
	<tbody>
		<tr><td style="width : 80px ;">n8iv._.js</td><td style="width : 48px ;">3.4kb</td><td>deflate</td>
		<tr><td>n8iv._.min.js</td><td>2.6kb</td><td>uglified + deflate</td>
		<tr><td>n8iv.Fn.js</td><td>4.0kb</td><td>deflate</td>
		<tr><td>n8iv.Fn.min.js</td><td>3.1kb</td><td>uglified + deflate</td>
		<tr><td>n8iv.Oo.js</td><td>4.5kb</td><td>deflate</td>
		<tr><td>n8iv.Oo.min.js</td><td>3.4kb</td><td>uglified + deflate</td>
		<tr><td>n8iv.js</td><td>11.2kb</td><td>deflate</td>
		<tr><td>n8iv.min.js</td><td>8.2kb</td><td>uglified + deflate</td>
	</tbody>
</table>

## License

(The MIT License)

Copyright &copy; 2012 christos "constantology" constandinou http://muigui.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

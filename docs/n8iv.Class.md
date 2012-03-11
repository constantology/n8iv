# n8iv.Class( [path:String, ]descriptor:Object ):n8iv.Class
`n8iv.Class` – as the name suggests – is a convenience method for creating "JavaScript Classes" which mimic classical inheritance: while maintaining the advantages of prototypical inheritance.

`n8iv.Class` accepts two parameters. An **optional** parameter – `path`, which should always be the first parameter, if supplied – defining the name and namespace of the Class, e.g. `n8iv.Observer` would create a Class called `Observer` under the `n8iv` namespace. If no `path` is specified, then the Class is simply returned by the `n8iv.Class` method.

The `descriptor` parameter is mandatory and can be either the first parameter – if no `path` is given – or the second.

The `descriptor` Object will contain all your properties and methods which will be added to your Class' prototype.

The `descriptor` Object also accepts property descriptors as defined for use with [Object.defineProperty](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/defineProperty), see the code for [n8iv.Hash](https://github.com/constantology/n8iv/blob/master/src/Hash.js) for an example of using property descriptors in your `n8iv.Class` descriptor.

## default descriptor options
The descriptor has the following **reserved** property names:

<table border="0" cellpadding="0" cellspacing="0" width="100%">
	<thead><tr><th>property</th><th>type</th><th>description</th></tr></thead>
	<tbody>
		<tr><td width="128">constructor</td><td width="96">Function</td><td>This Class' constructor. This is the method that is called when you do: <code>new Foo</code>.</td></tr>
		<tr><td>extend</td><td>Class|String</td><td><strong>OPTIONAL</strong>. If you want to inherit the properties and methods from an existing Class you reference the Class here.</td></tr>
		<tr><td>mixin</td><td>Object</td><td><strong>OPTIONAL</strong>. An Object of properties and methods to mix into the Class' prototype.</td></tr>
		<tr><td>chain</td><td>Boolean</td><td><strong>OPTIONAL</strong>. Unless this is set explicitly to <code>false</code>, the n8iv.Class instance will return its context – <code>this</code> – Object whenever an instance method of a n8iv.Class returns <code>undefined</code>.</td></tr>
		<tr><td>singleton</td><td>Mixed</td><td><strong>OPTIONAL</strong>. Whether or not this Class is a <a href="http://en.wikipedia.org/wiki/Singleton_pattern">Singleton</a>.<br />
		If you want a Singleton set this to be either <code>true</code> or to an Array of arguments you wish to pass the constructor.</td></tr>
		<tr><td>type</td><td>String</td><td><strong>OPTIONAL</strong>. The type you want your Class instances to return when they are passed to <code>Object.type</code>.<br />
		If you pass a <code>path</code> to <code>n8iv.Class</code> then the <code>type</code> will be created from this.<br />
		However, if a <code>type</code> is also supplied it will overwrite the <code>type</code> created from the <code>path</code>.</td></tr>
		<tr><td>parent</td><td>Function</td><td>This is a special reserved method for calling <code>super</code> methods. Since <code>super</code> is a reserved word in JavaScript, <code>parent</code> has been used in its place.</td></tr>
	</tbody>
</table>

## static methods

### is( instance:Object, class:Class ):Boolean
Returns `true` if the passed `instance` is an instance of the passed `class`.

#### Example:

```javascript

   var Foo = n8iv.Class( {
          constructor : function() {}
       } ),
       Bar = n8iv.Class( {
          constructor : function() {},
          extend      : Foo
       } );

   var foo = new Foo,
       bar = new Bar;

       foo instanceof Foo         // returns => true
       foo instanceof Bar         // returns => false

       bar instanceof Bar         // returns => true
       bar instanceof Foo         // returns => false, should be true though

       n8iv.Class.is( foo, Foo ); // returns => true
       n8iv.Class.is( foo, Bar ); // returns => false

       n8iv.Class.is( bar, Bar ); // returns => true
       n8iv.Class.is( bar, Foo ); // returns => true

```

### type( instance:Object ):String
Returns the path parameter – if it was used when creating a `n8iv.Class` – of a `n8iv.Class` instance.

#### Example:

```javascript

   var Foo = n8iv.Class( {
          constructor : function() {}
       } ),
       Bar = n8iv.Class( 'path.to.Bar', {
          constructor : function() {},
          extend      : Foo
       } );

   var foo = new Foo,
       bar = new Bar;

   n8iv.Class.type( foo ); // returns => null
   n8iv.Class.type( bar ); // returns => "path.to.Bar"

```

## n8iv.Class methods

### create( [arg1:Mixed, arg2:Mixed, ..., argN:Mixed] ):ClassInstance
A `create` factory method is added to your Class constructor to allow you to:

- create an instance of a class using an arbitrary number of arguments; or
- not have to use the `new` constructor – if you're one of those developers who thinks it's some type of JavaScript faux pas to use the `new` constructor.

See the **n8iv.Class Examples** below on how to create Class instances using the `create` factory on your class or the global `n8iv.create` factory.

## instance methods

### this.parent()
When you create an instance of a Class created with `n8iv.Class` you can access the `super` method of a Class you are extending by calling:

```javascript

   this.parent( arg1, arg2, ..., argN );

```

Context will be maintained correctyl, unless you use Function `.call` or `.apply`. In which case you should pass the context in as normal.

#### Example

```javascript

   this.parent.call( this, arg1, arg2, ..., argN );

// or

   this.parent.apply( this, [arg1, arg2, ..., argN] );

```

## instance properties

### this.__super
If by any chance you require access to the super class upi can access it from the `__super` property on your Class instance.

The `__super` property is read only and is available on the Class `constructor` as well as instances of a Class. See the **n8iv.Class examples** below for examples.

## n8iv.Class examples:

```javascript

   n8iv.Class( 'Foo', {
      constructor : function( greeting ) {
         this.greeting = greeting;
         this.setNum( 10 );
      },
      getNum      : function() { return this.num; },
      setNum      : function( num ) { return ( this.num = num ); }
   } );

   n8iv.Class( 'path.to.Bar', {
      constructor : function( greeting ) { this.parent( 'bar: ' + greeting, true ); },
      extend      : Foo,
      getNum      : function() { return this.parent(); }
   } );

   var Zaaz = n8iv.Class( {
      constructor : function( greeting ) { this.parent( 'zaaz: ' + greeting, true ); },
      extend      : path.to.Bar
   } );

   var foo  = new Foo( 'hello world!' ),
       bar  = n8iv.create( 'path.to.Bar', 'hello world!' ),
       zaaz = Zaaz.create.apply( this, ['hello world!'] );

   foo.greeting;              // returns => "hello world!"
   foo.getNum()       === 10  // returns => true
   foo.setNum( 100 )  === 100 // returns => true
   foo.getNum()       === 100 // returns => true

   bar.greeting;              // returns => "bar: hello world!"
   bar.getNum()       === 10  // returns => true
   bar.setNum( 200 )  === 200 // returns => true
   foo.getNum()       === 100 // returns => true

   zaaz.greeting;             // returns => "bar: zaaz: hello world!"
   zaaz.getNum()      === 10  // returns => true
   zaaz.setNum( 400 ) === 400 // returns => true

   foo.__super.constructor          === Object // returns => true
   bar.__super.constructor          === Foo    // returns => true
   zaaz.__super.constructor         === Bar    // returns => true
   zaaz.__super.__super.constructor === Foo    // returns => true

   bar.__super         === path.to.Bar.__super // returns => true
   bar.__super.__super === Foo.__super         // returns => true

```

## n8iv.create( name:String[, arg1:Mixed, arg2:Mixed, ..., argN:Mixed] ):Mixed
Factory method for creating instances of "JavaScript Classes" created with `n8iv.Class`.

You can either supply the `type` or `path` used when the Class was created as the first parameter. If the Class is registered with n8iv.Class it will pass all other arguments to the Class' `create` factory and return an instance of the Class.

If no `type` or `path` is registered an Error will be thrown.

**NOTE:** Classes that live under the `n8iv` namespace can have the `thud_` omitted from their type.

#### Example:

```javascript

   var hash1 = n8iv.create( 'hash',      { foo : 'bar' } ),
       hash2 = n8iv.create( 'thud_hash', { foo : 'bar' } );
       hash3 = n8iv.create( 'n8iv.Hash', { foo : 'bar' } );

   Object.type( hash1 ); // returns => "thud_hash"

   Object.type( hash2 ); // returns => "thud_hash"

   Object.type( hash3 ); // returns => "thud_hash"

   hash1.valueOf();      // returns => { "foo" : "bar" }

   hash2.valueOf();      // returns => { "foo" : "bar" }

   hash3.valueOf();      // returns => { "foo" : "bar" }

```

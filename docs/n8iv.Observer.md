# n8iv.Observer( [events:Object] ):n8iv.Observer
n8iv.Observer provides the core functionality required to create event-driven applications by allowing you to observe and broadcast custom events within the JavaScript space.

n8iv.Observer is best utilised as a base class you can extend your own classes with.

## configuration options

### events:Object
An Object of `events` to observe. See the `on` instance method for details on adding event listeners.

## instance properties

### broadcasting:Boolean|String
Returns `false` if no event is currently being broadcast, otherwise it will be set to the name of the event currently being broadcast.

### destroyed:Boolean
Returns `true` if the Observer instance was destroyed, `false` otherwise.

### events_suspended:Boolean
Returns `true` if the Observer has been suspended from broadcasting events, `false` otherwise.

### events:n8iv.Hash
The Observer's events listeners store.

## instance methods

### broadcast( event:String[, arg1:Mixed, arg2:Mixed, ..., argN:Mixed] ):n8iv.Observer
Broadcasts the passed `event` – firing any event listener callbacks observing the `event` being `broadcast` – and passes any extra arguments to the callback Functions.

**IMPORTANT:** The Observer instance broadcasting the event will always be the first argument passed to each callback Function; **UNLESS** The callback Function is a method on the Observer instance.

#### Example:

```javascript

    function log() { console.log( 'log function: ', arguments ); }

    var observer = n8iv.Observer.create();

    observer.log = function() { console.log( 'log method:   ', arguments ); }

    observer.on( 'foo', log )
            .on( 'foo', observer.log, observer )
            .broadcast( 'foo', 1, 2, 3 );

    // logs => log function: [observer, 1, 2, 3]; <- Observer instance that broadcast the event is the first argument as log function does not exist on observer
    // logs => log method:   [1, 2, 3];           <- Observer instance omitted, as log method exists on observer

```

### destroy():Boolean
Destroys the Observer instance, purging all event listeners and disabling the Observer instance from broadcasting any more events.

Returns `true` if the Observer instance is successfully destroyed, `false` otherwise.

**IMPORTANT:** If you are extending `n8iv.Observer` it is **best practice** to override the `_destroy` method rather than the `destroy` method, to ensure the `before:destroy` & `destroy` events are broadcast at the correct times.

#### Example:

```javascript

    function log() { console.log( arguments ); }

    var observer = new n8iv.Observer( { foo : log } );

    observer.broadcast( 'foo', 1, 2, 3 ); // logs    => log function: [observer, 1, 2, 3];

    observer.destory();                   // returns => true

    observer.broadcast( 'foo', 1, 2, 3 ); // does nothing, observer is destoryed

    observer.on( 'foo', log );            // throws  => TypeError: this.events is undefined.

```

### on( event:Object|String[, callback:Function|Function\[\]|String|String\[\]|n8iv.Callback|n8iv.Callback\[\], context:Object, options:Boolean|Number|Object] ):n8iv.Observer
Observes the Observer instance based on the passed parameters.

Allows you to add a single event listener callback – or multiple callbacks – for a single event; or an Object containing a number of event listeners for multiple events and multiple event listener callbacks.

When adding event listeners you can also give an optional `options` Object, the **optional** parameters it accepts are:

<table border="0" cellpadding="0" cellspacing="0">
	<thead><tr><th>option</th><th>type</th><th>description</th></tr></thead>
	<tbody>
		<tr><td>args</td><td>Array</td><td>If supplied, these arguments will be prepended to the arguments passed to each event listener callback.</td></tr>
		<tr><td>buffer</td><td>Number</td><td>If supplied, the event listener callback will only be executed once during the specified number of milliseconds.<br />
        This is handy for events that could fire hundreds or thousands of times in a second – but do not need to be executed each time – ensuring your application's performance does not suffer because of this.</td></tr>
		<tr><td>delay</td><td>Number</td><td>If supplied, the event listener will be executed after being delayed by the specified number of milliseconds.</td></tr>
		<tr><td>single</td><td>Boolean</td><td>If supplied, the event listener callbackk will only be executed once and then removed.</td></tr>
	</tbody>
</table>

This is all best explained by examples. First let us define an example Observer class and a couple of instances:

```javascript

    n8iv.Class( 'ObserverExample', {
       extend      : n8iv.Observer,
       constructor : function( id, events ) {
          this.id = id;
          this.parent( events );
       },
       log         : function() { console.log( this.id, ': ', arguments ); },
       foo         : function() { console.log( this.id, ': foo' ); },
       bar         : function() { console.log( this.id, ': bar' ); }
    } );

    var observer_1 = n8iv.create( 'observerexample' ),
        observer_2 = ObserverExample.create();

```

Now let's observe an event:

```javascript

// adding a single event listener and maintaining the correct context
    observer_1.on( 'foo', observer_2.log );             // <- WRONG: context (this) Object of observer_2.log will be observer_1

    observer_1.on( 'foo', observer_2.log, observer_2 ); // <- RIGHT: context (this) Object of observer_2.log will be observer_2

```

A little bit smarter, observing an event with multiple listeners:

```javascript

// add multiple event listener callbacks for one event
    observer_1.on( 'foo', [observer_2.log, observer_2.foo, observer_2.bar], observer_2 );

    observer_1.on( 'foo', ['log', 'foo', 'bar'], observer_2 );             // <- same as above

```

Adding options into the mix:

```javascript

// fire an event listener once only
    observer_1.on( 'foo', 'log', observer_2, true );                       // <- can simply pass true if there are no other options
    observer_1.on( 'foo', observer_2.log, observer_2, { single : true } ); // <- will do same as above

// delay the event listener from firing by the specified number of milliseconds
    observer_1.on( 'foo', 'log', observer_2, 500 );                        // <- can simply pass the number of milliseconds if there are no other options
    observer_1.on( 'foo', observer_2.log, observer_2, { delay : 500 } );   // <- will do the same as above

// buffer an event listener to only fire once during the specified number of milliseconds
    observer_1.on( 'foo', observer_2.log, observer_2, { buffer : 500 } );  // <- only one way to do this one, sorry.

```

Adding event listeners for multiple events using an Object, and whole lot more!

```javascript

// add multiple event listener callbacks for multiple events
    observer_1.on( {
       foo        : {
          fn      : 'foo',
          ctx     : observer_2,                                      // <- overrides the top level ctx
          options : { args : [1, 2, 3], delay : 250, single : true } // <- overrides the top level options
       },
       bar        : [observer_2.bar, 'log'],                         // <- can still add multiple callbacks for one event
       log        : observer_2.log,
       ctx        : observer_2,                                      // <- top level ctx for all callbacks which don't have one specified
       options    : { args : [4, 5, 6 ] }                            // <- top level options for all callbacks which don't have any specified
    } );

```

Using a `n8iv.Callback` as an event listener

```javascript

   var cb = n8iv.Callback( function() {
      console.log( this, arguments );
   }, { args : [1, 2, 3], ctx : { foo : 'bar' } } );

   observer_1.on( 'foo', cb );               // <- we pass the Callback Object, NOT its fire Function, the Observer handles this internally

   observer_1.broadcast( 'foo', 4, 5, 6 );   // cb will log => {"foo":"bar"}, [observer_1, 1, 2, 3, 4, 5, 6] <-

   cb.disable();

   observer_1.broadcast( 'foo', 4, 5, 6 );   // does nothing, cb is disabled

   cb.enable();

   observer_1.broadcast( 'foo', 7, 8, 9 );   // cb will log => {"foo":"bar"}, [observer_1, 1, 2, 3, 7, 8, 9]

```

**NOTE: ** when using a `n8iv.Callback` with a `n8iv.Observer`, the `n8iv.Callback` instance will resolve the callback arguments to ensure the `n8iv.Observer` instance is always the first parameter passed to its underlying Function.

### purgeObservers( [event:String] ):n8iv.Observer
Removes all an Observer instance's event listeners. If an `event` is passed, only the event listeners for that `event` will be removed.

### relayEvents( observer:n8iv.Observer, event1:String[, event2:String, ..., eventN:String] ):n8iv.Observer
Relays the passed `event`s from the Observer instance to the passed `observer`, as if the events are also being broadcast by the passed `observer`.

Handy for implementing "event bubbling" like functionality.

### resumeEvents():n8iv.Observer
Enables the Observer instance's ability to `broadcast` events.

See `suspendEvent` example below.

### suspendEvents():n8iv.Observer
Disables the Observer instance's ability to `broadcast` events.

#### Example:

```javascript

    function log() { console.log( arguments ); }

    var observer = n8iv.Observer.create( { foo : log } );

    observer.broadcast( 'foo', 1, 2, 3 ); // logs => [observer, 1, 2, 3];

    observer.suspendEvents();

    observer.broadcast( 'foo', 1, 2, 3 ); // does nothing, events are suspended

    observer.resumeEvents();

    observer.broadcast( 'foo', 1, 2, 3 ); // logs => [observer, 1, 2, 3];

```

### un( event:String, callback:Function[, context:Object] ):n8iv.Observer
Removes the passed `callback' Function from the listener queue, so that it is no longer fired when the Observer broadcasts the passed `event`.

#### Example:

```javascript

    function log() { console.log( arguments ); }

    var observer = n8iv.Observer.create( { foo : log } );

    observer.broadcast( 'foo', 1, 2, 3 ); // logs => [observer, 1, 2, 3];

    observer.un( 'foo', log );

    observer.broadcast( 'foo', 1, 2, 3 ); // does nothing, the observer was removed;

```


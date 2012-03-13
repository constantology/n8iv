n8iv.Class( 'n8iv.Observer', function() {
	function addObservers( events ) {
		events = Object.clone( events );
		var ctx = events[_ctx], k, l, o, opt = events[_options], s;
		Object.remove( events, _ctx, _options );

		for ( k in events ) {
			l = events[k];
			o = !n8iv.isUndef( l[_options] ) ? l[_options] : opt;
			s = !n8iv.isUndef( l[_ctx]     ) ? l[_ctx]     : ctx;

			switch ( n8iv.type( l ) ) {
				case FN  : this.on( k, l, ctx, opt );
					break;
				case OBJ : case NOBJ :
					switch( n8iv.type( l[_fn] ) ) {
						case FN  : case OBJ : case NOBJ : this.on( k, l[_fn], s, o );
							break;
						case ARR : l[_fn].forEach( function( fn ) { this.on( k, fn, s, o ); }, this );
							break;
					}
					break;
				case ARR : l.forEach( function( fn ) { this.on( k, fn, ctx, opt ); }, this );
					break;
			}
		}
		return this;
	}

	function broadcast( cb ) {
		var args = this.args.concat( cb[_options].args ),
			ctx  = cb[_ctx] || this[_ctx],
			fire = cb.fire  || cb[_fn];

		if ( !n8iv.isFn( fire ) ) return T;

		if ( !!Object.key( this[_ctx], cb[_fn] ) )                     // if the original callback function is a method on this Observer
			args[0] !== this[_ctx] || args.shift();                    // then if the first argument is the Observer Object.remove it, as it's an internal event listener
		else if ( args[0] !== this[_ctx] ) args.unshift( this[_ctx] ); // otherwise, if the Observer is not the first argument, then add it, so the callback knows what Observer fired it

		return ( fire.apply( ctx, args ) !== F );                      // if a callback explicitly returns false, then we want to stop broadcasting
	}

	function createRelayCallback( ctxr, ctx, evt ) {
		return function Observer_relayedCallback() {
			var args = Array.from( arguments );
			!( args[0] === ctxr ) || args.shift(); // switch the context to the object relaying the event instead of the object that relayed it
			args.unshift( evt, ctx );
			return relay.apply( ctx, args );
		};
	}

// the reason we do this instead of passing { times : 1 } to Function.prototype.callback, is that we want to Object.remove
// the callback from the events queue after being fired once, rather than keeping it in the queue.
	function createSingleCallback( event, cb ) {
		var ctx = this;
		return ( cb.fire = function Observer_singleCallback() {
			ctx.un( event, cb[_fn], cb[_ctx] );
			if ( cb.fired ) { return; }
			cb.fired = T;
			return cb[_fn].apply( cb[_ctx] || ctx, arguments );
		} );
	}

	function handleEvent( cb ) { return function handleEvent() { return cb.handleEvent.apply( cb, arguments ); }.mimic( cb.fire ); }

	function matchCallback( o ) { return ( this.isCB === T ? o[_fn].valueOf() === this[_ctx].fire : o[_fn] === this[_fn] ) && o[_ctx] === this[_ctx] && o.event === this.event; }

	function relay() { return this.broadcast.apply( this, arguments ); }

	var _broadcasting = 'broadcasting',     _ctx        = 'ctx',
		_destroyed    = 'destroyed',        _events     = 'events',
		_fn           = 'fn',               _options    = 'options',
		_suspended    = 'events_suspended', listener_id = 0;

	return {
		constructor    : function Observer( events ) {
			this[_broadcasting] = F; this[_destroyed] = F;
			this[_suspended]    = F; this[_events]    = n8iv.Hash.create();

			!n8iv.isObj( events ) || this.on( events );
		},

// public methods
		broadcast      : function( event ) {
			if ( this[_destroyed] || this[_suspended] || !this[_events][LEN] || !event || !this[_events].has( event = event.lc() ) ) return;

			var args = Array.from( arguments, 1 ),
				e    = this[_events].get( event ).clone(); // so we can add/ Object.remove events while this event is firing without disrupting the queue;

			if ( !e[LEN] ) return; // if no event listeners, then don't worry

			this[_broadcasting] = event;

// if a callback returns false then we want to stop broadcasting, every will do this, forEach won't!
			e.every( broadcast, { args : args, ctx : this } );

			this[_broadcasting] = F;
		},
		buffer         : function( ms, evt, fn, ctx, o ) {
			n8iv.isObj( o ) || ( o = n8iv.obj() ); o.buffer = Number.toInteger( ms );
			this.on( evt, fn, ctx, o );
		},
		delay          : function( ms, evt, fn, ctx, o ) {
			n8iv.isObj( o ) || ( o = n8iv.obj() ); o.delay = Number.toInteger( ms );
			this.on( evt, fn, ctx, o );
		},
		destroy        : function() {
			if ( this[_destroyed] ) return T;
			if ( this.broadcast( 'before:destroy' ) === F ) return F;
			this[_destroyed] = T;
			this._destroy();
			this.broadcast( 'destroy' );
			this[_suspended] = T;
			delete this[_events];
			return T;
		},
		on             : function( event, fn, ctx, o ) {
			var cb, e = this[_events], fnt, q;

			if ( n8iv.isObj( event ) ) return addObservers.call( this, event );
			switch ( ( fnt = n8iv.nativeType( fn ) ) ) {
				case  ARR     :
					cb = n8iv.obj(); cb[event] = { fn : fn, options : o, ctx : ctx };
					return addObservers.call( this, cb );
				case  OBJ     : case NOBJ : case 'n8iv_callback' : if ( 'handleEvent' in fn ) {
					!( n8iv.isObj( ctx ) && n8iv.isUndef( o ) ) || ( o = ctx );
					ctx = fn; fn = handleEvent( fn );
				} break;
				case 'string' : !ctx || ( fn = ctx[fn] ); break;
			}

			event = event.lc();
			( q = e.get( event ) ) || e.set( event, ( q = [] ) );

			switch( n8iv.type( o ) ) {
				case 'boolean' : o = { single : !!o  }; break;
				case 'number'  : o = { delay  :   o  }; break;
				case  OBJ      :
				case  NOBJ     : o = Object.clone( o ); break;
				default        : o = n8iv.obj();
			}

			Array.isArray( o.args ) || ( o.args = [] );

			cb      = { ctx : ctx || this, event : event, fn : fn, id : ++listener_id, options : o };
			cb.fire = ( o.single ? createSingleCallback.call( this, event, cb ) : cb[_fn] ).callback( {
				args : o.args, buffer : o.buffer, ctx : cb[_ctx], delay : o.delay
			} );
			q.push( cb );
		},
		once           : function( evt, fn, ctx, o ) {
			n8iv.isObj( o ) || ( o = n8iv.obj() ); o.single = T;
			this.on( evt, fn, ctx, o );
		},
		purgeObservers : function( event ) {
			var e = this[_events];
			if ( !event ) { e.clear(); return; }
			event = event.lc();
			!e.has( event ) || e.set( event, [] );
		},
		relayEvents    : function( o ) {
			var e = Array.from( arguments, 1 ), evt;
			while ( evt = e.shift() )
				this.on( evt, createRelayCallback( this, o, evt ), o );
		},
		resumeEvents   : function() { !this[_suspended] || ( this[_suspended] = F, this.broadcast( 'observer:resumed'   ) ); },
		suspendEvents  : function() {  this[_suspended] || ( this[_suspended] = T, this.broadcast( 'observer:suspended' ) ); },
		un             : function( event, fn, ctx ) {
			event = event.lc();
			var e = this[_events].get( event ), i, o;

			if ( !e ) { return; }

			switch ( n8iv.type( fn ) ) {
				case 'n8iv_callback' : o = { ctx : fn,          isCB : T  }; break;
				default              : o = { ctx : ctx || this, fn   : fn };
			}
			o.event = event;
			o = e.find( matchCallback, o );
			if ( o !== N ) {
				i = e.indexOf( o );
				i < 0 || e.splice( i, 1 );
			}
		},

// internal methods
		_destroy       : n8iv.noop
	};
}() );

n8iv.Class( 'n8iv.Callback', function() {
	n8iv.def( Function.prototype, 'callback', n8iv.describe( function( conf ) { return ( new n8iv.Callback( this, conf ) ).fire.mimic( this ); }, 'w' ) );

	function buffer() {
		if ( bid in this ) return this;
		this[bid] = setTimeout( buffer_stop.bind( this ), this.buffer );
		return this.exec.apply( this, arguments );
	}
	function buffer_stop() { clearTimeout( this[bid] ); delete this[bid]; }
	function handleEvent() { return this.fire.apply( this, arguments ); }

	var bid = 'bufferId', he = 'handleEvent', tid = 'timeoutId';

	return {
		constructor : function Callback( fn, conf ) {
			n8iv.copy( this, conf || n8iv.obj() );

			var desc = n8iv.describe( N, 'w' ),
				fire = ( n8iv.isNum( this.buffer ) ? buffer : this.exec ).bind( this );

			desc.value = fn;   n8iv.def( this, 'fn',   desc );
			desc.value = this; n8iv.def( fire, 'cb',   desc );
			desc.value = fire; n8iv.def( this, 'fire', desc );

			this.args || ( this.args = [] );
			this.ctx  || ( this.ctx  = this );
			n8iv.isNum( this.delay ) || ( this.delay = N );
			n8iv.isNum( this.times ) && this.times > 0 || ( this.times = 0 );

			this.enable();
		},
		chain       : T,
// properties
		buffer      : N, count : 0,
		delay       : N, times : 0,
// methods
		disable     : function() {
			this.disabled = T;
			this[he]      = n8iv.noop;
		},
		enable      : function() {
			this.disabled = F;
			this[he]      = handleEvent;
		},
		exec        : function() {
			if ( this.disabled ) return;
			this.times === 0 || this.times > ++this.count || this.disable();

			var a  = Array.from( arguments ), //this.args.concat.apply( this.args, arguments ),
				me = this, ctx = me.ctx, ms = me.delay, t = n8iv.type( a[0] ), v;

			( t && ( t.endsWith( 'event' ) || t == 'n8iv_observer' ) )
			? a.splice.apply( a, [1, 0].concat( me.args ) )
			: a.unshift.apply( a, me.args );

			( ms === N
			? v = me.fn.apply( ctx, a )
			: this[tid] = setTimeout( function() { me.fn.apply( ctx, a ); }, ms ) );

			return v;
		},
		reset       : function() {
			this.count = 0;
			buffer_stop.call( this.enable() );
		},
		stop        : function() { !( tid in this ) || clearTimeout( this[tid] ), delete this[tid]; }
	};
}() );

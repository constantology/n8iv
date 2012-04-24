m8.x.cache( 'Array', function( Type ) {
	function groupByFn( field, v ) { return field( v ) ? 0 : 1; }
	function groupByRegExp( field, v ) { return field.test( v ) ? 0 : 1; }
	function groupByStr( field, v ) { return Object.value( v, field ) || 1; }
	function isFalsey( o ) { return !o ? null : o; }
	function sortedVal( o )  { return o[0]; }
	function sortingVal( o ) { return [o, ( typeof this == 'function' ? this( o ) : Object.value( o, this ) )]; }
	
	var PROTO = Type.prototype,
		sort  = {
			desc : function( a, b ) { return a[1] == b[1] ? 0 : a[1] < b[1] ? 1 : -1; },
			asc  : function( a, b ) { return a[1] == b[1] ? 0 : a[1] > b[1] ? 1 : -1; }
		};

	sort[String( true )] = sort[1] = sort.asc;
	sort[String( !1 )]   = sort[0] = sort.desc;

	m8.def( Type, 'sortFns', m8.describe( { value : sort }, 'w' ) );

	m8.defs( Type.prototype, {
		aggregate : function( val, fn, ctx ) {
			return PROTO.reduce.call( this, function( val, o, i, a ) {
				return fn.call( ctx || o, val, o, i, a );
			}, val );
		},
		associate : function( a, fn, ctx ) {
			fn || ( fn = m8 ); ctx || ( ctx = this );
			return PROTO.reduce.call( this, function( o, v, i ) {
				o[a[i]] = fn.call( ctx, v, i, this );
				return o;
			}, m8.obj() );
		},
		clear     : function() { this.length = 0; return this; },
		clone     : function() { return PROTO.slice.call( this ); },
		compact   : function( falsey ) { return PROTO.mapc.call( this, falsey === true ? isFalsey : m8 ); },
		contains  : function( o ) { return !!~PROTO.indexOf.call( this, o ); },
		each      : function( fn, ctx ) { PROTO.forEach.call( this, fn, ctx || this ); return this; },
		flatten   : function( n ) {
			if ( m8.type( n ) == 'number' ) {
				if ( n > 0 ) --n;
				else return this;
			}
			return PROTO.aggregate.call( this, [], function( v, o, i ) {
				Type.isArray( o ) ? v.splice.apply( v, [v.length, 0].concat( o.flatten( n ) ) ) : v.push( o );
				return v;
			}, this );
		},
		grep : function( re, fn, ctx ) {
			var a = this; fn || ( fn = m8 ); ctx || ( ctx = a );
			m8.nativeType( re ) != 'string' || ( re = new RegExp( re.escapeRE(), 'g' ) );
			return PROTO.aggregate.call( a, [], function( v, o, i ) {
				!re.test( o ) || v.push( fn.call( ctx, o, i, a ) );
				return v;
			} );
		},
		groupBy   : function( f, fn, ctx ) {
			fn || ( fn = m8 );
			var a = this, keys, match, res = m8.obj();
			
			switch( m8.type( f ) ) {
				case 'function' : match = groupByFn;       break;
				case 'regexp'   : match = groupByRegExp;   break;
				case 'number'   :
				case 'string'   : match = groupByStr;
								  keys = PROTO.pluck.call( a, f, true ); break;
				default         : throw new TypeError( 'Array.prototype.groupBy can only match based on a Function, RegExp or String.' );
			}
			
			( keys || [0, 1] ).forEach( function( k ) { res[k] = []; } );
			
			return PROTO.aggregate.call( a, res, function( v, o, i ) {
				v[match( f, o )].push( fn.call( this, o, i, a ) );
				return v;
			}, ctx || a );
		},
		include   : function( o ) { return PROTO.contains.call( this, o ) ? !1 : !this.push( o ) || true; },
		invoke    : function( fn ) {
			var args = Type.coerce( arguments, 1 );
			return PROTO.map.call( this, function( o, i ) { return o[fn].apply( o, args ); } );
		}, 
		invokec   : function( fn ) {
			var args = Type.coerce( arguments, 1 );
			return PROTO.mapc.call( this, function( o, i ) {
				return m8.nativeType( o[fn] ) == 'function' ? o[fn].apply( o, args ) : null;
			} );
		}, 
		item      : function( i ) { return this[i < 0 ? this.length + i : i]; },
		last      : function() { return this[this.length - 1]; },
		mapc      : function( fn, ctx ) {
			ctx || ( ctx = this );
			return PROTO.reduce.call( this, function( v, o, i, a ) {
				!m8.exists( ( o = fn.call( ctx, o, i, a ) ) ) || v.push( o );
				return v;
			}, [] );
		}, 
		pluck     : function( k, c ) {
			return PROTO[c === true ? 'mapc' : 'map'].call( this, function( o ) {
				return Object.value( o, k );
			} );
		},
		remove    : function() {
			var args = Type.coerce( arguments ), i, res = [], v;
			while ( v = args.shift() )
				!~( i = PROTO.indexOf.call( this, v ) ) || res.push( PROTO.splice.call( this, i, 1 )[0] );
			return res;
		},
		sortBy    : function( f, d ) { // schwartzian optimised
			return PROTO.map.call( this, sortingVal, f )
						.sort( m8.nativeType( d ) == 'function' ? d : sort[String( d ).toLowerCase()] || sort.asc )
						.map( sortedVal );
		},
		tuck      : function( k, a ) {
			var is_arr = Type.isArray( a );
			return PROTO.each.call( this, function( o, i ) { o[k] = is_arr ? a[i] : a; } );
		},
		uniq      : function() {
			return PROTO.reduce.call( this, function( v, o ) {
				v.contains( o ) || v.push( o );
				return v;
			}, [] );
		},
		without   : function() {
			var a = PROTO.clone.call( this ); a.remove.apply( a, arguments );
			return a;
		},
		zip       : function() {
			var args = Type.coerce( arguments ); args.unshift( this );
			return PROTO.map.call( this, function( o, i ) { return args.pluck( i ); } );
		}
	}, 'w' );
} );

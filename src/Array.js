n8iv.defs( Array.prototype, function() {
	function groupByFn( field, v ) { return field( v ) ? 0 : 1; }
	function groupByRegExp( field, v ) { return field.test( v ) ? 0 : 1; }
	function groupByStr( field, v ) { return Object.value( v, field ) || 1; }
	function isFalsey( o ) { return !o ? N : o; }
	function sortedVal( o )  { return o[0]; }
	function sortingVal( o ) { return [o, ( n8iv.isFn( this ) ? this( o ) : Object.value( o, this ) )]; }
	
	var AP   = Array.prototype,
		sort = {
			desc : function( a, b ) { return a[1] == b[1] ? 0 : a[1] < b[1] ? 1 : -1; },
			asc  : function( a, b ) { return a[1] == b[1] ? 0 : a[1] > b[1] ? 1 : -1; }
		};

	sort[String(  T )] = sort[1] = sort.asc;
	sort[String( !1 )] = sort[0] = sort.desc;

	n8iv.def( Array, 'sortFns', n8iv.describe( { value : sort }, 'w' ) );

	return {
		aggregate : function( val, fn, ctx ) { return AP.reduce.call( this, function( val, o, i, a ) { return fn.call( ctx || o, val, o, i, a ); }, val ); },
		associate : function( a, fn, ctx ) {
			fn || ( fn = n8iv.requite ); ctx || ( ctx = this );
			return AP.reduce.call( this, function( o, v, i ) {
				o[a[i]] = fn.call( ctx, v, i, this );
				return o;
			}, n8iv.obj() );
		},
		clear     : function() { this.length = 0; return this; },
		clone     : function() { return AP.slice.call( this ); },
		compact   : function( falsey ) { return AP.mapc.call( this, falsey === T ? isFalsey : n8iv.requite ); },
		contains  : function( o ) { return !!~AP.indexOf.call( this, o ); },
		each      : function( fn, ctx ) { AP.forEach.call( this, fn, ctx || this ); return this; },
		flatten   : function( n ) {
			if ( n8iv.isNum( n ) ) {
				if ( n > 0 ) --n;
				else return this;
			}
			return AP.aggregate.call( this, [], function( v, o, i ) {
				Array.isArray( o ) ? v.splice.apply( v, [v.length, 0].concat( o.flatten( n ) ) ) : v.push( o );
				return v;
			}, this );
		},
		grep : function( re, fn, ctx ) {
			var a = this; fn || ( fn = n8iv.requite ); ctx || ( ctx = a );
			!n8iv.isStr( re ) || ( re = new RegExp( re.escapeRE(), 'g' ) );
			return AP.aggregate.call( a, [], function( v, o, i ) {
				!re.test( o ) || v.push( fn.call( ctx, o, i, a ) );
				return v;
			} );
		},
		groupBy   : function( f, fn, ctx ) {
			fn || ( fn = n8iv.requite );
			var a = this, keys, match, res = n8iv.obj();
			
			switch( n8iv.type( f ) ) {
				case 'function' : match = groupByFn;       break;
				case 'regexp'   : match = groupByRegExp;   break;
				case 'number'   :
				case 'string'   : match = groupByStr;
								  keys = AP.pluck.call( a, f, T ); break;
				default         : n8iv.trace().error( new TypeError( 'Array.prototype.groupBy can only match based on a Function, RegExp or String.' ), T );
			}
			
			( keys || [0, 1] ).forEach( function( k ) { res[k] = []; } );
			
			return AP.aggregate.call( a, res, function( v, o, i ) {
				v[match( f, o )].push( fn.call( this, o, i, a ) );
				return v;
			}, ctx || a );
		},
		include   : function( o ) { return AP.contains.call( this, o ) ? !1 : !this.push( o ) || T; },
		invoke    : function( fn ) {
			var args = Array.from( arguments, 1 );
			return AP.map.call( this, function( o, i ) { return o[fn].apply( o, args ); } );
		}, 
		invokec   : function( fn ) {
			var args = Array.from( arguments, 1 );
			return AP.mapc.call( this, function( o, i ) { return n8iv.isFn( o[fn] ) ? o[fn].apply( o, args ) : N; } );
		}, 
		item      : function( i ) { return this[i < 0 ? this.length + i : i]; },
		last      : function() { return this[this.length - 1]; },
		mapc      : function( fn, ctx ) {
			ctx || ( ctx = this );
			return AP.reduce.call( this, function( v, o, i, a ) {
				!n8iv.exists( ( o = fn.call( ctx, o, i, a ) ) ) || v.push( o );
				return v;
			}, [] );
		}, 
		pluck     : function( k, c ) { return AP[c === T ? 'mapc' : 'map'].call( this, function( o ) { return Object.value( o, k ); } ); },
		remove    : function() {
			var args = Array.from( arguments ), i, res = [], v;
			while ( v = args.shift() )
				!~( i = AP.indexOf.call( this, v ) ) || res.push( AP.splice.call( this, i, 1 )[0] );
			return res;
		}, // schwartzian optimised
		sortBy    : function( f, d ) { return AP.map.call( this, sortingVal, f ).sort( n8iv.isFn( d ) ? d : sort[String( d ).lc()] || sort.asc ).map( sortedVal ); },
		tuck      : function( k, a ) {
			var is_arr = Array.isArray( a );
			return AP.each.call( this, function( o, i ) { o[k] = is_arr ? a[i] : a; } );
		},
		uniq      : function() {
			return AP.reduce.call( this, function( v, o ) {
				v.contains( o ) || v.push( o );
				return v;
			}, [] );
		},
		without   : function() {
			var a = AP.clone.call( this ); a.remove.apply( a, arguments );
			return a;
		},
		zip       : function() {
			var args = Array.from( arguments ); args.unshift( this );
			return AP.map.call( this, function( o, i ) { return args.pluck( i ); } );
		}
	};
}(), 'w' );

!function() {
	function Class( path, desc ) {
		if ( !desc && n8iv.isObj( path ) ) {
			desc = path; path = '';
		}

		var C, name, ns, _ctor,
			_proto    = n8iv.obj(),
			_super    = desc.extend || Object,
			mod       = desc.module,
			mixin     = desc.mixin  || dumb,
			singleton = desc.singleton,
			type      = getType( desc.type || path );

		!n8iv.isStr( _super ) || ( _super = reg_path[_super] || reg_type[_super] );

		_ctor = desc[CTOR] !== Object ? desc[CTOR] : _super;

		if ( path ) {
			ns   = path.split( '.' );
			name = ns.pop();
			ns   = n8iv.bless( ns, mod );
		}

		n8iv.def( _proto, PARENT, n8iv.describe( n8iv.noop, cw ), T );

		n8iv.def( _proto, CTOR,   n8iv.describe( ctor( _ctor, _super[PROTO][CTOR], name, _proto ), r ), T );

		C = _proto[CTOR];

		n8iv.def(  C,     TYPE,   n8iv.describe( 'class', r ), T );
		n8iv.def( _proto, TYPE,   n8iv.describe(  type,   r ), T );

		Object.remove( desc, defaults );

		C[PROTO] = apply( _proto, n8iv.copy( desc, mixin ) );
		n8iv.def( C, 'create',    n8iv.describe( create( extend( C, _super ) ), r ), T );

		path = path.replace( re_root, '' );

		if ( singleton ) {
			n8iv.def( C, 'singleton', n8iv.describe( { value : ( singleton === T ? new C : C.create.apply( C, [].concat( singleton ) ) ) }, r ) );
			register( C, path, type );
			C = C.singleton;
		}
		else if ( path ) register( C, path, type );

		!( name && ns ) || n8iv.def( ns, name, n8iv.describe( { value : C }, r ) );

		return C;
	}

	function apply( proto, desc ) {
		Object.each( desc, function( v, k ) {
			switch( n8iv.type( v ) ) {
				case OBJ : n8iv.def( proto, k, v, T ); break;
				default  : proto[k] = v;
			}
		} );
		return proto;
	}

	function create( C ) { return function create() { return singleton( C ) || C.apply( Object.create( C[PROTO] ), arguments ); }; }

	function ctor( m, s, name, P ) {
		var C    = wrap( m, s, name ),
			Ctor = function() {
				return singleton( this.constructor ) || C.apply( is( this, Ctor ) ? this : Object.create( P ), arguments );
			};
		return Ctor.mimic( m, name );
	}

	function extend( C, Sup ) {
		if ( !( SUPER in C[PROTO] ) ) {
			var p = C[PROTO], sp = Sup[PROTO];

			Object.keys( sp ).forEach( function( k ) {
				if ( k in reserved ) return;
				switch ( n8iv.type( sp[k] ) ) {
					case FN : ( p[k] = !n8iv.isFn( p[k] ) ? wrap( sp[k], n8iv.noop, k ) : wrap( p[k], sp[k], k ) ); break;
					default : k in p || n8iv.def( p, k, n8iv.description( sp, k ), T );
				}
			} );

			Object.keys( p ).forEach( function( k ) {
				!( n8iv.isFn( p[k] ) && ( !( k in sp ) || p[k].valueOf() !== sp[k].valueOf() ) ) || ( p[k] = wrap( p[k], n8iv.noop, k ) );
			} );

			sp = n8iv.describe( { value : Object.create( Sup[PROTO] ) }, r );
			n8iv.def( C,        SUPER, sp );
			n8iv.def( C[PROTO], SUPER, sp );
		}
		return C;
	}

	function getType( type ) { return type.replace( re_root, '' ).replace( re_dot, '_' ).lc(); }

	function is( o, C ) {
		if ( o instanceof C ) return T;
		if ( !( o = o[CTOR] ) ) return F;
		do { if ( o === C ) return T; }
		while ( o[SUPER] && ( o = o[SUPER][CTOR] ) );
		return F;
	}

	function register( C, path, type ) {
		var err_msg = path + ERR_MSG, msg = [];
		!path || !( path in reg_path ) || msg.push( err_msg + 'Class' );
		!type || !( type in reg_type ) || msg.push( err_msg + 'Type'  );
		if ( msg[LEN] ) {
			n8iv.trace(); msg.forEach( n8iv.error ); n8iv.error( new Error( 'n8iv.Class overwrite error.' ), T );
		}
		reg_path[path] = reg_type[type] = C;
	}

	function singleton( C ) { return !C ? N : C.singleton || N; }

	function type( c ) {
		var ctor = c[CTOR], k;
		for ( k in reg_path ) if ( reg_path[k] === ctor ) return k;
		return N;
	}

	function wrap( m, s, name ) {
		return function() {
			var o, p = n8iv.description( this, PARENT ) || desc_noop;
			p.writable = T;
			n8iv.def( this, PARENT, ( s ? n8iv.describe( s, cw ) : desc_noop ), T );
			o = m.apply( this, arguments );
			n8iv.def( this, PARENT, p, T );
			return this.chain !== F && o === U ? this : o;
		}.mimic( m, name );
	}

	var ERR_MSG   = ' already exists. Cannot override existing ', PARENT = 'parent', SUPER = '__super',
		defaults  = ( CTOR + ' extend mixin module singleton type' ).split( ' ' ),
		desc_noop = n8iv.describe( n8iv.noop, cw ),
		dumb      = n8iv.obj(), re_dot   = /\./g,      re_root  = /^\u005E/,
		reg_path  = n8iv.obj(), reg_type = n8iv.obj(), reserved = n8iv.obj(); // <- Object.create( null ); resolves issue in safari with using {}

	reserved[CTOR] = reserved[PARENT] = reserved[SUPER] = reserved[TYPE] = T;

	n8iv.def( Class, 'is',     n8iv.describe( is,    r ) )
		.def( Class, 'type',   n8iv.describe( type,  r ) )
		.def( n8iv,  'Class',  n8iv.describe( Class, r ) )
		.def( n8iv,  'create', n8iv.describe( function( n ) {
			var C = reg_type[n] || reg_type['n8iv_' + n] || reg_path[n], args = Array.from( arguments, 1 );

			C || ( n8iv.trace().error( new Error( n + ' does not match any registered n8iv.Classes.' ), T ) );

			return C.create.apply( root, args );
		}, r ) );
}();

	function __lib__() {
		util.x.apply( util, arguments );
		return __lib__;
	}

	function x( Type, extender ) {
		util.x.cache( Type.__name__, extender ).x( Type );
		return __lib__;
	}

	util.iter( PACKAGE ) || ( PACKAGE = util.ENV == 'commonjs' ? module : util.global );

// expose n8iv
	util.defs( ( __lib__ = util.expose( __lib__, Name, PACKAGE ) ), {
		util : util,
		x    : x
	}, 'r' );
	util.expose( util, __lib__ );  // store a reference to m8 on n8iv

	util.x( Object, Array, Function, Number, String );

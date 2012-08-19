	function __lib__() {
		util.x.apply( util, arguments );
		return n8iv;
	}

	function x( Type, extender ) {
		util.x.cache( Type.__name__, extender ).x( Type );
		return n8iv;
	}

	util.iter( PACKAGE ) || ( PACKAGE = util.global );

// expose n8iv
	util.def( ( __lib__ = util.expose( __lib__, Name, util.ENV == 'commonjs' ? module : util.global ) ), 'x', x, 'r' );
	util.expose( util, __lib__ );  // store a reference to m8 on n8iv

	util.x( Object, Array, Function, Number, String );

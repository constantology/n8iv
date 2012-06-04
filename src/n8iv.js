	function n8iv() {
		m8.x.apply( m8, arguments );
		return n8iv;
	}

	function x( Type, extender ) {
		m8.x.cache( Type.__name__, extender ).x( Type );
		return n8iv;
	}

// store a reference to m8 in n8iv so we can do fun stuff in commonjs modules without having to re-request m8 as well as n8iv each time.
	m8.defs( n8iv, { m8 : { value : m8 }, x : x }, 'r' );
// expose n8iv
	m8.ENV != 'commonjs' ? m8.def( m8.global, 'n8iv', m8.describe( { value : n8iv }, 'r' ) ) : ( module.exports = n8iv );

	m8.x( Object, Array, Function, Number, String );

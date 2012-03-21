
	n8iv.ENV != 'commonjs' || module.exports === n8iv || ( module.exports = n8iv );

}( typeof n8iv != 'undefined' ? n8iv : typeof require != 'undefined' ? require( './n8iv._' ) : null );

n8iv.defs( String.prototype, function() {
	var cache_chars     = n8iv.obj(),
		cache_slices    = n8iv.obj(),
		esc_chars       = /([-\*\+\?\.\|\^\$\/\\\(\)[\]\{\}])/g,
		esc_val         = '\\$1',
		re_caps         = /([A-Z])/g,
		re_gsub         = /\$?\{([^\}]+)\}/g,
		re_hex          = /#?(\w{1,6})/,
		re_rgb          = /(\d{1,3})/g,
		re_split_string = /[\sA-Z_-]+/g;

// so we don't lose any chars on split
	function _splitString( m, p ) { return p + p.lc(); }
	function splitString( s ) {
		s = s.trim();
		var s0 = s.charAt( 0 ), s1 = s.charAt( 1 ),
			i = s0.lc() == s0 && s1 != ' ' && s1.uc() == s1 ? 2 : 1,
			o = s.substring( i ).replace( re_caps, _splitString ).split( re_split_string );
		o[0] = s.substring( 0, i ) + o[0];
		return o;
	}

/**
 * Some methods here are proposed in ES6: http://wiki.ecmascript.org/doku.php?id=harmony:string_extras
 * However, since we are extending prototypes the correct way, we don't need worry.
 * When the new methods are implemented, they will not be overwritten, instead, the methods here will be discarded.
 * */

	return {
		blank        : function() { return !!this.trim().empty(); },
		capitalize   : function() { return this.charAt( 0 ).uc() + this.substring( 1 ).lc(); },
		cc           : function() { return this.toCamelCase(); },
		clean        : function( character ) {
			character || ( character = ' ' );
			character = cache_chars[character] || ( cache_chars[character] = { re : new RegExp( '(' + character + '){1,}', 'g' ), fill : character } );
			return this.split( character.re ).filter( function( s ) { return !s.blank() && s != character.fill; } ).join( character.fill );
		},
		empty        : function() { return String( this ) === ''; },
		format       : function() { return this.gsub.call( this, Array.from( arguments ) ); },
		gsub         : function( o, pattern ) { return this.replace( ( pattern || re_gsub ), function( m, p ) { return o[p] || ''; } ); },
		hyphenate    : function() { return splitString( this ).join( '-' ).lc(); },
		includes     : function( s ) { return this.lc().contains( String( s ).lc() ); },
		lc           : function() { return this.toLowerCase(); },
		parts        : function( re ) {
			var m = Array.from( this.match( re ) );
			switch ( m.length ) {
				case 1  : if ( m[0] === N || m[0] === this ) return [];
				default : m[0] !== this || m.shift(); return m;
			}
		},
		qw           : function() { return this.split( ' ' ); },
		regexpEsc    : function() { return this.replace( esc_chars, esc_val ); },
		sliceEvery   : function( n ) {
			n = parseInt( n, 10 );
			if ( isNaN( n ) || this.length < n || n == 0 ) return [String( this )];
			return this.match( cache_slices[n] || ( cache_slices[n] = new RegExp( '(.{1,' + n + '})', 'g' ) ) );
		},
		times        : function( n ) { return new Array( Number.toInteger( n ) + 1 ).join( this ); },
		toCamelCase  : function() {
			var parts = splitString( this ), str = [parts.shift()];
			return parts.reduce( function( res, val ) {
				res.push( val.capitalize() );
				return res;
			}, str ).join( '' );
		},
		toHex        : ( function() {
			function toHex( o ) { return parseInt( o, 10 ).pad( 2, 16 ); }
			return function() {
				var m = this.match( re_rgb );
				return '#' + ( ( m.length == 1 ) ? toHex( m[0] ).times( 3 ) : m.map( toHex ).join( '' ) );
			}
		}() ),
		toJSON       : function() { return JSON.parse( this ); },
		toRGB        : function( as_array ) {
			var o = this.match( re_hex )[1], l = o.length, v;
			switch( l ) {
				case 6  : break;
				case 3  : o = this.times( 2 ); break;
				case 2  : o = this.times( 3 ); break;
				default : o = l > 6 ? o.substring( 0, 6 ) : l == 4 ? o + '00' : o + '0';
			}
			v = o.sliceEvery( 2 ).map( function( v ) { return parseInt( v, 16 ); } );
			return as_array === T ? v : 'rgb(' + v.join( ', ' ) + ')';
		},
		truncate     : function( i, c ) {
			i || ( i = 50 ); n8iv.isStr( c ) || ( c = '...' );
			return this.length < i ? String( this ) : this.substring( 0, i ).trimRight() + c;
		},
		uc           : function() { return this.toUpperCase(); },
		underscore   : function() { return splitString( this ).join( '_' ).lc(); }
	};
}(), 'w' );

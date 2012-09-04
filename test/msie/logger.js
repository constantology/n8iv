logger = new function() {
	var el = document.body.appendChild( document.createElement( 'div' ) );

	this.group = function group( label ) {
		el.innerHTML += '<h1 class="log-group">' + label + '</h1>';
	};
	this.log   = function log() {
		el.innerHTML += '<p class="log">' + Array.coerce( arguments ).join( ' ' ) + '</p>';
	};
}();

;(function(exports) {

	function Timer() {
		this.timer = 0;
	}

	Timer.prototype = {

		setTimer: function(time) {
			this.timer = time;
		},
		countdown: function() {
			this.timer -= 1000;
		},
		format: function() {

		}
	};

	exports.Timer = Timer;

})(typeof exports === 'undefined' ? this : exports);

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
			var time = this.timer,
				seconds = Math.floor((time / 1000) % 60),
				minutes = Math.floor((time / (1000 * 60)) % 60),
				hours = Math.floor((time / (1000 * 60 * 60)) % 24);

			var formattedTime = "";
			if (hours > 0 && hours < 10) {
				formattedTime += "0" + hours + ":";
			} else if (hours >= 10) {
				formattedTime += hours + ":";
			}

			if (minutes < 10) {
				formattedTime += "0" + minutes + ":";
			} else {
				formattedTime += minutes + ":";
			}

			if (seconds < 10) {
				formattedTime += "0" + seconds;
			} else {
				formattedTime += seconds;
			}

			return formattedTime;
		}
	};

	exports.Timer = Timer;

})(typeof exports === 'undefined' ? this : exports);

;(function() {

	var timer = new Timer();

	var socket = io.connect('http://localhost:3000');
	
	socket.on('currentTimer', function (data) {
		timer.timer = data.time;
	});

	$(function() {
		$('.time').on('click', function(e) {
			e.stopPropagation();
			var time = $(this).text() * 60 * 1000;
			timer.setTimer(time);
			socket.emit('setTimer', { time: time });
		});
	});

	setInterval(function() {
		if (timer.timer > 0) {
			timer.countdown();
			$('#timer').text(timer.format());
		}
	},1000);
	
})();
var express = require('express'),
	routes = require('./routes'),
	http = require('http'),
	path = require('path'),
	app = express(),
	server = http.createServer(app),
	io = require('socket.io').listen(server),
	Timer = require('./timer.js').Timer,
	timer = new Timer();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('itsabigsecret'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

setInterval(function() {
	if (timer.timer > 0) {
		timer.countdown();
	}
}, 1000);

io.sockets.on('connection', function(socket) {

	socket.emit('currentTimer', {time: timer.timer });
	
	socket.on('setTimer', function(data) {
		timer.setTimer(data.time);
		socket.broadcast.emit('currentTimer', {time: timer.timer });
	});
});
const express = require('express');
const app = express();
const fs = require('fs');

var options = {
	//pfx: fs.readFileSync('seiyuu.pfx')
	key: fs.readFileSync('privkey.pem'),
	cert: fs.readFileSync('fullchain.pem'),
	ca: fs.readFileSync('chain.pem')
};

var server = require('https').createServer(options, app);
var io = require('socket.io')(server);
app.use(express.static('public'));

io.on('connection', function(socket){
		const captions = JSON.parse(fs.readFileSync('public/captions.json'));
	  // socket.emit('captions', captions[video]);
		var titles = [];
		for (var title in captions) {
			titles.push(title);
		}

		socket.emit('video-selector', titles);

	socket.on('captions', (title) => {
		const captions = JSON.parse(fs.readFileSync('public/captions.json'));
		io.sockets.emit('captions', captions[title]);
	});

  socket.on('load-video', (name) => {
    const captions = JSON.parse(fs.readFileSync(`public/${name}.json`));
    socket.emit('captions', captions);
  });

  socket.on('type-intro', function(){
    io.sockets.emit('type-intro');
  });
  socket.on('type-delete', function(){
    io.sockets.emit('type-delete');
  });
  socket.on('play-video', function(video, start, duration){
    io.sockets.emit('play-video', video, start, duration);
  });
  socket.on('type-word-with-def', function(text){
    io.sockets.emit('type-word-with-def', text);
  });
  socket.on('type-word', function(text, subtitles){
    io.sockets.emit('type-word', text, subtitles);
  });
});

server.listen(3000, function () {
  console.log('Launching language robot!')
});

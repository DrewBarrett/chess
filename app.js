var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var Chess = require('chess.js').Chess;

var index = require('./routes/index');
var users = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

/*
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
*/

var game = new Chess();

var user = 0;
io.on('connection', function (socket) {
    user++;
    var localUser = user;
    var color;
    console.log('a user has connected: ' + localUser);
    if (localUser % 2 == 0) {
        color = 'black';
    } else {
        color = 'white';
    }
    io.emit('color', color);
    socket.on('disconnect', function () {
        console.log('user disconnected: ' + localUser);
    });
    socket.on('chat message', function (msg) {
        console.log(color + ': Chat: ' + msg);
        io.emit('chat message', color + ': ' + msg);
    });
});

http.listen(3000, function () {
    console.log('Server listening at http://localhost:3000');
});

module.exports = app;
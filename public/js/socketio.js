$(function () {
    var socket = io();
    $('form').submit(function () {
        console.log('Sending chat');
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });
    socket.on('chat message', function (msg) {
        console.log('Chat: ' + msg);
        $('#messages').append($('<li>').text(msg));
    });
    socket.on('color', function (color) {
        console.log('Color: ' + color);
        $('#color').html(color);
    });
});
$(document).ready(function() {
    // Connect to the Socket.IO server.
    // The connection URL has the following format, relative to the current page:
    //     http[s]://<domain>:<port>[/<namespace>]
    var socket = io();

    // Event handler for new connections.
    // The callback function is invoked when a connection with the
    // server is established.
    socket.on('connect', function() {
        socket.emit('connection', {data: 'User successfully connected to server'});
    });

    socket.on('disconnect', function() {
        socket.emit('disconnection', {data: 'User disconnected from server'});
    });

    socket.on('debug_event', function(message) {
        if(message.hasOwnProperty('count')) {
            console.log(`${message['data']} [${message['count']}]`)
        }
        else {
            console.log(message['data'])
        }
    });

});

//emit disconnect event on page reload
$(window).on('beforeunload', function(){
    socket.emit('disconnection')
});

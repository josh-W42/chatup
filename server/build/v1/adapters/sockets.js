"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("socket.io");
var io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
io.on("connection", function (socket) {
    console.log(socket);
    // // All rooms are found with their mongo ids
    // // so a socket can join a workspace, room, or Direct message
    // // room just by referencing the id.
    // socket.on('join room', (data) => {
    //   const id = data.id;
    //   socket.join(id);
    // });
    // socket.on('leave room', (data) => {
    //   const id = data.id;
    //   socket.leave(id);
    // });
    // // We want to emit to all sockets that are in the room
    // //  So that way we can add a post
    // socket.on('new post', (data) => {
    //   if (data.isComment) {
    //     io.to(`${data.newPost.postId}-room`).emit('newContent', data.newPost);
    //     socket.to(`${data.newPost.postId}-notification`).emit('newNotification', data.newPost);
    //   } else {
    //     io.to(`${data.newPost.roomId}-room`).emit('newContent', data.newPost);
    //     socket.to(`${data.newPost.roomId}-notification`).emit('newNotification', data.newPost);
    //   }
    // });
    // socket.on('delete post', (data) => {
    //   io.to(`${data.roomId}-room`).emit('deleteContent', data._id);
    // });
    socket.on("disconnect", function () {
        console.log("disconnect: " + socket.id);
    });
});
io.emit("message", new Date().toTimeString());

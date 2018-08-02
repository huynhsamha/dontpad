import socketIO from 'socket.io';
import DontpadCtrl from '../controllers/dontpad';

export default (server) => {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    // console.log('Connected:', socket.id);

    const emitUserInRoom = (room) => {
      const usersInRoom = io.sockets.adapter.rooms[room];
      if (usersInRoom) {
        io.to(room).emit('SERVER_USER_IN_ROOM_CHANGED', usersInRoom.length - 1);
      }
    };

    socket.on('disconnect', () => {
      // console.log('Disconnect:', socket.id);
      if (socket.roomID) {
        emitUserInRoom(socket.roomID);
      }
    });

    socket.on('CLIENT_JOIN_ROOM', (room) => {
      // console.log('Join room:', socket.id, room);
      socket.join(room);
      socket.roomID = room;

      emitUserInRoom(room);

      DontpadCtrl.findOneByUrl(room)
        .then((dontpad) => {
          // console.log(dontpad);
          const { title, model, createdAt, updatedAt } = dontpad;
          socket.emit('SERVER_SEND_DATA_IN_ROOM', { title, model, createdAt, updatedAt });
        })
        .catch((err) => {
          console.log(err);
          socket.emit('SERVER_ERROR');
        });
    });

    socket.on('CLIENT_MODEL_CHANGED', (data) => {
      const { model, room } = data;
      // console.log('Model Changed:');
      // console.log('Room:', room);
      socket.broadcast.to(room).emit('SERVER_MODEL_CHANGED', model);

      DontpadCtrl.updateOne(room, { model })
        .then((res) => {
          // console.log(res);
          socket.emit('SERVER_DATA_SAVED');
        })
        .catch((err) => {
          console.log(err);
          socket.emit('SERVER_ERROR');
        });
    });

    socket.on('CLIENT_TITLE_CHANGED', (data) => {
      const { title, room } = data;
      // console.log('Title Changed:');
      socket.broadcast.to(room).emit('SERVER_TITLE_CHANGED', title);

      DontpadCtrl.updateOne(room, { title })
        .then((res) => {
          // console.log(res);
          socket.emit('SERVER_DATA_SAVED');
        })
        .catch((err) => {
          console.log(err);
          socket.emit('SERVER_ERROR');
        });
    });

  });
};

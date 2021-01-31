import socketIO from 'socket.io';
import DontpadCtrl from '../controllers/dontpad';
import conf from '../../client/src/config';
import { generateSessionKey } from '../controllers/session';

export default (server) => {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    // console.log('Connected:', socket.id);

    const emitUserInRoom = (room) => {
      const usersInRoom = io.sockets.adapter.rooms[room];
      if (usersInRoom) {
        io.to(room).emit(conf.socket.server.userInRoomChanged, usersInRoom.length - 1);
      }
    };

    socket.on('disconnect', () => {
      // console.log('Disconnect:', socket.id);
      if (socket.roomID) {
        emitUserInRoom(socket.roomID);
      }
    });

    socket.on(conf.socket.client.joinRoom, (room) => {
      // console.log('Join room:', socket.id, room);
      socket.join(room);
      socket.roomID = room;
      socket.sk = generateSessionKey({ socketId: socket.id });

      emitUserInRoom(room);

      DontpadCtrl.findOneByUrl(room)
        .then((dontpad) => {
          // console.log(dontpad);
          const { title, model, createdAt, updatedAt } = dontpad;
          socket.emit(conf.socket.server.sendDataInRoom, { title, model, createdAt, updatedAt });
        })
        .catch((err) => {
          console.log(err);
          socket.emit(conf.socket.server.error);
        });
    });

    socket.on(conf.socket.client.modelChanged, (data) => {
      const { model, room } = data;
      // console.log('Model Changed:');
      // console.log('Room:', room);
      socket.broadcast.to(room).emit(conf.socket.server.modelChanged, model);

      DontpadCtrl.updateOne(room, { model })
        .then((res) => {
          // console.log(res);
          socket.emit(conf.socket.server.dataSaved);
        })
        .catch((err) => {
          console.log(err);
          socket.emit(conf.socket.server.error);
        });
    });

    socket.on(conf.socket.client.titleChanged, (data) => {
      const { title, room } = data;
      // console.log('Title Changed:');
      socket.broadcast.to(room).emit(conf.socket.server.titleChanged, title);

      DontpadCtrl.updateOne(room, { title })
        .then((res) => {
          // console.log(res);
          socket.emit(conf.socket.server.dataSaved);
        })
        .catch((err) => {
          console.log(err);
          socket.emit(conf.socket.server.error);
        });
    });

  });
};

import socketIO from 'socket.io';
import DontpadCtrl from '../controllers/dontpad';
import conf from '../../client/src/config';
import { decryptSessionKey, encryptData, decryptData } from '../controllers/session';
import { sessionKeyLength } from '../config/socket';

export default (server) => {
  const io = socketIO(server);

  io.on('connection', (socket) => {

    const emitUserInRoom = (room) => {
      const usersInRoom = io.sockets.adapter.rooms[room];
      if (usersInRoom) {
        io.to(room).emit(conf.socket.server.userInRoomChanged, usersInRoom.length - 1);
      }
    };

    socket.on('disconnect', () => {
      if (socket.roomID) {
        emitUserInRoom(socket.roomID);
      }
    });

    socket.on(conf.socket.client.joinRoom, (message) => {
      if (!message) return;
      const { room = '', sk = '' } = message;
      if (!room || !sk || room.startsWith('/api')) return;
      const enk = decryptSessionKey({ encryptedSessionKey: sk });
      if (!enk || enk.length != sessionKeyLength) return;

      socket.join(room);
      socket.roomID = room;
      socket.sk = enk;

      emitUserInRoom(room);

      DontpadCtrl.findOneByUrl(room)
        .then((dontpad) => {
          const { title, model, createdAt, updatedAt } = dontpad;
          const data = { title, model, createdAt, updatedAt };
          const cipher = encryptData({ enk, data });
          if (cipher) {
            socket.emit(conf.socket.server.sendDataInRoom, cipher);
          } else {
            socket.emit(conf.socket.server.error);
          }
        })
        .catch((err) => {
          console.log(err);
          socket.emit(conf.socket.server.error);
        });
    });

    socket.on(conf.socket.client.modelChanged, (data) => {
      const rawData = decryptData({ enk: socket.sk, data });
      if (!rawData) return;

      const { model, room } = rawData;
      // socket.broadcast.to(room).emit(conf.socket.server.modelChanged, model);
      const sockets = io.in(room).sockets;
      Object.keys(sockets)
        .filter(sid => sid != socket.id) // exclude sender
        .forEach((sid) => {
          const socket = sockets[sid];
          const { roomID, sk } = socket;
          if (roomID != room || !sk) return;
          const cipher = encryptData({ enk: sk, data: { model } });
          socket.emit(conf.socket.server.modelChanged, cipher);
        });

      DontpadCtrl.updateOne(room, { model })
        .then((res) => {
          socket.emit(conf.socket.server.dataSaved);
        })
        .catch((err) => {
          console.log(err);
          socket.emit(conf.socket.server.error);
        });
    });

    socket.on(conf.socket.client.titleChanged, (data) => {
      const rawData = decryptData({ enk: socket.sk, data });
      if (!rawData) return;

      const { title, room } = rawData;
      // socket.broadcast.to(room).emit(conf.socket.server.titleChanged, title);
      const sockets = io.in(room).sockets;
      Object.keys(sockets)
        .filter(sid => sid != socket.id) // exclude sender
        .forEach((sid) => {
          const socket = sockets[sid];
          const { roomID, sk } = socket;
          if (roomID != room || !sk) return;
          const cipher = encryptData({ enk: sk, data: { title } });
          socket.emit(conf.socket.server.titleChanged, cipher);
        });

      DontpadCtrl.updateOne(room, { title })
        .then((res) => {
          socket.emit(conf.socket.server.dataSaved);
        })
        .catch((err) => {
          console.log(err);
          socket.emit(conf.socket.server.error);
        });
    });

  });
};

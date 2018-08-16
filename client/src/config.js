export default {
  socket: {
    client: {
      joinRoom: 'CLIENT_JOIN_ROOM',
      modelChanged: 'CLIENT_MODEL_CHANGED',
      titleChanged: 'CLIENT_TITLE_CHANGED'
    },
    server: {
      userInRoomChanged: 'SERVER_USER_IN_ROOM_CHANGED',
      sendDataInRoom: 'SERVER_SEND_DATA_IN_ROOM',
      modelChanged: 'SERVER_MODEL_CHANGED',
      titleChanged: 'SERVER_TITLE_CHANGED',
      dataSaved: 'SERVER_DATA_SAVED',
      error: 'SERVER_ERROR'
    }
  }
};

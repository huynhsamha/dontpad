const crypto = require('crypto-js');
const cryptoRandomString = require('crypto-random-string');

const generateSessionKey = ({ socketId }) => {
  const salt = cryptoRandomString({ length: 15 });
  const sessionKey = crypto.MD5(socketId + salt).toString();
  return sessionKey;
};

export {
  generateSessionKey
};

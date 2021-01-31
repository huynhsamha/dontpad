const NodeRSA = require('node-rsa');
const CryptoJS = require('crypto-js');

function generateString(length) {
  const allowChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const maxLen = allowChars.length;
  let result = '';
  for (let i = 0; i < length; i++) {
    result += allowChars.charAt(Math.floor(Math.random() * maxLen));
  }
  return result;
}

const generateSessionKey = skLength => generateString(skLength);

const importServerSocketPublicKey = ({ pubKey }) => {
  const bufPubKey = Buffer.from(pubKey, 'base64');
  const rsaPubKey = new NodeRSA(bufPubKey, 'pkcs8-public-der', { environment: 'browser' });
  return rsaPubKey;
};

const encryptSessionKey = ({ sk = '', rsaPubKey = new NodeRSA() }) => rsaPubKey.encrypt(sk, 'base64');

const encryptData = ({ enk, data }) => {
  try {
    const msg = JSON.stringify(data);
    return CryptoJS.AES.encrypt(msg, enk).toString();
  } catch (err) {
    return null;
  }
};

const decryptData = ({ enk, data }) => {
  try {
    const jsonStr = CryptoJS.AES.decrypt(data, enk).toString(CryptoJS.enc.Utf8);
    return JSON.parse(jsonStr);
  } catch (err) {
    return null;
  }
};

export {
  generateSessionKey,
  importServerSocketPublicKey,
  encryptSessionKey,
  encryptData,
  decryptData
};

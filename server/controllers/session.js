const crypto = require('crypto');
const CryptoJS = require('crypto-js');

// passphrase which is used to encrypt private key when generate keypair of server
const { privateKeyPassphrase, privateKey, publicKey } = require('../config/socket');

// import a private key, using passphrase to decrypt
const importPrivateKey = (privateKey) => {
  var bufferPrivateKey = Buffer.from(privateKey, 'base64');
  const key = crypto.createPrivateKey({
    key: bufferPrivateKey,
    type: 'pkcs8',
    format: 'der',
    cipher: 'aes-256-cbc',
    passphrase: privateKeyPassphrase
  });
  return key;
};

/**
 * Decrypt a message which is encrypted by public key
 * @param {privateKey} KeyObject private key is decryped by passphrase
 * @param {encryptedData} base64 encryped data using public key
 */
const decryptRSA = function ({ privateKey, encryptedData }) {
  var bufferEncrypted = Buffer.from(encryptedData, 'base64');
  var decrypted = crypto.privateDecrypt(
    privateKey,
    bufferEncrypted
  );
  return decrypted.toString('utf8');
};

console.log('================== Public Key ==================');
console.log(publicKey);
console.log('================== Private Key ==================');
console.log(privateKey);
console.log('================== Private Key Passphrase ==================');
console.log(privateKeyPassphrase);
console.log('================== Import Private Key ==================');

const ServerPrivateKey = importPrivateKey(privateKey);

const decryptSessionKey = function ({ encryptedSessionKey = '' }) {
  try {
    return decryptRSA({ privateKey: ServerPrivateKey, encryptedData: encryptedSessionKey });
  } catch (err) {
    return null;
  }
};

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
  decryptSessionKey,
  encryptData,
  decryptData
};

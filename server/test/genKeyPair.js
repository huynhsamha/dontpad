require('dotenv').config();

const crypto = require('crypto');
const { privateKeyPassphrase } = require('../config/socket');

crypto.generateKeyPair('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'der'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'der',
    cipher: 'aes-256-cbc',
    passphrase: privateKeyPassphrase
  }
}, (err, publicKey, privateKey) => {
  console.log('============ Public Key ============');
  console.log(publicKey.toString('base64'));
  console.log('============ Private Key ============');
  console.log(privateKey.toString('base64'));
});

const crypto = require('crypto');

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
    passphrase: 'This is a passphrase'
  }
}, (err, publicKey, privateKey) => {
  console.log('============ Public Key ============');
  console.log(publicKey.toString('base64'));
  console.log('============ Private Key ============');
  console.log(privateKey.toString('base64'));
});

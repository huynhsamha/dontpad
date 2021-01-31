module.exports = {
  publicKey: process.env.SERVER_SOCKET_PUBLIC_KEY || '',
  privateKey: process.env.SERVER_SOCKET_PRIVATE_KEY || '',
  privateKeyPassphrase: process.env.SERVER_SOCKET_PRIVATE_KEY_PASSPHRASE || 'top secret',
  sessionKeyLength: process.env.SERVER_SOCKET_SESSION_KEY_LENGTH || 32
};

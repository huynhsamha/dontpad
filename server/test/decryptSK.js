/**
 * A sample for decrypt session key, using private key
 * which is generated and set in .env file
 */
require('dotenv').config();

const crypto = require('crypto');

// passphrase which is used to encrypt private key when generate keypair of server
const { privateKeyPassphrase } = require('../config/socket');

// private key which is generated and set in .env file
const privateKey = 'MIIFLTBXBgkqhkiG9w0BBQ0wSjApBgkqhkiG9w0BBQwwHAQIUgiFfEEFtagCAggAMAwGCCqGSIb3DQIJBQAwHQYJYIZIAWUDBAEqBBCdNBa9cSF6SGYZwMY0d2brBIIE0Kqp6yqQTpDqR3s39wUq1oPtY4qmUfyidyjydw8CyETreDuHJmbuL8qjM4/KAYh+ABf4PDKWuMftakBhb+Y9437oia78AgTrkdzTLiEutbX3v898ma+iR6FZ2/11GplNmg7LZih36zyA2zBKHzYQ6ZYKMGI1yye+ug/AeS5/kFCaCE4pfxT+9TI5jWs5k3wUPLT4hp4GK7KNi/kTgrjEpLSyefqGP4d0G+VJaudGpsTJLMWpV2rTzvKXngImkIvI2cUD1hcHCDnXDeEEI7ku45DmOCFuwLZwulu5cU3sW59EJdJAEidr5dJ5DrzHezCw7mxTho9KGJhB6bQ5pkWxR/gm2JCxQLmUERK8UaHxBObYkgNUeNonCT5Ukz6mpCuv/3yQCccpQbAWZf5AGnx5KgBK++cm5n0XW0mjbEpcten2gzOSYDI0vZ75+yNxQGpzOKTZJEU7clgJ9H0a8Jh0iqjO3kxlxR5Eu4DXxDFOCuMKJXCXHgM6Ri3fEGEVFMVc8d3vE8Zj6dTVf+mX225T6tSe72kL83X2rhH1gNHVPn8ooQASwjaiA6OGCTjTHjEbrrFlAmWsz3VRIaGPlKE3+TpLWAGOubQv7MmTYWvEo6ti8jJiIbp7EoEZNdUs3BS81ds9INmyIYq6X/CkoppSYyNCNKO1FN4qn1AU4t+Ftvl70qrD6tEHnJW39I3JsDbCtErQ9gYjEa3y6SG6xye98CIcCTh6u1+DlO1MDHCawEy7C/qJHx8R4khOR7GHKDHI0UAOdiP9oTwnSzgbElBG18C7NAxSPEZwUbTM7tTVF1ygikUeQJyCCBAP/TR474aLvPkFErgu10moErfUzTTS+I2BuTuUjVdLkNtlyERB5fcge/xdPCo8GjRnJjLakxsjDkhmi5Pfw9KOE4OVwnwYnKs6pUdbqMagAbuLqvGNwVgE4YbM7UEO6ASts1KCc5h8aAqV/L4arcmMR/HqV4tFECBdkpuZ3XsDn0OOyS/EjqRyLNjoecDBMl8h2OOlLFYMeVmg05BQ68c+er8z+db4ElBMY1OU5+Q11bMKyHHxWvMCk/HMu17xQ3i1H+tv1vlTUwohncQhPMpoEoqvBn4+YmPFA5X5MfaQ3h3PXJLjPtfLOsSbuiN0DO5dvLLItmfTguoT2cs27eFEZauqcLsFuqYbcEtWdu4DUVErKNVdkqP+G0A6aju/Mr4bPHoTdvS6CWHyLwUpDCMh++rVdNM5mcIZAwisg5AaglrXFQCgHY6q647lMJu1o1g4+SVTlc9C5/KmGneYw3BBHOVdLWDV7yE2OZWiH8WIb6BnOCNDx/eSIyM0UFTZRutnD+c7qb0OBPY6rftPWz9MJ4/aDUkAHiLlpsHmNiZ6KhC49LDndwmhTjkQk5QNLRFQEfpvo1SubrjvlhdIaHrb0LfYnYnkx8fG4Ftit1biWRjoKrgpVClYZ+B2J4eFmA0lT9yPQlqXFMhjODjvZkOPhmgLs8ly1dws9LmDCCz7pGwQiypw3CNox3IWNwkju4APRKDjQPvtndal4ixdQNvAY2f3TvrjyXlx0s7cgDtdU8lcOZbNqWKIj3uXYvouVKka+Y8o4fvj318AHlwrot2g/S4AmuGQNQZhwCfiY1oHoOwn+nRanQKQ';

// a session key which is encrypted from client, using public key of server
// server should decrypt this key to get session key of client
// use this session key for symetric encryption between client and server
const encryptedSessionKey = 'i14tmNOh8ipLPI+05g5795vidv+bn+bZAMyt3yUbAUN/yo9pzKDyUS8snmlaAKZdNQYLTxsibnlonrvcghqvFFNFDBHnKo7/BoUvebZKcH8s1vPrYWsXF9914AaSQPULHdrF7idWnzPAFZeQLcNSXsOY/3RiyRWtWA+tpJWcQbNfUTLEsercUP2GuM+BOSuMHc26IcmUIrCmMmXIPCfZIEEwTw5z98v8mKInqZut9pYRbaeg21IH0YP+Z6AterPBqhyIRzSoA0smt0VLFsu1OfZuGCBedXKkl+rt/BD25x9EF0caeuH7640Gs/AEZmQQWBEX/Rj8oZpO3ttABOeT5g==';

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

const pk = importPrivateKey(privateKey);
console.log(decryptRSA({ encryptedData: encryptedSessionKey, privateKey: pk }));

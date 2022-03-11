const fs = require('fs');
const { createCipheriv, createDecipheriv } = require('crypto');

// Options
const encoding = 'utf8';
const algo = 'aes256'; // Block cipher mode

// Files
const ivFile = 'iv.txt';
const keyFile = 'key.txt';
const jsonFile = 'fruits.json';
const encryptedJsonFile = 'encrypted-json.txt';

// Get data from files
const getJson = () => {
  try {
    const data = fs.readFileSync(jsonFile, encoding);
    console.log('Parsed json: ', JSON.parse(data));
    return data;
  } catch (err) {
    console.error(err);
  }
};
const getEncryptedJson = () => {
  try {
    const data = fs.readFileSync(encryptedJsonFile, encoding);
    console.log('Parsed json: ', JSON.stringify(data));
    return data;
  } catch (err) {
    console.error(err);
  }
};
const getKey = () => {
  try {
    const data = fs.readFileSync(keyFile, encoding);
    console.log('Key: ', data);
    return data;
  } catch (err) {
    console.error(err);
  }
};
const getIv = () => {
  try {
    const data = fs.readFileSync(ivFile, encoding);
    console.log('Iv: ', data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

// Encryption methods
const handleDecryption = () => {
  const iv = getIv();
  const key = getKey();
  const data = getEncryptedJson();

  try {
    const decipher = createDecipheriv(algo, key, iv);
    const decrypted = decipher.update(data, 'hex', encoding) + decipher.final(encoding);
    console.log('Decrypted: ', decrypted.toString(encoding));
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};
const handleEncryption = () => {
  const iv = randomBytes(16);
  const key = randomBytes(32);
  const data = getJson();

  try {
    const cipher = createCipheriv(algo, key, iv);
    const encrypted = cipher.update(data, encoding, 'hex') + cipher.final('hex');
    console.log('Encrypted: ', encrypted);

    fs.writeFileSync(ivFile, iv);
    fs.writeFileSync(keyFile, key);
    fs.writeFileSync(encryptedJsonFile, encrypted);
  } catch (err) {
    console.log(err);
  }
};

// Run the program 
(() => {
  // Command line args
  const args = process.argv.slice(2);

  switch (args[0]) {
    case 'encrypt':
      return handleEncryption();

    case 'decrypt':
      return handleDecryption();

    default:
      console.log('Argument required: node index.js [encrypt | decrypt]');
      process.exit(1);
  }
})();

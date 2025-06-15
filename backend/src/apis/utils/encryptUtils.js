const CryptoJS = require("crypto-js");
// const { HTTPErrors } = require("../utils/errorUtils");

//? Encrypt Function
const encrypt = (data, key, iv) => {
  //? Convert data to JSON string
  const cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();

  return cipherText;
};

module.exports = { encrypt };

const CryptoJS = require("crypto-js");
// const { HTTPErrors } = require("../utils/errorUtils");

//? Decrypt Function
const decrypt = (cipherText, key, iv) => {
  //? Decrypt the cipherText
  const bytes = CryptoJS.AES.decrypt(cipherText, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  // ? Convert decrypted bytes to UTF-8 string and parse as JSON
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  return decryptedData;
};

module.exports = { decrypt };

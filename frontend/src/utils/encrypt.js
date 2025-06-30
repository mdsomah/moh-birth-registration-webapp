//? Import CryptoJS library
import CryptoJS from "crypto-js";

//? Parse Key and IV
// const key = `${process.env.REACT_APP_ENCRYPTION_KEY}`;
// const iv = `${process.env.REACT_APP_ENCRYPTION_IV}`;

//? Encrypt function using AES CBC mode with PKCS7 padding
export const encrypt = (data, key, iv) => {
  const cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();

  return cipherText;
};

//? Import CryptoJS library
import CryptoJS from "crypto-js";

//? Parse Key and IV
// const key = `${process.env.REACT_APP_ENCRYPTION_KEY}`;
// const iv = `${process.env.REACT_APP_ENCRYPTION_IV}`;

//? Decrypt function using AES encryption
export const decrypt = (cipherText, key, iv) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  return decryptedData;
};

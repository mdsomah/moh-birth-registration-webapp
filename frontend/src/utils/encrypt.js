//? Import CryptoJS library
import CryptoJS from "crypto-js";

//? Parse Key and IV
const key = CryptoJS.enc.Utf8.parse(`${process.env.ENCRYPTION_KEY}`);
const iv = CryptoJS.enc.Utf8.parse(`${process.env.ENCRYPTION_IV}`);

//? Encrypt function using AES CBC mode with PKCS7 padding
export const encrypt = (data) => {
  return CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
};

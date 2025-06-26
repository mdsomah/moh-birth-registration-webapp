//? Import CryptoJS library
import CryptoJS from "crypto-js";

//? Parse Key and IV
const key = CryptoJS.enc.Utf8.parse("A!B@C3D$E%F6G&H8I9J0K1L2M3N4O5P6");
const iv = CryptoJS.enc.Utf8.parse("!H@G3F4E%D6C7B*A");

//? Encrypt function using AES CBC mode with PKCS7 padding
export const encrypt = (data) => {
  return CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
};

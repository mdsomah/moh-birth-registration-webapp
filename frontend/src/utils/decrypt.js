//? Import CryptoJS and node-forge libraries
import CryptoJS from "crypto-js";
import forge from "node-forge";

//? Private key for decryption
const privateKey = `${process.env.PRIVATE_KEY}`;

//? Decrypt function using RSA and AES encryption
export const decrypt = (payload, sessionKey) => {
  if (!privateKey) throw new Error("Private key not loaded");
  const pk = forge.pki.privateKeyFromPem(privateKey);
  const dk = forge.util.decode64(sessionKey);
  const dec = pk.decrypt(dk, "RSAES-PKCS1-V1_5");
  if (!dec || dec.length < 48) throw new Error("Failed to decrypt session key");
  const kb = CryptoJS.enc.Latin1.parse(dec.substring(0, 32));
  const ib = CryptoJS.enc.Latin1.parse(dec.substring(32, 48));
  const dd = CryptoJS.AES.decrypt(payload, kb, {
    iv: ib,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return JSON.parse(dd.toString(CryptoJS.enc.Utf8));
};

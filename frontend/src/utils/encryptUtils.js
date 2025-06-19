import CryptoJS from "crypto-js";

//? Key for encryption (must be the same as the one used in the backend)
const key =
  "3d933adb15497dc0e02dde56f7d160d87518e3b62e88685f633847a75a5977d0e297f32d828a0068e7e9cff14264852bf95565d7539e5b7e6ee8aa4137892f83";

//? IV for encryption (must be the same as the one used in the backend)
const iv =
  "1730da9135d2c7f54503549cb96d7a762122023f3e1223afe9bbf884d4b5f3f753b19d8bf8f43c81f9c1f73ce3661809579ae8ef3a5e8ef3a507b3a33f3ca098ddef83e";

//? Encrypt Function
export const encrypt = (data) => {
  //? Convert data to JSON string
  const cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();

  return cipherText;
};

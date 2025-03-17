function encryptData(data) {
  var encrypted = CryptoJS.AES.encrypt(data, "Ruyek417714keuyR").toString();
  return encrypted;
}

function decryptData(data) {
  var decrypted = CryptoJS.AES.decrypt(data, "Ruyek417714keuyR").toString(
    CryptoJS.enc.Utf8
  );
  return decrypted;
}

export { encryptData, decryptData };

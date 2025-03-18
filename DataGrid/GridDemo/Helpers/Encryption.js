function EncryptData(data) {
  var encrypted = CryptoJS.AES.encrypt(data, "Ruyek417714keuyR").toString();
  return encrypted;
}

function DecryptData(data) {
  var decrypted = CryptoJS.AES.decrypt(data, "Ruyek417714keuyR").toString(
    CryptoJS.enc.Utf8
  );
  return decrypted;
}

export { EncryptData, DecryptData };

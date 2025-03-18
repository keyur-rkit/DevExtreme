/**
 * Encrypts the given data using AES encryption.
 *
 * @param {string} data - The data to encrypt.
 * @returns {string} The encrypted data as a string.
 */
function EncryptData(data) {
  var encrypted = CryptoJS.AES.encrypt(data, "Ruyek417714keuyR").toString();
  return encrypted;
}

/**
 * Decrypts the given encrypted data using AES decryption.
 *
 * @param {string} data - The encrypted data to decrypt.
 * @returns {string} The decrypted data as a string.
 */
function DecryptData(data) {
  var decrypted = CryptoJS.AES.decrypt(data, "Ruyek417714keuyR").toString(
    CryptoJS.enc.Utf8
  );
  return decrypted;
}

export { EncryptData, DecryptData };

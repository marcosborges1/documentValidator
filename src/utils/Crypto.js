const SimpleCrypto = require("simple-crypto-js").default

const secretKey = "marcosborges"

const Crypto = new SimpleCrypto(secretKey)

export default Crypto;

// const plainText = "Marcos Borges"
// const cipherText = simpleCrypto.encrypt(plainText)
// const decipherText = simpleCrypto.decrypt(cipherText)
// console.log("Decipher Text : " + decipherText)
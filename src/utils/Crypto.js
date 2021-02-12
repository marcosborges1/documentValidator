const SimpleCrypto = require("simple-crypto-js").default

const secretKey = "marcosborges"

const Crypto = new SimpleCrypto(secretKey)

export default Crypto;
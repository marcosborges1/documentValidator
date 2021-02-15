const BASE_URL = `${window.location.origin}`
const PORT = 8080


if(BASE_URL.search("localhost") == -1) {
    module.exports = {
        SERVER_URL:`https://server-document-validator-12.uc.r.appspot.com`    
    } 
}
else {
    module.exports = {
        SERVER_URL: `http://localhost:${PORT}`
    }
}
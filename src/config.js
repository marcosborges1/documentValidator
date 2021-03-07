const BASE_URL = `${window.location.origin}`
const PORT = 8080


if(BASE_URL.search("localhost") == -1) {
    module.exports = {
        SERVER_URL:`http://54.82.65.68:80/`    
    } 
}
else {
    module.exports = {
        SERVER_URL: `http://localhost:${PORT}`
    }
}
const BASE_URL = `${window.location.origin}`
const PORT = 4000


if(BASE_URL.search("localhost") == -1) {
    module.exports = {
        SERVER_URL:`http://localhost:${PORT}`    
    } 
}
else {
    module.exports = {
        SERVER_URL: `http://localhost:${PORT}`    
    }
}
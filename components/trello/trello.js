let Trello = require("trello");

module.exports = function(key, token){
    let trello = new Trello(key, token);
    return trello;
}
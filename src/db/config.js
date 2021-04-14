const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

module.exports = () =>//precisa ser inserido dentro de uma estrutura de função
    open({ 
    filename:'./database.sqlite', //onde as informações serão salvas
    driver: sqlite3.Database //
});

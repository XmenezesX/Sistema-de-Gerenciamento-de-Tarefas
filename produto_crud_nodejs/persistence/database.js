
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./produto.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS produto (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, preco REAL)");
});

module.exports = db;

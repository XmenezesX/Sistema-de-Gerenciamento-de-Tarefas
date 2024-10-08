
const db = require('./database');
const Produto = require('../model/produto');

class ProdutoDAO {
    static criar(produto) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO produto (nome, preco) VALUES (?, ?)';
            db.run(query, [produto.nome, produto.preco], function (err) {
                if (err) reject(err);
                else {
                    produto.id = this.lastID;
                    resolve(produto);
                }
            });
        });
    }

    static listar() {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM produto", (err, rows) => {
                if (err) reject(err);
                else {
                    const produtos = rows.map(row => new Produto(row.id, row.nome, row.preco));
                    resolve(produtos);
                }
            });
        });
    }

    static buscarPorId(id) {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM produto WHERE id = ?", [id], (err, row) => {
                if (err) reject(err);
                else {
                    if (row) resolve(new Produto(row.id, row.nome, row.preco));
                    else resolve(null);
                }
            });
        });
    }

    static atualizar(produto) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE produto SET nome = ?, preco = ? WHERE id = ?';
            db.run(query, [produto.nome, produto.preco, produto.id], function (err) {
                if (err) reject(err);
                else resolve(produto);
            });
        });
    }

    static remover(id) {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM produto WHERE id = ?", [id], function (err) {
                if (err) reject(err);
                else resolve();
            });
        });
    }
}

module.exports = ProdutoDAO;

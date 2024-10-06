const db = require('./database');
const Tarefa = require('../models/tarefa');

class TarefaDAO {
    static Cadastrar(tarefa){
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO tarefas (titulo, descricao) VALUES (?, ?)';
            db.run(query, [tarefa.titulo, tarefa.descricao], function (err) {
                if (err) reject(err);
                else {
                    tarefa.id = this.lastID;
                    resolve(tarefa);
                }
            });
        });
    }

    static Listar(){
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM tarefas", (err, rows) => {
                if (err) reject(err);
                else {
                    const tarefas = rows.map(row => new Tarefa(row.id, row.titulo, row.descricao, row.status));
                    resolve(tarefas);
                }
            });
        });
    }

    static obtemElementoUnico(id){
        return new Promise((resolve, reject)=> {
            db.get("SELECT * FROM tarefas WHERE id = ?",[id],(err, row) => {
                if (err) reject(err);
                else {
                    if (row) resolve(new Tarefa(row.id, row.titulo, row.descricao, row.status));
                    else resolve(null);
                }
            });
        });
    }

    static Atualizar(tarefa){
        return new Promise((resolve, reject) => {
            const query = 'UPDATE tarefas SET titulo = ?, descricao = ?, status = ? WHERE id = ?';
            db.run(query, [tarefa.titulo, tarefa.descricao, tarefa.status, tarefa.id], function (err) {
                if (err) reject(err);
                else resolve(tarefa);
            });
        });
    }

    static Deletar(id){
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM tarefas WHERE id = ?';
            db.run(query, [id], function (err) {
                if (err) reject(err);
                else resolve();
            });
        });
    }
}
module.exports = TarefaDAO;
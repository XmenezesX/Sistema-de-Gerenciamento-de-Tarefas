const TarefaDAO = require('../persistence/tarefaDAO');
const Tarefa = require('../models/tarefa');

class TarefaService {
    static async CadastrarTarefa(titulo, descricao, status) {
        const tarefa = new Tarefa(null, titulo, descricao, status);
        return await TarefaDAO.Cadastrar(tarefa);
    }

    static async ListarTarefas() {
        return await TarefaDAO.Listar();
    }

    static async ObtemElementoUnicoId(id) {
        return await TarefaDAO.obtemElementoUnico(id);
    }

    static async AtualizarTarefa(id, titulo, descricao, status) {
        const tarefa = new Tarefa(id, titulo, descricao, status);
        return await TarefaDAO.Atualizar(tarefa);
    }

    static async DeletarTarefa(id) {
        await TarefaDAO.Deletar(id);
    }
}
module.exports = TarefaService;
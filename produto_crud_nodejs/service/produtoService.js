
const ProdutoDAO = require('../persistence/produtoDAO');
const Produto = require('../model/produto');

class ProdutoService {
    static async criarProduto(nome, preco) {
        const produto = new Produto(null, nome, preco);
        return await ProdutoDAO.criar(produto);
    }

    static async listarProdutos() {
        return await ProdutoDAO.listar();
    }

    static async buscarProdutoPorId(id) {
        return await ProdutoDAO.buscarPorId(id);
    }

    static async atualizarProduto(id, nome, preco) {
        const produto = new Produto(id, nome, preco);
        return await ProdutoDAO.atualizar(produto);
    }

    static async removerProduto(id) {
        await ProdutoDAO.remover(id);
    }
}

module.exports = ProdutoService;

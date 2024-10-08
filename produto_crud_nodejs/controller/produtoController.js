
const express = require('express');
const ProdutoService = require('../service/produtoService');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { nome, preco } = req.body;
        const produto = await ProdutoService.criarProduto(nome, preco);
        res.status(201).json(produto);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const produtos = await ProdutoService.listarProdutos();
        res.json(produtos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const produto = await ProdutoService.buscarProdutoPorId(id);
        if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
        res.json(produto);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { nome, preco } = req.body;
        const produto = await ProdutoService.atualizarProduto(id, nome, preco);
        res.json(produto);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await ProdutoService.removerProduto(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

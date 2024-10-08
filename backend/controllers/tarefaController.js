const express = require('express');
const TarefaService = require('../services/TarefaService');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        
        const { titulo, descricao, status } = req.body;
        const tarefa = await TarefaService.CadastrarTarefa(titulo, descricao, status);
        res.status(201).json(tarefa);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const tarefas = await TarefaService.ListarTarefas();
        res.json(tarefas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const tarefa = await TarefaService.ObtemElementoUnicoId(id);
        if (!tarefa) return res.status(404).json({ error: 'Tarefa não encontrada!' });
        res.json(tarefa);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { titulo, descricao, status } = req.body;
        const Tarefa = await TarefaService.AtualizarTarefa(id, titulo, descricao, status);
        res.json(Tarefa);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await TarefaService.DeletarTarefa(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
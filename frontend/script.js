const apiUrl = 'http://localhost:2024/tarefas';

function CarregarTarefas(){
    fetch(apiUrl)
        .then(respose => respose.json())
        .then(tarefas => {
            const tabela = document.querySelector('.table tbody');
            tabela.innerHTML = ' ';
            tarefas.forEach(tarefa => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <th>${tarefa.id}</th>
                    <td>${tarefa.titulo}</td>
                    <td>${tarefa.descricao}</td>
                    <td>${tarefa.status}</td>
                    <td>
                        <button class="btn btn-primary" onclick="editarProduto(${tarefa.id})" title="Editar"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-danger" onclick="removerProduto(${tarefa.id})" title="Excluir"><i class="fas fa-trash-alt"></i></button>
                    </td>
                `;
                tabela.appendChild(tr);
            });
        })
        .catch(error => console.error('Erro ao carregar tarefa:', error));
}

function CadastrarAtualizarTarefa() {
    const titulo = document.querySelector('input[name="titulo"]').value;
    const descricao = document.querySelector('textarea[name="descricao"]').value;
    const status = document.querySelector('select[name="status"]').value;
    const id = null
    if (!titulo || !descricao || !status) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }
    const tarefa = {titulo, descricao, status};
    const method = id ? 'PUT' : 'POST';
    const url = id ? `${apiUrl}/${id}` : apiUrl;
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarefa)
    })
    .then(response => response.json())
    .then(() => {
        CarregarTarefas();
    })
    .catch(error => console.error('Erro ao salvar tarefa:', error));
}

document.addEventListener('DOMContentLoaded', CarregarTarefas);
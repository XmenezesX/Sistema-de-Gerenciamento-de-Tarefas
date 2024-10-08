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
                    <th class="id">${tarefa.id}</th>
                    <td class="titulo">${tarefa.titulo}</td>
                    <td class="descricao">${tarefa.descricao}</td>
                    <td class="status">${tarefa.status}</td>
                    <td>
                        <a class="btn btn-primary" onclick="editarTarefa(${tarefa.id})" title="Editar"><i class="fas fa-edit"></i></a>
                        <button class="btn btn-danger" onclick="removerTarefa(${tarefa.id})" title="Excluir"><i class="fas fa-trash-alt"></i></button>
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
    const id = document.querySelector('input[type="hidden"][name="id"]').value;
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
        window.location.href = './index.html';
    })
    .catch(error => console.error('Erro ao salvar tarefa:', error));
}

function editarTarefa(id) {
    var method = 'GET';
    var url = apiUrl + '/editar/' + id;
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then((tarefa) => {
        localStorage.setItem('tarefaParaEditar', JSON.stringify(tarefa));
        window.location.href = './editar.html';
    })
    .catch(error => console.error('Erro ao salvar tarefa:', error));
}

function removerTarefa(id) {
    if (confirm('Tem certeza que deseja excluir essa tarefa?')) {
        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        })
        .then(() => window.location.href='./index.html')
        .catch(error => console.error('Erro ao remover tarefa:', error));
    }
}

document.addEventListener('DOMContentLoaded', CarregarTarefas);
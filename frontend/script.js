const apiUrl = 'http://localhost:2024/tarefas';

function CarregarTarefas(){
    fetch(apiUrl)
    .then(respose => respose.json())
    .then(tarefas => {
        const tabela = document.querySelector('.table body');
        tabela.innerHTML = '';
        tarefas.forEach(tarefa => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <th>${tarefa.id}</th>
                <td>${tarefa.titulo}</td>
                <td>${tarefa.descricao}</td>
                <td>
                    <button class="btn btn-primary" onclick="editarProduto(${tarefa.id})" title="Editar"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger" onclick="removerProduto(${tarefa.id})" title="Excluir"><i class="fas fa-trash-alt"></i></button>
                </td>
            `;
            tabela.appendChild(tr);
        });
    });
}

function CadastrarAtualizarTarefa(id){

}
document.addEventListener('DOMContentLoaded', carregarProdutos);
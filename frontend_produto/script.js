
const apiUrl = 'http://localhost:3000/produtos';

function carregarProdutos() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(produtos => {
            const tabela = document.querySelector('#produtos-table tbody');
            tabela.innerHTML = '';
            produtos.forEach(produto => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${produto.id}</td>
                    <td>${produto.nome}</td>
                    <td>${produto.preco.toFixed(2)}</td>
                    <td>
                        <button onclick="editarProduto(${produto.id}, '${produto.nome}', ${produto.preco})">Editar</button>
                        <button onclick="removerProduto(${produto.id})">Excluir</button>
                    </td>
                `;
                tabela.appendChild(tr);
            });
        })
        .catch(error => console.error('Erro ao carregar produtos:', error));
}

function adicionarOuAtualizarProduto() {
    const id = document.getElementById('id').value;
    const nome = document.getElementById('nome').value;
    const preco = parseFloat(document.getElementById('preco').value);

    if (!nome || isNaN(preco)) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    const produto = { nome, preco };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${apiUrl}/${id}` : apiUrl;

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
    })
    .then(response => response.json())
    .then(() => {
        carregarProdutos();
        limparFormulario();
    })
    .catch(error => console.error('Erro ao salvar produto:', error));
}

function editarProduto(id, nome, preco) {
    document.getElementById('id').value = id;
    document.getElementById('nome').value = nome;
    document.getElementById('preco').value = preco;
    document.getElementById('cancelar-btn').style.display = 'inline';
}

function removerProduto(id) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        })
        .then(() => carregarProdutos())
        .catch(error => console.error('Erro ao remover produto:', error));
    }
}

function cancelarEdicao() {
    limparFormulario();
}

function limparFormulario() {
    document.getElementById('id').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('preco').value = '';
    document.getElementById('cancelar-btn').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', carregarProdutos);

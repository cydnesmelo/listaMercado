let listaProdutos = [];
let valorTotal = 0;

function atualizarLista() {
    const tbody = document.getElementById('listaProdutos');
    tbody.innerHTML = '';
    listaProdutos.forEach((produto, index) => {
        const tr = document.createElement('tr');

        const tdProduto = document.createElement('td');
        tdProduto.textContent = produto.nome;
        tr.appendChild(tdProduto);

        const tdQuantidade = document.createElement('td');
        tdQuantidade.textContent = produto.quantidade;
        tr.appendChild(tdQuantidade);

        const tdValorUnitario = document.createElement('td');
        tdValorUnitario.textContent = `R$ ${produto.valorUnitario.toFixed(2)}`;
        tr.appendChild(tdValorUnitario);

        const tdValorTotal = document.createElement('td');
        tdValorTotal.textContent = `R$ ${produto.valorTotal.toFixed(2)}`;
        tr.appendChild(tdValorTotal);

        const tdAcoes = document.createElement('td');
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.onclick = () => editarProduto(index);
        tdAcoes.appendChild(btnEditar);

        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.onclick = () => excluirProduto(index);
        tdAcoes.appendChild(btnExcluir);

        tr.appendChild(tdAcoes);

        tbody.appendChild(tr);
    });

    document.getElementById('valorTotal').textContent = valorTotal.toFixed(2);
}

function adicionarProduto() {
    const produto = document.getElementById('produto').value;
    const quantidade = parseFloat(document.getElementById('quantidade').value);
    const valorUnitario = parseFloat(document.getElementById('valorUnitario').value);

    if (produto && !isNaN(quantidade) && !isNaN(valorUnitario)) {
        const valorTotalProduto = quantidade * valorUnitario;
        listaProdutos.push({
            nome: produto,
            quantidade: quantidade,
            valorUnitario: valorUnitario,
            valorTotal: valorTotalProduto
        });
        valorTotal += valorTotalProduto;
        atualizarLista();
        limparFormulario();
    }
}

function editarProduto(index) {
    const produto = listaProdutos[index];
    document.getElementById('produto').value = produto.nome;
    document.getElementById('quantidade').value = produto.quantidade;
    document.getElementById('valorUnitario').value = produto.valorUnitario;

    excluirProduto(index);
}

function excluirProduto(index) {
    valorTotal -= listaProdutos[index].valorTotal;
    listaProdutos.splice(index, 1);
    atualizarLista();
}

function limparFormulario() {
    document.getElementById('produto').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('valorUnitario').value = '';
}

document.getElementById('adicionar').addEventListener('click', adicionarProduto);

// Função para lidar com a parte de transações financeiras
const form = document.getElementById('transaction-form');
const transactionTable = document.getElementById('transaction-table');
const totalReceitas = document.getElementById('total-receitas');
const totalDespesas = document.getElementById('total-despesas');
const saldoAtual = document.getElementById('saldo-atual');
let receitas = parseFloat(localStorage.getItem('receitas')) || 0;
let despesas = parseFloat(localStorage.getItem('despesas')) || 0;

document.addEventListener('DOMContentLoaded', function() {
    atualizarResumo(); // Atualizar a página inicial com valores do localStorage
});

// Validação e manipulação do formulário de transações
if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const descricao = document.getElementById('descricao').value.trim();
        const tipo = document.getElementById('tipo').value;
        const valor = parseFloat(document.getElementById('valor').value);

        if (!descricao || isNaN(valor) || valor <= 0) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${descricao}</td>
            <td>${tipo}</td>
            <td>R$ ${valor.toFixed(2)}</td>
        `;
        transactionTable.appendChild(row);

        if (tipo === 'receita') {
            receitas += valor;
        } else {
            despesas += valor;
        }

        localStorage.setItem('receitas', receitas.toFixed(2)); // Atualizar localStorage
        localStorage.setItem('despesas', despesas.toFixed(2)); // Atualizar localStorage

        atualizarResumo();
        form.reset();
    });

    // Atualização do resumo de receitas, despesas e saldo atual
    function atualizarResumo() {
        totalReceitas.textContent = `R$ ${receitas.toFixed(2)}`;
        totalDespesas.textContent = `R$ ${despesas.toFixed(2)}`;
        saldoAtual.textContent = `R$ ${(receitas - despesas).toFixed(2)}`;
    }
}

// Função para lidar com a parte das alunas
const studentForm = document.getElementById('student-form');
const studentTable = document.getElementById('student-table');

if (studentForm) {
    studentForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nomeAluna = document.getElementById('nome-aluna').value.trim();
        const valorMensalidade = parseFloat(document.getElementById('valor-mensalidade').value);
        const turma = document.getElementById('turma').value;

        const diasSemanaSelecionados = Array.from(document.querySelectorAll('#dias-semana input:checked'))
            .map(checkbox => checkbox.value)
            .join(', ');

        if (!nomeAluna || isNaN(valorMensalidade) || valorMensalidade <= 0 || !turma || !diasSemanaSelecionados) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${nomeAluna}</td>
            <td>R$ ${valorMensalidade.toFixed(2)}</td>
            <td>${turma}</td>
            <td>${diasSemanaSelecionados}</td>
            <td class="not-paid">Não Pago</td>
            <td><button class="pay-button">Marcar como Pago</button></td>
        `;
        studentTable.appendChild(row);

        row.querySelector('.pay-button').addEventListener('click', function() {
            const statusCell = row.querySelector('td:nth-child(5)');
            if (statusCell.textContent === 'Não Pago') {
                // Atualiza o status da mensalidade para "Pago"
                statusCell.textContent = 'Pago';
                statusCell.classList.remove('not-paid');
                statusCell.classList.add('paid');
                row.querySelector('.pay-button').remove(); // Remove o botão de pagamento
                // Atualiza o valor das receitas
                receitas += valorMensalidade;
                localStorage.setItem('receitas', receitas.toFixed(2)); // Atualizar localStorage
                atualizarResumo();
        
                // Remove o botão de pagamento após marcar como pago
                
            }
        });
        

        studentForm.reset();
    });
}

// Função para lidar com a parte dos custos fixos
const fixedCostsTable = document.getElementById('fixed-costs-table');

if (fixedCostsTable) {
    fixedCostsTable.querySelector('.pay-button').addEventListener('click', function() {
        const statusCell = fixedCostsTable.querySelector('td:nth-child(3)');
        const valorAluguel = 500.00;

        if (statusCell.textContent === 'Não Pago') {
            statusCell.textContent = 'Pago';
            statusCell.classList.remove('not-paid');
            statusCell.classList.add('paid');
            fixedCostsTable.querySelector('.pay-button').remove(); // Remove o botão de pagamento
            despesas += valorAluguel; // Adiciona o valor do aluguel às despesas
            localStorage.setItem('despesas', despesas.toFixed(2)); // Atualiza localStorage com o novo valor de despesas

            atualizarResumo(); // Atualiza o resumo após o pagamento
        }
    });
    
}




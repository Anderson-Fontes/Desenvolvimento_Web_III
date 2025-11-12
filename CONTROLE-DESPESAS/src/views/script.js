// Aguarda o DOM estar completamente carregado
window.addEventListener('DOMContentLoaded', () => { // [cite: 124]
  // Carrega despesas e total ao iniciar
  fetchExpenses(); // [cite: 126]
  fetchTotalExpenses(); // [cite: 127]

  // Seleciona elementos do DOM
  const form = document.getElementById('expense-form');
  const submitButton = document.getElementById('submit-button');

  // Adiciona evento ao formulário
  form.addEventListener('submit', handleFormSubmit);
});

const API_URL = '/api/expenses';

// Função para buscar o somatório (código do PDF adaptado) [cite: 114]
async function fetchTotalExpenses() {
  try {
    const response = await fetch(`${API_URL}/total`); // [cite: 117]
    const data = await response.json();
    const totalElement = document.getElementById('total-expenses'); // [cite: 118]
    // Formata o valor no formato monetário [cite: 26]
    totalElement.innerText = `Total das Despesas: R$${data.totalAmount.toFixed(2)}`; // [cite: 118, 119]
  } catch (error) {
    console.error('Erro ao buscar o total das despesas:', error); // [cite: 121]
  }
}

// Função para buscar todas as despesas
async function fetchExpenses() {
  try {
    const response = await fetch(API_URL);
    const expenses = await response.json();
    
    const list = document.getElementById('expense-list');
    list.innerHTML = ''; // Limpa a lista antes de recarregar

    expenses.forEach(expense => {
      renderExpense(expense);
    });
  } catch (error) {
    console.error('Erro ao buscar despesas:', error);
  }
}

// Função para renderizar um item de despesa na lista
function renderExpense(expense) {
  const list = document.getElementById('expense-list');
  const item = document.createElement('li');
  
  // Formata data para dd/mm/aaaa [cite: 27]
  const formattedDate = new Date(expense.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' });

  item.dataset.id = expense._id;
  item.innerHTML = `
    <span>
      ${expense.description} - R$${expense.amount.toFixed(2)} - ${formattedDate}
    </span>
    <div class="buttons">
      <button class="update-btn">Alterar</button> <button class="delete-btn">Excluir</button> </div>
  `;

  // Adiciona eventos aos botões de alterar e excluir
  item.querySelector('.update-btn').addEventListener('click', () => populateFormForUpdate(expense));
  item.querySelector('.delete-btn').addEventListener('click', () => deleteExpense(expense._id, item));

  list.appendChild(item);
}

// Função para lidar com o envio do formulário (Criar ou Atualizar)
async function handleFormSubmit(event) {
  event.preventDefault();

  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  let date = document.getElementById('date').value;
  const expenseId = document.getElementById('expense-id').value; // ID oculto

  // Validação de campos vazios e valor negativo [cite: 58]
  if (!description || !amount) {
    alert('Por favor, preencha a Descrição e o Valor.');
    return;
  }
  if (amount <= 0) {
    alert('O valor deve ser maior que zero.');
    return;
  }

  // Define data atual se não for preenchida [cite: 64]
  if (!date) {
    date = new Date().toISOString().split('T')[0];
  }

  const expenseData = { description, amount, date };

  try {
    let response;
    if (expenseId) {
      // Se tem ID, é uma ATUALIZAÇÃO (PUT)
      response = await fetch(`${API_URL}/${expenseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expenseData),
      });
    } else {
      // Se não tem ID, é uma CRIAÇÃO (POST) [cite: 45]
      response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expenseData),
      });
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao salvar despesa');
    }

    // Limpa o formulário e reseta o botão
    resetForm();

    // Recalcula total e atualiza lista [cite: 48, 131]
    fetchTotalExpenses();
    fetchExpenses(); 

  } catch (error) {
    console.error('Erro ao salvar despesa:', error);
    alert(`Erro ao salvar: ${error.message}`);
  }
}

// Função para popular o formulário para edição [cite: 46]
function populateFormForUpdate(expense) {
  document.getElementById('expense-id').value = expense._id;
  document.getElementById('description').value = expense.description;
  document.getElementById('amount').value = expense.amount;
  // Formata a data para o input type="date" (YYYY-MM-DD)
  document.getElementById('date').value = expense.date.split('T')[0];
  
  document.getElementById('submit-button').innerText = 'Salvar Alteração';
  window.scrollTo(0, 0); // Rola para o topo (onde está o form)
}

// Função para resetar o formulário
function resetForm() {
  document.getElementById('expense-form').reset();
  document.getElementById('expense-id').value = '';
  document.getElementById('submit-button').innerText = 'Cadastrar Despesa';
}

// Função para excluir despesa [cite: 47]
async function deleteExpense(id, listItem) {
  if (!confirm('Tem certeza que deseja excluir esta despesa?')) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Erro ao excluir despesa');
    }

    // Remove item da tela e atualiza o total [cite: 48, 131]
    listItem.remove();
    fetchTotalExpenses();

  } catch (error) {
    console.error('Erro ao excluir:', error);
  }
}
import './style.css'; // Importa o CSS

// URL da API do Backend
const API_URL = 'http://localhost:3000/api/discos';

// Tipagem para os dados do Disco (baseado no IDisco do backend)
interface Disco {
  _id: string;
  titulo: string;
  artista: string;
  ano: number;
  genero: string;
  formato: 'Vinil' | 'CD';
  preco: number;
}

// Elementos do DOM
const form = document.getElementById('disco-form') as HTMLFormElement;
const discoIdInput = document.getElementById('disco-id') as HTMLInputElement;
const tituloInput = document.getElementById('titulo') as HTMLInputElement;
const artistaInput = document.getElementById('artista') as HTMLInputElement;
const anoInput = document.getElementById('ano') as HTMLInputElement;
const generoInput = document.getElementById('genero') as HTMLInputElement;
const formatoInput = document.getElementById('formato') as HTMLSelectElement;
const precoInput = document.getElementById('preco') as HTMLInputElement;
const tabelaCorpo = document.getElementById('tabela-corpo') as HTMLTableSectionElement;
const btnCancelar = document.getElementById('cancelar-edicao') as HTMLButtonElement;

// --- FUNÇÕES ---

// 1. Listar (Read) - Busca todos os discos e renderiza na tabela
async function fetchDiscos() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Erro ao buscar discos');
    const discos: Disco[] = await response.json();

    tabelaCorpo.innerHTML = ''; // Limpa a tabela antes de preencher
    discos.forEach(renderDiscoRow);
  } catch (error) {
    console.error(error);
  }
}

// 2. Renderiza uma linha na tabela
function renderDiscoRow(disco: Disco) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${disco.titulo}</td>
    <td>${disco.artista}</td>
    <td>${disco.ano}</td>
    <td>${disco.formato}</td>
    <td>R$ ${disco.preco.toFixed(2)}</td>
    <td>
      <button class="btn-editar" data-id="${disco._id}">Editar</button>
      <button class="btn-excluir" data-id="${disco._id}">Excluir</button>
    </td>
  `;

  // Adiciona listeners para os botões de ação
  tr.querySelector('.btn-editar')?.addEventListener('click', () => loadDiscoForEdit(disco));
  tr.querySelector('.btn-excluir')?.addEventListener('click', () => deleteDisco(disco._id));
  
  tabelaCorpo.appendChild(tr);
}

// 3. Cadastrar (Create) / Atualizar (Update) - Lógica do formulário
async function handleFormSubmit(event: SubmitEvent) {
  event.preventDefault();

  const dadosDisco = {
    titulo: tituloInput.value,
    artista: artistaInput.value,
    ano: parseInt(anoInput.value),
    genero: generoInput.value,
    formato: formatoInput.value as 'Vinil' | 'CD',
    preco: parseFloat(precoInput.value),
  };

  const id = discoIdInput.value;

  try {
    if (id) {
      // Se tem ID, é atualização (Update)
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosDisco),
      });
    } else {
      // Se não tem ID, é criação (Create)
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosDisco),
      });
    }
    
    resetForm();
    fetchDiscos(); // Atualiza a tabela
  } catch (error) {
    console.error('Erro ao salvar disco:', error);
  }
}

// 4. Carrega dados no formulário para Edição
function loadDiscoForEdit(disco: Disco) {
  discoIdInput.value = disco._id;
  tituloInput.value = disco.titulo;
  artistaInput.value = disco.artista;
  anoInput.value = disco.ano.toString();
  generoInput.value = disco.genero;
  formatoInput.value = disco.formato;
  precoInput.value = disco.preco.toString();
  
  btnCancelar.style.display = 'inline-block'; // Mostra o botão Cancelar
  window.scrollTo(0, 0); // Rola para o topo (onde está o formulário)
}

// 5. Excluir (Delete)
async function deleteDisco(id: string) {
  // Confirmação antes da remoção
  if (!confirm('Tem certeza que deseja excluir este disco?')) {
    return;
  }
  
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    fetchDiscos(); // Atualiza a tabela
  } catch (error) {
    console.error('Erro ao excluir disco:', error);
  }
}

// 6. Limpa o formulário e reseta o estado de edição
function resetForm() {
  form.reset();
  discoIdInput.value = '';
  btnCancelar.style.display = 'none';
}

// --- INICIALIZAÇÃO ---

// Listener para o submit do formulário (Criação e Edição)
form.addEventListener('submit', handleFormSubmit);

// Listener para o botão de cancelar edição
btnCancelar.addEventListener('click', resetForm);

// Carrega os discos na tabela assim que a página é carregada
document.addEventListener('DOMContentLoaded', fetchDiscos);
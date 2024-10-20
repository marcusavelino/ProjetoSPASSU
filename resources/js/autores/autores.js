import { deleteAuthor } from './ajaxForm.js';

document.addEventListener('DOMContentLoaded', init);

const apiUrl = 'http://127.0.0.1:8000/api/autores'; // Substitua pela URL da sua API
const tableAutoresBody = document.querySelector('#autoresTable tbody');
const formLivroAutores = document.querySelector('#autores');
const noAutoresMessage = document.querySelector('#noAutoresMessage');
const modalFormAddNewAuthor = new bootstrap.Modal(document.getElementById('modalFormAddNewAuthor'));

function init() {
  fetchAutores();
}

function fetchAutores() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        displayNoAutoresMessage();
      } else {
        renderAutores(data);
        addEventListeners();
      }
    })
    .catch(handleFetchError);
}

function displayNoAutoresMessage() {
  noAutoresMessage.style.display = 'block';
  tableAutoresBody.parentElement.style.display = 'none';
}

function renderAutores(data) {
  noAutoresMessage.style.display = 'none';
  tableAutoresBody.parentElement.style.display = 'table';
  data.forEach(autor => {
    let row = createAutorRow(autor);
    tableAutoresBody.appendChild(row);
    addAutorToForm(autor);
  });
}

function createAutorRow(autor) {
  let row = document.createElement('tr');
  row.innerHTML = `
    <td>${autor.CodAu}</td>
    <td>${autor.Nome}</td>
    <td>
      <button class="btn btn-sm btn-primary update-author" data-id="${autor.CodAu}" data-nome="${autor.Nome}">Update</button>
      <button class="btn btn-sm btn-danger delete-btn delete-author" data-id="${autor.CodAu}">Delete</button>
    </td>
  `;
  return row;
}

function addAutorToForm(autor) {
  let option = document.createElement('option');
  option.value = autor.CodAu;
  option.textContent = autor.Nome;
  formLivroAutores.appendChild(option);
}

function addEventListeners() {
  document.querySelectorAll('.update-author').forEach(button => {
    button.addEventListener('click', handleUpdateAuthor);
  });

  document.querySelectorAll('.delete-author').forEach(button => {
    button.addEventListener('click', handleDeleteAuthor);
  });
}

function handleUpdateAuthor(event) {
  const id = event.target.getAttribute('data-id');
  const nome = event.target.getAttribute('data-nome');

  document.querySelector('#authorId').value = id;
  document.querySelector('#authorName').value = nome;
  document.querySelector('#title-modal-author').textContent = 'Atualizar Autor';

  modalFormAddNewAuthor.show();
}

function handleDeleteAuthor(event) {
  const id = event.target.getAttribute('data-id');
  deleteAuthor(id);
}

function handleFetchError(error) {
  console.error('Erro ao buscar autores:', error);
  noAutoresMessage.style.display = 'block';
  noAutoresMessage.textContent = 'Erro ao buscar autores. Tente novamente mais tarde.';
}
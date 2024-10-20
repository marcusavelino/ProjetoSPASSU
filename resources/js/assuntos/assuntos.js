import { deleteTopic } from './ajaxForm.js';

document.addEventListener('DOMContentLoaded', init);

const apiUrl = 'http://127.0.0.1:8000/api/assuntos'; // Substitua pela URL da sua API
const tableAssuntosBody = document.querySelector('#assuntosTable tbody');
const formLivroAssuntos = document.querySelector('#assuntos');
const noAssunMessage = document.querySelector('#noAssuntosMessage');
const modal = document.querySelector('#modalFormAddNewTopic');
const modalTitle = modal.querySelector('.modal-title');
const modalForm = modal.querySelector('form');
const modalDescricao = modalForm.querySelector('#descricao');

function init() {
  fetchAssuntos();
}

function fetchAssuntos() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        displayNoAssuntosMessage();
      } else {
        renderAssuntos(data);
        addEventListeners();
      }
    })
    .catch(handleFetchError);
}

function displayNoAssuntosMessage() {
  noAssunMessage.style.display = 'block';
  tableAssuntosBody.parentElement.style.display = 'none';
}

function renderAssuntos(data) {
  noAssunMessage.style.display = 'none';
  tableAssuntosBody.parentElement.style.display = 'table';
  data.forEach(assunto => {
    let row = createAssuntoRow(assunto);
    tableAssuntosBody.appendChild(row);
    addAssuntoToForm(assunto);
  });
}

function createAssuntoRow(assunto) {
  let row = document.createElement('tr');
  row.innerHTML = `
    <td>${assunto.codAs}</td>
    <td>${assunto.Descricao}</td>
    <td>
      <button class="btn btn-sm btn-primary update-topic" data-id="${assunto.codAs}" data-descricao="${assunto.Descricao}">Update</button>
      <button class="btn btn-sm btn-danger delete-btn delete-topic" data-id="${assunto.codAs}">Delete</button>
    </td>
  `;
  return row;
}

function addAssuntoToForm(assunto) {
  let option = document.createElement('option');
  option.value = assunto.codAs;
  option.textContent = assunto.Descricao;
  formLivroAssuntos.appendChild(option);
}

function addEventListeners() {
  document.querySelectorAll('.update-topic').forEach(button => {
    button.addEventListener('click', handleUpdateTopic);
  });

  document.querySelectorAll('.delete-topic').forEach(button => {
    button.addEventListener('click', handleDeleteTopic);
  });
}

function handleUpdateTopic(event) {
  const id = event.target.getAttribute('data-id');
  const descricao = event.target.getAttribute('data-descricao');

  document.querySelector('#topicId').value = id;
  document.querySelector('#descricao').value = descricao;
  document.querySelector('#title-modal-assunto').textContent = 'Atualizar Assunto';

  $(modal).modal('show');
}

function handleDeleteTopic(event) {
  const id = event.target.getAttribute('data-id');
  deleteTopic(id);
}

function handleFetchError(error) {
  console.error('Erro ao buscar livros:', error);
  noAssunMessage.style.display = 'block';
  noAssunMessage.textContent = 'Erro ao buscar assuntos. Tente novamente mais tarde.';
}
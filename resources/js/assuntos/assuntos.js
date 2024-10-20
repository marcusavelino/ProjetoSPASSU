import { deleteTopic } from './ajaxForm.js';

document.addEventListener('DOMContentLoaded', function() {
  const apiUrl = 'http://127.0.0.1:8000/api/assuntos'; // Substitua pela URL da sua API
  const tableAssuntosBody = document.querySelector('#assuntosTable tbody');
  const formLivroAssuntos = document.querySelector('#assuntos');
  const noAssunMessage = document.querySelector('#noAssuntosMessage');
  const modal = document.querySelector('#modalFormAddNewTopic');
  const modalTitle = modal.querySelector('.modal-title');
  const modalForm = modal.querySelector('form');
  const modalDescricao = modalForm.querySelector('#descricao');

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        noAssunMessage.style.display = 'block';
        tableAssuntosBody.parentElement.style.display = 'none';
      } else {
        noAssunMessage.style.display = 'none';
        tableAssuntosBody.parentElement.style.display = 'table';
        data.forEach(assunto => {
          let row = document.createElement('tr');
          row.innerHTML = `
            <td>${assunto.codAs}</td>
            <td>${assunto.Descricao}</td>
            <td>
              <button class="btn btn-sm btn-primary update-topic" data-id="${assunto.codAs}" data-descricao="${assunto.Descricao}">Update</button>
              <button class="btn btn-sm btn-danger delete-btn delete-topic" data-id="${assunto.codAs}">Delete</button>
            </td>
          `;
          tableAssuntosBody.appendChild(row);

          // Preencho o form de add new livro
          let option = document.createElement('option');
          option.value = assunto.codAs;
          option.textContent = assunto.Descricao;
          formLivroAssuntos.appendChild(option);
        });

        // Adicionar event listeners para os botões de update e delete
        document.querySelectorAll('.update-topic').forEach(button => {
          button.addEventListener('click', handleUpdateTopic);
        });

        document.querySelectorAll('.delete-topic').forEach(button => {
          button.addEventListener('click', function(event) {
            const id = event.target.getAttribute('data-id');
            deleteTopic(id);
          });
        });
      }
    })
    .catch(error => {
      console.error('Erro ao buscar livros:', error);
      noBooksMessage.style.display = 'block';
      noBooksMessage.textContent = 'Erro ao buscar assuntos. Tente novamente mais tarde.';
    });

  function handleUpdateTopic(event) {
    const id = event.target.getAttribute('data-id');
    const descricao = event.target.getAttribute('data-descricao');

    // Preencher o formulário com os dados do assunto
    document.querySelector('#topicId').value = id;
    document.querySelector('#descricao').value = descricao;

    // Alterar o título do modal
    document.querySelector('#title-modal-assunto').textContent = 'Atualizar Assunto';

    // Abrir o modal
    $(modal).modal('show');
  }
});
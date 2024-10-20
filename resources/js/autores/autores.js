import { deleteAuthor } from './ajaxForm.js';

document.addEventListener('DOMContentLoaded', function () {
  const apiUrl = 'http://127.0.0.1:8000/api/autores'; // Substitua pela URL da sua API
  const tableAutoresBody = document.querySelector('#autoresTable tbody');
  const formLivroAutores = document.querySelector('#autores');
  const noAutoresMessage = document.querySelector('#noAutoresMessage');
  const formAddNewAuthor = document.querySelector('#formAddNewAuthor');
  const modalFormAddNewAuthor = new bootstrap.Modal(document.getElementById('modalFormAddNewAuthor'));

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        noAutoresMessage.style.display = 'block';
        tableAutoresBody.parentElement.style.display = 'none';
      } else {
        noAutoresMessage.style.display = 'none';
        tableAutoresBody.parentElement.style.display = 'table';
        data.forEach(autor => {
          let row = document.createElement('tr');
          row.innerHTML = `
            <td>${autor.CodAu}</td>
            <td>${autor.Nome}</td>
            <td>
              <button class="btn btn-sm btn-primary update-author" data-id="${autor.CodAu}" data-nome="${autor.Nome}">Update</button>
              <button class="btn btn-sm btn-danger delete-btn delete-author" data-id="${autor.CodAu}">Delete</button>
            </td>
          `;
          tableAutoresBody.appendChild(row);

          // Preencho o form de add new livro
          let option = document.createElement('option');
          option.value = autor.CodAu;
          option.textContent = autor.Nome;
          formLivroAutores.appendChild(option);
        });

        // Adicionar event listeners para os botões de update e delete
        document.querySelectorAll('.update-author').forEach(button => {
          button.addEventListener('click', handleUpdateAuthor);
        });

        document.querySelectorAll('.delete-author').forEach(button => {
          button.addEventListener('click', function(event) {
            const id = event.target.getAttribute('data-id');
            deleteAuthor(id);
          });
        });
      }
    })
    .catch(error => {
      console.error('Erro ao buscar autores:', error);
      noAutoresMessage.style.display = 'block';
      noAutoresMessage.textContent = 'Erro ao buscar autores. Tente novamente mais tarde.';
    });

  function handleUpdateAuthor(event) {
    const id = event.target.getAttribute('data-id');
    const nome = event.target.getAttribute('data-nome');

    // Preencher o formulário com os dados do autor
    document.querySelector('#authorId').value = id;
    document.querySelector('#authorName').value = nome;

    // Alterar o título do modal
    document.querySelector('#title-modal-author').textContent = 'Atualizar Autor';

    // Abrir o modal
    modalFormAddNewAuthor.show();
  }
});
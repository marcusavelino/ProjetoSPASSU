import { deleteBook } from './ajaxForm.js';

document.addEventListener('DOMContentLoaded', function() {
  const apiUrl = 'http://127.0.0.1:8000/api/livros'; // Substitua pela URL da sua API
  const tableBody = document.querySelector('#livrosTable tbody');
  const noBooksMessage = document.querySelector('#noBooksMessage');
  const modal = document.querySelector('#modalFormAddNew');

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        noBooksMessage.style.display = 'block';
        tableBody.parentElement.style.display = 'none';
      } else {
        noBooksMessage.style.display = 'none';
        tableBody.parentElement.style.display = 'table';
        data.forEach(livro => {
          let row = document.createElement('tr');
          row.innerHTML = `
            <td>${livro.Titulo}</td>
            <td>${livro.AnoPublicacao}</td>
            <td>${livro.Edicao}</td>
            <td>${livro.Editora}</td>
            <td>
              <button class="btn btn-sm btn-primary update-btn" data-id="${livro.cod}" data-titulo="${livro.Titulo}" data-editora="${livro.Editora}" data-edicao="${livro.Edicao}" data-anopublicacao="${livro.AnoPublicacao}" data-autores="${livro.autores.map(autor => autor.id).join(',')}" data-assuntos="${livro.assuntos.map(assunto => assunto.codAs).join(',')}">Update</button>
              <button class="btn btn-sm btn-danger delete-btn" data-id="${livro.cod}">Delete</button>
            </td>
          `;
          tableBody.appendChild(row);
        });

        // Adicionar event listeners para os botões de update e delete
        document.querySelectorAll('.update-btn').forEach(button => {
          button.addEventListener('click', handleUpdate);
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
          button.addEventListener('click', handleDelete);
        });
      }
    })
    .catch(error => {
      console.error('Erro ao buscar livros:', error);
      noBooksMessage.style.display = 'block';
      noBooksMessage.textContent = 'Erro ao buscar livros. Tente novamente mais tarde.';
    });

  function handleUpdate(event) {
    const id = event.target.getAttribute('data-id');
    const titulo = event.target.getAttribute('data-titulo');
    const editora = event.target.getAttribute('data-editora');
    const edicao = event.target.getAttribute('data-edicao');
    const anoPublicacao = event.target.getAttribute('data-anopublicacao');
    const autores = event.target.getAttribute('data-autores').split(',');
    const assuntos = event.target.getAttribute('data-assuntos').split(',');

    // Preencher o formulário com os dados do livro
    document.querySelector('#bookId').value = id;
    document.querySelector('#titulo').value = titulo;
    document.querySelector('#Editora').value = editora;
    document.querySelector('#Edicao').value = edicao;
    document.querySelector('#AnoPublicacao').value = anoPublicacao;
    document.querySelector('#autores').value = autores;
    document.querySelector('#assuntos').value = assuntos;

    // Alterar o título do modal
    document.querySelector('#exampleModalLabel').textContent = 'Atualizar Livro';

    // Abrir o modal
    $(modal).modal('show');
  }

  function handleDelete(event) {
    const id = event.target.getAttribute('data-id');
    if (confirm('Tem certeza que deseja deletar este livro?')) {
      fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          alert('Livro deletado com sucesso!');
          // Remover a linha da tabela
          event.target.closest('tr').remove();
        } else {
          console.log(response);
          alert('Erro ao deletar livro.');
        }
      })
      .catch(error => {
        console.error('Erro ao deletar livro:', error);
        alert('Erro ao deletar livro. Tente novamente mais tarde.');
      });
    }
  }
});
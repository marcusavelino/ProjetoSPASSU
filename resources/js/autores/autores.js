document.addEventListener('DOMContentLoaded', function () {
  const apiUrl = 'http://127.0.0.1:8000/api/autores'; // Substitua pela URL da sua API
  const tableAutoresBody = document.querySelector('#autoresTable tbody');
  const formLivroAutores = document.querySelector('#autores');
  const noAutoresMessage = document.querySelector('#noAutoresMessage');

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
          console.log(autor);
          let row = document.createElement('tr');
          row.innerHTML = `
            <td>${autor.CodAu}</td>
            <td>${autor.Nome}</td>
            <td>
              <button class="btn btn-sm btn-primary update-btn" data-id="${autor.CodAu}">Update</button>
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
        document.querySelectorAll('.update-btn').forEach(button => {
          button.addEventListener('click', handleUpdate);
        });

        document.querySelectorAll('.delete-author').forEach(button => {
          button.addEventListener('click', handleDeleteAuthor);
        });
      }
    })
    .catch(error => {
      console.error('Erro ao buscar autores:', error);
      noAutoresMessage.style.display = 'block';
      noAutoresMessage.textContent = 'Erro ao buscar autores. Tente novamente mais tarde.';
    });

  function handleUpdate(event) {
    const id = event.target.getAttribute('data-id');
    // Aqui você pode abrir um modal para editar o autor ou redirecionar para uma página de edição
    // Exemplo de redirecionamento para uma página de edição
    window.location.href = `/autores/${id}/edit`;
  }

  function handleDeleteAuthor(event) {
    const id = event.target.getAttribute('data-id');
    if (confirm('Tem certeza que deseja deletar este autor?')) {
      fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
        console.log(`${apiUrl}/${id}`);
        if (response.ok) {
          alert('Autor deletado com sucesso!');
          // Remover a linha da tabela
          event.target.closest('tr').remove();
        } else {
          console.log(response);
          alert('Erro ao deletar autor.');
        }
      })
      .catch(error => {
        console.error('Erro ao deletar autor:', error);
        alert('Erro ao deletar autor. Tente novamente mais tarde.');
      });
    }
  }
});
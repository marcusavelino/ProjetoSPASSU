document.addEventListener('DOMContentLoaded', function() {
  const apiUrl = 'http://127.0.0.1:8000/api/assuntos'; // Substitua pela URL da sua API
  const tableAssuntosBody = document.querySelector('#assuntosTable tbody');
  const formLivroAssuntos = document.querySelector('#assuntos');
  const noAssunMessage = document.querySelector('#noAssuntosMessage');

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
              <button class="btn btn-sm btn-primary update-btn" data-id="${assunto.codAs}">Update</button>
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
        document.querySelectorAll('.update-btn').forEach(button => {
          button.addEventListener('click', handleUpdate);
        });

        document.querySelectorAll('.delete-topic').forEach(button => {
          button.addEventListener('click', handleDeleteTopic);
        });
      }
    })
    .catch(error => {
      console.error('Erro ao buscar livros:', error);
      noBooksMessage.style.display = 'block';
      noBooksMessage.textContent = 'Erro ao buscar assuntos. Tente novamente mais tarde.';
    });

    function handleUpdate(event) {
      const id = event.target.getAttribute('data-id');
      // Aqui você pode abrir um modal para editar o assunto ou redirecionar para uma página de edição
      // Exemplo de redirecionamento para uma página de edição
      window.location.href = `/assuntos/${id}/edit`;
    }
  
    function handleDeleteTopic(event) {
      const id = event.target.getAttribute('data-id');
      if (confirm('Tem certeza que deseja deletar este assunto?')) {
        fetch(`${apiUrl}/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(response => {
          if (response.ok) {
            alert('Assunto deletado com sucesso!');
            // Remover a linha da tabela
            event.target.closest('tr').remove();
          } else {
            console.log(response);
            alert('Erro ao deletar assunto.');
          }
        })
        .catch(error => {
          console.error('Erro ao deletar assunto:', error);
          alert('Erro ao deletar assunto. Tente novamente mais tarde.');
        });
      }
    }
});
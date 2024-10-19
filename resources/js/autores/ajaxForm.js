$(document).ready(function() {
  $('#formAddNewAuthor').on('submit', function(event) {
      event.preventDefault();
      console.log($(this).serialize());
      $.ajax({
          url: 'http://localhost:8000/api/autores',
          method: 'POST',
          data: $(this).serialize(),
          success: function(response) {
              alert('Autor adicionado com sucesso!');
              $('#modalFormAddAuthor').modal('hide');
              // Atualize a lista de assuntos ou faça outra ação necessária
          },
          error: function(xhr, status, error) {
              console.log(error);
              alert('Erro ao adicionar autor: ' + xhr.responseText);
          }
      });
  });
});
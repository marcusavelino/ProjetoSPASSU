$(document).ready(function() {
  $('#formAddNewTopic').on('submit', function(event) {
      event.preventDefault();
      console.log($(this).serialize());
      $.ajax({
          url: 'http://localhost:8000/api/assuntos',
          method: 'POST',
          data: $(this).serialize(),
          success: function(response) {
              alert('Assunto adicionado com sucesso!');
              $('#modalFormAddTopic').modal('hide');
              // Atualize a lista de assuntos ou faça outra ação necessária
          },
          error: function(xhr, status, error) {
              console.log(error);
              alert('Erro ao adicionar assunto: ' + xhr.responseText);
          }
      });
  });
});
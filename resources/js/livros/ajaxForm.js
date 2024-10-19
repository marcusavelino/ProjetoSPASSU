$(document).ready(function() {
  $('#formAddNewBook').on('submit', function(event) {
    event.preventDefault();
    console.log($(this).serialize());
    $.ajax({
      url: 'http://localhost:8000/api/livros',
      method: 'POST',
      data: $(this).serialize(),
      success: function(response) {
        alert('Livro adicionado com sucesso!');
        $('#modalFormAddNew').modal('hide');
        // Atualize a lista de livros ou faça outra ação necessária
      },
      error: function(xhr, status, error) {
        alert('Erro ao adicionar livro: ' + xhr.responseText);
      }
    });
  });
});
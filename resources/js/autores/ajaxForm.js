const API_BASE_URL = 'http://localhost:8000/api/autores';

$(document).ready(function () {
  initializeFormSubmit();
});

function initializeFormSubmit() {
  $('#formAddNewAuthor').off('submit').on('submit', handleFormSubmit);
}

function handleFormSubmit(event) {
  event.preventDefault();
  const authorId = $('#authorId').val();
  const url = getApiUrl(authorId);
  const method = getHttpMethod(authorId);

  sendAjaxRequest(url, method, $(this).serialize(), handleSuccess, handleError);
}

function getApiUrl(authorId) {
  return authorId ? `${API_BASE_URL}/${authorId}` : API_BASE_URL;
}

function getHttpMethod(authorId) {
  return authorId ? 'PUT' : 'POST';
}

function sendAjaxRequest(url, method, data, successCallback, errorCallback) {
  $.ajax({
    url: url,
    method: method,
    data: data,
    success: successCallback,
    error: errorCallback
  });
}

function handleSuccess(response) {
  const message = $('#authorId').val() ? 'Autor atualizado com sucesso!' : 'Autor adicionado com sucesso!';
  alert(message);
  $('#modalFormAddNewAuthor').modal('hide');
  location.reload();
}

function handleError(xhr, status, error) {
  console.error(error);
  alert('Erro ao salvar autor: ' + xhr.responseText);
}

function deleteAuthor(id) {
  if (confirm('Tem certeza que deseja deletar este autor?')) {
    sendDeleteRequest(id, handleDeleteSuccess, handleDeleteError);
  }
}

function sendDeleteRequest(id, successCallback, errorCallback) {
  fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => {
      if (response.ok) {
        successCallback();
      } else {
        response.json().then(error => errorCallback(error));
      }
    })
    .catch(error => errorCallback(error));
}

function handleDeleteSuccess() {
  alert('Autor deletado com sucesso!');
  location.reload();
}

function handleDeleteError(error) {
  console.error('Erro ao deletar autor:', error);
  alert('Erro ao deletar autor. Tente novamente mais tarde.');
}

export { deleteAuthor };
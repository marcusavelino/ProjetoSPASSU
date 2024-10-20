const API_BASE_URL_BOOKS = 'http://localhost:8000/api/livros';

$(document).ready(function () {
    initializeBookFormSubmit();
});

function initializeBookFormSubmit() {
    $('#formAddNewBook').off('submit').on('submit', handleBookFormSubmit);
}

function handleBookFormSubmit(event) {
    event.preventDefault();
    const bookId = $('#bookId').val();
    const url = getBookApiUrl(bookId);
    const method = getBookHttpMethod(bookId);

    sendAjaxRequest(url, method, $(this).serialize(), handleBookSuccess, handleBookError);
}

function getBookApiUrl(bookId) {
    return bookId ? `${API_BASE_URL_BOOKS}/${bookId}` : API_BASE_URL_BOOKS;
}

function getBookHttpMethod(bookId) {
    return bookId ? 'PUT' : 'POST';
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

function handleBookSuccess(response) {
    const message = $('#bookId').val() ? 'Livro atualizado com sucesso!' : 'Livro adicionado com sucesso!';
    alert(message);
    $('#modalFormAddNew').modal('hide');
    location.reload();
}

function handleBookError(xhr, status, error) {
    console.error(error);
    alert('Erro ao adicionar livro: ' + xhr.responseText);
}

function deleteBook(id) {
    if (confirm('Tem certeza que deseja deletar este livro?')) {
        sendDeleteRequest(id, handleDeleteBookSuccess, handleDeleteBookError);
    }
}

function sendDeleteRequest(id, successCallback, errorCallback) {
    fetch(`${API_BASE_URL_BOOKS}/${id}`, {
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

function handleDeleteBookSuccess() {
    alert('Livro deletado com sucesso!');
    location.reload();
}

function handleDeleteBookError(error) {
    console.error('Erro ao deletar livro:', error);
    alert('Erro ao deletar livro. Tente novamente mais tarde.');
}

export { deleteBook };
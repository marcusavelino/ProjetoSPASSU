const API_BASE_URL_TOPICS = 'http://localhost:8000/api/assuntos';

$(document).ready(function () {
    initializeTopicFormSubmit();
});

function initializeTopicFormSubmit() {
    $('#formAddNewTopic').off('submit').on('submit', handleTopicFormSubmit);
}

function handleTopicFormSubmit(event) {
    event.preventDefault();
    const topicId = $('#topicId').val();
    const url = getTopicApiUrl(topicId);
    const method = getTopicHttpMethod(topicId);

    sendAjaxRequest(url, method, $(this).serialize(), handleTopicSuccess, handleTopicError);
}

function getTopicApiUrl(topicId) {
    return topicId ? `${API_BASE_URL_TOPICS}/${topicId}` : API_BASE_URL_TOPICS;
}

function getTopicHttpMethod(topicId) {
    return topicId ? 'PUT' : 'POST';
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

function handleTopicSuccess(response) {
    const message = $('#topicId').val() ? 'Assunto atualizado com sucesso!' : 'Assunto adicionado com sucesso!';
    alert(message);
    $('#modalFormAddTopic').modal('hide');
    location.reload();
}

function handleTopicError(xhr, status, error) {
    console.error(error);
    alert('Erro ao adicionar assunto: ' + xhr.responseText);
}

function deleteTopic(id) {
    if (confirm('Tem certeza que deseja deletar este assunto?')) {
        sendDeleteRequest(id, handleDeleteTopicSuccess, handleDeleteTopicError);
    }
}

function sendDeleteRequest(id, successCallback, errorCallback) {
    fetch(`${API_BASE_URL_TOPICS}/${id}`, {
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

function handleDeleteTopicSuccess() {
    alert('Assunto deletado com sucesso!');
    location.reload();
}

function handleDeleteTopicError(error) {
    console.error('Erro ao deletar assunto:', error);
    alert('Erro ao deletar assunto. Tente novamente mais tarde.');
}

export { deleteTopic };
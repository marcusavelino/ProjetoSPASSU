<div class="modal fade" id="modalFormAddNewAuthor" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="title-modal-author">Adicionar Novo Autor</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="formAddNewAuthor">
          @csrf
          <input type="hidden" id="authorId" name="authorId">
          <div class="mb-3">
            <label for="authorName" class="form-label">Nome</label>
            <input type="text" class="form-control" id="authorName" name="Nome" required>
          </div>
          <button type="submit" class="btn btn-primary" id="submit-author">Salvar</button>
        </form>
      </div>
    </div>
  </div>
</div>
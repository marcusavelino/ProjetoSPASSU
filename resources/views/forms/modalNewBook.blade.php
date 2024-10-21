<div class="modal fade" id="modalFormAddNew" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Adicionar Novo Livro</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="formAddNewBook">
          @csrf
          <input type="hidden" id="bookId" name="bookId">
          <div class="mb-3">
            <label for="titulo" class="form-label">Título</label>
            <input type="text" class="form-control" id="titulo" name="titulo" required>
          </div>
          <div class="mb-3">
            <label for="Editora" class="form-label">Editora</label>
            <input type="text" class="form-control" id="Editora" name="Editora" required>
          </div>
          <div class="mb-3">
            <label for="Edicao" class="form-label">Edição</label>
            <input type="number" class="form-control" id="Edicao" name="Edicao" required>
          </div>
          <div class="mb-3">
            <label for="AnoPublicacao" class="form-label">Ano de Publicação</label>
            <input type="number" class="form-control" id="AnoPublicacao" name="AnoPublicacao" required>
          </div>
          <div class="mb-3">
            <label for="autores" class="form-label">Autores</label>
            <select multiple class="form-control" id="autores" name="autores[]">
              <!-- Options will be populated dynamically -->
            </select>
          </div>
          <div class="mb-3">
            <label for="assuntos" class="form-label">Assuntos</label>
            <select multiple class="form-control" id="assuntos" name="assuntos[]">
              <!-- Options will be populated dynamically -->
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Salvar</button>
        </form>
      </div>
    </div>
  </div>
</div>
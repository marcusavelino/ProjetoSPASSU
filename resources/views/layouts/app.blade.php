<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Projeto SPASSU</title>
  <!-- Bootstrap CSS -->
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
  @vite('resources/css/app.css')
</head>

<body>
  <div class="container">
    <header class="mt-5">
      <div class="p-5 mb-4 bg-light rounded-3">
        <div class="container-fluid">
          <h1 class="display-5 fw-bold">Projeto SPASSU</h1>
          <p class="col-md-8 fs-4">Bem-vindo ao Projeto SPASSU! Este é um sistema de gerenciamento de livros, autores e assuntos.</p>
        </div>
      </div>
    </header>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="home-tab" data-toggle="tab" data-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="profile-tab" data-toggle="tab" data-target="#livros" type="button" role="tab" aria-controls="livros" aria-selected="false">Livros</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="contact-tab" data-toggle="tab" data-target="#assunto" type="button" role="tab" aria-controls="assunto" aria-selected="false">Assuntos</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="contact-tab" data-toggle="tab" data-target="#autor" type="autor" role="tab" aria-controls="contact" aria-selected="false">Autores</button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
        <div class="jumbotron">
          <h1 class="display-4">Bem-vindo ao Projeto SPASSU!</h1>
          <p class="lead">Este é um sistema de gerenciamento de livros, autores e assuntos.</p>
          <hr class="my-4">
          <p>Use o menu acima para navegar pelas diferentes seções do sistema.</p>
        </div>
      </div>
      <div class="tab-pane fade" id="livros" role="tabpanel" aria-labelledby="profile-tab">
        @yield('livros')
      </div>
      <div class="tab-pane fade" id="assunto" role="tabpanel" aria-labelledby="contact-tab">
        @yield('assuntos')
      </div>
      <div class="tab-pane fade" id="autor" role="tabpanel" aria-labelledby="contact-tab">
        @yield('autores')
      </div>
    </div>

    <!-- Modal -->
    @include('forms.modalNewBook')
    @include('forms.modalNewTopic')
    @include('forms.modalNewAuthor')

    <footer class="bg-light mt-5 p-4 text-center">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h5>Projeto SPASSU</h5>
            <p>&copy; 2023 Projeto SPASSU. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>

  </div>
  <!-- Bootstrap JS and dependencies -->
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

  <!-- Vite JS -->
  @vite('resources/js/app.js')
  @vite('resources/js/livros/livros.js')
  @vite('resources/js/livros/ajaxForm.js')
  @vite('resources/js/assuntos/assuntos.js')
  @vite('resources/js/assuntos/ajaxForm.js')
  @vite('resources/js/autores/autores.js')
  @vite('resources/js/autores/ajaxForm.js')
</body>

</html>
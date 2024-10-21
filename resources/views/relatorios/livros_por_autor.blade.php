<!-- resources/views/relatorios/livros_por_autor.blade.php -->
<!DOCTYPE html>
<html>

<head>
  <title>Relatório de Livros por Autor</title>
  <style>
    table {
      width: 100%;
      border-collapse: collapse;
    }

    table,
    th,
    td {
      border: 1px solid black;
    }

    th,
    td {
      padding: 8px;
      text-align: left;
    }
  </style>
</head>

<body>
  <h1>Relatório de Livros por Autor</h1>
  <table>
    <thead>
      <tr>
        <th>Autor</th>
        <th>Livro</th>
        <th>Editora</th>
        <th>Edição</th>
        <th>Ano de Publicação</th>
        <th>Assuntos</th>
      </tr>
    </thead>
    <tbody>
      @foreach($livros as $livro)
      <tr>
        <td>{{ $livro->Autor }}</td>
        <td>{{ $livro->Livro }}</td>
        <td>{{ $livro->Editora }}</td>
        <td>{{ $livro->Edicao }}</td>
        <td>{{ $livro->AnoPublicacao }}</td>
        <td>{{ $livro->Assuntos }}</td>
      </tr>
      @endforeach
    </tbody>
  </table>
</body>

</html>
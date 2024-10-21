@extends('layouts.app')

@section('livros')
<div class="p-5 mb-4 bg-light rounded-3">
  <!-- Button trigger modal form -->
  <button type="button" class="btn btn-primary my-4" data-toggle="modal" data-target="#modalFormAddNew">
    Adicionar Novo Livro
  </button>
  <a href="{{ route('relatorio-livros-por-autor') }}" class="btn btn-warning my-4 ml-2" style="color: white;">
    Gerar Relatório de Livros por Autor
  </a>
  <h2>Lista de Livros</h2>
  <table id="livrosTable" class="table">
    <thead>
      <th>Título</th>
      <th>Ano de Pullicação</th>
      <th>Edição</th>
      <th>Editora</th>
    </thead>
    <tbody></tbody>
  </table>
  <div id="noBooksMessage"></div>
</div>
@endsection

@section('assuntos')
<div class="p-5 mb-4 bg-light rounded-3">
  <button type="button" class="btn btn-primary my-4" data-toggle="modal" data-target="#modalFormAddNewTopic">
    Adicionar Novo Assunto
  </button>
  <h2>Lista de Assuntos</h2>
  <table id="assuntosTable" class="table">
    <thead>
      <th>COD</th>
      <th>Descrição</th>
    </thead>
    <tbody></tbody>
  </table>
  <div id="noAssuntosMessage"></div>
</div>
@endsection

@section('autores')
<div class="p-5 mb-4 bg-light rounded-3">
  <button type="button" class="btn btn-primary my-4" data-toggle="modal" data-target="#modalFormAddNewAuthor">
    Adicionar Novo Autor
  </button>
  <h2>Lista de Autores</h2>
  <table id="autoresTable" class="table">
    <thead>
      <th>COD</th>
      <th>Nome Autor</th>
    </thead>
    <tbody></tbody>
  </table>
  <div id="noAutoresMessage"></div>
</div>
@endsection
<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Livro;
use App\Models\Autor;
use App\Models\Assunto;
use PHPUnit\Framework\Attributes\Test;
use Illuminate\Foundation\Testing\RefreshDatabase;

class LivroApiTest extends TestCase
{
  // use RefreshDatabase;

  #[Test]
  public function it_can_create_a_livro()
  {
    // Criar autores e assuntos de exemplo
    $autor1 = Autor::create(['Nome' => 'Autor 1']);
    $autor2 = Autor::create(['Nome' => 'Autor 2']);
    $assunto1 = Assunto::create(['Descricao' => 'Assunto 1']);
    $assunto2 = Assunto::create(['Descricao' => 'Assunto 2']);

    $data = [
      'titulo' => 'Titulo Teste',
      'Editora' => 'Editora Teste',
      'Edicao' => '1',
      'AnoPublicacao' => '2023',
      'autores' => [$autor1->CodAu, $autor2->CodAu],
      'assuntos' => [$assunto1->codAs, $assunto2->codAs]
    ];

    $response = $this->postJson(route('livros.store'), $data);

    $response->assertStatus(201)
      ->assertJsonFragment(['titulo' => 'Titulo Teste']);

    $this->assertDatabaseHas('livros', ['titulo' => 'Titulo Teste']);
  }

  #[Test]
  public function it_can_update_a_livro()
  {
    // Criar autores e assuntos de exemplo
    $autor1 = Autor::create(['Nome' => 'Autor 1']);
    $autor2 = Autor::create(['Nome' => 'Autor 2']);
    $assunto1 = Assunto::create(['Descricao' => 'Assunto 1']);
    $assunto2 = Assunto::create(['Descricao' => 'Assunto 2']);

    $livro = Livro::create([
      'titulo' => 'Titulo Inicial',
      'Editora' => 'Editora Inicial',
      'Edicao' => '1',
      'AnoPublicacao' => '2022'
    ]);

    $updateData = [
      'titulo' => 'Titulo Atualizado',
      'Editora' => 'Editora Atualizada',
      'Edicao' => '2',
      'AnoPublicacao' => '2023',
      'autores' => [$autor1->CodAu, $autor2->CodAu],
      'assuntos' => [$assunto1->codAs, $assunto2->codAs]
    ];

    $response = $this->putJson(route('livros.update', ['livro' => $livro->cod]), $updateData);

    $response->assertStatus(200)
      ->assertJsonFragment(['titulo' => 'Titulo Atualizado']);

    $this->assertDatabaseHas('livros', ['cod' => $livro->cod, 'titulo' => 'Titulo Atualizado']);
  }

  #[Test]
  public function it_can_delete_a_livro()
  {
    $livro = Livro::create([
      'titulo' => 'Titulo para Deletar',
      'Editora' => 'Editora para Deletar',
      'Edicao' => '1',
      'AnoPublicacao' => '2022'
    ]);

    $response = $this->deleteJson(route('livros.destroy', ['livro' => $livro->cod]));

    $response->assertStatus(204);

    $this->assertDatabaseMissing('livros', ['cod' => $livro->cod]);
  }

  #[Test]
  public function it_can_show_a_livro()
  {
    // Criar autores e assuntos de exemplo
    $autor1 = Autor::create(['Nome' => 'Autor 1']);
    $autor2 = Autor::create(['Nome' => 'Autor 2']);
    $assunto1 = Assunto::create(['Descricao' => 'Assunto 1']);
    $assunto2 = Assunto::create(['Descricao' => 'Assunto 2']);

    $livro = Livro::create([
      'titulo' => 'Titulo para Mostrar',
      'Editora' => 'Editora para Mostrar',
      'Edicao' => '1',
      'AnoPublicacao' => '2022'
    ]);

    $livro->autores()->sync([$autor1->CodAu, $autor2->CodAu]);
    $livro->assuntos()->sync([$assunto1->codAs, $assunto2->codAs]);

    $response = $this->getJson(route('livros.show', ['livro' => $livro->cod]));

    $response->assertStatus(200)
      ->assertJson([
        'cod' => $livro->cod,
        'Titulo' => 'Titulo para Mostrar',
        'Editora' => 'Editora para Mostrar',
        'Edicao' => '1',
        'AnoPublicacao' => '2022',
        'autores' => [
          ['CodAu' => $autor1->CodAu, 'Nome' => 'Autor 1'],
          ['CodAu' => $autor2->CodAu, 'Nome' => 'Autor 2']
        ],
        'assuntos' => [
          ['codAs' => $assunto1->codAs, 'Descricao' => 'Assunto 1'],
          ['codAs' => $assunto2->codAs, 'Descricao' => 'Assunto 2']
        ]
      ]);
  }
}

<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Autor;
use PHPUnit\Framework\Attributes\Test;

class AutorApiTest extends TestCase
{
  #[Test]
  public function it_can_create_an_autor()
  {
    $data = [
      'Nome' => 'Autor Teste',
    ];

    $response = $this->postJson(route('autores.store'), $data);

    dd($response->json());

    $response->assertStatus(201)
      ->assertJsonFragment(['Nome' => 'Autor Teste']);

    $this->assertCount(1, Autor::where('Nome', 'Autor Teste')->get());
  }

  #[Test]
  public function it_can_delete_an_autor()
  {
    $autor = Autor::factory()->create();

    $response = $this->deleteJson("/api/autores/{$autor->CodAu}");

    $response->assertStatus(204);

    $this->assertNull(Autor::find($autor->id));
  }

  #[Test]
  public function it_can_update_an_autor()
  {
    $autor = Autor::factory()->create();
    $data = [
      'Nome' => 'Autor Atualizado ' . $autor->CodAu,
    ];

    $response = $this->putJson("/api/autores/{$autor->CodAu}", $data);

    $response->assertStatus(200)
      ->assertJsonFragment(['Nome' => 'Autor Atualizado ' . $autor->CodAu]);

    $this->assertEquals('Autor Atualizado ' . $autor->CodAu, Autor::find($autor->CodAu)->Nome);
  }

  #[Test]
  public function it_can_list_autores()
  {
      $autores = Autor::factory()->count(3)->create();

      $response = $this->getJson("/api/autores");

      dd($response->json());

      $response->assertStatus(200);

      foreach ($autores as $autor) {
          $response->assertJsonFragment(['Nome' => $autor->Nome]);
      }
  }
}

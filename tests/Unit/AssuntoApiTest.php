<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Assunto;
use PHPUnit\Framework\Attributes\Test;

class AssuntoApiTest extends TestCase
{
    #[Test]
    public function it_can_create_an_assunto()
    {
        $data = [
            'Descricao' => 'Descricao Teste',
        ];

        $response = $this->postJson(route('assuntos.store'), $data);

        $response->assertStatus(201)
            ->assertJsonFragment(['Descricao' => 'Descricao Teste']);

        $this->assertCount(1, Assunto::where('Descricao', 'Descricao Teste')->get());
    }

    #[Test]
    public function it_can_update_an_assunto()
    {
        $assunto = Assunto::create(['Descricao' => 'Descricao Inicial']);

        $updateData = [
            'Descricao' => 'Descricao Atualizada',
        ];

        $response = $this->putJson("/api/assuntos/{$assunto->codAs}", $updateData);

        $response->assertStatus(200)
            ->assertJsonFragment(['Descricao' => 'Descricao Atualizada']);

        $this->assertDatabaseHas('assuntos', ['codAs' => $assunto->codAs, 'Descricao' => 'Descricao Atualizada']);
    }

    #[Test]
    public function it_can_delete_an_assunto()
    {
        $assunto = Assunto::create(['Descricao' => 'Descricao para Deletar']);

        $response = $this->deleteJson("/api/assuntos/{$assunto->codAs}", ['assunto' => $assunto]);

        $response->assertStatus(204);

        $this->assertDatabaseMissing('assuntos', ['codAs' => $assunto->codAs]);
    }
}
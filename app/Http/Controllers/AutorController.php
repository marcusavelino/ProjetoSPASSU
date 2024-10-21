<?php

namespace App\Http\Controllers;

use App\Models\Autor;
use Illuminate\Http\Request;

class AutorController extends Controller
{
    public function index()
    {
        return Autor::with('livros')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'Nome' => 'required|string|max:255',
            'livros' => 'array',
            'livros.*' => 'exists:livros,id',
        ]);

        $autor = Autor::create($request->all());
        $autor->livros()->sync($request->input('livros', []));
        return response()->json($autor->load('livros'), 201);
    }

    public function show(Autor $autor)
    {
        return response()->json($autor->load('livros'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'Nome' => 'required|string|max:255',
            'livros' => 'array',
            'livros.*' => 'exists:livros,id',
        ]);

        $autor = Autor::findOrFail($id);
        $autor->update($request->all());
        $autor->livros()->sync($request->input('livros', []));
        return response()->json($autor->load('livros'), 200);
    }

    public function destroy($id)
    {
        // Encontre o autor pelo ID
        $autor = Autor::findOrFail($id);

        // Excluir registros nas tabelas associativas
        $autor->livros()->detach();

        // Verificar se os registros associativos foram excluídos
        if ($autor->livros()->count() > 0) {
            return response()->json(['error' => 'Falha ao excluir registros associativos.'], 500);
        }

        // Excluir o autor
        if (!$autor->delete()) {
            return response()->json(['error' => 'Falha ao excluir o autor.'], 500);
        }

        return response()->json(null, 204);
    }
}

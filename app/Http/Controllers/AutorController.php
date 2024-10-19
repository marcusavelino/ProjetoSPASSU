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
        $autor = Autor::create($request->all());
        $autor->livros()->sync($request->input('livros', []));
        return response()->json($autor, 201);
    }

    public function show(Autor $autor)
    {
        return $autor->load('livros');
    }

    public function update(Request $request, Autor $autor)
    {
        $autor->update($request->all());
        $autor->livros()->sync($request->input('livros', []));
        return response()->json($autor, 200);
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

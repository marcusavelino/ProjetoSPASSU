<?php

namespace App\Http\Controllers;

use App\Models\Assunto;
use Illuminate\Http\Request;

class AssuntoController extends Controller
{
    public function index()
    {
        return Assunto::with('livros')->get();
    }

    public function store(Request $request)
    {
        $assunto = Assunto::create($request->all());
        $assunto->livros()->sync($request->input('livros', []));
        return response()->json($assunto, 201);
    }

    public function show(Assunto $assunto)
    {
        return $assunto->load('livros');
    }

    public function update(Request $request, $id)
    {
        $assunto = Assunto::findOrFail($id);
        $assunto->update($request->all());
        $assunto->livros()->sync($request->input('livros', []));
        return response()->json($assunto, 200);
    }

    public function destroy(Assunto $assunto)
    {   
        // Excluir registros nas tabelas associativas
        $assunto->livros()->detach();
        
        $assunto->delete();
        return response()->json(null, 204);
    }
}
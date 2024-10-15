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

    public function destroy(Autor $autor)
    {
        $autor->delete();
        return response()->json(null, 204);
    }
}
<?php
namespace App\Http\Controllers;

use App\Models\Livro;
use Illuminate\Http\Request;

class LivroController extends Controller
{
    public function index()
    {
        return Livro::with(['autores', 'assuntos'])->get();
    }

    public function store(Request $request)
    {
        $livro = Livro::create($request->all());
        $livro->autores()->sync($request->input('autores', []));
        $livro->assuntos()->sync($request->input('assuntos', []));
        return response()->json($livro, 201);
    }

    public function show(Livro $livro)
    {
        return $livro->load(['autores', 'assuntos']);
    }

    public function update(Request $request, Livro $livro)
    {
        $livro->update($request->all());
        $livro->autores()->sync($request->input('autores', []));
        $livro->assuntos()->sync($request->input('assuntos', []));
        return response()->json($livro, 200);
    }

    public function destroy(Livro $livro)
    {
        $livro->delete();
        return response()->json(null, 204);
    }
}
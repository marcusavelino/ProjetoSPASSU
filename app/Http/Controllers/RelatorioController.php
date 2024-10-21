<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;

class RelatorioController extends Controller
{
    public function gerarRelatorio()
    {
        // Obter os dados da view vw_LivrosPorAutor
        $livros = DB::table('vw_LivrosPorAutor')->get();

        // Gerar o PDF usando a view Blade
        $pdf = Pdf::loadView('relatorios.livros_por_autor', ['livros' => $livros]);

        // Retornar o PDF para download
        return $pdf->download('relatorio_livros_por_autor.pdf');
    }
}
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RelatorioController;

Route::get('/', function () {
    return view('home');
});

Route::get('relatorio-livros-por-autor', [RelatorioController::class, 'gerarRelatorio'])->name('relatorio-livros-por-autor');
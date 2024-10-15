<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Autor extends Model
{
    protected $primaryKey = 'CodAu';
    protected $fillable = [
        'Nome',
    ];
    public function livros()
    {
        return $this->belongsToMany(Livro::class, 'livro_autor', 'Autor_cod', 'Livro_cod');
    }
}
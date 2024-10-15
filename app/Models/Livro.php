<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Livro extends Model
{
    protected $primaryKey = 'cod';

    public function autores() 
    {
        return $this->belongsToMany(Autor::class, 'livro_autor', 'Livro_cod', 'Autor_cod');
    }

    public function assuntos()
    {
        return $this->belongsToMany(Assunto::class, 'livro_assunto', 'Livro_cod', 'Assunto_cod');
    }
}

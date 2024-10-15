<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assunto extends Model
{
    protected $primaryKey = 'codAs';

    protected $fillable = [
        'Descricao',
    ];

    public function livros()
    {
        return $this->belongsToMany(Livro::class, 'livro_assunto', 'Assunto_cod', 'Livro_cod');
    }
}

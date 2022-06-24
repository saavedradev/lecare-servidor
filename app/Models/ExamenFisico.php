<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamenFisico extends Model
{
    use HasFactory;

    protected $table= "examenes_fisicos";
    protected $primaryKey = 'id';
    protected $fillable = [
        'peso',
        'talla',
        'orl',
        'cuello',
        'cardio',
        'abdomen',
        'extremidades',
        'historial_id'
    ];

    public $timestamps = false;

    public function historialMedico()
    {
        return $this->belongsTo(HistorialMedico::class, 'historial_id', 'id');
    }
}

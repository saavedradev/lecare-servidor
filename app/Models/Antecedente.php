<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Antecedente extends Model
{
    use HasFactory;

    protected $table = "antecedentes";
    protected $primaryKey = 'id';
    protected $fillable = [
        'patologicos',
        'quirurgicos',
        'traumaticos',
        'toxicos',
        'farmacologicos',
        'familiares',
        'alergicos',
        'fur',
        'alimentacion',
        'historial_id'
    ];

    public $timestamps = false;

    public function historialMedico()
    {
        return $this->belongsTo(HistorialMedico::class, 'historial_id', 'id');
    }
}

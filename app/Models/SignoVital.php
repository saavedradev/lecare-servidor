<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SignoVital extends Model
{
    use HasFactory;

    protected $table= "signos_vitales";
    protected $primaryKey = 'id';
    protected $fillable = [
        'presion_arterial',
        'presión_arterial_sistolica',
        'pulso',
        'frecuencia_respiratoria',
        'historial_id'
    ];

    public $timestamps = false;

    public function historialMedico()
    {
        return $this->belongsTo(HistorialMedico::class, 'historial_id', 'id');
    }
}

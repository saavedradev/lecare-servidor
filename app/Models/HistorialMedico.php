<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistorialMedico extends Model
{
    use HasFactory;

    protected $table= "historial_medicos";
    protected $primaryKey = 'id';
    protected $fillable = [
        'fecha',
        'motivo',
        'diagnostico',
        'cliente_id'
    ];

    public $timestamps = false;

    public function cliente(){
        return $this->belongsTo(Cliente::class,'cliente_id','id');
    }

    public function examenFisico()
    {
        return $this->hasOne(ExamenFisico::class, 'historial_id', 'id');
    }

    public function signoVital()
    {
        return $this->hasOne(SignoVital::class, 'historial_id', 'id');
    }

    public function antecedente()
    {
        return $this->hasOne(Antecedente::class, 'historial_id', 'id');
    }
}

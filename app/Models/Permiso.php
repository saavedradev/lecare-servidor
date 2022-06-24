<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permiso extends Model
{
    use HasFactory;

    protected $table= "permisos";

    protected $primaryKey = 'id';

    protected $fillable = [
        'motivo',
        'fecha',
        'hora_inicio',
        'hora_final',
        'estado',
        'empleado_id'

    ];
    public $timestamps = false;

    public function empleado()
    {
        return $this->belongsTo(User::class,'empleado_id','id');
    }
}

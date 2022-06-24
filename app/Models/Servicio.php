<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Servicio extends Model
{
    use HasFactory;

    protected $table= "servicios";

    protected $primaryKey = 'id';

    protected $fillable = [
        'nombre',
        'tipo',
        'duracion'
    ];
    public $timestamps = false;

    public function users()
    {
        return $this->belongsToMany(User::class,'user_servicio');
    }

    public function citas()
    {
        return $this->belongsToMany(Cita::class,'citas_servicios')->withPivot('id_empleado');
    }
}

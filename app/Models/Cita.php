<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cita extends Model
{
    use HasFactory;

    protected $table= "citas";
    protected $primaryKey = 'id';
    protected $fillable = [
        'estado_cita',
        'estado_pago',
        'horario',
        'fecha',
        'cliente_id'

    ];

    public $timestamps = false;

    public function cliente(){
        return $this->belongsTo(Cliente::class,'cliente_id','id');
    }

    public function servicios(){
        return $this->belongsToMany(Servicio::class,'citas_servicios');
    }

    public function empleados(){
        return $this->belongsToMany(User::class,'citas_empleados');
    }

}

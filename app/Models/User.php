<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $table= "users";
    protected $primaryKey = 'id';
    protected $fillable = [
        'primer_nombre',
        'segundo_nombre',
        'primer_apellido',
        'segundo_apellido',
        'telefono',
        'direccion',
        'email',
        'password',
    ];

    public $timestamps = false;

    public function roles()
    {
        return $this->belongsToMany(Role::class,'roles_asignados');
    }

    public function servicios()
    {
        return $this->belongsToMany(Servicio::class,'user_servicio');
    }

    public function citas(){
        return $this->belongsToMany(Cita::class,'citas_empleados');
    }

    public function permisos()
    {
        return $this->hasMany(Permiso::class,'empleado_id','id');
    }



    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}

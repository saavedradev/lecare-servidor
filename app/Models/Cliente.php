<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Cliente extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
   /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $table= "clientes";
    protected $primaryKey = 'id';
    protected $fillable = [
        'primer_nombre',
        'segundo_nombre',
        'primer_apellido',
        'segundo_apellido',
        'telefono',
        'email',
        'password',
    ];

    public $timestamps = false;

    public function citas()
    {
        return $this->hasMany(Cita::class,'cliente_id','id');
    }

    public function historiales()
    {
        return $this->hasMany(HistorialMedico::class,'cliente_id','id');
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

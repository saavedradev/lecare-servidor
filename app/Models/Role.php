<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $table= "roles";

    protected $primaryKey = 'id';

    protected $fillable = [
        'nombre'
    ];
    public $timestamps = false;
    
    public function users()
    {
        return $this->belongsToMany(User::class,'roles_asignados');
    }

}

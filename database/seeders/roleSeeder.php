<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use App\Models\administrador;
use App\Models\Cliente;
use App\Models\Permiso;
use App\Models\Servicio;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class roleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles=array("Administrador","Empleado","Empleado_Medico");
        for($contador=0;$contador<3;$contador++){
            $role = new Role();
            $role->nombre= $roles[$contador];
            $role->save();
        }

        $administrador= new User();
        $administrador->id = 1113645207;
        $administrador->primer_nombre = "Angela";
        $administrador->segundo_nombre = "Karina";
        $administrador->primer_apellido = "Somera";
        $administrador->segundo_apellido =  "Bejarano";
        $administrador->telefono = 3137565110;
        $administrador->direccion = "Calle 13 #11A-80";
        $administrador->email = "angelaSomera@gmail.com";
        $administrador->password = Hash::make("lecare");
        $administrador->save();
        $administrador->roles()->attach([1]);

        $servicio = new Servicio();
        $servicio->nombre= "Drenado linfatico";
        $servicio->tipo= "Radifrecuencia";
        $servicio->duracion="2 horas";
        $servicio->save();

        $servicio1 = new Servicio();
        $servicio1->nombre= "Masaje";
        $servicio1->tipo= "Reductivo";
        $servicio1->duracion="3 horas";
        $servicio1->save();

        $servicio2 = new Servicio();
        $servicio2->nombre= "Facial";
        $servicio2->tipo= "Premium";
        $servicio2->duracion="1 hora";
        $servicio2->save();

        $servicio3 = new Servicio();
        $servicio3->nombre= "Depilación";
        $servicio3->tipo= "Laser";
        $servicio3->duracion="1 hora";
        $servicio3->save();

        $empleado1= new User();
        $empleado1->id = 1106728722;
        $empleado1->primer_nombre = "Diana";
        $empleado1->segundo_nombre = "Marcela";
        $empleado1->primer_apellido = "Somera";
        $empleado1->segundo_apellido =  "Bejarano";
        $empleado1->telefono = 3137566123;
        $empleado1->direccion = "Calle 11 #15A-05";
        $empleado1->email = "dianaMarcela@gmail.com";
        $empleado1->password = Hash::make("1234567");
        $empleado1->save();
        $empleado1->roles()->attach([3]);
        $empleado1->servicios()->attach([1,2]);

        $empleado2= new User();
        $empleado2->id = 19273838267;
        $empleado2->primer_nombre = "Lucrecia";
        $empleado2->segundo_nombre = "";
        $empleado2->primer_apellido = "Bejarano";
        $empleado2->segundo_apellido =  "Torres";
        $empleado2->telefono = 3146586258;
        $empleado2->direccion = "Calle 11 #15A-05";
        $empleado2->email = "lucrecia@gmail.com";
        $empleado2->password = Hash::make("12345");
        $empleado2->save();
        $empleado2->roles()->attach([2]);
        $empleado2->servicios()->attach([3,4]);


        $cliente= new Cliente();
        $cliente->id = 1007718830;
        $cliente->primer_nombre = "Juan";
        $cliente->segundo_nombre = "Camilo";
        $cliente->primer_apellido = "Grosso";
        $cliente->segundo_apellido =  "Alomia";
        $cliente->telefono = 3226141868;
        $cliente->email = "grosocamilo@gmail.com";
        $cliente->password = Hash::make("123456");
        $cliente->save();

        $permiso= new Permiso();
        $permiso->motivo= "Cita medica";
        $permiso->fecha= date('Y-m-d');
        $permiso->hora_inicio="11:20";
        $permiso->hora_final="12:50";
        $permiso->estado="pendiente";
        $permiso->empleado()->associate($empleado1);
        $permiso->save();


    }
}

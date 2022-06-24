<?php

namespace App\Http\Controllers\Api\Empleado;

use Carbon\Carbon;
use App\Models\Cita;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class JornadaEmpleadoController extends Controller{


    public function show($id)
    {
        $cita = Cita::find($id);
        return response()->json([
            'cita' => $cita,
            'cliente'=>$cita->cliente->primer_nombre." ".$cita->cliente->segundo_nombre." ".$cita->cliente->primer_apellido,
            'servicios'=>$cita->servicios,
            'clienteCedula'=>$cita->cliente->id
        ]);
    }

    public function index($id)
    {
        $citas = array();
        foreach (Cita::all() as $cita) {
           foreach($cita->empleados as $empleado){
            if($empleado->id==$id){
                array_push($citas,$cita);
            }
           }
        }
        return $citas;
    }


    public function indexDay(Request $request)
    {
        $citas = array();
        foreach (Cita::all() as $cita) {
            if(isset($cita->cliente)){
                if ($cita->fecha == $request->fecha) {
                    foreach($cita->empleados as $empleado){
                        if($empleado->id==$request->cedula){
                        array_push($citas, $cita);
                        }
                    }

                }
            }

        }
        return response()->json([
            'citas' => $citas,
            'id' => $request->cedula
        ]);
    }
}

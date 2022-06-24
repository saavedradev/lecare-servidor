<?php

namespace App\Http\Controllers\Api\Empleado;

use Exception;
use Carbon\Carbon;
use App\Models\User;
use App\Models\permiso;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class PermisoEmpleadoController extends Controller
{

    public function register(Request $request)
    {
        $fechaActual = Carbon::now();
        $validator = Validator::make($request->all(), [
            'fecha' => 'required|date',
            'hora_inicio' => 'required',
            'hora_final' => 'required',
            'motivo' => 'required'
        ]);

        try {
            if ($validator->fails()) {
                return response()->json([
                    'status' => 401,
                    'validation_errors' => $validator->errors()
                ]);
            }else if($fechaActual->gt($request->fecha)){
                return response()->json([
                    'status' => 306,
                    'message' => "La fecha debe ser mayor a la actual"
                ]);
            }else if($request->hora_inicio >= $request->hora_final){
                return response()->json([
                    'status' => 500,
                    'message' => "La hora de inicio debe ser mayor a la hora final"
                ]);
            }
            else{

                $permiso = new Permiso();
                $permiso->fecha = $request->fecha;
                $permiso->hora_inicio = $request->hora_inicio;
                $permiso->hora_final = $request->hora_final;
                $permiso->motivo =  $request->motivo;
                $permiso->estado="Pendiente";
                $empleado = User::findOrFail($request->cedula_empleado);
                $permiso->empleado()->associate($empleado);
                $permiso->save();
                return response()->json([
                    'status' => 200,
                    'permisos' => $this->index($request->cedula_empleado),
                    'message'=>"El permiso ha sido creado"
                ]);
            }
        } catch (Exception $ex) {
            return response()->json([
                'excepcion' => print_r($ex)
            ]);
        }
    }

    public function index($id)
    {
        $permisos = array();
        foreach (Permiso::all() as $permiso) {
            if ($permiso->empleado->id == $id) {
                array_push($permisos, $permiso);
            }
        }
        return $permisos;
    }



    public function show($id)
    {
        $permiso = Permiso::find($id);
        return response()->json([
            'permiso' => $permiso
        ]);
    }


    public function update(Request $request, $id)
    {
        $fechaActual = Carbon::now();
        $validator = Validator::make($request->all(), [
            'fecha' => 'required|date',
            'hora_inicio' => 'required',
            'hora_final' => 'required',
            'motivo' => 'required'
        ]);
        try {
            if ($validator->fails()) {
                return response()->json([
                    'status' => 401,
                    'validation_errors' => $validator->errors()
                ]);
            }else if($fechaActual->gt($request->fecha)){
                return response()->json([
                    'status' => 500,
                    'message' => "La fecha debe ser mayor a la actual"
                ]);
            }else if($request->hora_inicio >= $request->hora_final){
                return response()->json([
                    'status' => 305,
                    'message' => "La fecha debe ser mayor a la actual"
                ]);
            } else {
                $permiso = Permiso::findOrFail($id);
                $permiso->fecha = $request->fecha;
                $permiso->hora_inicio = $request->hora_inicio;
                $permiso->hora_final = $request->hora_final;
                $permiso->motivo =  $request->motivo;
                $permiso->save();
                return response()->json([
                    'status' => 200,
                    'message' => "El permiso ha sido editado.",
                    'permisos' => $this->index($permiso->empleado->id)
                ]);
            }
        } catch (Exception $ex) {
            return response()->json([
                'excepcion' => print_r($ex)
            ]);
        }
    }


    public function destroy($id)
    {
        $permiso = Permiso::destroy($id);
        return $permiso;
    }
}

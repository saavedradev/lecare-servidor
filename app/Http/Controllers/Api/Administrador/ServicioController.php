<?php

namespace App\Http\Controllers\Api\Administrador;

use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use App\Models\Servicio;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ServicioController extends Controller{

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|regex:/^[\pL\s\-]+$/u',
            'tipo' => 'required|regex:/^[\pL\s\-]+$/u',
            'duracion' => 'required'
        ]);

        try {
            if ($validator->fails()) {
                return response()->json([
                    'status' => 401,
                    'validation_errors' => $validator->errors()
                ]);
            } else {
                $servicio = new Servicio();
                $servicio->nombre = $request->nombre;
                $servicio->tipo = $request->tipo;
                $servicio->duracion =  $request->duracion;
                $servicio->save();
                return response()->json([
                    'status' => 200,
                    'message'=>'El servicio ha sido guardado con exito',
                    'servicios'=>$this->index()

                ]);
            }
        }catch(Exception $ex){
           return response()->json([
               'excepcion'=> $ex
           ]);
        }
    }

    public function index()
    { $servicios = Servicio::all();
        return $servicios;
    }



     public function show($id)
    {
             $servicio = Servicio::find($id);
             return response()->json([
                'servicio' => $servicio
            ]);

     }


    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|regex:/^[\pL\s\-]+$/u',
            'tipo' => 'required|regex:/^[\pL\s\-]+$/u',
            'duracion' => 'required'
        ]);
        try{
            if ($validator->fails()) {
                return response()->json([
                    'status' => 401,
                    'validation_errors' => $validator->errors()
                ]);
            }else{
            $servicio = Servicio::findOrFail($request->codigo);
            $servicio->nombre = $request->nombre;
            $servicio->tipo = $request->tipo;
            $servicio->duracion = $request->duracion;
            $servicio->save();
            return response()->json([
                'status' => 200,
                'message' => 'El Usuario '.$servicio->nombre." ha sido editado.",
                'servicios'=>$this->index()
            ]);
            }

        }catch(Exception $ex){
            return response()->json([
                'excepcion'=>$ex
            ]);
        }

    }

    public function destroy($id)
    {
        $servicio=Servicio::destroy($id);
        return $servicio;
    }
}

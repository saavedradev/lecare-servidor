<?php

namespace  App\Http\Controllers\Api;

use Exception;
use App\Models\Permiso;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class PermisoController extends Controller
{
    public function register(Request $request)
    {
        // $validator = Validator::make($request->all(), [
        //     'nombre' => 'required',
        //     'tipo' => 'required',
        //     'duracion' => 'required'
        // ]);

        // try {
        //     if ($validator->fails()) {
        //         return response()->json([
        //             'status' => 401,
        //             'validation_errors' => $validator->errors()
        //         ]);
        //     } else {
        //         $permiso = new Permiso();
        //         $permiso->nombre = $request->nombre;
        //         $permiso->tipo = $request->tipo;
        //         $permiso->duracion =  $request->duracion;
        //         $permiso->save();
        //         return response()->json([
        //             'status' => 200,
        //             'message'=>'El permiso ha sido guardado con exito',
        //             'permisos'=>$this->index()

        //         ]);
        //     }
        // }catch(Exception $ex){
        //    return response()->json([
        //        'excepcion'=> $ex
        //    ]);
        // }
    }

    public function index()
    {
        $permisos = array();
        foreach (Permiso::all() as $permiso) {
            if (isset($permiso->empleado)) {
                array_push($permisos, $permiso);
            }
        }
        return $permisos;
    }



    public function show($id)
    {
        $permiso = Permiso::find($id);
        $empleado = $permiso->empleado->primer_nombre . " " . $permiso->empleado->segundo_nombre . " " . $permiso->empleado->primer_apellido . " " . $permiso->empleado->segundo_apellido;
        return response()->json([
            'permiso' => $permiso,
            'empleado' => $empleado
        ]);
    }


    public function update(Request $request,)
    {
        if ($request->realizado == "administrador") {
            $permiso = Permiso::findOrFail($request->id);
            $permiso->estado= $request->respuesta;
            $permiso->save();
            return response()->json([
                'status' => 200,
                'message' => 'El permiso del empleado '.$permiso->empleado->primer_nombre.' '.$permiso->empleado->segundo_nombre.' ha sido '.$request->respuesta,
                'permisos'=>$this->index()
            ]);
        } else {
            $validator = Validator::make($request->all(), [
                'nombre' => 'required',
                'tipo' => 'required',
                'duracion' => 'required'
            ]);

            try{
              if ($validator->fails()) {
                     return response()->json([
                         'status' => 401,
                         'validation_errors' => $validator->errors()
                     ]);
                 }else{
                 $permiso = Permiso::findOrFail($request->codigo);
                 $permiso->nombre = $request->nombre;
                 $permiso->tipo = $request->tipo;
                 $permiso->duracion = $request->duracion;
                 $permiso->save();
                 return response()->json([
                     'status' => 200,
                     'message' => 'El Usuario '.$permiso->nombre." ha sido editado.",
                     'permisos'=>$this->index()
                 ]);
                 }

             }catch(Exception $ex){
                 return response()->json([
                     'excepcion'=>$ex
                 ]);
             }
        }
    }

    public function destroy($id)
    {
        $permiso = Permiso::destroy($id);
        return $permiso;
    }
}

<?php

namespace App\Http\Controllers\Api\Empleado;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class CreateEmpleadoController extends Controller{

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'cedula' => 'required|unique:users,cedula|numeric',
            'primer_nombre' => 'required',
            'segundo_nombre' => '',
            'primer_apellido' => 'required',
            'segundo_apellido' => 'required',
            'telefono' => 'required',
            'direccion' => 'required',
            'email' => 'required|unique:users,email',
            'password' => 'required',
            'password_confirmation' => 'required|same:password'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 401,
                'validation_errors' => $validator->errors()
            ]);
        } else {
            $user = new User();
            $user->cedula = $request->cedula;
            $user->primer_nombre = $request->primer_nombre;
            $user->segundo_nombre = $request->segundo_nombre;
            $user->primer_apellido = $request->primer_apellido;
            $user->segundo_apellido =  $request->segundo_apellido;
            $user->telefono = $request->telefono;
            $user->direccion = $request->direccion;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->save();



            $token = $user->createToken($user->email . '_Token')->plainTextToken;


            return response()->json([
                'status' => 200,
                'userName' => $user->cedula,
                'token' => $token,
                'message' => 'Guardado con éxito!'


            ]);
        }
    }
}

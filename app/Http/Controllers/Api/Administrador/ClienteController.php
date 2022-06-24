<?php

namespace App\Http\Controllers\Api\Administrador;

use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Cliente;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ClienteController extends Controller{

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|numeric|between: 1000000, 9999999999|unique:clientes,id',
            'primer_nombre' => 'required|regex:/^[\pL\s\-]+$/u',
            'segundo_nombre' => 'regex:/^[\pL\s\-]+$/u',
            'primer_apellido' => 'required|regex:/^[\pL\s\-]+$/u',
            'segundo_apellido' => 'required|regex:/^[\pL\s\-]+$/u',
            'telefono' => 'required|numeric|between:1000000000,9999999999',
            'email' => 'required|email',
            'password' => 'required|min:8',
            'password_confirmation' => 'required|same:password'
        ],[
            'id.required'=> 'El campo cedula es obligatorio.',
            'id.numeric'=> 'El formato de cedula es invalido.',
            'id.between'=> 'La cedula tiene que tener entre 7,8 y 10 digitos.',
            'id.unique'=>'El campo cedula ya ha sido registrado.',
            'password.required'=>'El campo contraseña es obligatorio.',
            'password.min'=>'La contraseña debe contener más de 8 caracteres',
            'password_confirmation.required'=>'El campo confirmar contraseña es obligatorio.',
            'password_confirmation.same'=>'La confirmacion de contraseña y la contraseña deben coincidir.'
        ]);

        try{
            if ($validator->fails()) {
                return response()->json([
                    'status' => 401,
                    'validation_errors' => $validator->errors()
                ]);
            } else {
                $cliente = new Cliente();
                $cliente->id = $request->id;
                $cliente->primer_nombre = $request->primer_nombre;
                $cliente->segundo_nombre = $request->segundo_nombre;
                $cliente->primer_apellido = $request->primer_apellido;
                $cliente->segundo_apellido =  $request->segundo_apellido;
                $cliente->telefono = $request->telefono;
                $cliente->email = $request->email;
                $cliente->password = Hash::make($request->password);
                //busqueda de cedula
                $realizadorRegistro= $request->realizadorRegistro;
                $cedulaBuscada = is_null(User::find($cliente->id)) ? $cedulaBuscada=null : $cedulaBuscada = User::find($cliente->id);
                if ($cedulaBuscada==null) {
                    $cliente->save();
                    if ($realizadorRegistro != "administrador") {
                        $token = $cliente->createToken($cliente->email . '_Token')->plainTextToken;
                        return response()->json([
                            'status' => 200,
                            'userName' => $cliente->id,
                            'token' => $token,
                            'user'=>$cliente->id,
                            'message' => 'Guardado con éxito!'
                        ]);
                    }
                    return response()->json([
                        'status' => 200,
                        'message' => 'Guardado con éxito!',
                        'clientes'=> $this->index()
                    ]);
                }else{
                        return response()->json([
                            'status' => 201,
                            'message' => 'El usuario ya se encuentra registrado'
                        ]);
                }



            }
        }catch(Exception $ex){
         echo $ex;
        }

    }

    public function index()
    { $clientes = Cliente::all();
        return $clientes;
    }



     public function show($id)
    {
             $cliente = Cliente::find($id);
             return response()->json([
                'cliente' => $cliente,
                'password' =>$cliente->password
            ]);
     }


    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|numeric|between: 1000000, 9999999999',
            'primer_nombre' => 'required|regex:/^[\pL\s\-]+$/u',
            'segundo_nombre' => 'regex:/^[\pL\s\-]+$/u',
            'primer_apellido' => 'required|regex:/^[\pL\s\-]+$/u',
            'segundo_apellido' => 'required|regex:/^[\pL\s\-]+$/u',
            'telefono' => 'required|numeric|between:1000000000,9999999999',
            'email' => 'required|email',
            'password' => 'required|min:8',
            'password_confirmation' => 'required|same:password'
        ],[
            'id.required'=> 'El campo cedula es obligatorio.',
            'id.numeric'=> 'El formato de cedula es invalido.',
            'id.between'=> 'La cedula tiene que tener entre 7,8 y 10 digitos.',
            'id.unique'=>'El campo cedula ya ha sido registrado.',
            'password.required'=>'El campo contraseña es obligatorio.',
            'password.min'=>'La contraseña debe contener más de 8 caracteres',
            'password_confirmation.required'=>'El campo confirmar contraseña es obligatorio.',
            'password_confirmation.same'=>'La confirmacion de contraseña y la contraseña deben coincidir.'
        ]);
        try{
            if ($validator->fails()) {
                return response()->json([
                    'status' => 401,
                    'validation_errors' => $validator->errors()
                ]);
            }else{
            $cliente = Cliente::findOrFail($request->id);
            $cliente->id = $request->id;
            $cliente->primer_nombre = $request->primer_nombre;
            $cliente->segundo_nombre = $request->segundo_nombre;
            $cliente->primer_apellido = $request->primer_apellido;
            $cliente->segundo_apellido = $request->segundo_apellido;
            $cliente->telefono = $request->telefono;
            $cliente->email = $request->email;
            $cliente->password = $request->password;
            $cliente->save();
            return response()->json([
                'status' => 200,
                'message' => 'El Usuario '.$cliente->primer_nombre." ".$cliente->segundo_nombre." ha sido editado.",
                'clientes'=> $this->index()
            ]);
            }

        }catch(Exception $ex){
            echo $ex;
        }

    }


    public function destroy($id)
    {
        $cliente=Cliente::destroy($id);
        return $cliente;
    }
}


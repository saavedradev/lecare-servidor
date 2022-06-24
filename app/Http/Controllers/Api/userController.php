<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Cliente;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use PhpParser\Node\Stmt\TryCatch;

class userController extends Controller
{


    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->errors()->messages(),
            ]);
        } else {
            if ($request->rol == "funcionario") {
                $rolUsuario = null;
                $user = User::where('email', '=', $request->email)->first();
                if (!$user || !Hash::check($request->password, $user->password)) {
                    return response()->json([
                        'status' => 401,
                        'message' => 'Cuenta no registrada'
                    ]);
                } else {
                    foreach (json_decode($user->roles) as $rol) {
                        $rolUsuario = $rol->nombre;
                    }
                    $token = $user->createToken($user->email . '_Token')->plainTextToken;
                    return response()->json([
                        'status' => 200,
                        'userName' => $user->primer_nombre . " " . $user->segundo_nombre,
                        'token' => $token,
                        'user' => $user->id,
                        'message' => 'Logueado Satisfactoriamente',
                        'rolUsuario' => $rolUsuario

                    ]);
                }
            } else {
                $cliente = Cliente::where('email', '=', $request->email)->first();
                if (!$cliente || !Hash::check($request->password, $cliente->password)) {
                    return response()->json([
                        'status' => 401,
                        'message' => 'Cuenta no registrada'
                    ]);
                } else {
                    $token = $cliente->createToken($cliente->email . '_Token')->plainTextToken;
                    return response()->json([
                        'status' => 200,
                        'userName' => $cliente->primer_nombre . " " . $cliente->segundo_nombre,
                        'token' => $token,
                        'user' => $cliente->id,
                        'message' => 'Logueado Satisfactoriamente',
                        'rolUsuario' => 'Cliente'
                    ]);
                }
            }
        }
    }

    public function userProfile()
    {
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Logged out'

        ]);
    }

    public function buscarCliente($id)
    {
        try {

            $cliente = Cliente::find($id);
            return $cliente;
        } catch (\Throwable $th) {
            throw $th;
        }
    }
    public function buscarUser($id)
    {
        try {

            $user = User::find($id);
            return $user;
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}

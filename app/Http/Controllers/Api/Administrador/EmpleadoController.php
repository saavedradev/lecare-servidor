<?php

namespace App\Http\Controllers\Api\Administrador;

use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Servicio;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class EmpleadoController extends Controller
{

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|numeric|between: 1000000, 9999999999|unique:clientes,id',
            'primer_nombre' => 'required|regex:/^[\pL\s\-]+$/u',
            'segundo_nombre' => 'regex:/^[\pL\s\-]+$/u',
            'primer_apellido' => 'required|regex:/^[\pL\s\-]+$/u',
            'segundo_apellido' => 'required|regex:/^[\pL\s\-]+$/u',
            'telefono' => 'required|numeric|between:1000000000,9999999999',
            'direccion' => 'required',
            'servicios' => "required|array|min:1",
            'email' => 'required|email',
            'password' => 'required|min:8',
            'password_confirmation' => 'required|same:password',
            'rol' => 'required'
        ],[
            'id.required'=> 'El campo cedula es obligatorio.',
            'id.numeric'=> 'El formato de cedula es invalido.',
            'id.between'=> 'La cedula tiene que tener entre 7,8 y 10 digitos.',
            'id.unique'=>'El campo cedula ya ha sido registrado.',
            'password.required'=>'El campo contraseña es obligatorio.',
            'password.min'=>'La contraseña debe contener más de 8 caracteres',
            'password_confirmation.required'=>'El campo confirmar contraseña es obligatorio.',
            'password_confirmation.same'=>'La confirmacion de contraseña y la contraseña deben coincidir.',
            'servicios.required'=>'Debe agregar un servicio'
        ]);

        try {
            if ($validator->fails()) {
                return response()->json([
                    'status' => 401,
                    'validation_errors' => $validator->errors()
                ]);
            } else {
                $user = new User();
                $user->id = $request->id;
                $user->primer_nombre = $request->primer_nombre;
                $user->segundo_nombre = $request->segundo_nombre;
                $user->primer_apellido = $request->primer_apellido;
                $user->segundo_apellido =  $request->segundo_apellido;
                $user->telefono = $request->telefono;
                $user->direccion = $request->direccion;
                $user->email = $request->email;
                $user->password = Hash::make($request->password);

                //busqueda de cedula
                $cedulaBuscada = is_null(User::find($user->id)) ? $cedulaBuscada = null : $cedulaBuscada = User::find($user->id);
                if ($cedulaBuscada == null) {
                    $user->save();
                    $user->roles()->attach([$request->rol]);
                    foreach ($request->servicios as $servicio) {
                        $user->servicios()->attach([$servicio]);
                    }
                    return response()->json([
                        'status' => 200,
                        'message' => 'Guardado con éxito!',
                        'empleados' => $this->index()

                    ]);
                } else {

                    return response()->json([
                        'status' => 201,
                        'message' => 'El usuario ya se encuentra registrado'
                    ]);
                }
            }
        } catch (Exception $ex) {
            return response()->json([
                'excepcion' => $ex
            ]);
        }
    }

    public function index()
    {
        $empleados = array();
        foreach (User::all() as $usuario) {
            foreach (json_decode($usuario->roles) as $rol) {
                if ($rol->nombre != "Administrador") {
                    array_push($empleados, $usuario);
                }
            }
        }
        return $empleados;
    }



    public function show($id)
    {   $rol= 0;
        $empleado = User::findOrFail($id);
        foreach($empleado->roles as $rolEmpleado){
            $rol=$rolEmpleado->id;
        }
        return response()->json([
            'empleado' => $empleado,
            'password' => $empleado->password,
            'rol' => $rol,
            'servicios'=>$empleado->servicios
        ]);
    }


    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'primer_nombre' => 'required|regex:/^[\pL\s\-]+$/u',
            'segundo_nombre' => 'regex:/^[\pL\s\-]+$/u',
            'primer_apellido' => 'required|regex:/^[\pL\s\-]+$/u',
            'segundo_apellido' => 'required|regex:/^[\pL\s\-]+$/u',
            'telefono' => 'required|numeric|between:1000000000,9999999999',
            'direccion' => 'required',
            'servicios' => "required|array|min:1",
            'email' => 'required|email',
            'password' => 'required|min:8',
            'password_confirmation' => 'required|same:password',
            'rol' => 'required'
        ],[
            'password.required'=>'El campo contraseña es obligatorio.',
            'password.min'=>'La contraseña debe contener más de 8 caracteres',
            'password_confirmation.required'=>'El campo confirmar contraseña es obligatorio.',
            'password_confirmation.same'=>'La confirmacion de contraseña y la contraseña deben coincidir.'
        ]);
        try {
            if ($validator->fails()) {
                return response()->json([
                    'status' => 401,
                    'validation_errors' => $validator->errors()
                ]);
            } else {
                $empleado = User::findOrFail($request->id);
                $empleado->id = $request->id;
                $empleado->primer_nombre = $request->primer_nombre;
                $empleado->segundo_nombre = $request->segundo_nombre;
                $empleado->primer_apellido = $request->primer_apellido;
                $empleado->segundo_apellido = $request->segundo_apellido;
                $empleado->telefono = $request->telefono;
                $empleado->direccion = $request->direccion;
                $empleado->email = $request->email;
                $empleado->password = $request->password;
                $empleado->save();
                $empleado->roles()->sync([$request->rol]);
                $empleado->servicios()->sync($request->servicios);
                return response()->json([
                    'status' => 200,
                    'message' => 'El Usuario ' . $empleado->primer_nombre . " " . $empleado->segundo_nombre . " ha sido editado.",
                    'empleados' => $this->index()
                ]);
            }
        } catch (Exception $ex) {
            return response()->json([
                'excepcion' => $ex
            ]);
        }
    }


    public function destroy($id)
    {
        $empleado = User::destroy($id);
        return $empleado;
    }
}

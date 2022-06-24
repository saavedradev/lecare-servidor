<?php

use App\Http\Controllers\Api\Administrador\CitaController;
use App\Http\Controllers\Api\Administrador\ClienteController;
use App\Http\Controllers\Api\Administrador\EmpleadoController;
use App\Http\Controllers\Api\Administrador\ServicioController;
use App\Http\Controllers\Api\PermisoController;
use App\Http\Controllers\Api\userController;
use App\Http\Controllers\Api\Cliente\CitaClienteController;
use App\Http\Controllers\Api\Empleado\HistorialMedicoController;
use App\Http\Controllers\Api\Empleado\JornadaEmpleadoController;
use App\Http\Controllers\Api\Empleado\PermisoEmpleadoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('register', [ClienteController::class,'register']);
Route::post('login', [userController::class,'login']);
Route::get('/buscarCliente/{id}', [userController::class,'buscarCliente']);
Route::get('/buscarUser/{id}', [userController::class,'buscarUser']);
Route::post('logout', [userController::class,'logout'])->middleware('auth:sanctum');


Route::controller(ClienteController::class)->group(function(){
    Route::get('/clientes','index');
    Route::get('/cliente/{id}','show');
    Route::put('/cliente/{id}','update');
    Route::delete('/cliente/{id}','destroy');
  });

  Route::controller(ServicioController::class)->group(function(){
    Route::post('/servicio','register');
    Route::get('/servicios','index');
    Route::get('/servicio/{id}','show');
    Route::put('/servicio/{id}','update');
    Route::delete('/servicio/{id}','destroy');
  });

  Route::controller(EmpleadoController::class)->group(function(){
    Route::post('/empleado','register');
    Route::get('/empleados','index');
    Route::get('/empleado/{id}','show');
    Route::put('/empleado/{id}','update');
    Route::delete('/empleado/{id}','destroy');
  });

  Route::controller(CitaController::class)->group(function(){
    Route::post('/cita','register');
    Route::get('/citas','index');
    Route::get('/citas/{id}','indexDay');
    Route::get('/cita/{id}','show');
    Route::put('/cita/{id}','update');
    Route::delete('/cita/{id}','destroy');
  });

  Route::controller(PermisoController::class)->group(function(){
    //Route::post('/permiso','register');
    Route::get('/permisos','index');
    Route::get('/permiso/{id}','show');
    Route::put('/permiso/{id}','update');
    // Route::delete('/permiso/{id}','destroy');
  });

  Route::controller(CitaClienteController::class)->group(function(){
    Route::post('/citaCliente','register');
    Route::get('/citasCliente/{id}','listadoCitasCliente');
    Route::get('/citaCliente/{id}','show');
    Route::put('/citaCliente/{id}','update');
    Route::delete('/citaCliente/{id}','destroy');
  });

  Route::controller(PermisoEmpleadoController::class)->group(function(){
    Route::post('/permisoEmpleado','register');
    Route::get('/permisosEmpleado/{id}','index');
    Route::get('/permisoEmpleado/{id}','show');
    Route::put('/permisoEmpleado/{id}','update');
    Route::delete('/permisoEmpleado/{id}','destroy');
  });

  Route::controller(JornadaEmpleadoController::class)->group(function(){
    Route::get('/jornadaCitas/{id}','index');
    Route::post('/jornadaCitasDia','indexDay');
    Route::get('/jornadaDetalleCita/{id}','show');
  });

  Route::controller(HistorialMedicoController::class)->group(function(){
    Route::post('/historial','register');
    Route::get('/historialCliente/{id}','buscarCliente');
    Route::get('/historiales/{id}','index');
    Route::get('/historial/{id}','show');
    Route::put('/historial/{id}','update');
    Route::delete('/historial/{id}','destroy');
  });


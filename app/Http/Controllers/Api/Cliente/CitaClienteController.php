<?php

namespace App\Http\Controllers\Api\Cliente;

use App\Http\Controllers\Api\Administrador\CitaController;
use DateTime;
use DateTimeZone;
use Carbon\Carbon;
use App\Models\Cita;
use App\Models\Cliente;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use phpDocumentor\Reflection\Element;
use Illuminate\Support\Facades\Validator;
use function PHPUnit\Framework\returnSelf;

class CitaClienteController extends Controller
{

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fecha' => 'required',
            'horario' => 'required',
            'servicios' => 'required|array|min:1'
        ],[
            'servicios.required'=>'Debe agregar un servicio'
        ]);

        try {
            $listadoCitas= new CitaController();
            $citas = $listadoCitas->index();
            $citasRepetida = false;
            $fechaActual = Carbon::now();

            $horarioObtenido = Carbon::parse($request->horario);
            $horaCitaObtenida = $horarioObtenido->format('g:i A');

            foreach ($citas as $cita) {
                if ($cita->horario == $horaCitaObtenida && $cita->fecha == $request->fecha) {
                    $citasRepetida = true;
                }
            }

            if ($validator->fails()) {
                return response()->json([
                    'status' => 401,
                    'validation_errors' => $validator->errors()
                ]);
            } else if ($fechaActual->gt($request->fecha)) {
                return response()->json([
                    'status' => 500,
                    'message' => "La fecha debe ser mayor a la actual"
                ]);
            } else if ($citasRepetida == true) {
                return response()->json([
                    'status' => 305,
                    'message' => "La cita ya se encuentra agendada"
                ]);
            } else {
                $cita = new Cita();
                $cita->estado_cita = "Falta confirmar";
                $cita->estado_pago = "pendiente";
                $cita->fecha = $request->fecha;
                $cita->horario = $request->horario;
                $cliente = Cliente::findOrFail($request->cedula_cliente);
                $cita->cliente()->associate($cliente);
                $cita->save();
                foreach ($request->servicios as $servicio) {
                    $cita->servicios()->attach([$servicio]);
                }
                return response()->json([
                    'status' => 200,
                    'message' => 'Guardado con éxito!',
                    'citas' => $this->listadoCitasCliente($request->cedula_cliente)
                ]);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'excepcion' => $th

            ]);
            //throw $th;
        }
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function listadoCitasCliente($id)
    {

        $citas = array();
        $Object = new DateTime();
        $Object->setTimezone(new DateTimeZone('America/Bogota'));
        $fecha=$Object->format("d-m-Y");
        $time = $Object->format("h:i:s");
        foreach (Cita::all() as $cita) {
            if (($cita->cliente->id == $id && $cita->fecha > $fecha && $cita->horario > $time)) {
                $hora = Carbon::parse($cita->horario);
                $horaCita = $hora->format('g:i A');
                $cita->horario = $horaCita;
                array_push($citas, $cita);
            }
        }
        return $citas;
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Cita  $cita
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $cita = Cita::findOrFail($id);
        return response()->json([
            'cita' => $cita,
            'servicios' => $cita->servicios
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Cita  $cita
     * @return \Illuminate\Http\Response
     */
    public function edit(Cita $cita)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Cita  $cita
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fecha' => 'required',
            'horario' => 'required',
            'servicios' => 'required|array|min:1'
        ],[
            'servicios.required'=>'Debe agregar un servicio'
        ]);

        try {
            $listadoCitas= new CitaController();
            $citas = $listadoCitas->index();
            $citasRepetida = false;

            $fechaActual = Carbon::now();
            $horarioObtenido = Carbon::parse($request->horario);
            $horaCitaObtenida = $horarioObtenido->format('g:i A');

            foreach ($citas as $cita) {
                if ($cita->horario == $horaCitaObtenida && $cita->fecha == $request->fecha && $cita->id != $request->id) {
                    $citasRepetida = true;
                }
            }

            if ($validator->fails()) {
                return response()->json([
                    'status' => 401,
                    'validation_errors' => $validator->errors()
                ]);
            } else if ($fechaActual->gt($request->fecha)) {
                return response()->json([
                    'status' => 500,
                    'message' => "La fecha debe ser mayor a la actual"
                ]);
            } else if ($citasRepetida == true) {
                return response()->json([
                    'status' => 305,
                    'message' => "La cita ya se encuentra agendada"
                ]);
            } else {
                $cita = Cita::findOrFail($request->id);
                $cita->fecha = $request->fecha;
                $cita->horario = $request->horario;
                $cita->save();
                $cita->servicios()->sync($request->servicios);
                return response()->json([
                    'status' => 200,
                    'message' => 'La cita ' . $request->codigo . ' ha sido editada',
                    'citas' => $this->listadoCitasCliente($cita->cliente->id)


                ]);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'excepcion' => $th

            ]);
            //throw $th;
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Cita  $cita
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $empleado = Cita::destroy($id);
        return $empleado;
    }
}

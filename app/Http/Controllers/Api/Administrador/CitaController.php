<?php

namespace App\Http\Controllers\Api\Administrador;

use Carbon\Carbon;
use App\Models\Cita;
use App\Models\Cliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use phpDocumentor\Reflection\Element;
use Illuminate\Support\Facades\Validator;

use function PHPUnit\Framework\returnSelf;

class CitaController extends Controller
{

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'cedula_cliente' => 'required',
            'estado_cita' => 'required',
            'estado_pago' => 'required',
            'fecha' => 'required',
            'horario' => 'required',
            'empleados' => 'required|array|min:1',
            'servicios' => 'required|array|min:1'
        ],[
            'cedula_cliente'=>'El campo nombre cliente es obligatorio.',
            'empleados'=>'Debe agregar un empleado',
            'servicios'=>'Dece agregar un servicio'
        ]);

        try {
            $citas = $this->index();
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
                $cita->estado_cita = $request->estado_cita;
                $cita->estado_pago = $request->estado_pago;

                $cita->fecha = $request->fecha;
                $cita->horario = $request->horario;
                $cliente = Cliente::findOrFail($request->cedula_cliente);
                $cita->cliente()->associate($cliente);
                $cita->save();
                foreach ($request->servicios as $servicio) {
                    $cita->servicios()->attach([$servicio]);
                }
                foreach ($request->empleados as $empleado) {
                    $cita->empleados()->attach([$empleado]);
                }

                return response()->json([
                    'status' => 200,
                    'message' => 'Guardado con éxito!',
                    'citas' => $this->index()


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

    public function index()
    {

        $citas = array();
        foreach (Cita::all() as $cita) {
            if (isset($cita->cliente)) {
                    $hora = Carbon::parse($cita->horario);
                    $horaCita = $hora->format('g:i A');
                    $cita->horario = $horaCita;
                    array_push($citas, $cita);
             }

        }
        return $citas;
    }

    public function indexDay($id)
    {
        $citas = array();
        foreach (Cita::all() as $cita) {
            if ($cita->fecha == $id) {
                if (isset($cita->cliente)) {
                    $hora = Carbon::parse($cita->horario);
                    $horaCita = $hora->format('g:i A');
                    $cita->horario = $horaCita;
                    array_push($citas, $cita);
                }
            }
        }

        return response()->json([
            'citas' => $citas,
            'id' => $id
        ]);
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
        $clienteBuscado = "";
        $idcliente = 0;
        $cita = Cita::findOrFail($id);
        $clienteBuscado = $cita->cliente->primer_nombre . " " .$cita->cliente->segundo_nombre . " " . $cita->cliente->primer_apellido . " " . $cita->cliente->segundo_apellido;
        $idcliente = $cita->cliente->id;


        return response()->json([
            'cita' => $cita,
            'cliente' => $clienteBuscado,
            'servicios' => $cita->servicios,
            'empleados' => $cita->empleados,
            'clienteCedula' => $idcliente
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
            'estado_cita' => 'required',
            'estado_pago' => 'required',
            'fecha' => 'required',
            'horario' => 'required',
            'empleados' => 'required|array|min:1',
            'servicios' => 'required|array|min:1'
        ],[
            'empleados'=>'Debe agregar un empleado',
            'servicios'=>'Dece agregar un servicio'
        ]);

        try {
            $citas = $this->index();
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
                $cita->estado_cita = $request->estado_cita;
                $cita->estado_pago = $request->estado_pago;
                $cita->fecha = $request->fecha;
                $cita->horario = $request->horario;
                $cita->save();
                $cita->servicios()->sync($request->servicios);
                $cita->empleados()->sync($request->empleados);
                return response()->json([
                    'status' => 200,
                    'message' => 'La cita ' . $request->codigo . ' ha sido editada',
                    'citas' => $this->index()


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

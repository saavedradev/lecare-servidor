<?php

namespace App\Http\Controllers\Api\Empleado;

use Exception;
use App\Models\Cliente;
use App\Models\Antecedente;
use Illuminate\Http\Request;
use App\Models\HistorialMedico;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class HistorialMedicoController extends Controller
{

    public function register(Request $request)
    {
        date_default_timezone_set('America/Bogota');
        $fechaActual = date('m-d-Y ', time());
        $validator = Validator::make($request->all(), [
            'fecha' => 'required|date',
            'motivo' => 'required',
            'diagnostico' => 'required',
            'patologicos' => 'required',
            'quirurgicos' => 'required',
            'traumaticos' => 'required',
            'toxicos' => 'required',
            'farmacologicos' => 'required',
            'familiares' => 'required',
            'alergicos' => 'required',
            'fur' => 'required',
            'alimentacion' => 'required',
            'peso' => 'required',
            'talla' => 'required',
            'orl' => 'required',
            'cuello' => 'required',
            'cardio' => 'required',
            'abdomen' => 'required',
            'extremidades' => 'required',
            'presion_arterial' => 'required',
            'presión_arterial_sistolica' => 'required',
            'pulso' => 'required',
            'frecuencia_respiratoria' => 'required'

        ]);

        try {
            if ($validator->fails()) {
                return response()->json([
                    'status' => 401,
                    'validation_errors' => $validator->errors()
                ]);
            } else if ($request->fecha < $fechaActual) {
                return response()->json([
                    'status' => 306,
                    'message' => "La fecha debe ser mayor a la actual"
                ]);
            } else {
                $historialMedico = new HistorialMedico();
                $historialMedico->fecha = $request->fecha;
                $historialMedico->motivo = $request->motivo;
                $historialMedico->diagnostico = $request->diagnostico;

                $cliente = Cliente::findOrFail($request->cedula);
                $historialMedico->cliente()->associate($cliente);
                $historialMedico->save();
                $historialMedico->antecedente()->create([
                    'patologicos' => $request->patologicos,
                    'quirurgicos' => $request->quirurgicos,
                    'traumaticos' => $request->traumaticos,
                    'toxicos' => $request->toxicos,
                    'farmacologicos' => $request->farmacologicos,
                    'familiares' => $request->familiares,
                    'alergicos' => $request->alergicos,
                    'fur' => $request->fur,
                    'alimentacion' => $request->alimentacion
                ]);
                $historialMedico->signoVital()->create([
                    'presion_arterial' => $request->presion_arterial,
                    'presión_arterial_sistolica' => $request->presión_arterial_sistolica,
                    'pulso' => $request->pulso,
                    'frecuencia_respiratoria' => $request->frecuencia_respiratoria,
                ]);
                $historialMedico->examenFisico()->create([
                    'peso' => $request->peso,
                    'talla' => $request->talla,
                    'orl' => $request->orl,
                    'cuello' => $request->cuello,
                    'cardio' => $request->cardio,
                    'abdomen' => $request->abdomen,
                    'extremidades' => $request->extremidades,
                ]);
                return response()->json([
                    'status' => 200,
                    'historialMedicos' => $this->index($request->cedula),
                    'message' => "El historialMedico ha sido creado"
                ]);
            }
        } catch (Exception $ex) {
            return response()->json([
                'excepcion' => print_r($ex)
            ]);
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $historialesMedicos = array();
        foreach (HistorialMedico::all() as $historialMedico) {
            if ($historialMedico->cliente->id == $id) {
                array_push($historialesMedicos, $historialMedico);
            }
        }

        return $historialesMedicos;
    }

    public function buscarCliente($id)
    {
        $cliente = Cliente::find($id);
        return response()->json([
            'nombre' => $cliente->primer_nombre . " " . $cliente->segundo_nombre . " " . $cliente->primer_apellido . " " . $cliente->segundo_apellido,
            'telefono' => $cliente->telefono
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\HistorialMedico  $historialMedico
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $historial = "";
        foreach (HistorialMedico::all() as $historialEncontrado) {
            if ($historialEncontrado->id == $id) {
                if (isset($historialEncontrado->cliente)) {
                $historial= $historialEncontrado;
                }
            }
        }
        return response()->json([
            'historial'=>$historial,
            'antecedente'=>$historial->antecedente,
            'examenFisico'=>$historial->examenFisico,
            'signoVital'=>$historial->signoVital
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\HistorialMedico  $historialMedico
     * @return \Illuminate\Http\Response
     */
    public function edit(HistorialMedico $historialMedico)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\HistorialMedico  $historialMedico
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        date_default_timezone_set('America/Bogota');
        $fechaActual = date('m-d-Y ', time());
        $validator = Validator::make($request->all(), [
            'fecha' => 'required|date',
            'motivo' => 'required',
            'diagnostico' => 'required',
            'patologicos' => 'required',
            'quirurgicos' => 'required',
            'traumaticos' => 'required',
            'toxicos' => 'required',
            'farmacologicos' => 'required',
            'familiares' => 'required',
            'alergicos' => 'required',
            'fur' => 'required',
            'alimentacion' => 'required',
            'peso' => 'required',
            'talla' => 'required',
            'orl' => 'required',
            'cuello' => 'required',
            'cardio' => 'required',
            'abdomen' => 'required',
            'extremidades' => 'required',
            'presion_arterial' => 'required',
            'presión_arterial_sistolica' => 'required',
            'pulso' => 'required',
            'frecuencia_respiratoria' => 'required'

        ]);

        try {
            if ($validator->fails()) {
                return response()->json([
                    'status' => 401,
                    'validation_errors' => $validator->errors()
                ]);
            } else if ($request->fecha < $fechaActual) {
                return response()->json([
                    'status' => 306,
                    'message' => "La fecha debe ser mayor a la actual"
                ]);
            } else {
                $historialMedico = HistorialMedico::findOrFail($id);
                $historialMedico->fecha = $request->fecha;
                $historialMedico->motivo = $request->motivo;
                $historialMedico->diagnostico = $request->diagnostico;
                $historialMedico->save();
                $historialMedico->antecedente()->rawUpdate([
                    'patologicos' => $request->patologicos,
                    'quirurgicos' => $request->quirurgicos,
                    'traumaticos' => $request->traumaticos,
                    'toxicos' => $request->toxicos,
                    'farmacologicos' => $request->farmacologicos,
                    'familiares' => $request->familiares,
                    'alergicos' => $request->alergicos,
                    'fur' => $request->fur,
                    'alimentacion' => $request->alimentacion
                ]);
                $historialMedico->signoVital()->rawUpdate([
                    'presion_arterial' => $request->presion_arterial,
                    'presión_arterial_sistolica' => $request->presión_arterial_sistolica,
                    'pulso' => $request->pulso,
                    'frecuencia_respiratoria' => $request->frecuencia_respiratoria,
                ]);
                $historialMedico->examenFisico()->rawUpdate([
                    'peso' => $request->peso,
                    'talla' => $request->talla,
                    'orl' => $request->orl,
                    'cuello' => $request->cuello,
                    'cardio' => $request->cardio,
                    'abdomen' => $request->abdomen,
                    'extremidades' => $request->extremidades,
                ]);
                return response()->json([
                    'status' => 200,
                    'historialMedicos' => $this->index($request->cedula),
                    'message' => "El historial Medico ha sido editado"
                ]);
            }
        } catch (Exception $ex) {
            return response()->json([
                'excepcion' => print_r($ex)
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\HistorialMedico  $historialMedico
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $historial= HistorialMedico::destroy($id);
        return $historial;
    }
}

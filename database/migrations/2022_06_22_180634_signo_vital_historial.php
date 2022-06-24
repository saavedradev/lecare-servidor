<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('signos_vitales', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('presion_arterial');
            $table->string('presión_arterial_sistolica');
            $table->string('pulso');
            $table->string('frecuencia_respiratoria');
            $table->unsignedBigInteger('historial_id');
            $table->foreign('historial_id')->references('id')->on('historial_medicos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};

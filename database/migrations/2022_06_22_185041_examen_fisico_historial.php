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
        Schema::create('examenes_fisicos', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('peso');
            $table->string('talla');
            $table->string('orl');
            $table->string('cuello');
            $table->string('cardio');
            $table->string('abdomen');
            $table->string('extremidades');
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

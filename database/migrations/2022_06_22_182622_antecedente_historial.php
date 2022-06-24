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
        Schema::create('antecedentes', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('patologicos');
            $table->string('quirurgicos');
            $table->string('traumaticos');
            $table->string('toxicos');
            $table->string('farmacologicos');
            $table->string('familiares');
            $table->string('alergicos');
            $table->string('fur');
            $table->string('alimentacion');
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

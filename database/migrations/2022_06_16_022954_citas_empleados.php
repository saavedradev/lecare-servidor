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
        Schema::create('citas_empleados', function (Blueprint $table) {
            $table->foreignId('cita_id')->constrained('citas')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('user_id')->constrained('users');
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

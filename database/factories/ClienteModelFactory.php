<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Foundation\Testing\RefreshDatabase;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ClienteModel>
 */
class ClienteModelFactory extends Factory
{
    use RefreshDatabase;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
                'identificacion'=> $this->faker->numberBetween(100000000,1000000000),
                'nombres'=> $this->faker->name(),
                'apellidos'=> $this->faker->name(),
                'celular'=> $this->faker->numberBetween(3100000000,3999999999),
                'correo'=> $this->faker->name(),
                'password'=> $this->faker->name()
        ];
    }
}

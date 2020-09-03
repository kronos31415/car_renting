<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Bookable;
use Faker\Generator as Faker;
use Illuminate\Support\Arr;

$sufixes = [
    'BMW seria 5',
    'Porshe Boxter',
    'Audi RS 3 :)',
    'Audi RS 5',
    'Audi A6 SEDAN 2015 r',
    'Audi A3 moja perelka'
];

$factory->define(Bookable::class, function (Faker $faker) use ($sufixes){
    return [
        'title' => $faker->name() . ' ' . Arr::random($sufixes),
        'description' => $faker->text(40),
    ];
});

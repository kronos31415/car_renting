<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Review;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(Review::class, function (Faker $faker) {
    return [
        'id' =>Str::uuid(),
        'content' => $faker->sentence(3, true),
        'review' => random_int(1, 5)
    ];
});

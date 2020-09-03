<?php

use Illuminate\Database\Seeder;
use App\Bookable;

class BookableTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Bookable::class, 50)->create();
    }
}

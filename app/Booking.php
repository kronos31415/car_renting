<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $filable = ['from', 'to'];
    public function bookable() {
        return $this->belongsTo(Bookable::class);
    }
}

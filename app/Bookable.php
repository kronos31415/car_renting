<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bookable extends Model
{
    public function reviews() {
        return $this->hasMany(Review::class);
    }
    public function bookings() {
        return $this->hasMany(Booking::class);
    }

    public function checkAvailability($from, $to): bool {
        return 0 == $this->bookings()->betweenDates($from, $to)->count();
    }
}

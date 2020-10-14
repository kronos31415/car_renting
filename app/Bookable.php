<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

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

    public function priceFor($from, $to): array
    {
        $days = (new Carbon($to))->diffInDays(new Carbon($from)) + 1;
        $price = $this->price * $days;

        return [
            'price' => $price,
            'breakdown' => [
                $this->price => $days
            ]
        ];
    }
}

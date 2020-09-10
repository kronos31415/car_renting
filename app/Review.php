<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    public function bookalbe() {
        return $this->belongsTo(Bookable::class);
    }
    public function booking() {
        return $this->belongsTo(Booking::class);
    }
    public function getIncrementing()
    {
        return false;
    }

    public function getKeyType()
    {
        return 'string';
    }
}
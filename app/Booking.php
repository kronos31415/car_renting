<?php

namespace App;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $filable = ['from', 'to'];

    public function review() {
        return $this->hasOne(Review::class);
    }
    public function bookable() {
        return $this->belongsTo(Bookable::class);
    }

    public function scopeBetweenDates(Builder $query,$from, $to) {
        return $query->where('from', '<=', $to)
                    ->where('to', '>=', $from);
    }

    public static function findByReviewKey(string $id):? Booking {
        return static::where('review_key', $id)->with('bookable')->get()->first();
    } 

    public static function boot() {
        parent::boot();
        static::creating(function(Booking $booking) {
            $booking->review_key = Str::uuid();
        });
    }
}

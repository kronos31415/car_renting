<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Booking;
use App\Http\Resources\BookingByReviewShowResources;

class BookingByReviewController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke($reviewKey, Request $request)
    {
        $booking = Booking::findByReviewKey($reviewKey);
        return $booking ? new BookingByReviewShowResources($booking) : abort(404);
    }
}

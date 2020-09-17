<?php

use Illuminate\Http\Request;
use App\Bookable;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('bookables', 'Api\BookableController@index');

// Route::get('bookables/{id}', 'Api\BookableController@show');

Route::apiResource('bookables', 'Api\BookableController')->only(['index', 'show']);

Route::get('bookables/{id}/availability', 'Api\AvailabilityController')->name('bookables.availability');

Route::get('bookables/{bookable}/reviews', 'Api\BookableReviewConroller')->name('bookables.reviews');

Route::get('booking-by-review/{reviewKey}', 'Api\BookingByReviewController')->name('booking.by-review.show');

Route::apiResource('reviews', 'Api\ReviewController')->only(['show']);
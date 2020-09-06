<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Bookable;

class AvailabilityController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, $id)
    {
        
        $dataReturn = $request->validate([
            'from' => 'required|date_format:Y-m-d|after_or_equal:now',
            'to' => 'required|date_format:Y-m-d|after_or_equal:from',
        ]);

        $bookable = Bookable::findOrFail($id);
        $availability = $bookable->checkAvailability($dataReturn['from'], $dataReturn['to'])
            ? response()->json([])
            : response()->json([], 404); 
        return $availability;
    }
}

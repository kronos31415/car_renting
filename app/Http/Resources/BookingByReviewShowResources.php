<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BookingByReviewShowResources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'booking_id' => $this->id,
            'from' => $this->from,
            'to' => $this->to,
            'bookable' => new BookingByReviewBookableShowResources($this->bookable)
        ];
    }
}

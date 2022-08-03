<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payments extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaction_id',
        'payment_status',
        'pay_amount',
        'gateway_response',
        'order_id'
    ];
}

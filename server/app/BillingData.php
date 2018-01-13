<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BillingData extends Model
{
    protected $table = 'billing_data';

    protected $guarded = ['id'];
}

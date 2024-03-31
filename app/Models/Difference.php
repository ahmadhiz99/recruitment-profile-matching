<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Difference extends Model
{
    use HasFactory;
    protected $table = 'differences';

    public function problem()
    {
        return $this->belongsTo(Problem::class);
    }
}

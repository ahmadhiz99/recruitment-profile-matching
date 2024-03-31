<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aspect extends Model
{
    use HasFactory;
    protected $table = 'aspects';

    public function criterias()
    {
        return $this->hasMany(Criteria::class);
    }

    public function problem()
    {
        return $this->belongsTo(Problem::class);
    }
}

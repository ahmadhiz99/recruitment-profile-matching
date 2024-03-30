<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Problem extends Model
{
    use HasFactory;
    protected $table = 'problems';

    public function factories()
    {
        return $this->hasMany(Factory::class)->with('aspects');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Factory extends Model
{
    use HasFactory;
    protected $table = 'factories';

    public function problem()
    {
        return $this->belongsTo(Problem::class);
    }

    public function aspects()
    {
        return $this->hasMany(Aspect::class)->with('criterias');
    }
}

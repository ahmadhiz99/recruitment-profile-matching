<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Criteria extends Model
{
    use HasFactory;
    protected $table = 'criterias';

    public function aspect()
    {
        return $this->belongsTo(Aspect::class);
    }

    public function participantCriterias()
    {
        return $this->hasMany(ParticipantCriteria::class);
    }
}

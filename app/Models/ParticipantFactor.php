<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParticipantFactor extends Model
{
    use HasFactory;

    protected $table = 'participant_factors';

    public function participant()
    {
        return $this->belongsTo(Participant::class);
    }

    public function aspect()
    {
        return $this->belongsTo(Aspect::class);
    }
}

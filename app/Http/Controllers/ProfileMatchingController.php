<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ParticipantCriteria;

class ProfileMatchingController extends Controller
{
    public function storeParticipantCriterias(Request $request)
    {
        foreach ($request->data as $aspectId => $criteriaData) {
            // return $criteriaData['value'];
            $participantCriteria = new ParticipantCriteria();
            $participantCriteria->participant_id = $criteriaData['participant_id'];
            $participantCriteria->criteria_id = $criteriaData['criteria_id'];
            $participantCriteria->value = $criteriaData['value'];
            $participantCriteria->note = $criteriaData['note'];
            $participantCriteria->save();
        }
        return redirect()->back();
    }

    public function updateParticipantCriteria(Request $request)
    {
        foreach ($request->data as $aspectId => $criteriaData) {
            // return $criteriaData['value'];
            $participantCriteria = ParticipantCriteria::find($criteriaData['id']);
            $participantCriteria->participant_id = $criteriaData['participant_id'];
            $participantCriteria->criteria_id = $criteriaData['criteria_id'];
            $participantCriteria->value = $criteriaData['value'];
            $participantCriteria->note = $criteriaData['note'];
            $participantCriteria->save();
        }
        return redirect()->back();
    }
}

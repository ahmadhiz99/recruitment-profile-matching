<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ParticipantCriteria;

class ProfileMatchingController extends Controller
{
    public function gap(Request $request)
    {
        $aspects = $request->data['aspects'];
        foreach ($aspects as $key => $aspect) {
            $data = $aspect['criterias'];
            foreach ($data as $key => $critria) {
                $participantCriteria = new ParticipantCriteria();
                $participantCriteria->participant_id = $critria['participant_id'];
                $participantCriteria->criteria_id = $critria['criteria_id'];
                $participantCriteria->value = $critria['value'];
                $participantCriteria->note = $critria['note'];
                $participantCriteria->save();
            }
        }
        return redirect()->back();
    }
}

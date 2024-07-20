<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use Illuminate\Http\Request;
use App\Models\ParticipantCriteria;
use App\Models\Problem;
use App\Models\ParticipantFactor;
use App\Models\ParticipantTotal;

class ProfileMatchingController extends Controller
{
    public function start()
    {
        // 1. set nilai gap untuk setiap nilai partisipan dari job yang dipilih
        $job = Problem::with('participants', 'aspects', 'aspects.criterias', 'participants.participantCriterias')->find(request()->problem_id);
        foreach ($job->aspects as $keyAspect => $aspect) {
            foreach ($aspect->criterias as $keyCriteria => $criteria) {
                foreach ($job->participants as $keyParticipant => $participant) {
                    foreach ($participant->participantCriterias as $keyPc => $pc) {
                        $getPc = ParticipantCriteria::find($pc->id);
                        $getPc->gap = $getPc->value - $criteria->value;
                        $getPc->save();
                    }
                }
            }
        }

        // 2. pembobotan nilai gap terhadap nilai selisih
        $job = Problem::with('participants', 'aspects', 'differences', 'aspects.criterias', 'participants.participantCriterias')->find(request()->problem_id);
        foreach ($job->aspects as $keyAspect => $aspect) {
            foreach ($aspect->criterias as $keyCriteria => $criteria) {
                foreach ($job->participants as $keyParticipant => $participant) {
                    foreach ($participant->participantCriterias as $keyPc => $pc) {
                        foreach ($job->differences as $keyDifference => $difference) {
                            if ($difference->difference == $pc->gap) {
                                $getPc = ParticipantCriteria::find($pc->id);
                                $getPc->bobot = $difference->value;
                                $getPc->save();
                            }
                        }
                    }
                }
            }
        }

        // 3. hitung core-factor dan secondary-factor per tiap partisipan
        $job = Problem::with('participants', 'aspects', 'aspects.participantFactors', 'participants.participantFactors', 'participants.participantFactors.aspect', 'aspects', 'differences', 'aspects.criterias', 'participants.participantCriterias', 'participants.participantCriterias.criteria')->find(request()->problem_id);

        foreach ($job->aspects as $aspect) {
            $sumByAspect[$aspect->id] = 0;
            $sumByAspect2[$aspect->id] = 0;
        }

        foreach ($job->participants as $participant) {
            if (count($participant->participantCriterias) > 0) {
                $criteriaCF = $aspect->criterias->filter(function ($criteria) {
                    return $criteria->factor === "CF";
                });
                $criteriaSF = $aspect->criterias->filter(function ($criteria) {
                    return $criteria->factor === "SF";
                });
                foreach ($participant->participantCriterias as $item) {
                    if ($item->criteria->factor === "CF") {
                        // Menambahkan bobot ke jumlah bobot yang sesuai dengan aspek_id untuk kriteria CF
                        $sumByAspect[$item->criteria->aspect_id] += $item->bobot;
                    }
                    if ($item->criteria->factor === "SF") {
                        // Menambahkan bobot ke jumlah bobot yang sesuai dengan aspek_id untuk kriteria SF
                        $sumByAspect2[$item->criteria->aspect_id] += $item->bobot;
                    }
                }
                //masukkan nilai CF dan SF partisipan ke database per-aspect
                foreach ($job->aspects as $aspect) {
                    $participantCf = new ParticipantFactor();
                    $participantCf->participant_id = $participant->id;
                    $participantCf->aspect_id = $aspect->id;
                    $participantCf->core_factor = $sumByAspect[$aspect->id] / count($criteriaCF);
                    $participantCf->secondary_factor = $sumByAspect2[$aspect->id] / count($criteriaSF);
                    $participantCf->save();

                    $sumByAspect[$aspect->id] = 0;
                    $sumByAspect2[$aspect->id] = 0;
                }
            }
        }

        // 4. hitung nilai total tiap partisipan berdasarkan aspect
        $job = Problem::with(
            'participants',
            'participants.participantFactors',
            'aspects',
        )->find(request()->problem_id);
        foreach ($job->participants as $keyParticipant => $participant) {
            foreach ($job->aspects as $keyAspect => $aspect) {
                foreach ($participant->participantFactors as $keyParFac => $parFac) {
                    if ($parFac->aspect_id == $aspect->id) {
                        $parTotal = new ParticipantTotal();
                        $parTotal->participant_id = $participant->id;
                        $parTotal->aspect_id = $aspect->id;
                        $parTotal->total = (($job->core_factor / 100) * $parFac->core_factor) + (($job->secondary_factor / 100) * $parFac->secondary_factor);
                        $parTotal->save();
                    }
                }
            }
        }

        // 5. hitung nilai ranking tiap partisipan
        $job = Problem::with(
            'participants',
            'participants.participantFactors',

            'participants.participantTotals.aspect',
            'aspects',
            'aspects.participantTotals',
        )->find(request()->problem_id);

        // Inisialisasi array untuk menyimpan jumlah total untuk setiap participant
        $sumByParticipant = [];

        foreach ($job->participants as $participant) {
            $sumTotal = 0;

            foreach ($participant->participantTotals as $parTot) {
                // Jumlahkan total untuk setiap participant_id
                $sumTotal += ($parTot->aspect->percentage / 100) * ($parTot->total);
            }

            // Tambahkan hasil total ke array
            $sumByParticipant[$participant->id] = $sumTotal;

            $participantRank = Participant::find($participant->id);
            if(request()->qualified_step == 1){
                $participantRank->final_qualified = $sumByParticipant[$participant->id];
            }else{
                $participantRank->final = $sumByParticipant[$participant->id];
            }
            $participantRank->save();
        }
    }

    public function storeParticipantCriterias(Request $request)
    {
        foreach ($request->data as $aspectId => $criteriaData) {
            // return $criteriaData['value'];
            $participantCriteria = new ParticipantCriteria();
            $participantCriteria->participant_id = $criteriaData['participant_id'];
            $participantCriteria->criteria_id = $criteriaData['criteria_id'];
            $participantCriteria->value = $criteriaData['value'];
            if(isset($criteriaData['note'])){
                $participantCriteria->note = $criteriaData['note'];
            }
            $participantCriteria->save();
        }
        return redirect()->back();
    }

    public function updateParticipantCriteria(Request $request)
    {
        foreach ($request->data as $aspectId => $criteriaData) {
            if(isset($criteriaData['id'])){
                 // return $criteriaData['value'];
                $participantCriteria = ParticipantCriteria::find($criteriaData['id']);
                $participantCriteria->participant_id = $criteriaData['participant_id'];
                $participantCriteria->criteria_id = $criteriaData['criteria_id'];
                $participantCriteria->value = $criteriaData['value'];
                if(isset($criteriaData['note'])){
                    $participantCriteria->note = $criteriaData['note'];
                }
                // $participantCriteria->note = $criteriaData['note'];
                $participantCriteria->save();
            }else{
                $participantCriteria = new ParticipantCriteria();
                $participantCriteria->participant_id = $criteriaData['participant_idx'];
                $participantCriteria->criteria_id = $criteriaData['criteria_idx'];
                $participantCriteria->value = $criteriaData['value'];
                if(isset($criteriaData['note'])){
                    $participantCriteria->note = $criteriaData['note'];
                }
                $participantCriteria->save();
            }
        }
        return redirect()->back();
    }
}

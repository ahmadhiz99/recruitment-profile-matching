<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Criteria;

class CriteriasController extends Controller
{
    public function store(Request $request)
    {
        $criteria = new Criteria();

        $criteria->criteria = $request->criteria;
        $criteria->code = $request->code;
        $criteria->value = $request->value;
        $criteria->aspect_id = $request->aspect_id;

        $criteria->save();
    }

    public function update(Request $request, $id)
    {
        $criteria = Criteria::find($id);

        $criteria->criteria = $request->criteria;
        $criteria->code = $request->code;
        $criteria->value = $request->value;
        $criteria->aspect_id = $request->aspect_id;

        $criteria->save();
    }

    public function delete($id)
    {
        $criteria = Criteria::find($id);
        $criteria->delete();
    }
}

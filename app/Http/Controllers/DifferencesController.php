<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Difference;

class DifferencesController extends Controller
{
    public function store(Request $request)
    {
        $difference = new Difference();

        $difference->difference = $request->difference;
        $difference->value = $request->value;
        $difference->description = $request->description;
        $difference->problem_id = $request->problem_id;

        $difference->save();
    }

    public function update(Request $request, $id)
    {
        $difference = Difference::find($id);

        $difference->difference = $request->difference;
        $difference->value = $request->value;
        $difference->description = $request->description;
        $difference->problem_id = $request->problem_id;

        $difference->save();
    }

    public function delete($id)
    {
        $difference = Difference::find($id);
        $difference->delete();
    }
}

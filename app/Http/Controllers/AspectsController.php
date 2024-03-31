<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Aspect;

class AspectsController extends Controller
{

    public function store(Request $request)
    {
        $aspect = new Aspect();

        $aspect->name = $request->name;
        $aspect->factor = $request->factor;
        $aspect->problem_id = $request->problem_id;

        $aspect->save();
    }

    public function update(Request $request, $id)
    {
        $aspect = Aspect::find($id);

        $aspect->name = $request->name;
        $aspect->factor = $request->factor;
        $aspect->problem_id = $request->problem_id;

        $aspect->save();
    }

    public function delete($id)
    {
        $aspect = Aspect::find($id);
        $aspect->delete();
    }
}

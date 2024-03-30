<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Aspect;

class AspectsController extends Controller
{
    public function index()
    {
        $aspects = Aspect::with('criterias')->get();
        return $aspects;
    }

    public function store(Request $request)
    {
        $aspect = new Aspect();

        $aspect->name = $request->name;
        $aspect->factory_id = $request->factory_id;

        $aspect->save();
    }

    public function update(Request $request, $id)
    {
        // return $request;
        $aspect = Aspect::find($id);

        $aspect->name = $request->name;
        $aspect->factory_id = $request->factory_id;

        $aspect->save();
    }

    public function delete($id)
    {
        $aspect = Aspect::find($id);
        $aspect->delete();
    }
}

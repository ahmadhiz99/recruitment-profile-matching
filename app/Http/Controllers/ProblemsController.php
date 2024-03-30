<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Problem;
use App\Models\Factory;

class ProblemsController extends Controller
{
    public function index()
    {
        $problems = Problem::with('factories')->orderBy('created_at', 'desc')->paginate(5);
        return Inertia::render('Problem/Problems', [
            'problems' => $problems
        ]);
    }

    public function create()
    {
        return Inertia::render('Problem/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|max:255',
            'status' => 'required',
            'created_by' => 'required',
            'core_factor' => 'required',
            'secondary_factor' => 'required'
        ]);

        $problem = new Problem();

        $problem->title = $request->title;
        $problem->description = $request->description;
        $problem->status = $request->status;
        $problem->created_by = $request->created_by;
        $problem->created_at = now();

        $problem->save();

        $coreFactor = new Factory();

        $coreFactor->type = 'core';
        $coreFactor->percent = $request->core_factor;
        $coreFactor->problem_id = $problem->id;
        $coreFactor->created_at = now();

        $secondaryFactor = new Factory();

        $secondaryFactor->type = 'secondary';
        $secondaryFactor->percent = $request->secondary_factor;
        $secondaryFactor->problem_id = $problem->id;
        $secondaryFactor->created_at = now();

        return redirect()->route('problem.index');
    }

    public function edit($id)
    {
        $problem = Problem::with('factories')->find($id);
        return Inertia::render('Problem/Edit', [
            'problem' => $problem
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|max:255',
            'status' => 'required',
            'created_by' => 'required',
            'core_factor' => 'required',
            'secondary_factor' => 'required'
        ]);

        $problem = Problem::with('factories')->find($id);

        $problem->title = $request->title;
        $problem->description = $request->description;
        $problem->status = $request->status;
        $problem->created_by = $request->created_by;
        $problem->created_at = now();

        $problem->save();

        $coreFactor = Factory::find($problem->factories[0]->id);
        $secondaryFactor = Factory::find($problem->factories[1]->id);

        $coreFactor->percent = $request->core_factor;
        $secondaryFactor->percent = $request->secondary_factor;

        $coreFactor->save();
        $secondaryFactor->save();

        return redirect()->route('problem.index');
    }

    public function delete($id)
    {
        $problem = Problem::find($id);
        $problem->delete();

        return redirect()->back();
    }
}

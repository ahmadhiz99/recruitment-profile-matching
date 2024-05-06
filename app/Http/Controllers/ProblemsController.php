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
        $problems = Problem::with('aspects')->orderBy('created_at', 'desc')->paginate(5);
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
        $problem->core_factor = $request->core_factor;
        $problem->secondary_factor = $request->secondary_factor;
        $problem->created_at = now();

        $problem->save();

    }

    public function edit($id)
    {
        $problem = Problem::with('aspects', 'differences', 'participants', 'participants.participantCriterias','participants.participantCriterias.criteria' )->find($id);
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

        $problem = Problem::find($id);

        $problem->title = $request->title;
        $problem->description = $request->description;
        $problem->status = $request->status;
        $problem->created_by = $request->created_by;
        $problem->core_factor = $request->core_factor;
        $problem->secondary_factor = $request->secondary_factor;
        $problem->updated_at = now();

        $problem->save();
    }

    public function delete($id)
    {
        $problem = Problem::find($id);
        $problem->delete();

        return redirect()->back();
    }
}

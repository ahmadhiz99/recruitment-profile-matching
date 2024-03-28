<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Problem;

class ProblemsController extends Controller
{
    public function index()
    {
        $problems = Problem::orderBy('created_at', 'desc')->paginate(5);
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
            'created_by' => 'required'
        ]);

        $problem = new Problem();

        $problem->title = $request->title;
        $problem->description = $request->description;
        $problem->status = $request->status;
        $problem->created_by = $request->created_by;
        $problem->created_at = now();

        $problem->save();

        return redirect()->route('problem.index');
    }

    public function edit($id)
    {
        $problem = Problem::find($id);
        return Inertia::render('Problem/Edit', [
            'problem' => $problem
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|max:255',
            'status' => 'required',
            'created_by' => 'required'
        ]);

        $problem = Problem::find($id);

        $problem->title = $request->title;
        $problem->description = $request->description;
        $problem->status = $request->status;
        $problem->created_by = $request->created_by;
        $problem->created_at = now();

        $problem->save();

        return redirect()->route('problem.index');
    }

    public function delete($id)
    {
        $problem = Problem::find($id);
        $problem->delete();

        return redirect()->back();
    }
}

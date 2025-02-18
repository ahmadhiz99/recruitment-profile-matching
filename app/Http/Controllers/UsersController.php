<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Participant;
use App\Models\Role;
use App\Models\Criteria;
use App\Models\Problem;
use App\Models\Aspect;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UsersController extends Controller
{
    public function dashboard()
    {
        $user = User::with('role')->where('role_id','=','3');
        $userCount = $user->count();
        
        $problem = Problem::all();
        $problemCount = $problem->count();

        $userCurr = User::where('id','=',auth()->user()->id);

        $problemCurr = Participant::where('user_id','=',auth()->user()->id);
        $problemCurrCount = $problemCurr->count();
        
        $aspect = Aspect::all();
        $aspectCount = $aspect->count();

        $criteria = Criteria::all();
        $criteriaCount = $criteria->count();

        $user = auth()->user()->cv;
        
        return Inertia::render('Dashboard', [
            'userCount' => $userCount,
            'problemCount' => $problemCount,
            'problemCurrCount' => $problemCurrCount,
            'aspectCount' => $aspectCount,
            'criteriaCount' => $criteriaCount,
            'userCurr' => $userCurr,
            'user' => $user,
        ]);
    }
    public function index()
    {
        $users = User::with('role')->where('role_id','=','3')->orderBy('created_at', 'desc')->paginate(5);
        return Inertia::render('User/Users', [
            'users' => $users
        ]);
    }

    public function create()
    {
        $roles = Role::all();
        return Inertia::render('User/Create', [
            'roles' => $roles
        ]);
    }

    public function store(Request $request)
    {
        $user = new User();

        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        // $user->role_id = $request->role_id;
        $user->role_id = 3; //Peserta
        $user->created_at = now();

        $user->save();

        return redirect()->route('user.index');
    }

    public function edit($id)
    {
        $user = User::with('role')->find($id);
        $roles = Role::all();
        return Inertia::render('User/Edit', [
            'user' => $user,
            'roles' => $roles
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);

        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->role_id = $request->role_id;
        $user->created_at = now();

        $user->save();

        return redirect()->route('user.index');
    }

    public function delete($id)
    {
        $user = User::find($id);
        $user->delete();
        return redirect()->back();
    }

    public function announcement(){
        $user = User::with('role')->where('role_id','=','3');
        $userCount = $user->count();
        
        $problem = Problem::all();

        $user = auth()->user()->cv;
        // dd($user);

        // $users = User::with('role')->orderBy('created_at', 'desc')->paginate(5);
        return Inertia::render('User/Announcement', [
            'users' => $user,
            'problem' => $problem,

        ]);

    }

    public function document(){
        $user = auth()->user()->qualified;
        $data = Problem::all();
        // $users = User::with('role')->orderBy('created_at', 'desc')->paginate(5);
        return Inertia::render('User/ApplicantDocument', [
            'users' => $user,
            'divisi'=>$data
        ]);

    }

    public function biodata(){
        $user = auth()->user()->qualified;
        $data = Problem::all();
        // $users = User::with('role')->orderBy('created_at', 'desc')->paginate(5);
        return Inertia::render('User/ApplicantBiodata', [
            'users' => $user,
            'divisi'=>$data
        ]);
    }

    public function update_document(Request $request, $id)
    {
        $user = User::find($id);
        // $data = file_get_contents($file->getRealPath());
        $file = $request->file('cv'); // Retrieve the uploaded file from the request
        $filename = $file->getClientOriginalName(); // Retrieve the original filename
        $filename_trim = str_replace(' ','_',$filename);
        $save = Storage::disk('local')->put('cv/'.$id.'/'.$filename_trim, file_get_contents($file));
        $user->cv = 'cv/'.$id.'/'.$filename_trim;
        $user->save();

        $file = $request->file('ijazah'); // Retrieve the uploaded file from the request
        $filename = $file->getClientOriginalName(); // Retrieve the original filename
        $filename_trim = str_replace(' ','_',$filename);
        $save = Storage::disk('local')->put('ijazah/'.$id.'/'.$filename_trim, file_get_contents($file));
        $user->ijazah = 'ijazah/'.$id.'/'.$filename_trim;
        $user->save();
        
        $file = $request->file('portofolio'); // Retrieve the uploaded file from the request
        $filename = $file->getClientOriginalName(); // Retrieve the original filename
        $filename_trim = str_replace(' ','_',$filename);
        $save = Storage::disk('local')->put('portofolio/'.$id.'/'.$filename_trim, file_get_contents($file));
        $user->portofolio = 'portofolio/'.$id.'/'.$filename_trim;
        $user->save();

        
        $participant = new Participant;
        $participant->user_id = auth()->user()->id;
        $participant->problem_id = $request->divisi;
        $participant->save();

        return redirect()->route('apply.appl_document');
    }

    public function update_biodata(Request $request, $id)
    {
        $user = User::find($id);
        $request->fullname ? $user->fullname = $request->fullname : null;
        $request->nickname ? $user->nickname = $request->nickname : null;
        $request->address ? $user->address    = $request->address : null;
        $request->whatsapp ? $user->whatsapp = $request->whatsapp : null;
        $user->save();
        return redirect()->route('apply.appl_biodata');
    }

    public function get_document_cv($id)
    {
        $user = User::find($id);
        $filePath = $user->cv;
        if (Storage::exists($filePath)) {
            return Storage::download($filePath);
        } else {
            abort(404, 'File not found');
        }
    }
    public function get_document_ijazah($id)
    {
        $user = User::find($id);
        $filePath = $user->ijazah;
        if (Storage::exists($filePath)) {
            return Storage::download($filePath);
        } else {
            abort(404, 'File not found');
        }
    }
    public function get_document_portofolio($id)
    {
        $user = User::find($id);
        $filePath = $user->portofolio;
        if (Storage::exists($filePath)) {
            return Storage::download($filePath);
        } else {
            abort(404, 'File not found');
        }
    }

    public function update_qualified($id,$id_participant)
    {
        $user = User::find($id);
        $user->qualified = 1;
        $user->save();

        $user = Participant::find($id_participant);
        $user->qualified_status = 1;
        $user->save();
      
        return redirect()->route('problem.index');
    }

    public function update_no_qualified($id,$id_participant)
    {
        $user = User::find($id);
        $user->qualified = 2;
        $user->save();

        $user = Participant::find($id_participant);
        $user->qualified_status = 2;
        $user->save();
     
        return redirect()->route('problem.index');
    }

    public function update_qualified_final($id,$id_participant)
    {
        $user = User::find($id);
        $user->qualified = 3;
        $user->save();

        $user = Participant::find($id_participant);
        $user->qualified_status = 3;
        $user->save();
      
        return redirect()->route('problem.index');
    }

    public function update_no_qualified_final($id,$id_participant)
    {
        $user = User::find($id);
        $user->qualified = 4;
        $user->save();

        $user = Participant::find($id_participant);
        $user->qualified_status = 4;
        $user->save();
     
        return redirect()->route('problem.index');
    }


}

<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\UsersController;
use App\Http\Controllers\ProblemsController;
use App\Http\Controllers\AspectsController;
use App\Http\Controllers\CriteriasController;
use App\Http\Controllers\DifferencesController;
use App\Http\Controllers\ProfileMatchingController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    // CRUD USERS
    Route::get('/users', [UsersController::class, 'index'])->name('user.index');
    Route::get('/user/create', [UsersController::class, 'create'])->name('user.create');
    Route::post('/user/store', [UsersController::class, 'store'])->name('user.store');
    Route::get('/user/edit/{id}', [UsersController::class, 'edit'])->name('user.edit');
    Route::put('/user/update/{id}', [UsersController::class, 'update'])->name('user.update');
    Route::delete('/user/delete/{id}', [UsersController::class, 'delete'])->name('user.delete');

    // CRUD PROBLEMS
    Route::get('/problems', [ProblemsController::class, 'index'])->name('problem.index');
    Route::get('/problem/create', [ProblemsController::class, 'create'])->name('problem.create');
    Route::post('/problem/store', [ProblemsController::class, 'store'])->name('problem.store');
    Route::get('/problem/edit/{id}', [ProblemsController::class, 'edit'])->name('problem.edit');
    Route::put('/problem/update/{id}', [ProblemsController::class, 'update'])->name('problem.update');
    Route::delete('/problem/delete/{id}', [ProblemsController::class, 'delete'])->name('problem.delete');

    // CRUD ASPECTS
    Route::post('/aspect/store', [AspectsController::class, 'store'])->name('aspect.store');
    Route::put('/aspect/update/{id}', [AspectsController::class, 'update'])->name('aspect.update');
    Route::delete('/aspect/delete/{id}', [AspectsController::class, 'delete'])->name('aspect.delete');

    // CRUD CRITERIAS
    Route::post('/criteria/store', [CriteriasController::class, 'store'])->name('criteria.store');
    Route::put('/criteria/update/{id}', [CriteriasController::class, 'update'])->name('criteria.update');
    Route::delete('/criteria/delete/{id}', [CriteriasController::class, 'delete'])->name('criteria.delete');

    // CRUD DIFFERENCES
    Route::post('/difference/store', [DifferencesController::class, 'store'])->name('difference.store');
    Route::put('/difference/update/{id}', [DifferencesController::class, 'update'])->name('difference.update');
    Route::delete('/difference/delete/{id}', [DifferencesController::class, 'delete'])->name('difference.delete');

    // PROFILE MATCHING
    Route::get('/pm/start', [ProfileMatchingController::class, 'start'])->name('pm.start');
    Route::post('/pm/store/participant-criterias', [ProfileMatchingController::class, 'storeParticipantCriterias'])->name('pm.store.participant.criterias');
    Route::put('/pm/update/participant-criteria', [ProfileMatchingController::class, 'updateParticipantCriteria'])->name('pm.update.participant.criteria');

    // CRUD PROFILE
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

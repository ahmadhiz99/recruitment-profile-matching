<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\UsersController;
use App\Http\Controllers\ProblemsController;
use App\Http\Controllers\AspectsController;

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
    Route::get('/aspects', [AspectsController::class, 'index'])->name('aspect.index');
    Route::get('/aspect/create', [AspectsController::class, 'create'])->name('aspect.create');
    Route::post('/aspect/store', [AspectsController::class, 'store'])->name('aspect.store');
    Route::get('/aspect/edit/{id}', [AspectsController::class, 'edit'])->name('aspect.edit');
    Route::put('/aspect/update/{id}', [AspectsController::class, 'update'])->name('aspect.update');
    Route::delete('/aspect/delete/{id}', [AspectsController::class, 'delete'])->name('aspect.delete');

    // CRUD PROFILE
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

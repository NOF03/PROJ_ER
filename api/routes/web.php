<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Controller;
use App\Http\Controllers\AnnounceController;
use App\Http\Controllers\UserController;

use App\Http\Middleware\VerifyCsrfToken;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [Controller::class, 'testConnection']);

Route::get('hello',[Controller::class, 'index']);

Route::post('/announcements', [AnnounceController::class, 'SelectAnnouncements'])->withoutMiddleware([VerifyCsrfToken::class]);

Route::post('/verifyIdentification', [UserController::class, 'verifyIdentification'])->withoutMiddleware([VerifyCsrfToken::class]);
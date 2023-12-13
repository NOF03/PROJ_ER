<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Controller;
use App\Http\Controllers\AnnounceController;
use App\Http\Controllers\UserController;

use App\Http\Middleware\VerifyCsrfToken;


Route::get('/', [Controller::class, 'testConnection']);
Route::get('hello',[Controller::class, 'index']);

Route::get('announcements', [AnnounceController::class, 'SelectAllAnnouncements']);
Route::post('announcements', [AnnounceController::class, 'SelectAnnouncements'])->withoutMiddleware([VerifyCsrfToken::class]);
Route::post('announcements/createAdmin', [AnnounceController::class, 'createAdminAnnouncement'])->withoutMiddleware([VerifyCsrfToken::class]);
Route::post('announcements/createClass', [AnnounceController::class, 'createClassAnnouncement'])->withoutMiddleware([VerifyCsrfToken::class]);

Route::post('verifyIdentification', [UserController::class, 'verifyIdentification'])->withoutMiddleware([VerifyCsrfToken::class]);

Route::post('getChildrenData', [UserController::class, 'getChildrenData'])->withoutMiddleware([VerifyCsrfToken::class]);
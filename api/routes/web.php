<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Controller;
use App\Http\Controllers\AnnounceController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\EvaluationController;
use App\Http\Controllers\NewsController;
use App\Http\Middleware\VerifyCsrfToken;


Route::get('/', [Controller::class, 'testConnection']);
Route::get('hello', [Controller::class, 'index']);

Route::get('announcements', [AnnounceController::class, 'SelectAllAnnouncements']);
Route::post('announcements', [AnnounceController::class, 'SelectAnnouncements'])->withoutMiddleware([VerifyCsrfToken::class]);
Route::post('announcements/createAdmin', [AnnounceController::class, 'createAdminAnnouncement'])->withoutMiddleware([VerifyCsrfToken::class]);
Route::post('announcements/createClass', [AnnounceController::class, 'createClassAnnouncement'])->withoutMiddleware([VerifyCsrfToken::class]);

Route::get('activities', [ActivityController::class, 'showAllActivitiesClass'])->withoutMiddleware([VerifyCsrfToken::class]);
Route::post('activities', [ActivityController::class, 'showActivitiesClass'])->withoutMiddleware([VerifyCsrfToken::class]);
Route::post('activities/create', [ActivityController::class, 'createActivityClass'])->withoutMiddleware([VerifyCsrfToken::class]);
Route::post('activities/delete', [ActivityController::class, 'deleteClassActivity'])->withoutMiddleware([VerifyCsrfToken::class]);
Route::post('activities/showChildren', [ActivityController::class, 'showAllClassChildren'])->withoutMiddleware([VerifyCsrfToken::class]);

Route::post('evaluation/create', [EvaluationController::class, 'registerEvaluation'])->withoutMiddleware([VerifyCsrfToken::class]);
Route::post('evaluation/verify', [EvaluationController::class, 'verifyChildEvaluationOnActivity'])->withoutMiddleware([VerifyCsrfToken::class]);

Route::post('getRooms', [NewsController::class, 'getRooms'])->withoutMiddleware([VerifyCsrfToken::class]);
Route::post('getMessagesRoom', [NewsController::class, 'getMessagesRoom'])->withoutMiddleware([VerifyCsrfToken::class]);
Route::post('sendMessagesRoom', [NewsController::class, 'sendMessagesRoom'])->withoutMiddleware([VerifyCsrfToken::class]);

Route::post('verifyIdentification', [UserController::class, 'verifyIdentification'])->withoutMiddleware([VerifyCsrfToken::class]);

Route::post('getChildrenData', [UserController::class, 'getChildrenData'])->withoutMiddleware([VerifyCsrfToken::class]);

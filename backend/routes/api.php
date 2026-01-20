<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [AuthController::class, 'login']);

Route::get('/users', [UserController::class, 'index'])
    ->middleware('checkRole:3');

Route::post('/users', [UserController::class, 'store'])
    ->middleware('checkRole:2');

Route::put('/users/{id}', [UserController::class, 'update'])
    ->middleware('checkRole:2');

Route::delete('/users/{id}', [UserController::class, 'destroy'])
    ->middleware('checkRole:1');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

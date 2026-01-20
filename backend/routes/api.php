<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/users', [UserController::class, 'index'])
        ->middleware('checkRole:3');

    Route::post('/users', [UserController::class, 'store'])
        ->middleware('checkRole:2');

    Route::put('/users/{id}', [UserController::class, 'update'])
        ->middleware('checkRole:2');

    Route::delete('/users/{id}', [UserController::class, 'destroy'])
        ->middleware('checkRole:1');

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/me', function (Request $request) {
        return $request->user();
    });
});
